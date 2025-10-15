// types/user.ts
import { UserRole } from "@/genereted/prisma";

export type UserWithRole = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole; // utiliser l'enum Prisma
};

export type SessionWithRole = {
  user: UserWithRole;
};
