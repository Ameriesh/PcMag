// Fichier : app/api/articles/main/route.ts

import { PrismaClient } from "@/genereted/prisma";
import { NextResponse } from "next/server";
import type { Article } from "@/genereted/prisma";
import type ArticleItem from "@/types/article-item";
const prisma = new PrismaClient();


interface ArticleWithRelations extends Omit<Article, 'categoryId' | 'typeId'> {
    CategoryRef: { 
        title: string 
    };
    typeRef: { 
        name: string 
    };
    author: {
         name: string 
    };
}


const mapToClientForCards = (article: ArticleWithRelations): ArticleItem => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    image: article.image,
    badge: article.badge,
    readTime: article.readTime, 
    featured: article.featured,
    category: article.CategoryRef.title,
    type: article.typeRef.name,
    author: article.author.name, 
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
});


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('q');
    
    try {
        const articles = await prisma.article.findMany({
            where: searchTerm ? { 
                OR: [
                    { title: { contains: searchTerm, mode: 'insensitive' as const } },
                    { excerpt: { contains: searchTerm, mode: 'insensitive' as const } }
                ]
            } : {},
            orderBy: { createdAt: 'desc' },
            include: { 
                author: { select: { name: true, } }, 
                CategoryRef: { select: { title: true } }, 
                typeRef: { select: { name: true } } 
            }
        }) as ArticleWithRelations[];

        
        const serializedArticles = articles.map(mapToClientForCards);

        return NextResponse.json(serializedArticles);

    } catch (error) {
        console.error('Erreur lors de la récupération du flux principal:', error);
        return NextResponse.json(
            { message: 'Erreur interne lors de la récupération des articles.' },
            { status: 500 }
        );
    }
}