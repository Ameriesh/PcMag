// Fichier : components/Cards.tsx
"use client";

import React from 'react'; // Retrait de useState, useEffect
import Card from "./Card";
import { Search } from 'lucide-react'; 

// 🚨 Interface adaptée au retour sérialisé du Server Component
interface ArticleItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  badge: string;
  readTime: string | null; 
  featured?: boolean;
  type: "news" | "test" | "video" | string; 
  createdAt: string; // Vient comme une chaîne ISO (après sérialisation)
  updatedAt: string;
  author: {
    name: string | null;
    email: string;
  };
}

// 🚨 Interface des Props: Maintenant, elle contient initialArticles (Corrigé)
interface CardsProps {
    initialArticles?: ArticleItem[];
    searchTerm?: string;
}


// Fichier : components/Cards.tsx (Mise à jour du JSX)

// ... (imports et interfaces restent les mêmes)

export default function Cards({ initialArticles, searchTerm }: CardsProps) {
  
  const filters: string[] = ["Tous", "Gaming", "Tech", "Séries", "Cinéma", "Tests", "Science", "IA"];
  const cardsToRender = initialArticles; 

  if (cardsToRender?.length === 0 && searchTerm) {
      return (
          // Style de message d'erreur clair
          <section className="cards-v2-section min-h-[50vh] flex justify-center items-center">
              <div className="p-10 text-secondary-600 text-center text-xl border border-secondary-300 bg-white shadow-md">
                  <h2 className="text-secondary-900 font-bold mb-2">Aucun article trouvé.</h2>
                  <p>Veuillez essayer un autre terme que "{searchTerm}".</p>
              </div>
          </section>
      );
  }


  return (
    // Remplacement de geek-cards-section par cards-v2-section
    <section className="cards-v2-section">
      <div className="cards-v2-container">
        
        {/* Style d'en-tête minimaliste (Titre + Show All) */}
        <div className="cards-v2-header">
          <h2 className="cards-v2-title flex items-center gap-3">
             {searchTerm ? (
                <>
                  <Search className='w-6 h-6 text-primary-600' />
                  Résultats pour: "{searchTerm}"
                </>
             ) : (
                "ARTIFICIAL INTELLIGENCE" // Exemple de titre de section
             )}
          </h2>
          {/* Remplacement des filtres par un bouton "Show All" */}
         <a href="#" className="cards-v2-show-all">SHOW ALL &gt;</a>
        </div>
        

        {/* Remplacement de geek-cards-grid par cards-v2-grid */}
        <div className="cards-v2-grid">
          {cardsToRender?.map((card) => (
            
              <Card 
                key={card.id} 
                title={card.title}
                excerpt={card.excerpt}
                image={card.image}
                category={card.category}
                badge={card.badge}
                readTime={card.readTime || 'N/A'}
                featured={card.featured}
                type={card.type as "news" | "test" | "video"}
                
                // Formatage des données (création d'un objet Date à partir de la chaîne ISO)
                author={card.author.name || card.author.email.split('@')[0]}
                date={new Date(card.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
            />
          ))}
        </div>

        {/* Suppression de la section 'Load More' qui n'est pas dans le modèle */}
      </div>
    </section>
  );
}
