
import { UserRole } from "../genereted/prisma"; 


declare module "better-auth" {
  interface User {
    role: UserRole; 
  }
}


declare module "better-auth/react" {
  interface Session {
    user: {
      role: UserRole;
    } & Session["user"];
  }
}