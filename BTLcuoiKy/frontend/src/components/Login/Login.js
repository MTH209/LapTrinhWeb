import React, { useState } from 'react';
import './Login.css';
import authService from '../../services/authService';

const Login = ({ onClose, onLoginSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [registerData, setRegisterData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
    });

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        try {
            const response = await authService.login(formData.email, formData.password);
            if (response.status === 'success') {
                setSuccess('Login successful!');
                if (onLoginSuccess) {
                    onLoginSuccess(response.data);
                }
                setTimeout(() => {
                    onClose();
                }, 1500);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (registerData.password !== registerData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const userData = {
                fullName: registerData.fullName,
                email: registerData.email,
                password: registerData.password,
                phone: registerData.phone,
                address: registerData.address,
            };

            const response = await authService.register(userData);
            if (response.status === 'success') {
                setSuccess('Registration successful! Please login.');
                setTimeout(() => {
                    setIsLogin(true);
                    setRegisterData({
                        fullName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        phone: '',
                        address: '',
                    });
                }, 1500);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="login-container" onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}>
            <div className="login-modal">
                <button className="close-button" onClick={onClose}>×</button>
                <div className="form-toggle">
                    <button 
                        className={isLogin ? 'active' : ''} 
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button 
                        className={!isLogin ? 'active' : ''} 
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                {isLogin ? (
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleLoginChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleLoginChange}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                ) : (
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={registerData.fullName}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={registerData.email}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={registerData.confirmPassword}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={registerData.phone}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={registerData.address}
                                onChange={handleRegisterChange}
                                required
                            />
                        </div>
                        <button type="submit">Register</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;