// Fichier : app/admin/loading.tsx ou components/AdminSkeleton.tsx
import React from 'react';
import { SpinnerCustom } from './spinner';

export function AdminSkeleton() {
  return (
    // Conteneur imitant le padding et le fond du layout Admin
    <div className="p-8 md:p-12 bg-secondary-900 min-h-screen">
      
      {/* 1. En-tête (Titre et Spinner) */}
      <header className="pb-6 border-b border-primary-500/50 mb-10 w-full max-w-lg mx-auto text-center">
        {/* Skeleton pour le titre H1 */}
        <div className="h-10 w-3/4 bg-secondary-800 animate-pulse mb-3 mx-auto rounded-md"></div>
        {/* Skeleton pour le sous-titre */}
        <div className="h-5 w-1/2 bg-secondary-800 animate-pulse mx-auto rounded-md"></div>
      </header>

      {/* 2. Actions Rapides (Skeleton) */}
      <section className="w-full space-y-6 max-w-lg mx-auto">
        
        {/* Skeleton de Carte 1 */}
        <div className="bg-secondary-800 p-6 border-l-4 border-secondary-700 flex items-center gap-4 shadow-lg">
          <div className="h-8 w-8 bg-secondary-700 rounded-full animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/4 bg-secondary-700 rounded animate-pulse"></div>
            <div className="h-3 w-1/2 bg-secondary-700 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Skeleton de Carte 2 */}
        <div className="bg-secondary-800 p-6 border-l-4 border-secondary-700 flex items-center gap-4 shadow-lg">
          <div className="h-8 w-8 bg-secondary-700 rounded-full animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/4 bg-secondary-700 rounded animate-pulse"></div>
            <div className="h-3 w-1/2 bg-secondary-700 rounded animate-pulse"></div>
          </div>
        </div>
        
        {/* Skeleton de Carte 3 */}
        <div className="bg-secondary-800 p-6 border-l-4 border-secondary-700 flex items-center gap-4 shadow-lg">
          <div className="h-8 w-8 bg-secondary-700 rounded-full animate-pulse"></div>
          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/4 bg-secondary-700 rounded animate-pulse"></div>
            <div className="h-3 w-1/2 bg-secondary-700 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Placer le Spinner dans un coin pour un effet visuel agréable */}
        <div className="mt-8 pt-4 flex justify-center border-t border-secondary-700">
             <SpinnerCustom />
        </div>
      </section>
    </div>
  );
}