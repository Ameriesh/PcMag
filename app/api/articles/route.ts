// Fichier : app/api/articles/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/get-session'; // Import de votre utilitaire de session
import { PrismaClient } from '@/genereted/prisma';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  // 1. Récupération de la session
  const session = await getServerSession();

  // 🚨 SECURITE : Vérification si l'utilisateur est connecté.
  // L'ID est extrait de la session, qu'il soit USER ou ADMIN.
  if (!session || !session.user || !session.user.id) {
    return new NextResponse('Accès refusé. Vous devez être connecté pour créer un article.', { status: 403 });
  }

  // 🚨 ID de l'auteur est l'ID de l'utilisateur connecté
  const authorId = session.user.id;
  
  // NOTE : Si vous vouliez limiter la création aux seuls admins,
  // vous ajouteriez ici : if (session.user.role !== 'ADMIN') { return NextResponse.redirect(...) }

  try {
    // 2. Récupération des données du corps de la requête
    const body = await request.json();
    const { title, excerpt, image, category, badge, type, readTime, featured } = body;

    // Validation basique
    if (!title || !excerpt || !image || !category || !type) {
        return new NextResponse('Données d\'article manquantes.', { status: 400 });
    }

    // 3. Création de l'article dans Prisma
    const newArticle = await prisma.article.create({
      data: {
        title,
        excerpt,
        image,
        category,
        badge: badge || 'News',
        type,
        readTime: readTime || '5 min',
        featured: featured || false,
        
        authorId: authorId, 
      },
    });

    return NextResponse.json(newArticle, { status: 201 });

  } catch (error) {
    console.error('Erreur de création d\'article:', error);
    return new NextResponse('Erreur interne du serveur.', { status: 500 });
  }
}
export async function GET() {
  try {
    
    const articles = await prisma.article.findMany({
      orderBy: {
        createdAt: 'desc', 
      },
      
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(articles);

  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return NextResponse.json(
      { message: 'Erreur interne lors de la récupération des données.' },
      { status: 500 }
    );
  }
}