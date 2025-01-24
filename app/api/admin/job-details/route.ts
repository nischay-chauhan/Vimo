import { NextResponse } from "next/server";
import {prisma} from "@/lib/index";
export async function GET (){

    try{
        console.log("hello")
        const response = await prisma.jobs.findMany({
            orderBy : {
                createdAt : "desc"
            }
        })
        // console.log(response)
        const jobsinProgress = await prisma.jobs.findMany({
            where : {
                isComplete : false
            }
        })
        
        return NextResponse.json( { response , onGoingJobs : jobsinProgress?.length ?? 0 } , {status : 200} );


    }catch(error){
        console.log(error)
        return NextResponse.json({message : "Something went wrong"}  , { status: 500 });
    }
}