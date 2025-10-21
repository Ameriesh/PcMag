import type { HeroArticleData } from "@/types/article-data";

interface HeroProps {
    featuredArticle: HeroArticleData | null;
    asideArticles: HeroArticleData[];
    latestNews: HeroArticleData[];
}

export default function Hero({ featuredArticle, asideArticles, latestNews }: HeroProps) {


  const defaultFeatured = featuredArticle || {
      title: "Article non disponible",
      excerpt: "Veuillez créer un article marqué comme 'featured' dans l'espace admin.",
      image: "/placeholder.jpg",
      badge: "ALERTE",
      author: "Admin",
      readTime: "0 min",
      category: "NA"
  };
  

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
                
                <button className="btn-primary mt-4">
                  Lire l'article
                </button>
            </div>
          </div>

         
          <div className="hero-v2-aside">
           
            {/* Premier article Aside */}
            {aside1 && (
                <div className="hero-v2-aside-item">
                    <img 
                        src={aside1.image} 
                        alt={aside1.title}
                        className="hero-v2-aside-image"
                    />
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
                    <img 
                        src={aside2.image} 
                        alt={aside2.title}
                        className="hero-v2-aside-image"
                    />
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
            
            {/* Si les deux ne sont pas disponibles */}
            {!aside1 && !aside2 && (
                <div className="text-secondary-600 p-4">Ajoutez plus d'articles pour cette section.</div>
            )}
          </div>
          
          
          <div className="hero-v2-latest">
            <h3 className="hero-v2-latest-title">Latest</h3>
            <div className="hero-v2-latest-list">
              {/* Utilisation des données dynamiques latestNews */}
              {latestNews.map((news, index) => (
                <div key={index} className="hero-v2-latest-item">
                  {/* Note: La date est une chaîne ISO; vous devrez la formater si vous voulez HH:MM AM/PM */}
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