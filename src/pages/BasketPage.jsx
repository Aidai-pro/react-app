import React from 'react';
import { Link } from 'react-router-dom';
import BasketList from '../components/Basket/BasketList';
import './BasketPage.css';

const BasketPage = () => {
    return (
        <main className="Basket-page">
            <section className="Hero-section">
                <div className="Hero-content">
                    <h1>YOUR BASKET</h1>
                    <p>Review your Stranger Things merchandise</p>
                </div>
            </section>

            <section className="Section">
                <div className="Basket-container">
                    <div className="Basket-header">
                        <h2 className="Section-title">SHOPPING BASKET</h2>
                        <Link to="/shop" className="Continue-shopping">
                            ← Continue Shopping
                        </Link>
                    </div>
                    
                    <BasketList />
                </div>
            </section>
        </main>
    );
};

export default BasketPage;