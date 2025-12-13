import React from 'react';
import ProductCard from '../components/Basket/ProductCard';
import { strangerThingsProducts } from '../data/productsData';
import './ShopPage.css';

const ShopPage = () => {
    return (
        <main className="Shop-page">
            <section className="Hero-section">
                <div className="Hero-content">
                    <h1>STRANGER THINGS FAN SHOP</h1>
                    <p>Official merchandise from Hawkins, Indiana</p>
                </div>
            </section>

            <section className="Section">
                <h2 className="Section-title">OFFICIAL MERCHANDISE</h2>
                <div className="Section-subtitle">
                    Collectibles, apparel, and memorabilia from the Upside Down
                </div>

                <div className="Products-grid">
                    {strangerThingsProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default ShopPage;