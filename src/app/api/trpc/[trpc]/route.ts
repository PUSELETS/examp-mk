import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/app/server';
import { unstable_noStore as noStore } from 'next/cache'

export const dynamic = "force-dynamic"

function handler(req: Request) {
  noStore()
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    // @ts-expect-error
    createContext: () => ({})
  });
}
export { handler as GET, handler as POST };