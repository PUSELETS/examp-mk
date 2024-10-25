'use client'


export const dynamic = "force-dynamic"

import { PropsWithChildren, useState } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from "@/app/_trpc/client"
import { httpBatchLink } from "@trpc/client"

let token: string;

export const setToken = (newToken: string)=>{
    token = newToken
}

export const logout = async (logout: any)=> {
    await logout()
}


const Providers = ({children}: PropsWithChildren) => {
    const [queryClient] = useState(()=> new QueryClient())
    const [trpcClient] = useState(() => trpc.createClient({
        links: [
            httpBatchLink({
                url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
                fetch(url, option) {
                    return fetch(url, {
                        ...option,
                        credentials: 'include'
                    })
                },
            })
        ]
    })
)

return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </trpc.Provider>
)
}

export default Providers
