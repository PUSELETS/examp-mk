import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";


let token: string;

export const setToken = (newToken: string)=>{
    token = newToken
    cookies().set("user-token", token)
}


export async function middleware(request: NextRequest, response: NextResponse){
  
 }

 console.log(middleware)

