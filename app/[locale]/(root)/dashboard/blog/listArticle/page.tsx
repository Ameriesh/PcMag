import React from 'react';
import ArticlesTable from './_components/ArticlesTable';
import { getServerSession } from '@/lib/get-session'; 
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

async function Page() {
   
    const session = await getServerSession();

    if (!session || !session.user) {
        
        redirect('/auth/signin');
    }    
    const authorId = session.user.id; 
    
    return (
        <div className="p-8">
           
           
           
            <ArticlesTable authorId={authorId} isAdmin={false} />
        </div>
    );
}

export default Page;