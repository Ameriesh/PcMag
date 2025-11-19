"use client";

import React from 'react';
import { useSingleArticle } from '@/hooks/use-article-data';
import { Loader2, Clock, Tag } from 'lucide-react'; 


interface ArticleDetailsClientProps {
    articleId: number;
}



export default function ArticleDetailsClient({ articleId }: ArticleDetailsClientProps) {
   
    const { data: article, isLoading, isError } = useSingleArticle(articleId);

    if (isLoading) return <Loader2 className="w-8 h-8 animate-spin mx-auto mt-10 text-primary-500" />;
    if (isError || !article) return <div className="text-red-600 text-center mt-10 p-4">Erreur de chargement ou article introuvable.</div>;

    
    const { title, excerpt, image, readTime, CategoryRef, typeRef } = article; 
    
    const categoryTitle = CategoryRef?.title;
    const typeName = typeRef?.name;
    return (
      
        <div className="article-container max-w-3xl mx-auto">
            
            
            <header className="mb-8">
                
               
                <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1 text-primary-600">
                        <Tag className="w-4 h-4" />
                        {categoryTitle} 
                    </span>
                    <span>|</span>
                    <span className="text-gray-600">{typeName}</span>
                </div>

               
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-primary-500">
                    {title}
                </h1>
                
               
                <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{readTime || "5 min de lecture"}</span>
                </div>
            </header>

            
            <figure className="mb-10 rounded-xl overflow-hidden shadow-lg">
               
                <img 
                    src={image} 
                    alt={title}
                  
                    className="w-full h-auto object-cover max-h-[500px]" 
                />
            </figure>

           
            <main 
               
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            >
               
                <div>{excerpt}</div>
            </main>
            
        </div>
    );
}