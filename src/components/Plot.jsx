import React from 'react';
import './Plot.css';

const Plot = () => {
  return (
    <section id="plot" className="Plot-section">
      <h2 className="Plot-title">WHAT IS STRANGER THINGS?</h2>
      <div className="Plot-subtitle">
        A blend of 80's nostalgia, sci-fi horror, and coming-of-age story.
      </div>
      <div className="Plot-content">
        <p className="Plot-description">
          Stranger Things is an American science fiction horror drama television series created by the Duffer Brothers. Set in the 1980s in the fictional town of Hawkins, Indiana, the series focuses on a group of young friends who witness supernatural events and the existence of a dark, parallel dimension known as the <strong>Upside Down</strong>.
        </p>
        
        <div className="Plot-highlights">
          <div className="Highlight-card">
            <div className="Highlight-icon">I</div>
            <h3>1980s Nostalgia</h3>
            <p>From synthwave soundtrack to retro aesthetics, the series captures the essence of 80s pop culture.</p>
          </div>
          
          <div className="Highlight-card">
            <div className="Highlight-icon">II</div>
            <h3>Supernatural Mystery</h3>
            <p>Government conspiracies, psychic powers, and a terrifying alternate dimension.</p>
          </div>
          
          <div className="Highlight-card">
            <div className="Highlight-icon">III</div>
            <h3>Coming-of-Age</h3>
            <p>At its heart, a story about friendship, courage, and growing up in extraordinary circumstances.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plot;