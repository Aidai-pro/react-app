import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBasket } from '../context/BasketContext';
import './OrderPage.css';

const OrderPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getOrder, updateOrder, deleteOrder } = useBasket();
    
    const order = getOrder(parseInt(id));
    const [isEditing, setIsEditing] = useState(false);
    const [status, setStatus] = useState(order?.status || 'pending');

    if (!order) {
        return (
            <div className="Section">
                <h2 className="Section-title">Order Not Found</h2>
                <p>The order you're looking for doesn't exist.</p>
                <button onClick={() => navigate('/')}>
                    Return Home
                </button>
            </div>
        );
    }

    const handleStatusUpdate = () => {
        updateOrder(order.id, { status });
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            deleteOrder(order.id);
            navigate('/orders');
        }
    };

    return (
        <main className="Order-page">
            <section className="Section">
                <div className="Order-header">
                    <h2 className="Section-title">ORDER #{order.id}</h2>
                    <div className="Order-actions">
                        <button 
                            className="Edit-button"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Cancel' : 'Edit Status'}
                        </button>
                        <button 
                            className="Delete-button"
                            onClick={handleDelete}
                        >
                            Delete Order
                        </button>
                    </div>
                </div>

                <div className="Order-details">
                    <div className="Order-info">
                        <h3>Order Information</h3>
                        <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                        <p><strong>Status:</strong> 
                            {isEditing ? (
                                <select 
                                    value={status} 
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="Status-select"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            ) : (
                                <span className={`status-${order.status}`}>
                                    {order.status.toUpperCase()}
                                </span>
                            )}
                        </p>
                        {isEditing && (
                            <button 
                                className="Save-button"
                                onClick={handleStatusUpdate}
                            >
                                Save Changes
                            </button>
                        )}
                        
                        <h3>Customer Information</h3>
                        <p><strong>Name:</strong> {order.customer?.name}</p>
                        <p><strong>Email:</strong> {order.customer?.email}</p>
                        <p><strong>Address:</strong> {order.shippingAddress}</p>
                        <p><strong>Payment:</strong> {order.customer?.paymentMethod}</p>
                    </div>

                    <div className="Order-items">
                        <h3>Order Items</h3>
                        {order.items.map((item, index) => (
                            <div key={index} className="Order-item">
                                <div className="Order-item-image">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="Order-item-info">
                                    <h4>{item.title}</h4>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: ${item.price} each</p>
                                    <p className="item-total">
                                        Total: ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                        
                        <div className="Order-total">
                            <div className="Total-row">
                                <span>Subtotal:</span>
                                <span>${order.total.toFixed(2)}</span>
                            </div>
                            <div className="Total-row">
                                <span>Shipping:</span>
                                <span>$5.99</span>
                            </div>
                            <div className="Total-row grand-total">
                                <span>Total:</span>
                                <span>${(order.total + 5.99).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default OrderPage;