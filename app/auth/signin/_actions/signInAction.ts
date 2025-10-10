"use server";

import { authClient } from "@/lib/auth-client";

interface SignInData {
  email: string;
  password: string;
}

type SignInResult =
  | { success: true; data: any }
  | { success: false; error: { field: "email" | "password" | "general"; message: string } };

export default async function SignInAction({ email, password }: SignInData): Promise<SignInResult> {
  try {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/", 
      rememberMe: true,
    });

    if (error) {
     
      return { 
        success: false, 
        error: { 
          field: "password", 
          message: "Mot de passe incorrect" 
        } 
      };
    }

   
    return { 
      success: true, 
      data 
    };
  } catch (err: any) {
    return { 
      success: false, 
      error: { 
        field: "general", 
        message: err?.message ?? "Erreur lors de la connexion" 
      } 
    };
  }
}
