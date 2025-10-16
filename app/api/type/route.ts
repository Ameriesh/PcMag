import { NextResponse } from 'next/server';
import { PrismaClient } from '@/genereted/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    
    const types = await prisma.contentType.findMany({
      orderBy: {
        createdAt: 'desc', 
      },

      select: {
        id: true,
        name: true
      }
      
    });

    return NextResponse.json(types);

  } catch (error) {
    console.error('Erreur lors de la récupération des types', error);
    return NextResponse.json(
      { message: 'Erreur interne lors de la récupération des données.' },
      { status: 500 }
    );
  }
}

