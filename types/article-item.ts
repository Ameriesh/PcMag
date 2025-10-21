export default interface ArticleItem {
    id: number; 
    title: string; 
    excerpt: string; 
    image: string; 
    category: string;
    badge: string; 
    readTime: string | null; 
    featured?: boolean; 
    type: string;
    createdAt: string; 
    updatedAt: string;
    author: string
}