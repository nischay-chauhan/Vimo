import { NextResponse } from "next/server";
import {prisma} from "@/lib/index";
import { revalidatePath } from "next/cache";
export async function POST(request: Request){
    try{
        const {url , jobType} = await request.json();
        const response = await prisma.jobs.create({
            data : {url , jobType}
        })
        console.log(response)
        return NextResponse.json({message : "Job created successfully"}  , { status: 201 } ,);

    }catch(error){
        return NextResponse.json({message : "Something went wrong"}  , { status: 500 });
    }
}
