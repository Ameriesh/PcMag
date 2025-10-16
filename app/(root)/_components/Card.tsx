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

// Fichier : Card.tsx (Mise à jour du JSX)

// ... (interface GeekCardProps reste la même)

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
  
  // Dans ce modèle, la logique 'featured' et 'type' ne sont plus nécessaires,
  // car le style est uniforme (excepté le 'latest' sans image).
  // Nous allons utiliser la classe 'card-v2' pour tout, et 'card-v2-latest' pour la colonne de droite.
  
  const isLatest = type === 'news'; // Nouvelle logique pour les articles de la colonne de droite

  if (isLatest) {
    // Style de la colonne de droite (Latest)
    return (
        <div className="card-v2 card-v2-latest">
            <div className="card-v2-meta-latest">
                <span className="card-v2-date">{date}</span>
            </div>
            <h3 className="card-v2-title-latest">{title}</h3>
            <span className="card-v2-author-latest">{author}</span>
        </div>
    );
  }

  return (
    <div className="card-v2">
        {/* Image du type 'column' */}
        <div className="card-v2-image">
            <img 
                src={image} 
                alt={title}
                className="card-v2-img"
            />
            {/* Contenu superposé (Titre + Méta) */}
            <div className="card-v2-overlay">
                 <h3 className="card-v2-title">{title}</h3>
                 <div className="card-v2-meta-overlay">
                    <span className="card-v2-badge">{badge}</span>
                    <span className="card-v2-author">{author}</span>
                 </div>
            </div>
        </div>
    </div>
  );
}