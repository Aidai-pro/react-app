import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('strangerThingsUser');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                localStorage.removeItem('strangerThingsUser');
            }
        }
    }, []);

    const register = (userData) => {
        const users = JSON.parse(localStorage.getItem('strangerThingsUsers') || '[]');
        
        // Проверка на существующего пользователя
        if (users.find(u => u.email === userData.email)) {
            return { success: false, message: 'User already exists' };
        }

        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('strangerThingsUsers', JSON.stringify(users));
        
        // Автовход после регистрации
        setUser(newUser);
        localStorage.setItem('strangerThingsUser', JSON.stringify(newUser));
        
        return { success: true, user: newUser };
    };

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('strangerThingsUsers') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('strangerThingsUser', JSON.stringify(foundUser));
            return { success: true, user: foundUser };
        }
        
        return { success: false, message: 'Invalid email or password' };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('strangerThingsUser');
    };

    const value = {
        user,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};