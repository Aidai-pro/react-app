import React from 'react';
import { useBasket } from '../../context/BasketContext';

const ProductCard = ({ product }) => {
    const { addToBasket, basket } = useBasket();
    const inBasket = basket.find(item => item.id === product.id);

    const handleAddToBasket = () => {
        addToBasket(product);
    };

    return (
        <div className="Product-card">
            <div 
                className="Product-image"
                style={{ backgroundImage: `url(${product.image})` }}
            />
            <div className="Product-content">
                <h3 className="Product-title">{product.title}</h3>
                <p className="Product-description">{product.description}</p>
                
                <div className="Product-info">
                    <div className="Product-price">${product.price}</div>
                    <div className="Product-rating">
                        ⭐ {product.rating.rate} ({product.rating.count})
                    </div>
                </div>
                
                <button 
                    className={`Product-button ${inBasket ? 'in-basket' : ''}`}
                    onClick={handleAddToBasket}
                >
                    {inBasket ? 'Добавлено в корзину' : 'Добавить в корзину'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;