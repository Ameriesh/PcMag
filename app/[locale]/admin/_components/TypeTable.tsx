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
import { deleteTypeAction } from '../_actions/TypeAction';

import { useType } from '@/hooks/use-type-data';

interface TypeData{
  id: number;
  name: string;
}



interface ActionCellProps {
    typeId: number;
    onEdit: (id: number) => void;
    onDeleteTrigger: (id: number) => void;
}

function ActionCell({ typeId, onEdit, onDeleteTrigger }: ActionCellProps) {
    return (
        <div className="text-right flex  gap-2">
            <Button size="icon" variant="ghost" onClick={() => onEdit(typeId)}>
                <SquarePen className="w-4 h-4 text-primary-500" />
            </Button>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size="icon" onClick={() => onDeleteTrigger(typeId)}>
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


export default function TypeTable() {
    
    
    const { data: types, isLoading, isError, refetch } = useType();

    const [TypeToDelete, setTypeToDelete] = useState<number | null>(null)

   
    const handleDelete = async () => {
        if (!TypeToDelete) return;

        const toastId = toast.loading("Suppression en cours...");
        const idToDelete = TypeToDelete; 

        try {
            const result = await deleteTypeAction(idToDelete);

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
            setTypeToDelete(null);
        }
    };
    
   
    const handleEditAction = (id: number) => {
        console.log(`Édition de l'article ID: ${id}`);
        
    };

   
    const columHelper = createColumnHelper<TypeData>();

   
    const columns = useMemo(() => [

        columHelper.display({
            id:'menu',
            header: ' ',
            cell: props =>{
                return(
                    < GripVertical className='size-3.5 mr-[-20px] text-secondary-400'/>
                )
            }
        }),

        columHelper.accessor('name', {
             header: 'Titre' 
        }),

        columHelper.display({
            id: 'actions',
            header: 'Action',
            cell: props => {

                const typeId = props.row.original.id;
                
                
                return (
                    <div className=''>
                    <ActionCell
                    
                        typeId={typeId}
                        onEdit={handleEditAction}
                        onDeleteTrigger={setTypeToDelete}
                        
                    />
                    </div>
                );
            },


            

           
           
        })
    ], [handleEditAction]); 


    const table = useReactTable({
        data: types || [], 
        columns,
        getCoreRowModel: getCoreRowModel(),
       
        getSortedRowModel: getSortedRowModel()
    });

   
    if (isLoading) {
        return <Loader2 className="w-8 h-8 animate-spin mx-auto mt-10 text-primary-500" />;
    }

    if (isError || !types) {
        return <div className="text-red-600 text-center mt-10">Erreur : Échec du chargement des données.</div>;
    }
    
    return (
        <AlertDialog
            open={TypeToDelete !== null}
            onOpenChange={(open) => {
                if (!open) setTypeToDelete(null);
            }}
        >
            <Table className='ml-auto mr-auto max-w-4xl border rounded-lg border-secondary-200'>
                <TableCaption>Liste de vos {types.length} Types publiés.</TableCaption>
                
                <TableHeader>
                    {/* <TableRow>
                        <TableHead className=' text-center text-primary-400'>Liste des Types</TableHead>
                    </TableRow> */}
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id} >
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id} className='font-bold bg-secondary-100 border-b-1 border-secondary-200 mr-[-20px]'>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {types.length === 0 ? (
                        <TableRow><TableCell colSpan={table.getAllColumns().length} className="text-center py-8">Vous n'avez pas encore publié aucun type.</TableCell></TableRow>
                    ) : (
                        table.getRowModel().rows.map(row => (

                           <TableRow key={row.id} className="hover:bg-secondary-100">
                             {/* <GripVertical /> */}
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id} className='border-b-1 border-secondary-300 mr-[-20px]'>
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
                        Cette action est définitive. Le Type sera supprimé de la base de données.
                        <br />
                        **Type :** {types.find(c => c.id === TypeToDelete)?.name}
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
    );
}