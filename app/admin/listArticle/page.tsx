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
            <h1 className="text-3xl font-bold mb-8 text-primary-400 text-center">Mes Articles</h1>
           
            <ArticlesTable authorId={authorId} />
        </div>
    );
}

export default Page;