// Fichier : components/Hero.tsx

import type { HeroArticleData } from "@/types/article-data";
import Link from "next/link";
import { getScopedI18n } from "@/locales/server";

interface HeroProps {
    featuredArticle: HeroArticleData | null;
    asideArticles: HeroArticleData[];
    latestNews: HeroArticleData[];
}


export default async function Hero({ featuredArticle, asideArticles, latestNews }: HeroProps) {
  

  const t = await getScopedI18n('hero'); 

  const defaultFeatured = featuredArticle || {
     
      id: 0,
      title: t('default_title'), 
      excerpt: t('default_excerpt'),
      image: "/placeholder.jpg",
      badge: t('default_badge'),
      author: "Admin",
      readTime: "0 min",
      category: "NA"
  };
  
  // 2. Définition du lien principal
  const featuredId = featuredArticle?.id; 
  const articleLink = featuredId ? `/features/${featuredId}` : '#';

  const [aside1, aside2] = asideArticles;
  

  return (
   
    <section className="hero-v2"> 
      <div className="hero-v2-container">

       
        <div className="hero-v2-grid">
          
        
          <div className="hero-v2-featured">
            <img 
              src={defaultFeatured.image} 
              alt={defaultFeatured.title}
              className="hero-v2-image"
            />
            
            <div className="hero-v2-content">
                <div className="hero-v2-badge-meta">
                     <span className="hero-v2-badge">{defaultFeatured.badge}</span>
                     <span className="hero-v2-meta-author"> {defaultFeatured.author}</span>
                </div>
                
                <h2 className="hero-v2-title">
                  {defaultFeatured.title}
                </h2>
                
                <p className="hero-v2-excerpt">
                  {defaultFeatured.excerpt}
                </p>
                 <Link href={articleLink} passHref>
                  <button className="btn-primary mt-4">
                    {t('read_article_button')} {/* 💡 Traduction du bouton */}
                  </button>
                </Link>
            </div>
          </div>

         
          <div className="hero-v2-aside">
           
           
            {aside1 && (
                <div className="hero-v2-aside-item">
                     {/* 💡 Les liens pour aside1 et aside2 devraient aussi utiliser l'ID s'ils sont des articles complets */}
                    <Link href={`/articles/${aside1.id}`}> 
                        <img 
                            src={aside1.image} 
                            alt={aside1.title}
                            className="hero-v2-aside-image"
                        />
                    </Link>
                    <div className="hero-v2-aside-content">
                        <h4 className="hero-v2-aside-title">
                            {aside1.title}
                        </h4>
                        <div className="hero-v2-aside-meta">
                            <span className="text-pink-500 font-semibold text-xs uppercase">{aside1.category}</span>
                            <span className="text-secondary-500 text-xs">{aside1.author}</span>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Deuxième article Aside */}
            {aside2 && (
                <div className="hero-v2-aside-item">
                    <Link href={`/articles/${aside2.id}`}> 
                        <img 
                            src={aside2.image} 
                            alt={aside2.title}
                            className="hero-v2-aside-image"
                        />
                    </Link>
                    <div className="hero-v2-aside-content">
                        <h4 className="hero-v2-aside-title">
                            {aside2.title}
                        </h4>
                        <div className="hero-v2-aside-meta">
                            <span className="text-purple-500 font-semibold text-xs uppercase">{aside2.category}</span>
                            <span className="text-secondary-500 text-xs">{aside2.author}</span>
                        </div>
                    </div>
                </div>
            )}
            
        
            {!aside1 && !aside2 && (
                <div className="text-secondary-600 p-4">{t('no_aside_content')}</div> 
            )}
          </div>
          
          
          <div className="hero-v2-latest">
            <h3 className="hero-v2-latest-title">{t('latest_news_title')}</h3> 
            <div className="hero-v2-latest-list">
              {/* Utilisation des données dynamiques latestNews */}
              {latestNews.map((news, index) => (
                <div key={index} className="hero-v2-latest-item">
                  <div className="hero-v2-latest-time">{news.readTime}</div> 
                  <div className="hero-v2-latest-text">{news.title}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}