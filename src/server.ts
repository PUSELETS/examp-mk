
import express from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'

import { nextApp, nextHandler } from './next-utils'
import { appRouter } from './trpc';
import { inferAsyncReturnType } from '@trpc/server';

const app = express()

const PORT = Number(process.env.PORT) || 3000

const createContext = ({
  req,
  res
}: trpcExpress.CreateExpressContextOptions) => (
  {
    req,
    res
  }
)

export type ExpressContext = inferAsyncReturnType< typeof createContext>

const start = async () => {

  app.use(
    '/api/trpc', 
    trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }))

  app.use((req, res) => nextHandler(req, res))


  nextApp.prepare().then(() => {

    app.listen(3000)
  })
}

start()
