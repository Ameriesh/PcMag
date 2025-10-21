'use client'

import React, { useState, useEffect } from 'react'; 
import Card from "./Card";
import { Search, ChevronRight } from 'lucide-react'; 
import type ArticleItem from '@/types/article-item'; 


interface CardsProps {
    categoryTitle?: string; 
    searchTerm?: string; 
    initialArticles?: ArticleItem[]; 
}

const fetchArticlesByCategory = async (title: string, limit: number = 3) => {
  
    const apiURL = `http://localhost:3000//api/categories/categoryByArticle?title=${encodeURIComponent(title)}&limit=${limit}`;

    try {
        const response = await fetch(apiURL, { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        return await response.json() as ArticleItem[];

    } catch (error) {
        console.error("Fetch Error:", error);
        return [];
    }
};

export default function Cards({ categoryTitle, searchTerm, initialArticles }: CardsProps) {
    
   
    const isSearchPage = !!searchTerm;
    const isCategorySection = !!categoryTitle && !isSearchPage && !initialArticles;
    const isInitialLoad = !isSearchPage && initialArticles?.length;

    const [articles, setArticles] = useState(isInitialLoad ? initialArticles : []);
    const [loading, setLoading] = useState(false);

   
    useEffect(() => {
        if (isCategorySection && categoryTitle) {
            setLoading(true);
            
            fetchArticlesByCategory(categoryTitle)
                .then(setArticles)
                .catch(() => setArticles([]))
                .finally(() => setLoading(false));
        }
    }, [categoryTitle, isCategorySection]);

    const cardsToRender = isCategorySection ? articles : initialArticles;

    if (loading) {
        return <section className="cards-v2-section p-10 text-center text-secondary-600">...</section>;
    }


    if (cardsToRender?.length === 0) {
        const message = searchTerm 
            ? `Aucun article trouvé pour "${searchTerm}".`
            : `Aucun article trouvé dans la catégorie "${categoryTitle}".`;
            
        return (
            <section className="cards-v2-section min-h-[50vh] flex justify-center items-center">
                <div className="p-10 text-secondary-600 text-center border border-secondary-300 bg-white shadow-md">
                    <h2 className="text-secondary-900 font-bold mb-2">Désolé.</h2>
                    <p>{message}</p>
                </div>
            </section>
        );
    }


    return (
        <section className="cards-v2-section">
          <div className="cards-v2-container">
            
            <div className="cards-v2-header">
              <h2 className="cards-v2-title flex items-center gap-3">
                 {isSearchPage ? `RÉSULTATS POUR: "${searchTerm}"` : categoryTitle?.toUpperCase()}
              </h2>
             
             {isCategorySection && (
                <a href={`/categories/${categoryTitle}`} className="cards-v2-show-all flex items-center gap-1 text-rose-400">
                    Voir Tout <ChevronRight size={16} />
                </a>
             )}
            </div>
            
            <div className="cards-v2-grid">
              {cardsToRender?.map((card) => (
                <Card 
                key={card.id} 
                title={card.title}
                excerpt={card.excerpt}
                image={card.image}
                category={card.category} 
                type={card.type} 
                badge={card.badge}
                readTime={card.readTime || ''}
                featured={card.featured}               
                author={card.author}
                date={new Date(card.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
            />
              ))}
            </div>
          </div>
        </section>
    );
}


