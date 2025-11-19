import NavDash from "./_components/NavBarDash"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
     
      <div className="admin-layout-container">
        <AppSidebar />
        <main className="admin-content-area">
          
           
           <SidebarTrigger /> 
           
           {children}
        </main>
      </div>
    </SidebarProvider>
  )
}