import { useQuery } from '@tanstack/react-query';

interface CategoryData{
  id: number;
  title: string;
  date: string;
  description: string;
}

const fetchArticles = async (): Promise<CategoryData[]> => {

    
    const apiUrl = '/api/categories/category';
    
    const res = await fetch(
        apiUrl, { 
            cache: 'no-store' 
        });

    if (!res.ok) {
        
        throw new Error(`Échec du chargement des Categories. Erreur HTTP: ${res.status}`);
    }
    return res.json();
};

export const useCategory = () => {
    return useQuery({
        
        queryKey: ['categorie'], 
        queryFn: () => fetchArticles(),
    });
};