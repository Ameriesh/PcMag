
import Cards from "./_components/Cards";
import Hero from "./_components/Hero";
import { PrismaClient } from "@/genereted/prisma";

export const runtime = 'nodejs'; 

const prisma = new PrismaClient();

interface HomePageProps {
  searchParams: {
    q?: string; 
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const searchTerm = searchParams.q;
  
 
  const articles = await prisma.article.findMany({
    where: searchTerm 
      ? {
          
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' as const } },
            { excerpt: { contains: searchTerm, mode: 'insensitive' as const } },
          ],
        }
      : {}, 
    orderBy: { createdAt: 'desc' },
   
    include: {
        author: {
            select: { name: true, email: true }
        }
    }
  });

 
  const serializedArticles = articles.map(article => ({
      ...article,
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
  }));

  return (
    <div>
      <Hero />
      
      <Cards initialArticles={serializedArticles} searchTerm={searchTerm} /> 
    </div>
  );
}
