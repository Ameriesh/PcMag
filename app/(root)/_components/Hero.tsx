// components/Hero.jsx
export default function Hero() {
  const recentArticles = [
    { id: 1, title: "Nouvelle sortie gaming attendue cette semaine", date: "14 déc 2023", readTime: "3 min" },
    { id: 2, title: "Test du dernier smartphone flagship", date: "13 déc 2023", readTime: "4 min" },
    { id: 3, title: "Les tendances tech à suivre en 2024", date: "12 déc 2023", readTime: "5 min" },
    { id: 4, title: "Comparatif des consoles next-gen", date: "11 déc 2023", readTime: "6 min" },
    { id: 5, title: "Revolution IA dans le monde du développement", date: "10 déc 2023", readTime: "4 min" },
  ];

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Colonne de gauche - Article principal */}
        <div className="hero-featured">
          <div className="hero-image">
            <img 
              src="/hero.jpg" 
              alt="Article featured"
              className="hero-img"
            />
          </div>
          <div className="hero-content">
            <span className="hero-badge">À la une</span>
            <h1 className="hero-title">
              Titre principal de l'article featured qui attire l'attention
            </h1>
            <p className="hero-excerpt">
              Un résumé accrocheur de l'article qui donne envie de cliquer 
              et de lire la suite. Environ 2-3 lignes pour capter l'intérêt.
            </p>
            <div className="hero-meta">
              <span className="hero-author">Par John Doe</span>
              <span className="hero-date">• 15 décembre 2023</span>
              <span className="hero-read-time">• 5 min de lecture</span>
            </div>
            <button className="btn-primary">
              Lire l'article
            </button>
          </div>
        </div>

        {/* Colonne de droite - Liste des articles récents */}
        <div className="hero-recent">
          <h2 className="recent-title">Dernières actualités</h2>
          <div className="recent-list">
            {recentArticles.map((article) => (
              <div key={article.id} className="recent-item">
                <span className="recent-item-date">{article.date}</span>
                <h3 className="recent-item-title">{article.title}</h3>
                <span className="recent-item-time">{article.readTime}</span>
              </div>
            ))}
          </div>
          <button className="btn-secondary recent-button">
            Voir les actualités
          </button>
        </div>
      </div>
    </section>
  );
}