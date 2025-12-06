import React from 'react';
import { episodeMoments } from '../../data/momentsData';
import './Gallery.css';

const PhotoGallery = () => (
    <section id="moments" className="Section">
        <h2 className="Section-title">PHOTO GALLERY</h2> 
        <div className="Section-subtitle">MEMORABLE MOMENTS FROM THE SERIES</div>
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
    </section>
);

export default PhotoGallery;