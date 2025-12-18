import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setServerError('');
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.password) newErrors.password = 'Password is required';
        
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        
        const result = login(formData.email, formData.password);
        
        if (result.success) {
    navigate('/'); 
} else {
            setServerError(result.message || 'Invalid email or password');
        }
    };

    return (
        <div className="Auth-page">
            <section className="Hero-section auth-hero">
                <div className="Hero-content">
                    <h1>WELCOME BACK</h1>
                    <p>Return to the Upside Down community</p>
                </div>
            </section>

            <section className="Section">
                <div className="Auth-container">
                    <h2 className="Section-title">SIGN IN</h2>
                    
                    {serverError && (
                        <div className="error-message server-error">
                            {serverError}
                        </div>
                    )}
                    
                    <form className="Auth-form" onSubmit={handleSubmit}>
                        <div className="Form-group">
                            <label>Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="Form-group">
                            <label>Password *</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className={errors.password ? 'error' : ''}
                            />
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        <div className="Form-group remember">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                />
                                <span>Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="forgot-password">
                                Forgot password?
                            </Link>
                        </div>

                        <button type="submit" className="Auth-button">
                            SIGN IN
                        </button>

                        <div className="Auth-links">
                            <p>
                                Don't have an account? <Link to="/register">Sign Up</Link>
                            </p>
                            <p>
                                <Link to="/">← Back to Home</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default LoginPage;