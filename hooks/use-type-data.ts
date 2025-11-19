import { useQuery } from '@tanstack/react-query';

interface TypeData{
  id: number;
  name: string;
}


const fetchType = async (): Promise<TypeData[]> => {

    
    const apiUrl = '/api/type';
    
    const res = await fetch(
        apiUrl, { 
            cache: 'no-store' 
        });

    if (!res.ok) {
        
        throw new Error(`Échec du chargement des Types. Erreur HTTP: ${res.status}`);
    }
    return res.json();
};

export const useType = () => {
    return useQuery({
        
        queryKey: ['types'], 
        queryFn: () => fetchType(),
    });
};


const fetchSingleType = async (typeId: number): Promise<TypeData> => {
   
    const res = await fetch(`/api/type/${typeId}`); 
    if (!res.ok) {
        throw new Error("Type non trouvé.");
    }
    return res.json();
};

export const useSingleType = (typeId: number | null) => {
    return useQuery({
        queryKey: ['type', typeId], 
        queryFn: () => fetchSingleType(typeId!),
        enabled: typeId !== null && typeId > 0, 
    });
};