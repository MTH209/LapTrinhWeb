import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import Login from './Login/Login';

const Navbar = ({ cartItems, onCartClick, currentView, onViewChange }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userId'));
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        const checkLoginStatus = () => {
            setIsLoggedIn(!!localStorage.getItem('userId'));
        };
        window.addEventListener('storage', checkLoginStatus);
        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setShowLogin(false);
    };

    return (
        <>
            <nav className="navbar">
                <div className="nav-brand">
                    <h1>Food Order</h1>
                </div>
                <div className="nav-links">
                    <button 
                        className={`nav-link ${currentView === 'menu' ? 'active' : ''}`}
                        onClick={() => onViewChange('menu')}>
                        Menu
                    </button>
                    <button 
                        className={`nav-link ${currentView === 'contact' ? 'active' : ''}`}
                        onClick={() => onViewChange('contact')}>
                        Contact
                    </button>
                    <button 
                        className="nav-link cart-link"
                        onClick={onCartClick}>
                        <FaShoppingCart />
                        {cartItems > 0 && <span className="cart-count">{cartItems}</span>}
                    </button>
                    {isLoggedIn ? (
                        <>
                            <button className="nav-link">
                                <FaUser />
                            </button>
                            <button onClick={handleLogout} className="nav-link logout-btn">
                                Logout
                            </button>
                        </>
                    ) : (
                        <button 
                            className="nav-link"
                            onClick={() => setShowLogin(true)}>
                            Login
                        </button>
                    )}
                </div>
            </nav>
            {showLogin && (
                <Login 
                    onClose={() => setShowLogin(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </>
    );
};

export default Navbar;