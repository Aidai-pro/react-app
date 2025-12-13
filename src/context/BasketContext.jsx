import React, { createContext, useState, useContext, useEffect } from 'react';

const BasketContext = createContext();

export const useBasket = () => {
    const context = useContext(BasketContext);
    if (!context) {
        throw new Error('useBasket must be used within BasketProvider');
    }
    return context;
};

export const BasketProvider = ({ children }) => {
    const [basket, setBasket] = useState([]);
    const [orders, setOrders] = useState([]);

    // Загрузка из localStorage при монтировании
    useEffect(() => {
        const savedBasket = localStorage.getItem('strangerThingsBasket');
        const savedOrders = localStorage.getItem('strangerThingsOrders');
        
        if (savedBasket) setBasket(JSON.parse(savedBasket));
        if (savedOrders) setOrders(JSON.parse(savedOrders));
    }, []);

    // Сохранение в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('strangerThingsBasket', JSON.stringify(basket));
    }, [basket]);

    useEffect(() => {
        localStorage.setItem('strangerThingsOrders', JSON.stringify(orders));
    }, [orders]);

    // Функции для корзины
    const addToBasket = (product, quantity = 1) => {
        setBasket(prevBasket => {
            const existingItem = prevBasket.find(item => item.id === product.id);
            
            if (existingItem) {
                return prevBasket.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevBasket, { ...product, quantity }];
            }
        });
    };

    const removeFromBasket = (productId) => {
        setBasket(prevBasket => prevBasket.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromBasket(productId);
        } else {
            setBasket(prevBasket =>
                prevBasket.map(item =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        }
    };

    const clearBasket = () => {
        setBasket([]);
    };

    const getBasketTotal = () => {
        return basket.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getBasketCount = () => {
        return basket.reduce((count, item) => count + item.quantity, 0);
    };

    // Функции для заказов
    const createOrder = (orderData) => {
        const newOrder = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: [...basket],
            total: getBasketTotal(),
            ...orderData,
            status: 'pending'
        };
        
        setOrders(prevOrders => [...prevOrders, newOrder]);
        clearBasket();
        return newOrder;
    };

    const updateOrder = (orderId, updates) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, ...updates } : order
            )
        );
    };

    const deleteOrder = (orderId) => {
        setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    };

    const getOrder = (orderId) => {
        return orders.find(order => order.id === orderId);
    };

    const value = {
        basket,
        orders,
        addToBasket,
        removeFromBasket,
        updateQuantity,
        clearBasket,
        getBasketTotal,
        getBasketCount,
        createOrder,
        updateOrder,
        deleteOrder,
        getOrder
    };

    return (
        <BasketContext.Provider value={value}>
            {children}
        </BasketContext.Provider>
    );
};