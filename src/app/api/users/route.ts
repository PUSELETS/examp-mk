import { cookies } from "next/headers";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (request: NextApiRequest, response: NextApiResponse) => {

    cookies().set("user-token", '', {expires: new Date(0)})

    return new Response
}

export { handler as GET, handler as POST };