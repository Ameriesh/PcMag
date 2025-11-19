"use server"
import { PrismaClient } from "@/genereted/prisma";
import { getServerSession } from "@/lib/get-session";

import { redirect } from "next/navigation";
import { PrismaClientKnownRequestError } from "@/genereted/prisma/runtime/library";


const prisma = new PrismaClient();


interface ActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>; 
  categoryId?: number; 
}

interface CategoryData{
  title: string;
  description: string;
}


export async function createCategoryAction(
    prevState: ActionState,
    formData: FormData
) : Promise<ActionState>{
    const session = await getServerSession();


    if(!session || session.user.role !== "ADMIN"){
        
        redirect('/auth/signin'); 
    }


    try{
     

     
     const data: CategoryData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string
     }
     
    
     if(!data.title || !data.description){
        return{
            success: false,
            message: "Veuillez remplir tous les champs obligatoires (Titre, Extrait, Image)."
        }
     }
     const newCategory = await prisma.category.create({
        data: {
            ...data
        }
     })
     
     return{
        success: true,
        message: "Categorie Ajoutee avec succes", 
       
        categoryId: newCategory.id
     }
    }catch(error){
        console.log("Erreur de server", error)
        return{
            success: false,
            message: 'Erreur lors de l/ajout.'
        }
    }
}

export async function deleteCategoryAction(categoryId: number): Promise<ActionState> {
    const session = await getServerSession();

    if (!session || !session.user) {
        
        redirect('/auth/signin'); 
    }

    const userId = session.user.id;
    const isAdmin = session.user.role === "ADMIN";

    if (isNaN(categoryId) || categoryId <= 0) {
         return { success: false, message: "ID de la categorie non valide." };
    }

    try {
        
        const CategorieToDelete = await prisma.category.findUnique({
            where: {
                 id: categoryId 
            },
            
        });

        if (!CategorieToDelete) {
            return { success: false, message: "Categorie non trouvée." };
        }

       
        

       
        await prisma.category.delete({
            where: { id: categoryId },
        });

        return {
            success: true,
            message: "Categorie supprimé avec succès.",
        };

    } catch (error) {
        console.error("Erreur de suppression de la categorie:", error);
        
       
        if (error instanceof PrismaClientKnownRequestError) {
             if (error.code === 'P2025') {
                
                 return { success: false, message: "Categorie non trouvé." };
             }
        }

        return {
            success: false,
            message: 'Erreur serveur lors de la suppression.',
        };
    }
};