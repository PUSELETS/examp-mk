import { cookies } from "next/headers"
import { verifyAuth } from "./auth"

export const getServerSideUser = async () =>{
    const token = cookies().get('user-token')?.value

    const user = token && (
        await verifyAuth(token).catch((err) => {
            console.log(err)
        })
    )

    if(!user){
        return null
    } else {
        return user
    }

    
}
