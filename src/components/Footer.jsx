
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="Footer-content">
        <div className="Footer-section">
          <h3>STRANGER THINGS</h3>
          <p>The ultimate fan experience for Netflix's hit series.</p>
          <p>This is a fan-made website, not affiliated with Netflix or the Duffer Brothers.</p>
        </div>
        
        <div className="Footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/#plot">The Plot</a></li>
            <li><a href="/#seasons">Seasons</a></li>
            <li><a href="/#characters">Characters</a></li>
            <li><a href="/#moments">Gallery</a></li>
          </ul>
        </div>
        
        <div className="Footer-section">
          <h4>Official Resources</h4>
          <ul>
            <li><a href="https://www.netflix.com/title/80057281" target="_blank" rel="noopener noreferrer">Watch on Netflix</a></li>
            <li><a href="https://strangerthings-store.com" target="_blank" rel="noopener noreferrer">Official Store</a></li>
            <li><a href="https://twitter.com/strangerthings" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.instagram.com/strangerthingstv/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
      
      <div className="Footer-bottom">
        <p>&copy; {new Date().getFullYear()} Stranger Things Fan Page. All rights reserved.</p>
        
      </div>
    </footer>
  );
};

export default Footer;