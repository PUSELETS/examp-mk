
import { authRouter } from "./auth-router";
import { router } from "./trpc";

export const revalidate = 0

export const appRouter = router({
    auth: authRouter
})

export type AppRouter = typeof appRouter