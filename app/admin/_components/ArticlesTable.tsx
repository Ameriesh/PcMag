"use client";

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Trash, Loader2, SquarePen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image';
import { deleteArticleAction } from '../_actions/ArticleAction';
import { toast } from 'sonner';

interface ArticleData {
    id: number;
    title: string;
    date: string;
    image: string;
    category: string;
    type: string;
    author: string;
}

interface ArticlesTableProps {
    authorId: string;
}

export default function ArticlesTable({ authorId }: ArticlesTableProps) {
    const [articles, setArticles] = useState<ArticleData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [articleToDelete, setArticleToDelete] = useState<number | null>(null)

    useEffect(() => {
        

        const fetchArticles = async () => {
            if (!authorId) {
            setLoading(false);
            setError("ID de l'auteur manquant.");
            return;
        }
            const apiUrl = `/api/user/articles/${authorId}`;
            
            try {
                const res = await fetch(apiUrl, { cache: 'no-store' });
                if (!res.ok) {
                    throw new Error(`Erreur HTTP: ${res.status}`);
                }
                const data: ArticleData[] = await res.json();
                setArticles(data);
            } catch (err) {
                setError("Échec du chargement des articles.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [authorId]);

    if (loading) {
        return <Loader2 className="w-8 h-8 animate-spin mx-auto mt-10 text-primary-500" />;
    }

    if (error) {
        return <div className="text-red-600 text-center mt-10">Erreur : {error}</div>;
    }
    
    

    const handleDelete = async () => {

        if (!articleToDelete) return;

        const toastId = toast.loading("Suppression en cours...");

        const idToDelete = articleToDelete; 


        try {
            
            const result = await deleteArticleAction(idToDelete);

            if (result.success) {
                toast.success(result.message, { id: toastId });
    
                setArticles(prevArticles => 
                    prevArticles.filter(article => article.id !== idToDelete)
                );
            } else {
                toast.error(result.message, { id: toastId });
            }
        } catch (error) {
            toast.error("Échec de la suppression: Erreur réseau ou serveur.", { id: toastId });
            console.error("Erreur action suppression:", error);
        }
    };
    
    const handleAction = (id: number, action: 'edit' | 'delete') => {
        console.log(`${action} article ID: ${id}`);
    };

    return (
        
        <AlertDialog open={articleToDelete !== null} 
                onOpenChange={(open) => {
            
            if (!open) setArticleToDelete(null);
             }} >
            <Table>
                <TableCaption>Liste de vos {articles.length} articles publiés.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead className="w-[200px]">Titre</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {articles.length === 0 ? (
                        <TableRow><TableCell colSpan={6} className="text-center py-8">Vous n'avez pas encore publié d'article.</TableCell></TableRow>
                    ) : (
                        articles.map(article => (
                            <TableRow key={article.id} className="hover:bg-secondary-50">
                                <TableCell>
                                    <img 
                                        src={article.image} 
                                        alt={article.title} 
                                        style={{ width: '60px', height: '40px' }} // Appliquez les dimensions via style ou classes
                                        className="rounded object-cover" 
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{article.title}</TableCell>
                                <TableCell>{article.category}</TableCell>
                                <TableCell>{article.type}</TableCell>
                                <TableCell>{article.date}</TableCell>
                                <TableCell className="text-right flex justify-end gap-2">
                                    <Button className='cursor-pointer' size="icon" variant="ghost" onClick={() => handleAction(article.id, 'edit')}>
                                        <SquarePen className="w-4 h-4 text-primary-500" />
                                    </Button>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button className='cursor-pointer' size="icon" variant="ghost" onClick={() => setArticleToDelete(article.id)}>
                                                <Trash className="w-4 h-4 text-red-500 " />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className='bg-secondary-600'>
                                            <p className='text-white font-bold'>Delete</p>
                                        </TooltipContent>
                                    
                                     </Tooltip>
    
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>            
            </Table>
            <AlertDialogContent className='bg-white-100'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-primary-700'>Êtes-vous absolument certain de supprimer ?</AlertDialogTitle>
                    <AlertDialogDescription className='text-secondary-700'>
                        Cette action est définitive. L'article sera supprimé de la base de données.
                        <br/>
                        **Article :** {articles.find(a => a.id === articleToDelete)?.title}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    
                    <AlertDialogCancel asChild>
                        <Button className='btn-secondary'>Annuler</Button> 
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