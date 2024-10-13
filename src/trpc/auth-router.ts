import { AuthCredentialsValidator } from "../lib/validators/account-credentials-validator";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { db } from "../app/database";
import { Query } from 'appwrite';
import { TRPCError } from "@trpc/server";
import { EmailTemplate } from "../components/email-template";
import { Resend } from 'resend';
import { databases, DATABASE_ID_DEV, COLLECTION_ID_USER } from "../app/appwrite";
import { AsyncLocalStorage } from 'async_hooks';
import * as jwt from 'jsonwebtoken'
import { SignJWT } from "jose";
import { getJwtSecretKey } from "../lib/auth";




export const authRouter = router({
    createUser: publicProcedure
        .input(z.object({
            email: z.string().email(),
            password: z.string().min(8, {
                message: "Password must be at least 8 characters long."
            })

        }))
        .mutation(async ({ input }) => {
            const { email, password } = input
            //check if user exist

            const respon = await db.user.list(
                [Query.equal("email", [email])]
            )
            if (respon.total !== 0)
                throw new TRPCError({ code: 'CONFLICT' })

            //create user

            const init = async () => {
                const token = uuid()
                const data = {
                    email,
                    password,
                    Token: token,
                    varified: false
                }
                const response = await db.user.create(data)

                //send email
                //URL
                const URL = "http://localhost:3000/verify-email?token="
                const tokenUrl = `${token}`
                const cancatinateUrl = URL + tokenUrl
                //
                const resend = new Resend("re_epnRGCk7_8d75vXMuhc5kaBmwX8693EfK");

                const { error } = await resend.emails.send({
                    from: 'MaketP <onboarding@resend.dev>',
                    to: ['dimamabolo15@gmail.com'],
                    subject: 'Hello world',
                    react: EmailTemplate({ href: cancatinateUrl, token: token }),
                });

                if (error) {
                    return console.error('failed', error)
                }


            }

            init()

            return { success: true, sentToEmail: email }
        }),

    verifyEmail: publicProcedure
        .input(z.object({ token: z.string() }))
        .query(async ({ input }) => {
            const { token } = input

            const respon = await db.user.list(
                [Query.equal("Token", [token])]
            )

            const isVerified = await databases.updateDocument(
                DATABASE_ID_DEV, // databaseId
                COLLECTION_ID_USER, // collectionId
                respon.documents[0].$id, // documentId
                {
                    varified: true
                }, // data (optional)

            );


            if (!isVerified)
                throw new TRPCError({ code: 'UNAUTHORIZED' })

            return { success: true }
        }),

    signIn: publicProcedure
        .input(AuthCredentialsValidator)
        .mutation(async ({ input, ctx }) => {
            const { email, password } = input
            const { res } = ctx

            try {

                const payload = {
                    email: email,
                    password: password
                }

                const token = jwt.sign(payload, "qewretryu576rtxcnutqaetr3456700fdxfn")

            
                return 
                       
            } catch (err) {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: 'Invalid email or password'
                })
            }
        }),
})

