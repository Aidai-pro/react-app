import React from 'react';
import { mainCharacters } from '../../data/charactersData';
import './Characters.css';

const CharactersSection = () => (
    <section id="characters" className="Section">
        <h2 className="Section-title">MAIN CHARACTERS</h2>
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
    </section>
);

export default CharactersSection;