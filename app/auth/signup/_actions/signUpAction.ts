"use server"; 

import { authClient } from "@/lib/auth-client";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export async function signUpAction({ email, password, name}: SignUpData) {
  try {
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/", 
      },
      {
        onRequest: () => {
          console.log("Envoi du formulaire SignUp...");
        },
        onSuccess: (ctx) => {
          console.log("Inscription réussie !", ctx.data);
        },
        onError: (ctx) => {
          console.error("Erreur SignUp :", ctx.error.message);
          throw new Error(ctx.error.message);
        },
      }
    );

    if (error) throw new Error(error.message);

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
}
