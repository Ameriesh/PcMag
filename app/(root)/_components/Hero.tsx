// components/GeekHero.jsx
export default function Hero() {

  const quickNews = [
    { time: "21:07", text: "Post-credit dans Disneyland Loki bébé ?", tag: "Lokibaba 95, FOLLE théorie" },
    { time: "22:24", text: "Vendre un blanc devient aujourd'hui illégal", tag: "Loi IA européenne" },
    { time: "23:00", text: "Nouveau framework JS : plus rapide que jamais", tag: "Tech" },
    { time: "23:45", text: "PlayStation 6 : les premières rumeurs", tag: "Gaming" }
  ];

  // Le flux "Latest" ou "En ce moment"
  const latestNews = [
    { time: "7:25 PM", text: "The 'Knight of the Seven Kingdoms' Showrunner has an idea for an Unbinged 'Game of Thrones' Cameo" },
    { time: "5:00 PM", text: "The 'Revenge of the Sith' Novelization is the Parent 'Star Wars' Fantasy" },
    { time: "5:10 PM", text: "Even the Inventor of 'Vibe Coding' Says Vibe Coding Can't Cut It" },
    { time: "4:45 PM", text: "All the Strangest, Creepiest Halloween Foods I Ate at Theme Parks This Year" },
    { time: "4:40 PM", text: "Chicago's Famous Rat-Shaped Hole Is Actually a Revival" }
  ];

  return (
    // Suppression de geek-entrance pour un look plus pro
    <section className="hero-v2"> 
      <div className="hero-v2-container">

        {/* Grid principale 3 colonnes: Featured, Aside, Latest */}
        <div className="hero-v2-grid">
          
          {/* Colonne Featured (Grande Image + Texte) */}
          <div className="hero-v2-featured">
            <img 
              src="/hero.jpg" // Remplacer par l'image principale
              alt="Daredevil saison 2"
              className="hero-v2-image"
            />
            
            <div className="hero-v2-content">
                <div className="hero-v2-badge-meta">
                     <span className="hero-v2-badge">INTELLIGENCE ARTIFICIELLE</span>
                     <span className="hero-v2-meta-author">A.J. DELLINGER</span>
                </div>
                
                <h2 className="hero-v2-title">
                  Even the Inventor of 'Vibe Coding' Says Vibe Coding Can't Cut It
                </h2>
                
                <p className="hero-v2-excerpt">
                  Humans keep hanging on.
                </p>
                
                <button className="btn-primary mt-4">
                  Lire l'article
                </button>
            </div>
          </div>

          {/* Colonne Aside (2 petits articles) - Colonne 2/3 */}
          <div className="hero-v2-aside">
            {/* Petit article 1 */}
            <div className="hero-v2-aside-item">
                 <img 
                    src="/hero.jpg" // Remplacer par l'image
                    alt="Halloween Foods"
                    className="hero-v2-aside-image"
                />
                <div className="hero-v2-aside-content">
                    <h4 className="hero-v2-aside-title">
                       All the Strangest, Creepiest Halloween Foods I Ate at Theme Parks This Year
                    </h4>
                    <div className="hero-v2-aside-meta">
                        <span className="text-pink-500 font-semibold text-xs uppercase">Theme Parks & Destinations</span>
                        <span className="text-secondary-500 text-xs">SABINA GRAVES</span>
                    </div>
                </div>
            </div>
            
            {/* Petit article 2 */}
            <div className="hero-v2-aside-item">
                 <img 
                    src="/hero.jpg" // Remplacer par l'image
                    alt="Stranger Things"
                    className="hero-v2-aside-image"
                />
                <div className="hero-v2-aside-content">
                    <h4 className="hero-v2-aside-title">
                       'Stranger Things' Season 5 Will Finally Explain What the Hell the Upside Down Is
                    </h4>
                     <div className="hero-v2-aside-meta">
                        <span className="text-purple-500 font-semibold text-xs uppercase">Television</span>
                        <span className="text-secondary-500 text-xs">CHERYL EDDY</span>
                    </div>
                </div>
            </div>
          </div>
          
          {/* Colonne Latest (Flux d'actualités) - Colonne 3/3 */}
          <div className="hero-v2-latest">
            <h3 className="hero-v2-latest-title">Latest</h3>
            <div className="hero-v2-latest-list">
              {latestNews.map((news, index) => (
                <div key={index} className="hero-v2-latest-item">
                  <div className="hero-v2-latest-time">{news.time}</div>
                  <div className="hero-v2-latest-text">{news.text}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}