// Fichier : components/LanguageSwitcher.tsx

"use client";

import { useChangeLocale } from '@/locales/client'; 
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from 'next/image'; // Importez le composant Image de Next.js

// Définitions
const locales = [
    { locale: 'fr', label: 'Français', code: 'fr' }, // Assurez-vous que 'code' correspond au nom du fichier SVG
    { locale: 'en', label: 'English', code: 'us' }, // EN => US.svg
];

// Fonction utilitaire pour obtenir le chemin du drapeau
const getFlagPath = (code: string) => `/flags/${code}.svg`;

export default function LanguageSwitcher() {
    const changeLocale = useChangeLocale();
    const pathname = usePathname();
    
    // Détecter la locale actuelle
    const isEnglish = pathname.startsWith('/en');
    const currentLocale = isEnglish ? 'en' : 'fr';
    
    const selectedLocale = locales.find(l => l.locale === currentLocale) || locales[0];
    
    const handleLocaleChange = (newLocale: string) => {
        if (newLocale !== currentLocale) {
            changeLocale(newLocale);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="outline" 
                    size="sm"
                    className="flex items-center gap-2 border-secondary-300 bg-white text-secondary-900 hover:bg-secondary-100/70"
                >
                    {/* 💡 Affiche l'image SVG du drapeau actuel */}
                    <Image 
                        src={getFlagPath(selectedLocale.code)}
                        alt={`Flag of ${selectedLocale.label}`}
                        width={20}
                        height={15}
                        className="rounded-sm shadow-sm"
                    />
                    <span className="hidden sm:inline">{selectedLocale.label}</span>
                    <ChevronDown size={16} className="ml-1 text-secondary-500" />
                </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent 
                sideOffset={10} 
                align="end" 
                className="bg-white border border-secondary-200 shadow-xl p-1 w-36 z-50 rounded-lg"
            >
                {locales.map((lang) => (
                    <DropdownMenuItem 
                        key={lang.locale}
                        onClick={() => handleLocaleChange(lang.locale)}
                        className={`p-2 cursor-pointer rounded-md flex items-center gap-3 text-sm transition-colors 
                                    ${lang.locale === currentLocale 
                                        ? 'bg-primary-50 text-primary-700 font-bold' 
                                        : 'text-secondary-700 hover:bg-secondary-50'}`
                                  }
                    >
                        {/* 💡 Affiche l'image SVG du drapeau pour chaque option */}
                        <Image 
                            src={getFlagPath(lang.code)}
                            alt={`Flag of ${lang.label}`}
                            width={20}
                            height={15}
                            className="rounded-sm shadow-sm"
                        />
                        {lang.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}