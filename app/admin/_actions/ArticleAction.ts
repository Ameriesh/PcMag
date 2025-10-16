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
  categoryId: number;
  badge: string;
  typeId: number
  readTime: string;
  featured: boolean;
  content: string; 
  videoUrl: string;
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
     const categoryIdValue = formData.get('category') as string
     const typeValue = formData.get('type') as string

     if(!categoryIdValue){
        return {
            success: false,
            message: "Catégorie non sélectionnée"
        }
     }
     if(!typeValue){
        return {
            success: false,
            message: "Type non sélectionné"
        }
     }
     
     const data: ArticleData = {
        title: formData.get('title') as string,
        excerpt: formData.get('excerpt') as string,
        image: formData.get('image') as string,
        categoryId: parseInt(categoryIdValue),
        typeId: parseInt(typeValue),
        badge: formData.get('badge') as string || "News",
        readTime: readTimeValue || "5 min", 
        featured: formData.get('featured') === 'on',
        content: formData.get('content') as string || "", 
        videoUrl: formData.get('videoUrl') as string || ""
     }

     if (isNaN(data.categoryId) || data.categoryId <=0){
        return{
            success: false,
            message: "Id non valide"
        }
     }

      if (isNaN(data.typeId) || data.typeId <=0){
        return{
            success: false,
            message: "Id non valide"
        }
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