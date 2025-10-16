import { NextResponse } from 'next/server';
import { PrismaClient } from '@/genereted/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc', 
      },

      select: {
        id: true,
        title: true
      }
      
    });

    return NextResponse.json(categories);

  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return NextResponse.json(
      { message: 'Erreur interne lors de la récupération des données.' },
      { status: 500 }
    );
  }
}

