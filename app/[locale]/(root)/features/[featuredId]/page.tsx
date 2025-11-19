
import React from 'react';
import ArticleDetailsClient from '../../_components/ArticleById';
import type { HeroArticleData } from "@/types/article-data";
import { getI18n } from '@/locales/server';



interface HeroApiData {
    featuredArticle: HeroArticleData | null;
    asideArticles: HeroArticleData[];
    latestNews: HeroArticleData[]; 
}


async function Page({ params }: { params: { id: string } }) {
     const t = await getI18n()
    
    const articleId = parseInt(params.id);

   
    const resHero = await fetch('http://localhost:3000/api/articles', {
       cache: 'no-store' 
    });

    if (!resHero.ok) {
        console.error("Erreur de statut HTTP lors du fetching des données:", resHero.status);
        return <div className="text-red-500 p-8">Erreur de chargement des données.</div>;
    }
    
    const heroData: HeroApiData = await resHero.json();  

    
    const latestNews = heroData?.latestNews || [];

   
    return (
       
        <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
            
           
            <div className="lg:col-span-3">
               
            </div>

         
            <div className="lg:col-span-1 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">{t('nouvelles')}</h3>
                <div className="space-y-4">
                 
                  {latestNews.length === 0 ? (
                    <p className="text-gray-500 text-sm">Aucune nouvelle récente.</p>
                  ) : (
                    latestNews.map((news) => (
                      <div 
                        key={news.id} 
                        className="p-3 hover:bg-white transition-colors cursor-pointer rounded-md border-b border-gray-100 last:border-b-0"
                      >
                       
                        <p className="text-xs text-gray-500 mb-1 font-medium">{news.readTime || "5 min"}</p> 
                        <h4 className="text-sm font-semibold text-gray-900 leading-snug">{news.title}</h4>
                      </div>
                    ))
                  )}
                </div>
            </div>

        </div>
    );
}

export default Page;

