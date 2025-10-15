// Fichier : Card.tsx

interface GeekCardProps {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  badge: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
  type?: "news" | "test" | "video";
}

export default function Card({ 
  title, 
  excerpt, 
  image, 
  category, 
  badge, 
  author, 
  date, 
  readTime, 
  featured = false, 
  type = "news" 
}: GeekCardProps) {
  
  // Fonction inchangée pour les classes dynamiques
  const getCardClass = () => {
    let className = "geek-card geek-card-entrance";
    if (featured) className += " featured";
    if (type === "test") className += " test";
    if (type === "news") className += " news";
    if (type === "video") className += " video";
    return className;
  };

  return (
    <div className={getCardClass()}>
      <div className="geek-card-image">
        <img 
          src={image} 
          alt={title}
          className="geek-card-img"
        />
        <span className="geek-card-badge">{badge}</span>
        <span className="geek-card-category">{category}</span>
      </div>
      
      <div className="geek-card-content">
        <h3 className="geek-card-title">{title}</h3>
        <p className="geek-card-excerpt">{excerpt}</p>
        <div className="geek-card-meta">
          <span className="geek-card-author">Par {author}</span>
          <div className="flex gap-2">
            <span className="geek-card-date">{date}</span>
            <span className="geek-card-time">{readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}