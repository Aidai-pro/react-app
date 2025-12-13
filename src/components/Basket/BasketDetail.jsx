import React from 'react';
import { useBasket } from '../../context/BasketContext';

const BasketDetail = ({ item }) => {
    const { removeFromBasket, updateQuantity } = useBasket();

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        updateQuantity(item.id, newQuantity);
    };

    const handleRemove = () => {
        removeFromBasket(item.id);
    };

    return (
        <div className="Basket-item">
            <div 
                className="Basket-item-image"
                style={{ backgroundImage: `url(${item.image})` }}
            />
            
            <div className="Basket-item-info">
                <h4>{item.title}</h4>
                <p className="item-description">{item.description}</p>
                
                <div className="Basket-item-controls">
                    <div className="Quantity-selector">
                        <label>Qty:</label>
                        <select 
                            value={item.quantity} 
                            onChange={handleQuantityChange}
                        >
                            {[1,2,3,4,5,6,7,8,9,10].map(num => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="Item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                    </div>
                </div>
            </div>
            
            <button 
                className="Remove-button"
                onClick={handleRemove}
            >
                ✕
            </button>
        </div>
    );
};

export default BasketDetail;