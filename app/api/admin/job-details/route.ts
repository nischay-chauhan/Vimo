import { NextResponse } from "next/server";
import {prisma} from "@/lib/index";
export async function GET (){
    try{

        const response = await prisma.jobs.findMany({
            orderBy : {
                createdAt : "desc"
            }
        })
        const jobsinProgress = await prisma.jobs.findMany({
            where : {
                isComplete : false
            }
        })
        return NextResponse.json( { response , onGoingJobs : jobsinProgress?.length ?? 0 } , {status : 200} );


    }catch(error){
        return NextResponse.json({message : "Something went wrong"}  , { status: 500 });
    }
}