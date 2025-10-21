// Fichier : app/api/admin/articles/[authorId]/route.ts

import { PrismaClient } from "@/genereted/prisma";
import { NextResponse } from "next/server";
import type { Article } from "@/genereted/prisma";
// Importez HeroArticleData ou une interface ArticleItem sérialisée si elle est accessible
// Sinon, nous la définissons ici pour la clarté.

const prisma = new PrismaClient();

// Interface utilisée pour le mapping (doit correspondre à la structure ArticleItem)
interface ArticleWithRelations extends Omit<Article, 'categoryId' | 'typeId'> {
    CategoryRef: { title: string };
    typeRef: { name: string };
    author: { name: string };
}
interface SerializedArticle {
    id: number;
    title: string;
    date: string;
    image: string;
    category: string;
    type: string;
    author: string;
    // Ajoutez tous les champs nécessaires ici...
}

export async function GET(
    request: Request,
    { params }: { params: { authorId: string } }
) {
    const authorId = params.authorId;

    try {
        const articles = await prisma.article.findMany({
            where: {
                authorId: authorId, // <-- FILTRE CRITIQUE : Seuls les articles de cet auteur
            },
            orderBy: { createdAt: 'desc' },
            include: {
                author: { select: { name: true } },
                CategoryRef: { select: { title: true } },
                typeRef: { select: { name: true } },
            },
        }) as ArticleWithRelations[];

        const serializedArticles: SerializedArticle[] = articles.map(article => ({
            id: article.id,
            title: article.title,
            date: new Date(article.createdAt).toLocaleDateString('fr-FR'), 
            image: article.image,
            category: article.CategoryRef.title,
            type: article.typeRef.name,
            author: article.author.name,
        }));

        return NextResponse.json(serializedArticles);

    } catch (error) {
        console.error(`Erreur lors du fetch des articles pour l'auteur ${authorId}:`, error);
        return NextResponse.json(
            { message: 'Erreur interne lors de la récupération des articles.' },
            { status: 500 }
        );
    }
}