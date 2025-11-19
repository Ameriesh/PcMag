// Fichier : app/admin/page.tsx
export const runtime = 'nodejs'; 
import { getServerSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import AdminDashboardContent from "./_components/IUserDashbordContent";
import { SectionCards } from "./_components/SectionCards";
import { getScopedI18n } from "@/locales/server";

export default async function AdminPage() {
  const session = await getServerSession();

   const t = await getScopedI18n('dashboard'); 

  if (!session) redirect("/auth/signin");          


  return (
    <>
      <header className=" mb-10 w-full max-w-lg text-center mx-auto">
        <h1 className="text-4xl font-black text-primary-700 mb-1">
          {t('bienvenue')}, {session.user.name} 
        </h1>
       
      </header>
       <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
      <AdminDashboardContent 
      userName={session.user.name || session.user.email.split('@')[0]}
      userRole={session.user.role} 
    />
    </div>
    </div>
    </div>
    </>
    
  );
}