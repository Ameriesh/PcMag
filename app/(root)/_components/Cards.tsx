// Fichier : Cards.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Card from "./Card";

// Interface adaptée pour la structure venant de l'API (inclut l'objet 'author')
interface ArticleItem {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  badge: string;
  readTime: string;
  featured?: boolean;
  type: "news" | "test" | "video";
  createdAt: string; // Date de création de Prisma
  author: {
    name: string | null;
    email: string;
  };
}

export default function Cards() {
  const [liveCards, setLiveCards] = useState<ArticleItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filters: string[] = ["Tous", "Gaming", "Tech", "Séries", "Cinéma", "Tests", "Science", "IA"];

  // Logique de Récupération des données avec fetch
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error(`Échec de la récupération des données : ${response.status}`);
        }
        const data: ArticleItem[] = await response.json();
        setLiveCards(data);
      } catch (err) {
        console.error("Erreur de Fetch:", err);
        setError("Impossible de charger les articles. Assurez-vous que l'API est fonctionnelle.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (isLoading) {
    return (
        <section className="geek-cards-section min-h-[50vh] flex justify-center items-center">
            <h2 className="text-xl text-primary-500 animate-pulse">Chargement des dernières publications...</h2>
        </section>
    );
  }

  if (error) {
    return (
        <section className="geek-cards-section min-h-[50vh] flex justify-center items-center">
            <h2 className="text-xl text-red-500 border border-red-500 p-4">ERREUR: {error}</h2>
        </section>
    );
  }
  
  const cardsToRender = liveCards; 

  return (
    <section className="geek-cards-section">
      <div className="geek-cards-container">
        
        <div className="geek-cards-header">
          <h2 className="geek-cards-title">Dernières Publications</h2>
          <div className="geek-cards-filters">
            {filters.map((filter: string, index: number) => (
              <div 
                key={filter}
                className={`geek-filter ${index === 0 ? 'active' : ''}`}
              >
                {filter}
              </div>
            ))}
          </div>
        </div>

        <div className="geek-cards-grid">
          {cardsToRender.map((card) => (
            <Card 
                key={card.id} 
                title={card.title}
                excerpt={card.excerpt}
                image={card.image}
                category={card.category}
                badge={card.badge}
                readTime={card.readTime}
                featured={card.featured}
                // 🚨 Formatage dynamique des données pour le composant Card
                type={card.type}
                author={card.author.name || card.author.email.split('@')[0]}
                date={new Date(card.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
            />
          ))}
        </div>

        <div className="geek-cards-footer">
          <button className="geek-load-more">
            Plus d'articles
          </button>
        </div>

      </div>
    </section>
  );
}