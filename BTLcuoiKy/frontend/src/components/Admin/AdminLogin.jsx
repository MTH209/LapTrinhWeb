import React, { useState } from 'react';
import axios from 'axios';
import './AdminLogin.css';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/admin/login', credentials);
            if (response.data.status === 'success') {
                // Store admin status in localStorage
                localStorage.setItem('isAdmin', 'true');
                // Redirect to admin dashboard using window.location
                window.location.href = '/admin/dashboard';
            }
        } catch (error) {
            setError('Invalid admin credentials');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <h2>Admin Login</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            value={credentials.email}
                            onChange={handleChange}
                            placeholder="Enter admin email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Enter admin password"
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
