// Fichier : components/layout/Footer.tsx

"use client"; // 💡 Marqué comme Composant Client pour utiliser les hooks

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';
// 💡 Import de next-international (assurez-vous que le chemin est correct)
import { useI18n, useScopedI18n } from '@/locales/client'; 


export default function Footer() {
    
    // 💡 Déclaration du hook de traduction pour la portée 'footer'
    const t = useScopedI18n('footer'); 
    
    // Données de navigation (utilisent maintenant les clés de traduction)
    const navLinks = [
        { href: '/articles', label: t('all_articles') },
        { href: '/categories', label: t('categories') },
        { href: '/about', label: t('about') },
        { href: '/contact', label: t('contact') },
        { href: '/politique-de-confidentialite', label: t('privacy_policy') },
    ];

    // Données de contact (inchangées car +237, email, et ville restent les mêmes)
    const contactInfo = [
        { icon: Phone, text: '+237 6x xx xx xx xx' },
        { icon: Mail, text: 'contact@votreblog.com' },
        { icon: MapPin, text: 'Douala, Cameroun' },
    ];

    // Données de réseaux sociaux (inchangées)
    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com/votrepage', label: 'Facebook' },
        { icon: Twitter, href: 'https://twitter.com/votrecompte', label: 'Twitter' },
        { icon: Instagram, href: 'https://instagram.com/votrecompte', label: 'Instagram' },
        { icon: Linkedin, href: 'https://linkedin.com/in/votreprofil', label: 'LinkedIn' },
        { icon: Rss, href: '/rss.xml', label: 'Flux RSS' },
    ];

    return (
        <footer className="bg-secondary-900 text-secondary-300 border-t border-secondary-800 mt-12">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-16">
                    
                    {/* Colonne 1: Branding et Description */}
                    <div>
                        <h3 className="text-xl font-extrabold text-primary-400 mb-4">
                            {t('blog_name')} {/* 💡 Traduit */}
                        </h3>
                        <p className="text-sm">
                            {t('slogan')} {/* 💡 Traduit */}
                        </p>
                        <div className="flex space-x-4 mt-6">
                            {socialLinks.map((link) => (
                                <Link 
                                    key={link.label} 
                                    href={link.href} 
                                    aria-label={link.label} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <link.icon className="w-5 h-5 text-secondary-400 hover:text-primary-400 transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>
                    
                    {/* Colonne 2: Navigation Rapide */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">{t('navigation_title')}</h4> {/* 💡 Traduit */}
                        <ul className="space-y-3">
                            {navLinks.slice(0, 3).map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                                        {link.label} {/* Traduction via navLinks */}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colonne 3: Liens Légaux et Utiles */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">{t('support_title')}</h4> {/* 💡 Traduit */}
                        <ul className="space-y-3">
                            {navLinks.slice(3).map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm hover:text-primary-400 transition-colors">
                                        {link.label} {/* Traduction via navLinks */}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Colonne 4: Contact */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">{t('contact_title')}</h4> {/* 💡 Traduit */}
                        <ul className="space-y-3">
                            {contactInfo.map((item, index) => (
                                <li key={index} className="flex items-start text-sm">
                                    <item.icon className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-primary-400" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                        <Button variant="secondary" className="mt-6 w-full md:w-auto">
                            {t('write_us')} {/* 💡 Traduit */}
                        </Button>
                    </div>

                </div>

                {/* Séparateur et Copyright */}
                <div className="mt-12 pt-8 border-t border-secondary-800 text-center">
                    <p className="text-sm text-secondary-400">
                        {/* Utilisation de l'interpolation pour l'année si vous aviez {year} dans la locale */}
                        &copy; {new Date().getFullYear()} {t('blog_name')}. {t('copyright')}
                    </p>
                </div>
            </div>
        </footer>
    );
}