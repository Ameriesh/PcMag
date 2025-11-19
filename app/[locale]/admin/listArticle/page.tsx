// Fichier : app/admin/listArticle/page.tsx (ADMIN)

import React from 'react';
import ArticlesTable from '../_components/ArticlesTable';
import { getServerSession } from '@/lib/get-session'; 
import { redirect } from 'next/navigation';


async function Page() {
   
    const session = await getServerSession();


    if (!session || !session.user || session.user.role !== "ADMIN") {
        
        redirect('/auth/signin');
    }


    const authorId = session.user.id; 
    
    return (
        <div className="p-8">
           
            <ArticlesTable 
                authorId={authorId} 
                isAdmin={true} 
            />
        </div>
    );
}

export default Page;