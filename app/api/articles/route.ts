import { NextResponse } from 'next/server';
import { PrismaClient } from '@/genereted/prisma';

const prisma = new PrismaClient();

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