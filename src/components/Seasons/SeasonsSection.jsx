import React from 'react';
import SeasonsList from './SeasonsList';

const SeasonsSection = () => {
  return (
    <section id="seasons" className="Section">
      <h2 className="Section-title">SEASONS</h2>
      <div className="Section-subtitle">A JOURNEY INTO THE UPSIDE DOWN</div>
      <SeasonsList />
    </section>
  );
};

export default SeasonsSection;