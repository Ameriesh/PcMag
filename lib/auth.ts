import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/genereted/prisma";
import { nextCookies } from "better-auth/next-js";
import { inferAdditionalFields } from "better-auth/client/plugins";

const prisma = new PrismaClient();

export const auth = betterAuth({
    plugins: 
        [nextCookies()],
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    user: {
        additionalFields: {
            
            role: {
                type: "string", 
                input: false,
            } 
        }
    }
});

export const getSession = auth;
export type Session = typeof auth.$Infer.Session;
export type User = Session["user"];
