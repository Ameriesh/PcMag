import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { typeId: string } }
) {

  const id = parseInt(params.typeId);

  if (isNaN(id) || id <= 0) {
    return NextResponse.json({ message: "ID de Type non valide." }, { status: 400 });
  }


  try {
    const type = await prisma.contentType.findUnique({
      where: { id: id },
     
      select: {
          id: true,
          name: true,
      }
    });

    if (!type) {
   
      return NextResponse.json({ message: "Type non trouvé." }, { status: 404 });
    }

  
    return NextResponse.json(type); 

  } catch (error) {
    console.error("Erreur lors de la récupération du type:", error);
    return NextResponse.json({ message: "Erreur serveur interne." }, { status: 500 });
  }
}