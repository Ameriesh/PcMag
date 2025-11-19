import { NextResponse } from 'next/server';
import { getServerSession} from '@/lib/get-session'

import { prisma } from '@/lib/prisma';



export async function GET(
  request: Request,
  { params }: { params: { articleId: string } }
) {

  const id = parseInt(params.articleId);

  if (isNaN(id) || id <= 0) {
    return NextResponse.json({ message: "ID d'article non valide." }, { status: 400 });
  }



  try {
    const article = await prisma.article.findUnique({
      where: {
         id: id 
        },
      select: {
          id: true,
          title: true,
          excerpt: true,
          image: true,
          categoryId: true, 
          typeId: true, 
          badge: true,
          readTime: true,
          featured: true,
          content: true,
          videoUrl: true,

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
      
    });

    if (!article) {
    
      return NextResponse.json({ message: "Article non trouvé." }, { status: 404 });
    }

   
    return NextResponse.json(article); 

  } catch (error) {
    console.error("Erreur lors de la récupération de l'article:", error);
    return NextResponse.json({ message: "Erreur serveur interne." }, { status: 500 });
  }
}