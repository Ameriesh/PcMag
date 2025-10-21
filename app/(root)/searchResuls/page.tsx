import React from 'react'
import Cards from '../_components/Cards'
import type { HeroArticleData } from '@/types/article-data'
import type ArticleItem from '@/types/article-item'

interface HomePageProps{
    searchParams: {
        q?: string
    }
}

async function page({searchParams} : HomePageProps) {
    const {q} = await searchParams;

    const searchTerm = q

    const mainApiUrl = `http://localhost:3000/api/main?q=${encodeURIComponent(searchTerm || '')}`;
    const res = await fetch(mainApiUrl, { cache: 'no-store' });
    
    let serializedArticles: ArticleItem[] = [];

    if (!res.ok) {
        console.error(`Erreur HTTP ${res.status} lors de la recherche.`);
        serializedArticles = []; 
    } else {
       
        try {
            
            serializedArticles = await res.json();
        } catch (error) {
            console.error("Erreur de parsing JSON pour les articles principaux:", error);
            serializedArticles = [];
        }
    }
    
  return (
    <>
        <Cards 
            initialArticles={serializedArticles} 
            searchTerm={searchTerm} 
        />
    </>
  )
}

export default page