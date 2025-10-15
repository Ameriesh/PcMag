// components/GeekHero.jsx
export default function Hero() {


  const quickNews = [
    { time: "21:07", text: "Post-credit dans Disneyland Loki bébé ?", tag: "Lokibaba 95, FOLLE théorie" },
    { time: "22:24", text: "Vendre un blanc devient aujourd'hui illégal", tag: "Loi IA européenne" },
    { time: "23:00", text: "Nouveau framework JS : plus rapide que jamais", tag: "Tech" },
    { time: "23:45", text: "PlayStation 6 : les premières rumeurs", tag: "Gaming" }
  ];

  const categories = [
    "IA", "Internet", "Jeux", 
    "Programmation", 
    "Réseaux sociaux", "Sécurité", "PC", 
  ];

  return (
    <section className="geek-hero geek-entrance">
      <div className="geek-hero-container">

        {/* Grid principale */}
        <div className="geek-hero-grid">
          
          {/* Colonne featured */}
          <div className="geek-featured">
            <span className="geek-featured-badge">À la une</span>
            <h2 className="geek-featured-title">
              Daredevil saison 2 en finit avec cette tendance frustrante du streaming !
            </h2>
            <div className="geek-featured-meta">
              <span className="geek-featured-time">18:30</span>
              <span className="geek-featured-author">Par Jean Tech</span>
              <span>• 5 min de lecture</span>
            </div>
            <p className="geek-featured-excerpt">
              La nouvelle saison de Daredevil sur Disney+ brise enfin le format épisodique 
              traditionnel qui rendait le binge-watching si frustrant. Une révolution dans 
              l'industrie du streaming...
            </p>
            <img 
              src="/hero.jpg" 
              alt="Daredevil saison 2"
              className="geek-featured-image"
            />
            <button className="btn-primary">
              Lire l'analyse complète
            </button>
          </div>

          {/* Colonne actualités rapides */}
          <div className="geek-news-column">
            <h3 className="geek-news-title">En ce moment</h3>
            <div className="geek-news-list">
              {quickNews.map((news, index) => (
                <div key={index} className="geek-news-item">
                  <div className="geek-news-time">{news.time}</div>
                  <div className="geek-news-text">{news.text}</div>
                  <div className="geek-news-tag">{news.tag}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Barre des catégories */}
        <div className="geek-categories">
          <div className="geek-categories-grid">
            {categories.map(category => (
              <div key={category} className="geek-category">
                {category}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}