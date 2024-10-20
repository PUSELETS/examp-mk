
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';


export const createContext = async (opts: CreateNextContextOptions) => {
  const {req , res} = opts

  return {
    req,
    res,
};

}

export type Context = Awaited<ReturnType<typeof createContext>>;
