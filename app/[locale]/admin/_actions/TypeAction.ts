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
  typed?: number; 
  articleId?: number
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


    try {
     
     const data: TypeData = {
        name: formData.get('title') as string,
     }
     
    
     if(!data.name) {
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


export async function deleteTypeAction(typeId: number): Promise<ActionState> {
    const session = await getServerSession();

    if (!session || !session.user) {
        
        redirect('/auth/signin'); 
    }

    const userId = session.user.id;
    const isAdmin = session.user.role === "ADMIN";

    if (isNaN(typeId) || typeId <= 0) {
         return { success: false, message: "ID du type non valide." };
    }

    try {
        
        const typeToDelete = await prisma.contentType.findUnique({
            where: {
                 id: typeId 
            },
            
        });

        if (!typeToDelete) {
            return { success: false, message: "Type non trouvé." };
        }

       
        

       
        await prisma.contentType.delete({
            where: { id: typeId },
        });

        return {
            success: true,
            message: "Type supprimé avec succès.",
        };

    } catch (error) {
        console.error("Erreur de suppression de la type:", error);
        
       
        if (error instanceof PrismaClientKnownRequestError) {
             if (error.code === 'P2025') {
                
                 return { success: false, message: "Type non trouvé." };
             }
        }

        return {
            success: false,
            message: 'Erreur serveur lors de la suppression.',
        };
    }
};


export async function updateTypeAction(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    
 
    const typeIdValue = formData.get('typeId') as string;
    const typeId = parseInt(typeIdValue);

    if (isNaN(typeId) || typeId <= 0) {
        return { success: false, message: "ID de Type manquant ou non valide." };
    }

    
    const data = {
        name: formData.get('name') as string, 
    };

    
    if (!data.name) {
         return { success: false, message: "Le nom du type est requis." };
    }


    try {
        const updatedType = await prisma.contentType.update({
            where: { id: typeId },
            data: {
                name: data.name,
            }
        });

        return {
            success: true,
            message: `Type "${updatedType.name}" mis à jour avec succès.`,
            articleId: updatedType.id 
        };

    } catch (error) {
        console.error("Erreur de mise à jour du type:", error);
     
        return { success: false, message: 'Erreur serveur lors de la mise à jour.' };
    }
}