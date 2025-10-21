"use server"
import { PrismaClient } from "@/genereted/prisma";
import { getServerSession } from "@/lib/get-session";
import { PrismaClientKnownRequestError } from "@/genereted/prisma/runtime/library";

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


export async function deleteArticleAction(articleId: number): Promise<ActionState> {
    const session = await getServerSession();

    if (!session || !session.user) {
        
        redirect('/auth/signin'); 
    }

    const userId = session.user.id;
    const isAdmin = session.user.role === "ADMIN";

    if (isNaN(articleId) || articleId <= 0) {
         return { success: false, message: "ID de l'article non valide." };
    }

    try {
        
        const articleToDelete = await prisma.article.findUnique({
            where: { id: articleId },
            select: { authorId: true },
        });

        if (!articleToDelete) {
            return { success: false, message: "Article non trouvé." };
        }

       
        if (!isAdmin && articleToDelete.authorId !== userId) {
            return { success: false, message: "Vous n'avez pas l'autorisation de supprimer cet article." };
        }

       
        await prisma.article.delete({
            where: { id: articleId },
        });

        return {
            success: true,
            message: "Article supprimé avec succès.",
        };

    } catch (error) {
        console.error("Erreur de suppression de l'article:", error);
        
       
        if (error instanceof PrismaClientKnownRequestError) {
             if (error.code === 'P2025') {
                
                 return { success: false, message: "Article non trouvé." };
             }
        }

        return {
            success: false,
            message: 'Erreur serveur lors de la suppression.',
        };
    }
};

export async function updateArticleAction(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const session = await getServerSession();

    if (!session || session.user.role !== "ADMIN") {
        redirect('/auth/signin');
    }

    const articleIdValue = formData.get('articleId') as string;
    const articleId = parseInt(articleIdValue);

    if (isNaN(articleId) || articleId <= 0) {
        return { success: false, message: "ID d'article manquant ou non valide pour la mise à jour." };
    }

    try {
        const readTimeValue = formData.get('readTime') as string;
        const categoryIdValue = formData.get('category') as string;
        const typeValue = formData.get('type') as string;

       
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
        };
        
        // Vérifications minimales (vous devriez utiliser Zod pour des vérifications robustes)
        if (!data.title || isNaN(data.categoryId) || isNaN(data.typeId)) {
             return { success: false, message: "Données de formulaire incomplètes ou invalides." };
        }

        // Exécuter la mise à jour
        const updatedArticle = await prisma.article.update({
            where: { id: articleId },
            data: {
                ...data,
                // L'auteurId ne change pas lors de la mise à jour (Prisma le gère)
            }
        });

        return {
            success: true,
            message: `Article "${updatedArticle.title}" mis à jour avec succès.`,
            articleId: updatedArticle.id
        };

    } catch (error) {
        console.error("Erreur de mise à jour de l'article:", error);
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            return { success: false, message: "Article non trouvé pour la mise à jour." };
        }
        return { success: false, message: 'Erreur serveur lors de la mise à jour.' };
    }
}