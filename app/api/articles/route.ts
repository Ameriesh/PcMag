import { PrismaClient } from "@/genereted/prisma";
import { NextResponse } from "next/server";
import type { Article } from "@/genereted/prisma"; 
import type { HeroArticleData } from "@/types/article-data";

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


const mapToClient = (article: ArticleWithRelations): HeroArticleData => ({
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    image: article.image,
    badge: article.badge,
    readTime: article.readTime || '',
    featured: article.featured,
    category: article.CategoryRef.title,
    type: article.typeRef.name,
    author: article.author.name,
    date: article.createdAt.toISOString(),
});


export async function GET() {
    try {
        const defaultSelect = {
            select: {
                id: true, 
                title: true, 
                excerpt: true, 
                image: true, 
                badge: true,
                readTime: true, 
                featured: true, 
                createdAt: true, 
                updatedAt: true,
                author: { 
                  select: { 
                    name: true,  
                  } 
                },
                CategoryRef: {
                   select: {
                     title: 
                     true 
                    } 
                  },
                typeRef: {
                   select: {
                     name: true 
                    } 
                  },
            }
        };

        const [featured, latest] = await Promise.all([
            prisma.article.findFirst({
                where: { featured: true },
                orderBy: { createdAt: 'desc' },
                ...defaultSelect,
            }),
            prisma.article.findMany({
                orderBy: { createdAt: 'desc' },
                take: 7,
                ...defaultSelect,
            })
        ]);

        const featuredArticle = featured ? mapToClient(featured as ArticleWithRelations) : null;
        
        const latestArticles = latest as ArticleWithRelations[];

        const filteredLatest = latestArticles.filter(a => a.id !== featuredArticle?.id);

        const heroData = {
            featuredArticle: featuredArticle,
            asideArticles: filteredLatest.slice(0, 2).map(mapToClient),
            latestNews: filteredLatest.slice(2, 7).map(mapToClient),
        };

        return NextResponse.json(heroData);

    } catch (error) {
        console.error('Erreur lors de la récupération des données Hero:', error);
        return NextResponse.json(
            { message: 'Erreur interne lors de la récupération des données du Hero.' },
            { status: 500 }
        );
    }
}