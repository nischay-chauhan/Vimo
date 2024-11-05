import { NextResponse } from "next/server";
import {prisma} from "@/lib/index";
import { JobsQueue } from "@/lib/queue";
export async function POST(request: Request){
    try{
        const {url , jobType} = await request.json();
        const response = await prisma.jobs.create({
            data : {url , jobType}
        })
        await JobsQueue.add("new location" , {url , jobType , id:response.id})
        console.log(response)
        return NextResponse.json({message : "Job created successfully"}  , { status: 201 } ,);

    }catch(error){
        return NextResponse.json({message : "Something went wrong"}  , { status: 500 });
    }
}
