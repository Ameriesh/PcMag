// Fichier : app/admin/_components/AdminDashboardContent.tsx
"use client";

import Link from 'next/link';
import { Plus, LayoutDashboard, Settings } from 'lucide-react';

interface DashboardProps {
  userName: string;
  userRole: string;
}

export default function AdminDashboardContent({ userName, userRole }: DashboardProps) {
  
  // Style pour les cartes d'action rapide (Clair et accentué)
  const ActionCard = ({ href, title, description, icon: Icon, color }: any) => (
    <Link href={href} passHref>
      <div 
        // 🚨 Style de carte adapté au fond clair : blanc, ombre, et accent primaire
        className={`bg-white p-6 border-l-4 ${color} flex items-center gap-4 transition-all hover:shadow-lg cursor-pointer max-w-md mx-auto shadow-md`}
      >
        <Icon className="w-8 h-8 text-primary-500" />
        <div>
          <h3 className="text-xl font-bold text-secondary-900">{title}</h3>
          <p className="text-sm text-secondary-500">{description}</p>
        </div>
      </div>
    </Link>
  );

  return (
   <div className='w-full py-12 px-4 sm:px-6 lg:px-12'>
    <div className="flex flex-col items-center md:p-12 w-full min-h-full">
      
     
      <header className="pb-6 mb-10 w-full max-w-lg text-center">
        <h1 className="text-4xl font-black text-primary-700 mb-1">
          Bienvenue, {userName} 
        </h1>
        <p className="text-lg text-secondary-600">
          Espace Administrateur
        </p>
      </header>

    
      <section className="w-full space-y-6 max-w-lg">
        
        {/* Créer un Article */}
        <ActionCard 
          href="/admin/Article"
          title="Créer un Nouvel Article"
          description="Rédiger et publier un nouveau contenu."
          icon={Plus}
          color="border-primary-500" 
        />
        
       
        <ActionCard 
          href="/admin/Article"
          title="Gérer les Publications"
          description="Modifier, supprimer ou dépublier les articles."
          icon={LayoutDashboard}
          color="border-secondary-500" 
        />
        
        
        <ActionCard 
          href="/admin/settings"
          title="Paramètres du Site"
          description="Accéder aux réglages généraux."
          icon={Settings}
          color="border-secondary-300" 
        />

      </section>
      
    </div>
    </div>
  );
}