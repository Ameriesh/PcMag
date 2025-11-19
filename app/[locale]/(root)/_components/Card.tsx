import Link from "next/link";
interface GeekCardProps {
  title: string;
  excerpt: string; 
  image: string;
  category: string; 
  badge: string; 
  author: string,
  date: string; 
  readTime: string; 
  featured?: boolean;
  type: string; 
  id: number;
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
  type,
  id
}: GeekCardProps) {
  
  return (
    <Link href={`/articles/${id}`} passHref>
      <div className="card-v5-vertical-framed "> 
        
          <span className="card-v5-badge">{badge}</span> 
          <div className="card-v5-image-wrapper">
              <img 
                  src={image} 
                  alt={title}
                  className="card-v5-img"
              />
          </div>
          <div className="card-v5-content">

              <h3 className="card-v5-title">{title}</h3>
              <div className="card-v5-meta-bottom">
                  <span className="card-v5-author">{author}</span>
                  <span className="card-v5-date">{date}</span>
                  <span className="card-v5-read-time">{readTime}</span>
              </div>
          </div>
          
      </div>
    </Link>
  );
}