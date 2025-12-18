import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        favoriteCharacter: '',
        favoriteSeason: '1'
    });
    
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');
    
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Очищаем ошибку при изменении поля
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.username.trim()) newErrors.username = 'Username is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
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
        
        // Подготовка данных для регистрации
        const userData = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            favoriteCharacter: formData.favoriteCharacter,
            favoriteSeason: formData.favoriteSeason,
            role: 'user'
        };
        
        const result = register(userData);
        
        if (result.success) {
    navigate('/'); 
} else {
            setServerError(result.message || 'Registration failed');
        }
    };

    return (
        <div className="Auth-page">
            <section className="Hero-section auth-hero">
                <div className="Hero-content">
                    <h1>JOIN HAWKINS</h1>
                    <p>Become part of the Stranger Things community</p>
                </div>
            </section>

            <section className="Section">
                <div className="Auth-container">
                    <h2 className="Section-title">CREATE ACCOUNT</h2>
                    
                    {serverError && (
                        <div className="error-message server-error">
                            {serverError}
                        </div>
                    )}
                    
                    <form className="Auth-form" onSubmit={handleSubmit}>
                        <div className="Form-group">
                            <label>Username *</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className={errors.username ? 'error' : ''}
                            />
                            {errors.username && <span className="error-message">{errors.username}</span>}
                        </div>

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

                        <div className="Form-row">
                            <div className="Form-group">
                                <label>Password *</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    className={errors.password ? 'error' : ''}
                                />
                                {errors.password && <span className="error-message">{errors.password}</span>}
                            </div>

                            <div className="Form-group">
                                <label>Confirm Password *</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                    className={errors.confirmPassword ? 'error' : ''}
                                />
                                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                            </div>
                        </div>

                        <div className="Form-row">
                            <div className="Form-group">
                                <label>Favorite Character</label>
                                <select
                                    name="favoriteCharacter"
                                    value={formData.favoriteCharacter}
                                    onChange={handleChange}
                                >
                                    <option value="">Select character</option>
                                    <option value="eleven">Eleven</option>
                                    <option value="mike">Mike Wheeler</option>
                                    <option value="dustin">Dustin Henderson</option>
                                    <option value="lucas">Lucas Sinclair</option>
                                    <option value="max">Max Mayfield</option>
                                    <option value="will">Will Byers</option>
                                    <option value="hopper">Jim Hopper</option>
                                    <option value="joyce">Joyce Byers</option>
                                    <option value="steve">Steve Harrington</option>
                                </select>
                            </div>

                            <div className="Form-group">
                                <label>Favorite Season</label>
                                <select
                                    name="favoriteSeason"
                                    value={formData.favoriteSeason}
                                    onChange={handleChange}
                                >
                                    <option value="1">Season 1</option>
                                    <option value="2">Season 2</option>
                                    <option value="3">Season 3</option>
                                    <option value="4">Season 4</option>
                                    <option value="5">Season 5</option>
                                </select>
                            </div>
                        </div>

                        <div className="Form-group terms">
                            <label className="checkbox-label">
                                <input type="checkbox" required />
                                <span>I agree to the Terms of Service and Privacy Policy</span>
                            </label>
                        </div>

                        <button type="submit" className="Auth-button">
                            CREATE ACCOUNT
                        </button>

                        <div className="Auth-links">
                            <p>
                                Already have an account? <Link to="/login">Sign In</Link>
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

export default RegisterPage;