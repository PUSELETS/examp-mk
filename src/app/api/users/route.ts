import { cookies } from "next/headers";
import { NextRequest ,NextResponse } from "next/server";

const handler = (request: NextRequest, response: NextResponse) => {

    cookies().set("user-token", '', {expires: new Date(0)})

    return new Response
}

export { handler as GET, handler as POST };