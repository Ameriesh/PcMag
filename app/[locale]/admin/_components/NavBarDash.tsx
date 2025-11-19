"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation'; 
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MonitorSmartphone } from 'lucide-react'
import { authClient } from "@/lib/auth-client";
import { User } from "@/lib/auth"; 
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { UserCircle, ChevronDown, LayoutDashboard } from "lucide-react" 
// 💡 Import de next-international (ajustez le chemin si nécessaire)
import { useScopedI18n } from '@/locales/client';


const NavDash = () => {
    const router = useRouter(); 
    const pathname = usePathname(); 
    
    // 💡 Hook de traduction ciblant la section 'navbar'
    const t = useScopedI18n('navbar'); 
    
    const { data: session, isPending } = authClient.useSession();
    
    const user = session?.user as User | undefined;
    
    // 💡 Utilisation des clés de traduction pour les textes dynamiques
    const dashboardPath = user?.role === 'ADMIN' ? '/admin' : '/account';
    const dashboardText = user?.role === 'ADMIN' ? t('admin_dashboard') : t('my_account'); 

    const handleSignOut = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/");
                    },
                },
            }); 

            // 💡 Traduire le toast
            toast.info(t('disconnection'), {
                description: t('sign_out_success')
            })
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <header className="navbar-v2">
            
            {/* 1. Logo (Image) */}
            <div className="navbar-logo-v2">
                <Link href="/">
                     <div className="logo-v2"><MonitorSmartphone size={20} /> PCMag</div> 
                </Link>
            </div>


            {/* 3. Section de droite : Recherche et Auth */}
            <div className="navbar-auth-v2">
                
                 {/* 💡 Traduire le lien Home */}
                 <Link href="/" className="text-primary-700 text-[20px]">{t('home')}</Link>

                {/* Authentication / User Menu */}
                {isPending ? (
                    <div className="text-secondary-500">...</div>
                ) : user ? (
                    // Menu déroulant Utilisateur
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="btn-tertiary flex items-center gap-1">
                                <UserCircle className="w-5 h-5 text-primary-500" /> 
                                <span className="font-medium hidden sm:inline text-secondary-900">{user.name || user.email.split('@')[0]}</span>
                                <ChevronDown size={14} className="ml-1 text-secondary-600" />
                            </Button>
                        </DropdownMenuTrigger>
                        
                        {/* Contenu du Dropdown Menu */}
                        <DropdownMenuContent
                            sideOffset={10} 
                            align="end" 
                            className="bg-white border border-secondary-200 shadow-xl p-1 w-48 z-50 rounded-lg"
                        >
                            {/* Lien vers le Dashboard/Compte */}
                            <DropdownMenuItem asChild className="p-2 text-sm text-secondary-900 hover:bg-secondary-100/50 cursor-pointer outline-none rounded-md flex items-center gap-2">
                                <Link href={dashboardPath} className="w-full block">
                                    <LayoutDashboard size={16} className="text-primary-500" />
                                    {dashboardText} {/* 💡 Traduit */}
                                </Link>
                            </DropdownMenuItem>

                            {/* Bouton de Déconnexion */}
                            <DropdownMenuItem 
                                onClick={handleSignOut} 
                                className="p-2 text-sm text-secondary-900 hover:bg-red-50/50 cursor-pointer outline-none rounded-md"
                            >
                                {t('sign_out')} {/* 💡 Traduit */}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                 
                    <Link href="/auth/signin">
                        <Button className="btn-auth-outline">{t('sign_in')}</Button> {/* 💡 Traduit */}
                    </Link>
                )}
            </div>
        </header>
    );
};

export default NavDash;