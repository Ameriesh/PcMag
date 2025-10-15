import { signIn } from "@/lib/auth-client";

interface SignInData {
  email: string;
  password: string;
}

export default async function SignInAction({ email, password }: SignInData) {
  try {
    const { data, error } = await signIn.email({
      email,
      password,
      rememberMe: true,
    });

    if (error) {
      return {
        success: false,
        error: { message: error.message ?? "Échec de la connexion" },
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err: any) {
    return {
      success: false,
      error: { message: "Erreur serveur" },
    };
  }
}
