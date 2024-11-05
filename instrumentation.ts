import { Browser } from "puppeteer";
import { startLocationScraping } from "./scraping/location-scraping";
import { StartPackageScraping } from "./scraping/package-scrapiing";


export const register = async() => {
    if(process.env.NEXT_RUNTIME==="nodejs"){

        const{Worker} = await import("bullmq")
        const {connection} = await import('./lib/redis')
        const { prisma } = await import('./lib/index')
        const puppeteer = await import("puppeteer")
        const {JobsQueue} = await import("./lib/queue")
        const BROWSER_WS = process.env.NEXT_PUBLIC_BROWSER_WS;
        
        new Worker("jobsQueue", async (job) => {
            let browser:undefined | Browser = undefined
            try{
             browser = await puppeteer.connect({
                browserWSEndpoint: BROWSER_WS,
            });

            const page = await browser.newPage();
            console.log("navigating to " , job.data.url)
            await page.goto(job.data.url , {timeout : 60000});

            console.log("Scraping location to " , job.data.url)
            if(job.data.jobType.type === "location"){
               
                const packages = await startLocationScraping(page)

                await prisma.jobs.update({
                    where : {
                        id : job.data.id
                    },
                    data : {
                        status : "success",
                        isComplete : true
                    }
                });

                for (const pkg of packages) {
                    const jobCreated = await prisma.jobs.findFirst({
                      where: {
                        url: `https://packages.yatra.com/holidays/intl/details.htm?packageId=${pkg?.id}`,
                      },
                    });
                    if (!jobCreated) {
                      const job = await prisma.jobs.create({
                        data: {
                          url: `https://packages.yatra.com/holidays/intl/details.htm?packageId=${pkg?.id}`,
                          jobType: { type: "package" },
                        },
                      });
                      JobsQueue.add("package", { ...job, packageDetails: pkg });
                    }
                  }
            }else if (job.data.jobType.type === "package"){
                const alreadyScrapped = await prisma.trips.findUnique({
                    where: { id: job.data.packageDetails.id },
                });
                if (!alreadyScrapped) {
                    console.log("Connected! Navigating to " + job.data.url);
                    await page.goto(job.data.url, { timeout: 120000 });
                    console.log("Navigated! Scraping page content...");
                    const pkg = await StartPackageScraping(
                      page,
                      job.data.packageDetails
                    );
                    await prisma.trips.create({
                        data: pkg
                    })
                    await prisma.jobs.update({
                        where : {
                            id : job.data.id
                        },
                        data : {
                            status : "success",
                            isComplete : true
                        }
                    });
                    console.log(pkg)
                }

            }
            }catch(error){

                console.log(error)
                await prisma.jobs.update({
                    where : {
                        id : job.data.id
                    },
                    data : {
                        status : "failed",
                        isComplete : true
                    }
                });
                
            
            } finally{
                await browser?.close();
                console.log("Browser closed successfully")
            }


        }, {
            connection,
            concurrency : 10,
            removeOnComplete : {count : 1000},
            removeOnFail : {count : 5000},
        });


    }
}