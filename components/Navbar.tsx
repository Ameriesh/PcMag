"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation'; // Ajout de usePathname

import { SearchBar } from "./SearchBar";
import { Button } from "./ui/button";
import { MonitorSmartphone } from 'lucide-react'

// Importations des fonctions d'authentification et des types
import { authClient } from "@/lib/auth-client";
import { User } from "@/lib/auth"; 

// Importations des composants Radix et des icônes
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { UserCircle, ChevronDown, LayoutDashboard } from "lucide-react" // Icônes UserCircle et LayoutDashboard pour un look plus pro

// Liste des catégories pour la navigation centrale
const PRIMARY_CATEGORIES = [
    { name: "Accueil", href: "/" },
    { name: "Gaming", href: "/category/gaming" },
    { name: "Tech", href: "/category/tech" },
    { name: "Séries", href: "/category/series" },
    { name: "Cinéma", href: "/category/cinema" },
];

const Navbar = () => {
    const router = useRouter(); 
    const pathname = usePathname(); // Pour gérer l'état actif des liens
    
    const { data: session, isPending } = authClient.useSession();
    
    const user = session?.user as User | undefined;
    
    // Définitions des chemins et textes pour le tableau de bord
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

            {/* 2. Menu de Navigation Principale */}
            <nav className="navbar-nav-links">
                {PRIMARY_CATEGORIES.map((category) => {
                    // Logique d'activation du lien (gère l'accueil et les sous-pages de catégories)
                    const isActive = pathname === category.href || 
                                     (category.href !== '/' && pathname.startsWith(category.href));

                    return (
                        <Link 
                            key={category.name} 
                            href={category.href} 
                            // Application conditionnelle de la classe 'active'
                            className={`nav-link-item ${isActive ? 'active' : ''}`}
                        >
                            {category.name}
                        </Link>
                    );
                })}
            </nav>

            {/* 3. Section de droite : Recherche et Auth */}
            <div className="navbar-auth-v2">
                
                {/* Search Bar (Rendue discrète) */}
                <div className="hidden md:block">
                     <SearchBar /> 
                </div>

                {/* Authentication / User Menu */}
                {isPending ? (
                    <div className="text-secondary-500">Chargement...</div>
                ) : user ? (
                    // Menu déroulant Utilisateur
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="btn-tertiary flex items-center gap-1">
                                {/* Icône raffinée et couleur primary pour l'icône */}
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
                                    {dashboardText}
                                </Link>
                            </DropdownMenuItem>

                            {/* Bouton de Déconnexion */}
                            <DropdownMenuItem 
                                onClick={handleSignOut} 
                                className="p-2 text-sm text-red-500 hover:bg-red-50/50 cursor-pointer outline-none rounded-md"
                            >
                                Déconnexion
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    // Bouton "Sign in" (Style Outline très arrondi et class)
                    <Link href="/auth/signin">
                        <Button className="btn-auth-outline">Sign in</Button> 
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Navbar;