import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { verifyAuth } from "./lib/auth";

let token: string;

export const setToken = (newToken: string)=>{
    token = newToken
    cookies().set("user-token", token)
}


export async function middleware(request: NextRequest){
    const token = request.cookies.get('user-token')?.value

    const verifiedToken = token && (
        await verifyAuth(token).catch((err) => {
            console.log(err)
        })
    )

    

    /*if (request.nextUrl.pathname.startsWith('/sign-in') && !verifiedToken){
        return
    }

    if(request.url.includes('/sign-in') && !verifiedToken){
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!verifiedToken){
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }*/
}

export const config = {

}