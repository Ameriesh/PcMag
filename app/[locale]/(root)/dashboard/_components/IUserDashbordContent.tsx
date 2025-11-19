
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
      
     
      

    
      <section className="w-full space-y-6 max-w-lg">
        
     
        <ActionCard 
          href="/dashboard/blog/addArticle"
          title="Créer un Nouvel Article"
          description="Rédiger et publier un nouveau contenu."
          icon={Plus}
          color="border-primary-500" 
        />
        
       
        <ActionCard 
          href="/dashboard/blog/listArticle"
          title="Gérer mes Articles"
          description="Modifier, supprimer ou dépublier les articles."
          icon={LayoutDashboard}
          color="border-secondary-500" 
        />
        
        
        <ActionCard 
          href="/dashboard/blog/account"
          title="Mon Compte"
          description="Accéder aux réglages généraux."
          icon={Settings}
          color="border-secondary-300" 
        />

      </section>
      
    </div>
    </div>
  );
}