export interface HeroArticleData {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    badge: string;
    category: string; 
    type: string;     
    author: string;   
    date: string;     
    readTime: string | null; 
    featured?: boolean;
}
