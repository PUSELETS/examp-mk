'use client'

import { PropsWithChildren, useState } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from "@/trpc/client"
import { httpBatchLink } from "@trpc/client"

let token: string;

export const setToken = (newToken: string)=>{
    token = newToken
}

const Providers = ({children}: PropsWithChildren) => {
    const [queryClient] = useState(()=> new QueryClient())
    const [trpcClient] = useState(() => trpc.createClient({
        links: [
            httpBatchLink({
                url: "http://localhost:3000/api/trpc",
                fetch(url, option) {
                    return fetch(url, {
                        ...option,
                        credentials: 'include'
                    })
                },
                headers: () => {
                    return {
                      Authorization: `Bearer ${token}`,
                    };
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
