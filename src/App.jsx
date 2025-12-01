import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const location = useLocation();

  React.useEffect(() => {
    // Если есть хеш — прокрутим к элементу с этим id, иначе просто вверх
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);

  return null;
}

// 1. DATA
const seasonsData = [
    {
      id: 1,
      title: 'Season 1: The Vanishing of Will Byers',
      year: 2016,
      plot: 'A young boy, Will Byers, mysteriously vanishes in Hawkins, Indiana. His friends, family, and the local police chief uncover a series of supernatural mysteries, a secret government lab, and the emergence of a girl with psychokinetic abilities, Eleven.',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/b1/Stranger_Things_season_1.jpg/960px-Stranger_Things_season_1.jpg', 
      details: "Season 1 is the introduction to the group, the Upside Down, and the government's secret experiments. It culminates in the rescue of Will Byers and the mysterious disappearance of Eleven.",
      links: { watch: 'https://www.netflix.com/title/80057281', wiki: '#' }
    },
    {
      id: 2,
      title: 'Season 2: The Mind Flayer',
      year: 2017,
      plot: 'One year after Will\'s return, the citizens of Hawkins are still dealing with the events of the previous year. Will begins experiencing episodes tied to the Upside Down, while a far larger, shadow creature threatens to destroy their world.',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/ru/thumb/f/f7/Stranger_Things_season_2.jpg/960px-Stranger_Things_season_2.jpg', 
      details: "The second season introduces Max and Billy, and focuses on the larger threat of the Mind Flayer attempting to cross over into the real world through Will. The climax takes place at the closing of the gate.",
      links: { watch: 'https://www.netflix.com/title/80057281', wiki: '#' }
    },
    {
      id: 3,
      title: 'Season 3: Summer of 1985',
      year: 2019,
      plot: 'It\'s summer vacation, and the kids are growing up. Romance blossoms and complicated friendships emerge. But when the Starcourt Mall opens, a new evil lurks beneath Hawkins, connected to Russians and a terrifying new host for the Mind Flayer.',
      posterUrl: 'https://i.scdn.co/image/ab67616d0000b273bcccf8503fd2cc5297505867', 
      details: "Set during a hot summer, this season is marked by the Starcourt Mall and the hidden Russian base underneath. The group must battle a new iteration of the Mind Flayer, which ends with Hopper's apparent sacrifice.",
      links: { watch: 'https://www.netflix.com/title/80057281', wiki: '#' }
    },
    {
      id: 4,
      title: 'Season 4: The Road to Nowhere',
      year: 2022,
      plot: 'Separated for the first time, the group faces a new, profoundly powerful threat: Vecna, a creature from the Upside Down who preys on trauma. The heroes must journey across the globe to find answers and stop the collapse of the veil between dimensions.',
      posterUrl: 'https://i.pinimg.com/originals/70/1b/07/701b075ec3cbe9e1413b17f00ff6968b.jpg', 
      details: "Season 4 is divided into multiple storylines: Eleven's quest to regain her powers, the main group fighting Vecna in Hawkins, and Joyce and Murray rescuing Hopper from Russia. It features the reveal of Vecna's origin.",
      links: { watch: 'https://www.netflix.com/title/80057281', wiki: '#' }
    },
    {
      id: 5,
      title: 'Season 5: The Final Chapter',
      year: 2025, 
      plot: 'The final battle for Hawkins and the world. With the Upside Down fully unleashed onto the town, the group must reunite all their resources, power, and courage to face Vecna and the Mind Flayer in a climactic showdown, determining the fate of both dimensions. **(Awaiting Official Details)**',
      posterUrl: 'http://images-s.kinorium.com/movie/fanart/1545339/w1500_50658416.jpg', 
      details: "Anticipated to be the final and most epic season, where the core group must confront the full consequences of the Upside Down breaking into Hawkins, leading to a definitive end to the series.",
      links: { watch: 'https://www.netflix.com/title/80057281', wiki: '#' }
    }
];

const quotes = [
    { text: "Friends don't lie.", author: "Eleven" },
    { text: "Mornings are for coffee and contemplation.", author: "Jim Hopper" },
    { text: "She's our friend and she's crazy!", author: "Dustin Henderson" },
    { text: "You can't spell America without Erica.", author: "Erica Sinclair" },
    { text: "I'm always going to be here, okay? I'm never leaving again.", author: "Mike Wheeler" },
    { text: "She will not be able to draw from it unless she goes back to the beginning.", author: "Dr. Owens" },
    { text: "Don't you think it's time you move on?", author: "Murray Bauman" },
];

const mainCharacters = [
    { name: 'Eleven (El)', style: { backgroundImage: 'url("https://i.pinimg.com/736x/cb/34/8f/cb348fe1af165cccfcb8d8ad1d286088.jpg")' } },
    { name: 'Mike Wheeler', style: { backgroundImage: 'url("https://i.pinimg.com/originals/57/88/c5/5788c5a3c74b71a89c638354eef9f1d6.png")' } },
    { name: 'Lucas Sinclair', style: { backgroundImage: 'url("https://i.pinimg.com/736x/ea/1d/76/ea1d7670b55d8e74bf00a936ad5a2198.jpg")' } },
    { name: 'Max Mayfield', style: { backgroundImage: 'url("https://i.pinimg.com/736x/72/7c/ec/727cec52fc3c1d4c5c712d71569a26ea.jpg")' } },
    { name: 'Will Byers', style: { backgroundImage: 'url("https://i.pinimg.com/736x/44/ad/e6/44ade646c2ebf309d838c5ebc35bb849.jpg")' } },
    { name: 'Nansy Byers', style: { backgroundImage: 'url("https://i.pinimg.com/736x/11/d4/15/11d415cd38508dfbc23a186b5696da30.jpg")' } },
];

const episodeMoments = [
  'https://static0.srcdn.com/wordpress/wp-content/uploads/2025/11/jamie-campbell-bower-as-vecna-looking-intensely-while-coming-out-of-a-portal-in-stranger-things-season-5.jpg?w=1600&h=900&fit=crop', 
  'https://i.ytimg.com/vi/jD8qUJz96E8/maxresdefault.jpg', 
  'https://i.insider.com/629f5b6b7bc6a80018b6ad80', 
  'https://cdn.7days.ru/pic/f3d/973140/1390714/104.jpg', 
  'https://avatars.mds.yandex.net/i?id=86ac585618e121012cff5a7e179dc143_l-5321228-images-thumbs&ref=rim&n=13&w=1440&h=719', 
  'https://i.pinimg.com/originals/26/7b/87/267b878d832a8b81aa00c51b555a5bae.jpg', 
  'https://i.ytimg.com/vi/GxZb5Z755cc/maxresdefault.jpg', 
  'https://static.independent.co.uk/2025/11/27/19/02/Screenshot-2025-11-27-at-19-11-01.png', 
  'https://avatars.mds.yandex.net/i?id=f7a8aac2e1a40185c3af50035563fd39_l-4901917-images-thumbs&n=13', 
];

// 2. COMPONENTS 

// Компонент Header с навигацией
const Header = () => {
  // вспомогательная функция для логотипа: если уже на главной, прокрутить вверх вручную
  const handleLogoClick = (e) => {
    if (window.location.pathname === '/') {
      e.preventDefault(); // предотвращаем поведение Link, т.к. переход не нужен
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // обновим адрес (если нужно): history.pushState(null, '', '/');
    }
    // если не на главной — Link выполнит переход и ScrollToTop сработает
  };

  return (
    <header className="Header">
      <Link to="/" className="Header-logo-link" onClick={handleLogoClick}>
        <div className="Header-logo">STRANGER THINGS</div>
      </Link>
      <nav className="Header-nav">
        {/*обычные якорные ссылки — ScrollToTop обрабатывает hash */}
        <a href="/#plot">THE PLOT</a>
        <a href="/#seasons">SEASONS</a> 
        <a href="/#characters">MAIN CHARACTERS</a> 
        <a href="/#moments">PHOTO GALLERY</a> 
        <a href="/#quotes">QUOTES</a> 
      </nav>
    </header>
  );
};

// PostDetail 
const PostDetail = ({ season }) => {
    const detailStyle = {
        backgroundImage: `url('${season.posterUrl}')`,
    };

    return (
      <Link to={`/season/${season.id}`} style={{ textDecoration: 'none' }}>
        <div className="Season-detail" style={detailStyle}>
            <div className="Season-overlay">
                <h3>{season.title} ({season.year})</h3>
                <p>{season.plot.substring(0, 100)}...</p> 
                <div className="Season-links">
                  <div style={{color: '#00bcd4', fontWeight: 'bold'}}>READ MORE</div>
                </div>
            </div>
        </div>
      </Link>
    );
};

//  PostList Отображает все карточки сезонов
const PostList = () => (
  <div className="Seasons-list">
    {seasonsData.map((season) => (
      <PostDetail key={season.id} season={season} />
    ))}
  </div>
);


const MainCharacters = () => (
    <>
      <div className="Section-subtitle">THE CORE CAST OF HAWKINS</div>
      <div className="Gallery-slider">
        {mainCharacters.map((char, index) => (
          <div key={index} className="Gallery-card" style={char.style}>
            <div className="Gallery-caption">
              <h3>{char.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
);

const PhotoGallery = () => (
    <div className="Photo-grid">
      {episodeMoments.map((url, index) => (
          <div 
              key={index} 
              className="Photo-moment" 
              style={{backgroundImage: `url(${url})`}}
          >
          </div>
      ))}
    </div>
);


const QuotesSection = () => (
    <div className="Quotes-container">
      {quotes.map((quote, index) => (
          <div key={index} className="Quote-box">
              <blockquote className="Quote-text">"{quote.text}"</blockquote>
              <cite className="Quote-author">- {quote.author}</cite>
          </div>
      ))}
    </div>
);

// 3. HOME VIEW 
const HomeView = () => {
    const heroStyle = {
      backgroundImage: 'url("https://i.pinimg.com/originals/56/3c/b2/563cb2372282dfd5d844aebd90c95c06.jpg")', 
    };

    return (
        <main>
            {/* HERO SECTION */}
            <section className="Hero-section" style={heroStyle}>
                <div className="Hero-content">
                    <h1>WELCOME TO HAWKINS</h1>
                    <p style={{fontSize: '20px', color: 'white', marginTop: '10px'}}>The mystery is always right beneath the surface.</p>
                </div>
            </section>

            {/* PLOT SECTION */}
            <section id="plot" className="Section">
                <h2 className="Section-title">WHAT IS STRANGER THINGS?</h2>
                <div className="Section-subtitle">A blend of 80's nostalgia, sci-fi horror, and coming-of-age story.</div>
                <p style={{fontSize: '18px', lineHeight: '1.8', textAlign: 'center'}}>
                    Stranger Things is an American science fiction horror drama television series created by the Duffer Brothers. Set in the 1980s in the fictional town of Hawkins, Indiana, the series focuses on a group of young friends who witness supernatural events and the existence of a dark, parallel dimension known as the <strong>Upside Down</strong>.
                </p>
            </section>

            {/* SEASONS (PostList) - LIST VIEW */}
            <section id="seasons" className="Section">
                <h2 className="Section-title">SEASONS</h2>
                <div className="Section-subtitle">A JOURNEY INTO THE UPSIDE DOWN</div>
                <PostList /> {/* Отображаем список сезонов */}
            </section>

            {/* MAIN CHARACTERS SECTION */}
            <section id="characters" className="Section">
                <h2 className="Section-title">MAIN CHARACTERS</h2> 
                <MainCharacters /> 
            </section>

            {/* PHOTO GALLERY SECTION */}
            <section id="moments" className="Section">
                <h2 className="Section-title">PHOTO GALLERY</h2> 
                <div className="Section-subtitle">MEMORABLE MOMENTS FROM THE SERIES</div>
                <PhotoGallery /> 
            </section>
            
            {/* QUOTES SECTION */}
            <section id="quotes" className="Section">
                <h2 className="Section-title">MEMORABLE QUOTES</h2>
                <div className="Section-subtitle">WORDS FROM THE HEROES</div>
                <QuotesSection />
            </section>
        </main>
    );
}

// =========================================
// 4. SEASON DETAIL(DETAIL VIEW) ОТДЕЛЬНАЯ СТРАНИЦА
const SeasonDetailView = () => {
    const { id } = useParams();
    const season = seasonsData.find(s => s.id === parseInt(id));

    if (!season) {
        return <div className="Section" style={{textAlign: 'center', minHeight: '80vh'}}>
            <h1 className="Section-title" style={{marginTop: '100px'}}>404: SEASON NOT FOUND</h1>
            <p className="Section-subtitle">The portal to this dimension is closed. <Link to="/" style={{color: '#00bcd4'}}>Go back to Hawkins</Link>.</p>
        </div>;
    }

    const detailBackgroundStyle = {
      backgroundImage: `url('${season.posterUrl}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }

    return (
        <main>
            <section className="Section" style={detailBackgroundStyle}>
                <div className="Hero-content" style={{padding: '50px', maxWidth: '800px', backgroundColor: 'rgba(0, 0, 0, 0.95)'}}>
                    <h1 className="Section-title" style={{fontSize: '50px'}}>{season.title}</h1>
                    <div className="Section-subtitle">{season.year}</div>
                    
                    <p style={{fontSize: '20px', lineHeight: '1.8', color: 'white', marginBottom: '30px'}}>
                        {season.details} {/* Полное описание */}
                    </p>
                    <p style={{fontSize: '16px', lineHeight: '1.8', color: '#ccc', fontStyle: 'italic'}}>
                        (Краткий сюжет: {season.plot})
                    </p>

                    <div style={{marginTop: '30px'}}>
                        <a href={season.links.watch} target="_blank" rel="noopener noreferrer" className="Detail-button">
                            WATCH NOW
                        </a>
                        <Link to="/" className="Detail-button" style={{marginLeft: '20px', backgroundColor: '#444'}}>
                            BACK TO ALL SEASONS
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

// 5. ГЛАВНАЯ ФУНКЦИЯ APP
function App() {
  return (
    <BrowserRouter>
        <ScrollToTop />  
        <Header />
        <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/season/:id" element={<SeasonDetailView />} />
        </Routes>
        <footer className="Footer">
            &copy; 2025 Stranger Things Fan Page. All rights reserved.
        </footer>
    </BrowserRouter>
  );
}

export default App;
