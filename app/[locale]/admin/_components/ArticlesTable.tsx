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
    useReactTable, getCoreRowModel, flexRender, createColumnHelper, getSortedRowModel,
} from "@tanstack/react-table"
import { Trash, Loader2, SquarePen, GripVertical, ClosedCaption, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

// 💡 Import de la traduction
import { useScopedI18n } from '@/locales/client';

import { useArticlesData } from '@/hooks/use-article-data'; 
import { useSingleArticle } from '@/hooks/use-article-data';
import { useCategory } from '@/hooks/use-category-data'; 
import { useType } from '@/hooks/use-type-data'; 
import { deleteArticleAction } from '../_actions/ArticleAction';
import ArticleCreationForm from './ArticleForm';


interface CategoryData{ id: number; title: string; }
interface TypeData{ id: number; name: string; }

interface ArticleData {
    id: number;
    title: string;
    date: string;
    image: string;
    category: string;
    type: string;
    author: string;
}

interface FullArticleData extends ArticleData {
    excerpt: string;
    categoryId: number;
    typeId: number;
    badge: string;
    readTime: string;
    featured: boolean;
    pitch: string;
    content: string; 
    videoUrl: string; 
}


interface ArticlesTableProps {
    authorId: string;
    isAdmin: boolean; 
}


interface ActionCellProps {
    articleId: number;
    onEdit: (id: number) => void;
    onDeleteTrigger: (id: number) => void;
}

function ActionCell({ articleId, onEdit, onDeleteTrigger }: ActionCellProps) {
    const t = useScopedI18n('table'); // Utiliser le hook dans le composant enfant
    return (
        <div className="flex justify-end gap-2">
            <Button size="icon" variant="ghost" onClick={() => onEdit(articleId)}>
                <SquarePen className="w-4 h-4 text-primary-500" />
            </Button>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button size="icon" variant="ghost" onClick={() => onDeleteTrigger(articleId)}>
                        <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent className='bg-secondary-600'>
                    {/* 💡 Traduction du tooltip */}
                    <p className='text-white font-bold'>{t('tooltip_delete')}</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}


export default function ArticlesTable({ authorId, isAdmin }: ArticlesTableProps) {
    
   const router = useRouter();

   const t = useScopedI18n('table');
    
    const { data: articles, isLoading: isArticlesLoading, isError: isArticlesError, refetch } = useArticlesData(authorId); 
    
    const { data: allCategories, isLoading: isCategoriesLoading, isError: isCategoriesError } = useCategory();
    const { data: allTypes, isLoading: isTypesLoading, isError: isTypesError } = useType();

   
   
    const [articleToDelete, setArticleToDelete] = useState<number | null>(null);
    const [articleToEditId, setArticleToEditId] = useState<number | null>(null);
    
   
    const { data: articleDataToEdit, isLoading: isArticleLoading } = useSingleArticle(articleToEditId);
    
 
    const handleDelete = async () => {
        if (!articleToDelete) return;
        
        // 💡 Traduction du toast de chargement
        const toastId = toast.loading(t('delete_loading'));
        
        try {
            const result = await deleteArticleAction(articleToDelete);
            if (result.success) {
                toast.success(result.message, { id: toastId });
                refetch(); 
            } else {
                toast.error(result.message, { id: toastId });
            }
        } catch (error) {
            toast.error("Échec de la suppression: Erreur réseau ou serveur.", { id: toastId });
        } finally {
            setArticleToDelete(null);
        }
    };
    
    const handleEditAction = (id: number) => {
        setArticleToEditId(id);
    };

    
    const columHelper = createColumnHelper<ArticleData>();
    const columns = useMemo(() => [
        columHelper.display({
            header: ' ',
            cell: props =>{
                return(
                   < GripVertical className='size-3.5 mr-[-20px] text-secondary-400'/>
                )
            }

        }),
        columHelper.accessor('image', {
            // 💡 Traduction de l'en-tête
            header: t('header_image'),
            cell: info =>(
                <img
                    src={info.getValue()}
                    alt='Miniature'
                    className='w-[60px] h-[40px] rounded object-cover'
                />
            ),
            enableSorting: false,
            meta: { className: 'py-2' }
        }),
        columHelper.accessor('title', {
            // 💡 Traduction de l'en-tête
            header: t('header_title'),
            meta: { className: "w-[200px] font-medium py-2" }
        }),
        columHelper.accessor('category', { 
            // 💡 Traduction de l'en-tête
            header: t('header_category'), 
            meta: { className: 'py-2' } 
        }),
        columHelper.accessor('type', { 
            // 💡 Traduction de l'en-tête
            header: t('header_type'), 
            meta: { className: 'py-2' } 
        }),
        columHelper.accessor('date', { 
            // 💡 Traduction de l'en-tête
            header: t('header_date'), 
            meta: { className: 'py-2' } 
        }),
        columHelper.display({
            id: 'actions',
            // 💡 Traduction de l'en-tête
            header: t('header_action'),
            cell: props => {
                return (
                    <ActionCell
                        articleId={props.row.original.id}
                        onEdit={handleEditAction}
                        onDeleteTrigger={setArticleToDelete}
                    />
                );
            },
            meta: { className: 'text-right py-2' }
        })
    ], [handleEditAction, t]); 

   
    const table = useReactTable({
        data: articles || [], 
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    });

  
    const isTotalLoading = isArticlesLoading || isCategoriesLoading || isTypesLoading;
    const isTotalError = isArticlesError || isCategoriesError || isTypesError;
    
    if (isTotalLoading) {
        return <Loader2 className="w-8 h-8 animate-spin mx-auto mt-10 text-primary-500" />;
    }
    if (isTotalError || !articles || !allCategories || !allTypes) {
        // 💡 Traduction du message d'erreur
        return <div className="text-red-600 text-center mt-10">{t('error_loading')}</div>;
    }

    const redirectArticle = () =>{
        router.push('/admin/Article')
    }
    
    const validArticles = articles as ArticleData[];
    const validCategories = allCategories as CategoryData[];
    const validTypes = allTypes as TypeData[];
    
    return (
        <>
            {/* 💡 Traduction du bouton "Ajouter" */}
            <Button className='btn-secondary mb-6' onClick={redirectArticle}>{t('add_article_button')}</Button>
            <Table className='mx-auto max-w-full border border-secondary-300'>
                {/* 💡 Traduction de la caption */}
                <TableCaption>{t('caption', { count: validArticles.length })}</TableCaption>
                
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id} className='px-3 py-2 border-b-1 font-bold border-secondary-300 bg-secondary-100' > 
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {validArticles.length === 0 ? (
                        <TableRow>
                            {/* 💡 Traduction du message "Aucun article" */}
                            <TableCell colSpan={table.getAllColumns().length} className="text-center py-8">{t('empty_message')}</TableCell>
                        </TableRow>
                    ) : (
                        table.getRowModel().rows.map(row => (
                            <TableRow key={row.id} className="hover:bg-secondary-100">
                                {row.getVisibleCells().map(cell => (
                                    <TableCell 
                                        key={cell.id} 
                                        className='px-3 py-2 border-b border-secondary-300'
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

          
            <AlertDialog
                open={articleToDelete !== null}
                onOpenChange={(open) => { if (!open) setArticleToDelete(null); }}
            >
                 <AlertDialogContent className='bg-white-100'>
                    <AlertDialogHeader>
                        {/* 💡 Traduction du titre de l'alerte */}
                        <AlertDialogTitle className='text-primary-700'>{t('delete_confirm_title')}</AlertDialogTitle>
                        <AlertDialogDescription className='text-secondary-700'>
                            {/* 💡 Traduction de la description */}
                            {t('delete_confirm_desc')}
                            <br />
                            **Article :** {validArticles.find(a => a.id === articleToDelete)?.title}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                            {/* 💡 Traduction du bouton "Annuler" */}
                            <Button variant="outline">{t('delete_cancel')}</Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                            {/* 💡 Traduction du bouton "Supprimer" */}
                            <Button className='btn-danger' onClick={handleDelete}>{t('delete_action')}</Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


            <AlertDialog 
                open={articleToEditId !== null} 
                onOpenChange={(open) => {
                    if (!open) setArticleToEditId(null); 
                }}
            >
                <AlertDialogContent 
                   
                    className='bg-white-100 max-w-7xl h-[90vh] overflow-y-auto' 
                > 
                    <AlertDialogHeader className="sticky bg-white">
                       
                        <AlertDialogCancel asChild>
                            <Button className='btn-danger'><X/></Button>
                        </AlertDialogCancel>
                  
                        <AlertDialogTitle className='text-primary-700'>
                            {/* 💡 Traduction du titre d'édition */}
                            {isArticleLoading ? t('edit_loading') : `${t('edit_title_prefix')} : ${articleDataToEdit?.title || 'Article'}`}
                        </AlertDialogTitle>
                        <AlertDialogDescription className='text-secondary-700'>
                            {/* 💡 Traduction de la description d'édition */}
                            {t('edit_desc')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    {isArticleLoading && <Loader2 className="w-8 h-8 animate-spin mx-auto my-10 text-primary-500" />}
                    
                    {articleDataToEdit && (
                        <div className="px-3 pb-3 max-w-7xl">
                            {/* Le formulaire est déjà géré pour la traduction dans son propre fichier */}
                            <ArticleCreationForm
                                categories={validCategories} 
                                types={validTypes}
                                initialData={articleDataToEdit as FullArticleData} 
                                isEditMode={true}
                                onSuccess={() => { refetch(); setArticleToEditId(null); }} 
                            />
                        </div>
                    )}
                    
                    
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}