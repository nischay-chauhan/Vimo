import { NextResponse } from "next/server";
import {prisma} from "@/lib/index";
export async function GET(){

    try{

        const response = await prisma.trips.findMany({
            orderBy : {
                scrapedOn : "desc"
            }
        })
        if(response){
            return NextResponse.json( { response } , {status : 200} );
        }

        return NextResponse.json({message : "No trips found"}  , { status: 200 });
       

    }catch(error){
        return NextResponse.json({message : "Something went wrong"}  , { status: 500 });
    }
}