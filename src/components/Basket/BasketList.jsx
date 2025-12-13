import React from 'react';
import { useBasket } from '../../context/BasketContext';
import { Link } from 'react-router-dom';
import BasketDetail from './BasketDetail';
import './Basket.css';

const BasketList = () => {
    const { basket, getBasketTotal, getBasketCount, clearBasket } = useBasket();

    if (basket.length === 0) {
        return (
            <div className="Empty-basket">
                <h3>Your basket is empty</h3>
                <p>Add some Stranger Things merchandise to get started!</p>
                <Link to="/shop" className="Shop-button">
                    Browse Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="Basket-list">
            <div className="Basket-items">
                {basket.map(item => (
                    <BasketDetail key={item.id} item={item} />
                ))}
            </div>

            <div className="Basket-summary">
                <h3>Order Summary</h3>
                
                <div className="Summary-row">
                    <span>Items ({getBasketCount()}):</span>
                    <span>${getBasketTotal().toFixed(2)}</span>
                </div>
                
                <div className="Summary-row">
                    <span>Shipping:</span>
                    <span>$5.99</span>
                </div>
                
                <div className="Summary-row total">
                    <span>Total:</span>
                    <span>${(getBasketTotal() + 5.99).toFixed(2)}</span>
                </div>

                <div className="Basket-actions">
                    <button 
                        className="Clear-button"
                        onClick={clearBasket}
                    >
                        Clear Basket
                    </button>
                    
                    <Link 
                        to="/create-order" 
                        className="Checkout-button"
                    >
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BasketList;