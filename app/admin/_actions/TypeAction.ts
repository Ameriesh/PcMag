"use server"
import { PrismaClient } from "@/genereted/prisma";
import { getServerSession } from "@/lib/get-session";

import { redirect } from "next/navigation";
import { date } from "zod";


const prisma = new PrismaClient();


interface ActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>; 
  typed?: number; 
}

interface TypeData{
  name: string;
}


export async function createTypeAction(
    prevState: ActionState,
    formData: FormData
) : Promise<ActionState>{

    const session = await getServerSession();


    if(!session || session.user.role !== "ADMIN"){
        
        redirect('/auth/signin'); 
    }


    try{
     

     
     const data: TypeData = {
        name: formData.get('title') as string,
       
     }
     
    
     if(!data.name){
        return{
            success: false,
            message: "Veuillez remplir tous les champs obligatoires (Titre, Extrait, Image)."
        }
     }
     const newType = await prisma.contentType.create({
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
        message: "Type Ajoutee avec succes", 
       
        typed: newType.id
     }
    }catch(error){
        console.log("Erreur de server", error)
        return{
            success: false,
            message: 'Erreur lors de l/ajout.'
        }
    }
}