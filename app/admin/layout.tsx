import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/app-sidebar"
import NavbarDash from './_components/NavBarDash';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    
  return (
    <>
    <NavbarDash></NavbarDash>
    <SidebarProvider className='bg-secondary-50'>
      
     
      <div className="flex min-h-screen bg-secondary-50 text-secondary-900">
        
       
        <AppSidebar />
        
       
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        
      </div>
    </SidebarProvider>
    </>
  );
}