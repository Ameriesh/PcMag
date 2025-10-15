
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';


import { SearchBar } from "./SearchBar";
import { Button } from "./ui/button";


import { authClient } from "@/lib/auth-client";
import { User } from "@/lib/auth"; 


import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { User2, ChevronDown, Computer } from "lucide-react"


const Navbar = () => {

  const router = useRouter(); 
  
  const { data: session, isPending } = authClient.useSession();
  
  const user = session?.user as User | undefined;
  
  const dashboardPath = user?.role === 'ADMIN' ? '/admin' : '/';
  const dashboardText = user?.role === 'ADMIN' ? 'Admin Dashboard' : 'Accueil';

  const handleSignOut = async () => {
    try {
     
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          },
        },
      }); 
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
   
    <header className="navbar">
    
      <div className="navbar-logo">
        <Link href="/">
          <span className="navbar-logo text-2xl font-bold text-primary-500 cursor-pointer hover:text-primary-700">
            PCMag <Computer />
          </span>
        </Link>
      </div>

     
      <div className="navbar-center">
        <SearchBar />
      </div>

    
      <div className="navbar-auth">
        <div className="flex items-center gap-3">
        
        
          {isPending ? (
            <div className="text-gray-500">Chargement...</div>
          ) : user ? (
           
            <>
              
             
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  
                  <Button 
                    className="flex items-center gap-2 bg-white-100 px-4 py-2 border border-secondary-300 text-secondary-900 hover:bg-secondary-100"
                  >
                    <User2 className="w-5 h-5" /> 
                    {user.name || user.email.split('@')[0]}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                
              
                <DropdownMenuContent
                  sideOffset={10} 
                  align="end" 
                  className="bg-white border border-secondary-200 shadow-lg p-1 w-48 z-50"
                >
                  
                 
                  <DropdownMenuItem asChild className="p-1.5 text-sm text-secondary-900 hover:bg-primary-100 hover:text-primary-700 cursor-pointer outline-none">
                    <Link href={dashboardPath} className="w-full block">
                       {dashboardText}
                    </Link>
                  </DropdownMenuItem>

               
                  <DropdownMenuItem 
                    onClick={handleSignOut} 
                    className="p-1.5 text-sm text-red-500 hover:bg-red-500/10 cursor-pointer outline-none"
                  >
                    Déconnexion
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>

              
              {user.role && ( 
                 <span className={`text-sm font-medium ${user.role === 'ADMIN' ? 'text-red-500' : 'text-gray-500'}`}>
                    ({user.role}) 
                 </span>
              )}
              
        

            </>
          ) : (
           
            
            <Link href="/auth/signin">
              <Button className="btn-secondary">Connexion</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;