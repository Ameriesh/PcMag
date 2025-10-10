import { z } from "zod";

export const formSchema = z
  .object({
    name: z
      .string()
      .min(5, "Le nom est trop court il doit contenir au moins 5 caracteres")
      .max(50, "Le nom est trop long"),
    email: z
      .string()
      .email("Email invalide"),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .max(50, "Le mot de passe est trop long"),
    confirmPassword: z
      .string()
      
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"], 
  });
