import { NextResponse } from "next/server";
import {prisma} from "@/lib/index";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import {SHA256 as SHA} from 'crypto-js'
const createToken = async(email : string , userId : number) => {
    return await new SignJWT({ email, userId , isAdmin : true })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("48h")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET!));
}

export async function POST(request: Request) {
   try{
    const body = await request.json();
    const { email, password } = body;
    if(!email || !password){
      return NextResponse.json({message : "Please provide email and password"}  , { status: 400 });
    }

    const user = await prisma.admin.findUnique({
      where: {
        email,
        password : SHA(password).toString()
      }
    });
    

    if(!user){
        return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }else{
        const token = await createToken(user.email, user.id);
        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax"
        })
    }


    console.log(email, password);
    return NextResponse.json({userIndo : {
        email : user.email,
        id : user.id,
    }} );
   }catch(error){
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
   }
}