import { Page } from "puppeteer";

interface PackageInfo {
    id: string | null;
    name: string;
    nights: number;
    days: number;
  
    inclusions: string[];
    price: number;
  }

interface PackageDetailsType{
    description : string
    images : string[]
    themes : string[]
}
  

export const StartPackageScraping  = async(page : Page , pkg:PackageInfo) => {
    const packageDetails = await page.evaluate((pkg) => {
        
    })

    const details = {...pkg , ...packageDetails}
    return details
}