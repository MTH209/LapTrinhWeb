const Product = require('../models/product');
const Category = require('../models/category');
const Order = require('../models/order');
const User = require('../models/user');
const Contact = require('../models/contact');

const adminController = {
    // Admin login
    adminLogin: (req, res) => {
        const { email, password } = req.body;

        // Simple admin credentials check
        if (email === 'admin' && password === 'admin') {
            res.json({
                status: 'success',
                message: 'Admin login successful',
                data: {
                    email: 'admin',
                    role: 'admin'
                }
            });
        } else {
            res.status(401).json({
                status: 'error',
                message: 'Invalid admin credentials'
            });
        }
    },

    // Get dashboard statistics
    getDashboardStats: async (req, res) => {
        try {
            // Get all products
            const products = await Product.getAll();
            
            // Get all categories
            const categories = await Category.getAll();
            
            // Get all orders
            const orders = await Order.getAll();
            
            // Get feedback/contact messages
            const feedback = await Contact.getAll();

            // Get all users
            const users = await User.getAll();

            // Calculate statistics
            const pendingOrders = orders.filter(order => order.status.toLowerCase() === 'pending');
            const deliveredOrders = orders.filter(order => order.status.toLowerCase() === 'delivered');
            const totalSales = deliveredOrders.reduce((total, order) => total + (order.price * order.quantity), 0);

            res.json({
                status: 'success',
                data: {
                    categories: {
                        total: categories.length
                    },
                    products: {
                        total: products.length
                    },
                    orders: {
                        total: orders.length,
                        pending: pendingOrders.length,
                        delivered: deliveredOrders.length
                    },
                    users: {
                        total: users.length
                    },
                    sales: {
                        total: totalSales
                    },
                    feedback: {
                        total: feedback.length
                    }
                }
            });
        } catch (error) {
            console.error('Error in getDashboardStats:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }
};

module.exports = adminController;
