"use server"
import { PrismaClient } from "@/genereted/prisma";
import { getServerSession } from "@/lib/get-session";

import { redirect } from "next/navigation";


const prisma = new PrismaClient();


interface ActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>; 
  articleId?: number; 
}

interface ArticleData{
  title: string;
  excerpt: string;
  image: string;
  category: string;
  badge: string;
  type: 'news' | 'test' | 'video';
  readTime: string;
  featured: boolean;
}


export async function createArticleAction(
    prevState: ActionState,
    formData: FormData
) : Promise<ActionState>{
    const session = await getServerSession();


    if(!session || session.user.role !== "ADMIN"){
        
        redirect('/auth/signin'); 
    }

    const authorId = session.user.id;

    try{
     
     const readTimeValue = formData.get('readTime') as string;

     
     const data: ArticleData = {
        title: formData.get('title') as string,
        excerpt: formData.get('excerpt') as string,
        image: formData.get('image') as string,
        category: formData.get('category') as string,
        badge: formData.get('badge') as string || "News",
        type: formData.get('type') as ArticleData['type'],
        readTime: readTimeValue || "5 min", // Application de la valeur par défaut
        featured: formData.get('featured') === 'on'
     }
     
    
     if(!data.title || !data.excerpt || !data.image){
        return{
            success: false,
            message: "Veuillez remplir tous les champs obligatoires (Titre, Extrait, Image)."
        }
     }
     
     const newArticle = await prisma.article.create({
        data: {
            ...data,
            authorId: authorId,
            
            type: data.type as string
        }
     })
     
     return{
        success: true,
        message: "Article publié avec succès", 
       
        articleId: newArticle.id
     }
    }catch(error){
        console.log("Erreur de server", error)
        return{
            success: false,
            message: 'Erreur lors de la publication.'
        }
    }
}