import React from 'react';
import { quotes } from '../../data/quotesData';
import './Quotes.css';

const QuotesSection = () => (
    <section id="quotes" className="Section">
        <h2 className="Section-title">MEMORABLE QUOTES</h2>
        <div className="Section-subtitle">WORDS FROM THE HEROES</div>
        <div className="Quotes-container">
            {quotes.map((quote, index) => (
                <div key={index} className="Quote-box">
                    <blockquote className="Quote-text">"{quote.text}"</blockquote>
                    <cite className="Quote-author">- {quote.author}</cite>
                </div>
            ))}
        </div>
    </section>
);

export default QuotesSection;