import React, { useState } from 'react';
import { useBasket } from '../context/BasketContext';
import { useNavigate } from 'react-router-dom';
import './OrderPage.css';

const CreateOrderPage = () => {
    const navigate = useNavigate();
    const { basket, getBasketTotal, createOrder } = useBasket();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        paymentMethod: 'credit'
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = 'Valid email is required';
        }
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.zipCode.match(/^\d{5}$/)) {
            newErrors.zipCode = 'Valid ZIP code is required';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const order = createOrder({
            customer: formData,
            shippingAddress: `${formData.address}, ${formData.city}, ${formData.zipCode}`
        });

        navigate(`/order/${order.id}`);
    };

    if (basket.length === 0) {
        return (
            <div className="Section">
                <h2 className="Section-title">Your basket is empty</h2>
                <p>Add items to your basket before checking out.</p>
                <button onClick={() => navigate('/shop')}>
                    Return to Shop
                </button>
            </div>
        );
    }

    return (
        <main className="Order-page">
            <section className="Section">
                <h2 className="Section-title">CHECKOUT</h2>
                
                <div className="Order-container">
                    <form className="Order-form" onSubmit={handleSubmit}>
                        <h3>Shipping Information</h3>
                        
                        <div className="Form-group">
                            <label>Full Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? 'error' : ''}
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>

                        <div className="Form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="Form-group">
                            <label>Address *</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className={errors.address ? 'error' : ''}
                            />
                            {errors.address && <span className="error-message">{errors.address}</span>}
                        </div>

                        <div className="Form-row">
                            <div className="Form-group">
                                <label>City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className={errors.city ? 'error' : ''}
                                />
                                {errors.city && <span className="error-message">{errors.city}</span>}
                            </div>

                            <div className="Form-group">
                                <label>ZIP Code *</label>
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    className={errors.zipCode ? 'error' : ''}
                                />
                                {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                            </div>
                        </div>

                        <h3>Payment Method</h3>
                        <div className="Form-group">
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                            >
                                <option value="credit">Credit Card</option>
                                <option value="paypal">PayPal</option>
                                <option value="cash">Cash on Delivery</option>
                            </select>
                        </div>

                        <div className="Order-summary">
                            <h3>Order Total: ${(getBasketTotal() + 5.99).toFixed(2)}</h3>
                            <button type="submit" className="Submit-order">
                                Place Order
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default CreateOrderPage;