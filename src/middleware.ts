import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";

export function middleware(request: NextRequest){
    const responce = NextResponse.next()
    const headerList = headers()

    responce.headers.set("custom-headers", "custom-value")


    return responce
}