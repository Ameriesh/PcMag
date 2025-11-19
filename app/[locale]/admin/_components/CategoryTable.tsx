"use client";

import React, { useState, useMemo } from 'react';
import {
  Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
    useReactTable, getCoreRowModel, flexRender, createColumnHelper, getSortedRowModel, RowData,
} from "@tanstack/react-table"
import { Trash, Loader2, SquarePen, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';
import { deleteCategoryAction } from '../_actions/CategoryAction';

import { useCategory } from '@/hooks/use-category-data';
import { useRouter } from 'next/navigation';


interface CategoryData{
  id: number;
  title: string;
  date: string;
  description: string;
}



interface ActionCellProps {
    categoryId: number;
    onEdit: (id: number) => void;
    onDeleteTrigger: (id: number) => void;
}

function ActionCell({ categoryId, onEdit, onDeleteTrigger }: ActionCellProps) {
    return (
        <div className="text-right flex  gap-2">
            <Button size="icon" variant="ghost" onClick={() => onEdit(categoryId)}>
                <SquarePen className="w-4 h-4 text-primary-500" />
            </Button>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size="icon" onClick={() => onDeleteTrigger(categoryId)}>
                        <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className='bg-secondary-600'>
                    <p className='text-white font-bold'>Supprimer</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}


export default function CategoriesTable() {
    
    
    const { data: categories, isLoading, isError, refetch } = useCategory();

    const [CategoryToDelete, setCategoryToDelete] = useState<number | null>(null)

   const router = useRouter();

    const handleDelete = async () => {
        if (!CategoryToDelete) return;

        const toastId = toast.loading("Suppression en cours...");
        const idToDelete = CategoryToDelete; 

        try {
            const result = await deleteCategoryAction(idToDelete);

            if (result.success) {
                toast.success(result.message, { id: toastId });
                refetch(); 
            } else {
                toast.error(result.message, { id: toastId });
            }
        } catch (error) {
            toast.error("Échec de la suppression: Erreur réseau ou serveur.", { id: toastId });
            console.error("Erreur action suppression:", error);
        } finally {
            setCategoryToDelete(null);
        }
    };
    
   
    const handleEditAction = (id: number) => {
        console.log(`Édition de l'article ID: ${id}`);
        
    };

   
    const columHelper = createColumnHelper<CategoryData>();

   
    const columns = useMemo(() => [
         columHelper.display({
            header: ' ',
            cell: props =>{
                return(
                   < GripVertical className='size-3.5 mr-[-20px] text-secondary-400'/>
                )
            }

        }),

        columHelper.accessor('title', {
             header: 'Titre' 
        }),

        columHelper.display({
            id: 'actions',
            header: 'Action',
            cell: props => {

                const categoryId = props.row.original.id;
                
                
                return (
                    <ActionCell
                        categoryId={categoryId}
                        onEdit={handleEditAction}
                        onDeleteTrigger={setCategoryToDelete}
                    />
                );
            },

           
           
        })
    ], [handleEditAction]); 


    const table = useReactTable({
        data: categories || [], 
        columns,
        getCoreRowModel: getCoreRowModel(),
       
        getSortedRowModel: getSortedRowModel()
    });

   
    if (isLoading) {
        return <Loader2 className="w-8 h-8 animate-spin mx-auto mt-10 text-primary-500" />;
    }

    if (isError || !categories) {
        return <div className="text-red-600 text-center mt-10">Erreur : Échec du chargement des données.</div>;
    }
     const redirectCategory = () =>{
        router.push('/admin/addCategory')
    }
    
    return (
        <>
            <Button className='btn-secondary mb-6' onClick={redirectCategory}>Ajouter un Article</Button>
        <AlertDialog
            open={CategoryToDelete !== null}
            onOpenChange={(open) => {
                if (!open) setCategoryToDelete(null);
            }}
        >
            
            <Table className='ml-auto mr-auto max-w-2xl border border-secondary-300'>
                <TableCaption>Liste de vos {categories.length} Categories publiés.</TableCaption>
                
                <TableHeader >
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id} >
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id} className='font-bold border-b border-secondary-300 bg-secondary-100'>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {categories.length === 0 ? (
                        <TableRow><TableCell colSpan={table.getAllColumns().length} className="text-center py-8">Vous n'avez pas encore publié de categorie.</TableCell></TableRow>
                    ) : (
                        table.getRowModel().rows.map(row => (
                            <TableRow key={row.id} className="hover:bg-secondary-100">
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id} className='border-b border-secondary-300'>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <AlertDialogContent className='bg-white-100'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-primary-700'>Êtes-vous absolument certain de supprimer ?</AlertDialogTitle>
                    <AlertDialogDescription className='text-secondary-700'>
                        Cette action est définitive. La categorie sera supprimé de la base de données.
                        <br />
                        **Categorie :** {categories.find(c => c.id === CategoryToDelete)?.title}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline">Annuler</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button className='btn-danger' onClick={handleDelete}>
                            Supprimer
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>

        </AlertDialog>
        </>
    );
}