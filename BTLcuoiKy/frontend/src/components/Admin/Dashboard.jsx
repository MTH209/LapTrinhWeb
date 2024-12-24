import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHome, FaBox, FaShoppingCart, FaTruck, FaUsers, FaMoneyBill, FaComments } from 'react-icons/fa';
import { FaList } from 'react-icons/fa';
import './Dashboard.css';
import Category from './Category';
import Product from './Product';
import Order from './Order';
import User from './User';
import Contact from './Contact';

const Dashboard = () => {
    const [stats, setStats] = useState({
        categories: { total: 0 },
        products: { total: 0 },
        orders: { total: 0, pending: 0, delivered: 0 },
        users: { total: 0 },
        sales: { total: 0 },
        feedback: { total: 0 }
    });
    const [currentView, setCurrentView] = useState('dashboard');

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const response = await axios.get('http://localhost:3000/admin/dashboard', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setStats(response.data.data);
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            }
        };

        fetchDashboardStats();
    }, []);

    const StatCard = ({ icon: Icon, title, value, color, onClick }) => (
        <div className="stat-card" onClick={onClick} style={{ cursor: 'pointer' }}>
            <div className={`icon-container ${color}`}>
                <Icon className="icon" />
            </div>
            <div className="stat-info">
                <h3>{title}</h3>
                <p className="stat-value">{value}</p>
                <button className="view-details-btn">View Details</button>
            </div>
        </div>
    );

    const renderView = () => {
        switch (currentView) {
            case 'categories':
                return <Category />;
            case 'products':
                return <Product />;
            case 'orders':
                return <Order />;
            case 'users':
                return <User />;
            case 'contacts':
                return <Contact />;
            case 'dashboard':
            default:
                return (
                    <>
                        <div className="dashboard-header">
                            <h1>Dashboard</h1>
                            <p>Welcome to the admin dashboard</p>
                        </div>

                        <div className="stats-grid">
                            <StatCard
                                icon={FaHome}
                                title="Categories"
                                value={stats.categories.total}
                                color="blue"
                                onClick={() => setCurrentView('categories')}
                            />
                            <StatCard
                                icon={FaBox}
                                title="Products"
                                value={stats.products.total}
                                color="pink"
                                onClick={() => setCurrentView('products')}
                            />
                            <StatCard
                                icon={FaShoppingCart}
                                title="Total Orders"
                                value={stats.orders.total}
                                color="blue"
                                onClick={() => setCurrentView('orders')}
                            />
                            <StatCard
                                icon={FaTruck}
                                title="Delivered Items"
                                value={stats.orders.delivered}
                                color="pink"
                            />
                            <StatCard
                                icon={FaShoppingCart}
                                title="Pending Items"
                                value={stats.orders.pending}
                                color="pink"
                            />
                            <StatCard
                                icon={FaUsers}
                                title="Users"
                                value={stats.users.total}
                                color="blue"
                                onClick={() => setCurrentView('users')}
                            />
                            <StatCard
                                icon={FaMoneyBill}
                                title="Sold Amount"
                                value={`${stats.sales.total}Đ`}
                                color="pink"
                            />
                            <StatCard
                                icon={FaComments}
                                title="Feedbacks"
                                value={stats.feedback.total}
                                color="pink"
                            />
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-nav">
                <button 
                    className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setCurrentView('dashboard')}
                >
                    <FaHome /> Dashboard
                </button>
                <button 
                    className={`nav-btn ${currentView === 'categories' ? 'active' : ''}`}
                    onClick={() => setCurrentView('categories')}
                >
                    <FaList /> Categories
                </button>
                <button 
                    className={`nav-btn ${currentView === 'products' ? 'active' : ''}`}
                    onClick={() => setCurrentView('products')}
                >
                    <FaBox /> Products
                </button>
                <button 
                    className={`nav-btn ${currentView === 'orders' ? 'active' : ''}`}
                    onClick={() => setCurrentView('orders')}
                >
                    <FaShoppingCart /> Orders
                </button>
                <button 
                    className={`nav-btn ${currentView === 'users' ? 'active' : ''}`}
                    onClick={() => setCurrentView('users')}
                >
                    <FaUsers /> Users
                </button>
                <button 
                    className={`nav-btn ${currentView === 'contacts' ? 'active' : ''}`}
                    onClick={() => setCurrentView('contacts')}
                >
                    <FaComments /> Contacts
                </button>
            </div>
            {renderView()}
        </div>
    );
};

export default Dashboard;
