import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/app/server';

export const revalidate = 0

function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    cache: 'no-store',
    // @ts-expect-error
    createContext: () => ({})
  });
}
export { handler as GET, handler as POST };