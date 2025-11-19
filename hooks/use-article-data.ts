// Fichier : hooks/use-article-data.ts

'use client'
import { useQuery } from '@tanstack/react-query';


interface FullArticleData {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    categoryId: number;
    typeId: number;
    badge: string;
    readTime: string;
    featured: boolean;
    content: string; 
    CategoryRef?: { title: string };
    typeRef?: { name: string };
}


interface ArticleData {
    id: number;
    title: string;
    date: string;
    image: string;
    category: string;
    type: string;
    author: string;
}

const fetchArticles = async (authorId: string): Promise<ArticleData[]> => {
    if (!authorId) {
        throw new Error("ID de l'auteur manquant.");
    }
    const apiUrl = `/api/user/articles/${authorId}`; 
    
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) {
        
        throw new Error(`Échec du chargement des articles. Erreur HTTP: ${res.status}`);
    }
    return res.json();
};

export const useArticlesData = (authorId: string) => {
    return useQuery({
        
        queryKey: ['articles', authorId], 
        queryFn: () => fetchArticles(authorId),
    });
};


const fetchSingleArticle = async (articleId: number): Promise<FullArticleData> => {
    const res = await fetch(`/api/articles/${articleId}`); 
    if (!res.ok) {
        throw new Error("Article non trouvé.");
    }
    return res.json();
};

export const useSingleArticle = (articleId: number | null) => {
    return useQuery({
        queryKey: ['article', articleId], 
        queryFn: () => fetchSingleArticle(articleId!),
        enabled: articleId !== null && articleId > 0, 
    });
};