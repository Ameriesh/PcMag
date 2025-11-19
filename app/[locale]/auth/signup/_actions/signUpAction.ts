// lib/actions.ts (ou où se trouve votre action)
"use server"
import { prisma } from "@/lib/prisma";
import { signUp } from "@/lib/auth-client";

interface SignUpData {
  name: string;
  email: string;
  password: string;
  
}

export async function signUpAction({ email, password, name }: SignUpData) {
  const defaultRole = "USER"; 
  
  try {
    
    const { data, error } = await signUp.email(
      {
        email,
        password,
        name,
        callbackURL: "/",
      },
      // ... callbacks
    );

    if (error) throw new Error(error.message);

    // 2. Mettre à jour le rôle de l'utilisateur avec la valeur par défaut FORCEE.
    // L'adresse e-mail est la clé unique trouvée par Better Auth.
    await prisma.user.update({
      where: { email },
      data: { role: defaultRole }, // <-- Rôle forcé à USER
    });

    return data;
  } catch (err: any) {
    // ... gestion des erreurs
    throw new Error(err.message);
  }
}