export const runtime = 'nodejs'; 

import Cards from "./_components/Cards";
import Hero from "./_components/Hero";
import React from "react";
import type { HeroArticleData } from "@/types/article-data";
import type ArticleItem from "@/types/article-item";
import Footer from "./_components/Footer";

interface HeroApiData {
    featuredArticle: HeroArticleData | null;
    asideArticles: HeroArticleData[];
    latestNews: HeroArticleData[];
}

interface HomePageProps {
  searchParams: {
    q?: string; 
  };
}


export default async function HomePage({ searchParams }: HomePageProps) {
    const { q } = await searchParams;
    const searchTerm = q;

    const mainApiUrl = `http://localhost:3000/api/main?q=${encodeURIComponent(searchTerm || '')}`;
   
    const [resHero, resMain] = await Promise.all([
        fetch('http://localhost:3000/api/articles', {
           cache: 'no-store' 
        }),
        fetch(mainApiUrl, {
           cache: 'no-store' 
        })
    ]);

    if (!resHero.ok || !resMain.ok) {
        console.error("Erreur de statut HTTP lors du fetching des données.");
       
        return <div className="text-red-500 p-8">Erreur de chargement des données.</div>;
    }
    
    const heroData: HeroApiData= await resHero.json();
    const serializedArticles: ArticleItem[] = await resMain.json();

    return (
      <>
        <Hero 
                featuredArticle={heroData.featuredArticle} 
                asideArticles={heroData.asideArticles} 
                latestNews={heroData.latestNews}
            />
            <Cards categoryTitle="Gaming"></Cards>
            <Cards categoryTitle="Tech"></Cards>
            <Cards categoryTitle="Programmation"></Cards>
            
         <Footer/>
       
       </>
    );
}