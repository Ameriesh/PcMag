'use client';

import React from 'react';
import { useCategory } from '@/hooks/use-category-data'; 
import { useType } from '@/hooks/use-type-data'; 
import ArticleCreationForm from './ArticleForm'; 
import { Loader2 } from 'lucide-react';

export default function ArticleFormWrapper() {
    
    const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useCategory();
    const { data: types, isLoading: isLoadingTypes, isError: isErrorTypes } = useType();

    const isLoading = isLoadingCategories || isLoadingTypes;
    const isError = isErrorCategories || isErrorTypes;


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="ml-2 text-gray-600">Chargement des données...</p>
            </div>
        );
    }

    if (isError || !categories || !types) {
        return (
            <div className="text-red-600 text-center mt-10 p-4 border border-red-300 bg-red-50 rounded-lg">
                Erreur: Impossible de charger les données des catégories ou des types.
            </div>
        );
    }
    

    return (
        <div className=' py-12 px-4 sm:px-6 lg:px-12'>
            <ArticleCreationForm categories={categories} types={types} />
        </div>
        
    );
}