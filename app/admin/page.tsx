// Fichier : app/admin/page.tsx
export const runtime = 'nodejs'; 
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import AdminDashboardContent from "./_components/AdminDashbordContent";

export default async function AdminPage() {
  const session = await getServerSession();

  if (!session) redirect("/auth/signin");          
  if (session.user.role !== "ADMIN") redirect("/"); 

  return (
    <AdminDashboardContent 
      userName={session.user.name || session.user.email.split('@')[0]}
      userRole={session.user.role} 
    />
  );
}