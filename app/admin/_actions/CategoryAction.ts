"use server"
import { PrismaClient } from "@/genereted/prisma";
import { getServerSession } from "@/lib/get-session";

import { redirect } from "next/navigation";


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

    //  const newArticle = await prisma.article.create({
    //     data: {
    //         ...data,
    //         authorId: authorId,
            
    //         type: data.type as string
    //     }
    //  })
     
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