// // Fichier : app/[locale]/categories/[categoryTitle]/page.tsx
// import React from 'react';
// import { notFound } from 'next/navigation';
// import { getI18n } from '../../../../locales/server'; // Assurez-vous du chemin correct
// import { ChevronRight } from 'lucide-react'; 
// import Card from '@/components/Card'; // Assurez-vous du chemin correct vers votre composant Card
// import { PrismaClient } from '@/genereted/prisma'; // Assurez-vous du chemin correct

// const prisma = new PrismaClient();

// // Type minimal pour l'affichage (ajustez selon votre besoin réel)
// interface ArticleItem {
//     id: number;
//     title_fr: string; // Utiliser le champ localisé
//     excerpt_fr: string; // Utiliser le champ localisé
//     image: string;
//     badge: string;
//     readTime: string | null;
//     featured: boolean;
//     createdAt: Date;
//     // Relations nécessaires pour la carte:
//     CategoryRef: { title: string };
//     typeRef: { name: string };
//     author: { name: string };
// }


// // 💡 Fonction de Récupération de TOUS les articles par titre de catégorie
// async function fetchAllArticlesByCategory(categoryTitle: string): Promise<ArticleItem[]> {
//     try {
//         const articles = await prisma.article.findMany({
//             where: {
//                 CategoryRef: {
//                     title: categoryTitle,
//                 },
//             },
//             select: {
//                 id: true,
//                 title 
//                 image: true,
//                 badge: true,
//                 readTime: true,
//                 featured: true,
//                 createdAt: true,
//                 CategoryRef: { select: { title: true } },
//                 typeRef: { select: { name: true } },
//                 author: { select: { name: true } },
//             },
//             orderBy: { createdAt: 'desc' },
//         });

//         // NOTE: Si vous utilisez la logique de traduction de l'Étape 3, vous devrez l'appliquer ici aussi
//         // en fonction de la `locale` pour renvoyer `title_en` ou `title_fr`.
        
//         return articles as unknown as ArticleItem[];

//     } catch (error) {
//         console.error("Database Fetch Error:", error);
//         return [];
//     }
// }


// interface CategoryPageProps {
//     params: {
//         locale: 'fr' | 'en';
//         categoryTitle: string; // Correspond au nom du dossier [categoryTitle]
//     };
// }

// export default async function CategoryPage({ params }: CategoryPageProps) {
//     const { locale, categoryTitle: encodedCategoryTitle } = params;
    
//     // Décodage de l'URL (si le titre contient des espaces ou caractères spéciaux)
//     const categoryTitle = decodeURIComponent(encodedCategoryTitle);

//     // 💡 Récupération des traductions pour les éléments statiques
//     const t = await getI18n(); 

//     const articles = await fetchAllArticlesByCategory(categoryTitle);
    
//     // S'il n'y a pas d'articles et que la catégorie n'est pas valide (hypothèse simple)
//     if (articles.length === 0) {
//         // Optionnel: Vérifier l'existence de la catégorie si vous le souhaitez
//         // Pour l'instant, nous affichons un message d'absence.
//     }

//     // Ici, vous devez implémenter la logique de sélection de la langue
//     // Pour cet exemple simple, nous utiliserons toujours le champ _fr pour le moment.
//     const articlesToDisplay = articles.map(article => ({
//         id: article.id,
//         // En vrai, vous devez utiliser la fonction de mapping de l'Étape 3 pour choisir la bonne langue
//         title: article.title_fr, 
//         excerpt: article.excerpt_fr, 
//         image: article.image,
//         category: article.CategoryRef.title,
//         type: article.typeRef.name,
//         badge: article.badge,
//         readTime: article.readTime || '',
//         featured: article.featured,
//         author: article.author.name,
//         date: new Date(article.createdAt).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' }),
//     }));


//     return (
//         <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            
//             <header className="mb-8 border-b pb-4">
//                 <h1 className="text-3xl font-extrabold text-secondary-900 flex items-center">
//                     {t('article.category_label')}: {categoryTitle.toUpperCase()}
//                 </h1>
//             </header>

//             {articlesToDisplay.length === 0 ? (
//                 <div className="text-center py-20 text-secondary-600">
//                     <p>{t('article.no_articles_in_category', { category: categoryTitle })}</p>
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {articlesToDisplay.map(article => (
//                         <Card 
//                             id={article.id}
//                             key={article.id} 
//                             title={article.title}
//                             excerpt={article.excerpt}
//                             image={article.image}
//                             category={article.category} 
//                             type={article.type} 
//                             badge={article.badge}
//                             readTime={article.readTime}
//                             featured={article.featured}               
//                             author={article.author}
//                             date={article.date}
//                         />
//                     ))}
//                 </div>
//             )}
            
//             {/* Lien de retour ou navigation, en utilisant la traduction */}
//              <div className="mt-10 text-center">
//                  <a href="/" className="cards-v2-show-all flex items-center justify-center gap-1 text-primary-500 hover:text-primary-600">
//                     {t('back_to_home')} <ChevronRight size={16} />
//                 </a>
//              </div>

//         </div>
//     );
// }