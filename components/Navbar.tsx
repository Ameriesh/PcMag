"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';

import { SearchBar } from "./SearchBar";
import { Button } from "./ui/button";
import { MonitorSmartphone, LogOut, PenLine } from 'lucide-react'
import { authClient } from "@/lib/auth-client";
import { User } from "@/lib/auth"; 
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { UserCircle, ChevronDown, LayoutDashboard } from "lucide-react" 
import { toast } from "sonner";
import { Pen } from "lucide-react";
import { useI18n, useScopedI18n } from "@/locales/client";
import LanguageSwitcher from "./LanguageSwitcher";

const PRIMARY_CATEGORIES = [
    { name: "Accueil", href: "/" },
    { name: "Programmation", href: "/category/Programmation" },
    { name: "Gaming", href: "/category/gaming" },
    { name: "Tech", href: "/category/tech" },
    { name: "Séries", href: "/category/series" },
    { name: "Cinéma", href: "/category/cinema" },
];


const Navbar = () => {
    const t = useScopedI18n('navbar')
    const router = useRouter(); 
    const pathname = usePathname(); 
    
    const { data: session, isPending } = authClient.useSession();
    
    const user = session?.user as User | undefined;

    
    const dashboardPath = user?.role === 'ADMIN' ? '/admin' : '/account';
    const dashboardText = user?.role === 'ADMIN' ? 'Admin Dashboard' : 'Mon Compte';

    const handleSignOut = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/");
                    },
                },

            }); 

            toast.info('Deconnection', {
                description: 'deconnection reussie'
            })
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <header className="navbar-v2">
            
           
            <div className="navbar-logo-v2 mr-3">
                <Link href="/">
                     <div className="logo-v2"><MonitorSmartphone size={20} /> PCMag</div> 
                </Link>
            </div>
             <SearchBar /> 

           
            <div className="navbar-auth-v2">

               
                {isPending ? (
                    <div className="text-secondary-500">...</div>
                ) : user ? (
                    <>
                      <div className="hidden md:block">
                    
                        <Link href='/dashboard/blog/addArticle' className="hover:text-primary-600 inline-flex gap-">
                            <Pen className="w-5 h-5"/>
                            {t('ecrire')}
                        </Link>
                        </div>
                        <LanguageSwitcher/>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="btn-tertiary flex items-center gap-1">
                              
                                <UserCircle className="w-5 h-5 text-primary-500" /> 
                                <span className="font-medium hidden sm:inline text-secondary-900">{user.name || user.email.split('@')[0]}</span>
                                <ChevronDown size={14} className="ml-1 text-secondary-600" />
                            </Button>
                        </DropdownMenuTrigger>
                        
                        
                        <DropdownMenuContent
                            sideOffset={10} 
                            align="end" 
                            className="bg-white border border-secondary-200 shadow-xl p-1 w-48 z-50 rounded-lg"
                        >
                            
                            <DropdownMenuItem asChild className="p-2 text-sm text-secondary-900 hover:bg-secondary-100/50 cursor-pointer outline-none rounded-md flex items-center gap-2">
                                <Link href={dashboardPath} className="w-full block">
                                    <LayoutDashboard size={16} className="text-primary-500" />
                                    {dashboardText}
                                </Link>
                            </DropdownMenuItem>

                            
                            <DropdownMenuItem 
                                onClick={handleSignOut} 
                                className="p-2 text-sm text-red-500 hover:bg-red-50/50 cursor-pointer outline-none rounded-md"
                            >   
                                <span className="w-full flex flex-1 gap-2">
                                    <LogOut size={16} className="text-rose-600"/>
                                    {t('disconnection')}
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </>
                ) : (
                    
                    <Link href="/auth/signin">
                        <Button className="btn-auth-outline">{t('sign_in')}</Button> 
                    </Link>
                )}
                
            </div>
        </header>
    );
};

export default Navbar;