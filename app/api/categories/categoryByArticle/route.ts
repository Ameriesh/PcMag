import { PrismaClient } from "@/genereted/prisma";
import { NextResponse } from "next/server";
import type { Article } from "@/genereted/prisma";

const prisma = new PrismaClient();

interface ArticleWithRelations extends Omit<Article, 'categoryId' | 'typeId'> {
    CategoryRef: { title: string };
    typeRef: { name: string };
    author: { name: string };
}


const mapToClient = (article: ArticleWithRelations) => ({
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
    const categoryTitle = searchParams.get('title');
    const limit = parseInt(searchParams.get('limit') || '3'); 

    if (!categoryTitle) {
        return NextResponse.json(
            { message: 'Paramètre "title" manquant.' },
            { status: 400 }
        );
    }

    try {
        const articles = await prisma.article.findMany({
            where: {
               
                CategoryRef: {
                    title: categoryTitle,
                },
            },
            orderBy: {
                 createdAt: 'desc' 
                },
            take: limit, 
            include: {
                author: {
                     select: {
                         name: true
                        } 
                    },
                CategoryRef: {
                     select: { title: true } 
                    },
                typeRef: { 
                    select: { name: true } 
                },
            },
        }) as ArticleWithRelations[];

        const serializedArticles = articles.map(mapToClient);

        return NextResponse.json(serializedArticles);

    } catch (error) {
        console.error(`Erreur lors du fetch par catégorie (${categoryTitle}):`, error);
        return NextResponse.json(
            { message: 'Erreur interne lors de la récupération des articles.' },
            { status: 500 }
        );
    }
}