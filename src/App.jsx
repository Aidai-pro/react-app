import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useParams, useLocation, Link } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Plot from './components/Plot';
import SeasonsSection from './components/Seasons/SeasonsSection'; 
import { seasonsData } from './data/seasonsData';
import CharactersSection from './components/Characters/CharactersSection'; 
import PhotoGallery from './components/Gallery/PhotoGallery'; 
import ShopPage from './pages/ShopPage'; 
import BasketPage from './pages/BasketPage'; 
import CreateOrderPage from './pages/CreateOrderPage'; 
import OrderPage from './pages/OrderPage'; 
import { BasketProvider } from './context/BasketContext'; 
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CountdownTimer from './components/CountdownTimer';


function ScrollToTop() {
  const location = useLocation();

  React.useEffect(() => {
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


const PostList = () => (
  <div className="Seasons-list">
    {seasonsData.map((season) => (
      <PostDetail key={season.id} season={season} />
    ))}
  </div>
);

 
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
            <Plot />

            {/* SEASONS SECTION - остается в App.jsx */}
            <section id="seasons" className="Section">
                <h2 className="Section-title">SEASONS</h2>
                <div className="Section-subtitle">A JOURNEY INTO THE UPSIDE DOWN</div>
                <PostList />
            </section>

            {/* MAIN CHARACTERS SECTION - теперь отдельный компонент */}
            <CharactersSection />

            {/* PHOTO GALLERY SECTION - теперь отдельный компонент */}
            <PhotoGallery />
            <CountdownTimer />
            
        </main>
    );
}


// 4. SEASON DETAIL VIEW 
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
                        {season.details}
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
    <AuthProvider>
    <BasketProvider> {/* Оберните в BasketProvider */}
      <BrowserRouter>
          <ScrollToTop />  
          <Header />
          <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/season/:id" element={<SeasonDetailView />} />
              <Route path="/shop" element={<ShopPage />} /> {/* Добавьте */}
              <Route path="/basket" element={<BasketPage />} /> {/* Добавьте */}
              <Route path="/create-order" element={<CreateOrderPage />} /> {/* Добавьте */}
              <Route path="/order/:id" element={<OrderPage />} /> {/* Добавьте */}
              <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <Footer />
      </BrowserRouter>
    </BasketProvider>
    </AuthProvider>
  );
}

export default App;