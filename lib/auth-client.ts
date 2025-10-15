import { createAuthClient } from "better-auth/react"
import { nextCookies } from "better-auth/next-js";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>(), nextCookies()],
  baseURL: "http://localhost:3000", 
})

// Déstructurer les fonctions depuis ce même client
export const { signIn, signUp, signOut, useSession } = authClient
