const Order = require('../models/order');
const Product = require('../models/product');

const orderController = {
    // Create new order
    createOrder: async (req, res) => {
        try {
            const { user_id, product_id, quantity, status } = req.body;

            // Validate input
            if (!user_id || !product_id || !quantity) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Missing required fields'
                });
            }

            // Create order
            const orderId = await Order.create({
                user_id,
                product_id,
                quantity,
                status: status || 'pending'
            });

            res.status(201).json({
                status: 'success',
                message: 'Order created successfully',
                data: { order_id: orderId }
            });
        } catch (error) {
            console.error('Error in createOrder:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    },

    // Get order by ID
    getOrderById: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await Order.getById(id);

            if (!order) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Order not found'
                });
            }

            res.json({
                status: 'success',
                data: order
            });
        } catch (error) {
            console.error('Error in getOrderById:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    },

    // Get user's orders
    getUserOrders: async (req, res) => {
        try {
            const { user_id } = req.params;
            const orders = await Order.getByUserId(user_id);

            res.json({
                status: 'success',
                data: orders
            });
        } catch (error) {
            console.error('Error in getUserOrders:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    },

    // Get all orders (admin)
    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.getAll();
            res.json({
                status: 'success',
                data: orders
            });
        } catch (error) {
            console.error('Error in getAllOrders:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    },

    // Update order status
    updateOrderStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (!status) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Status is required'
                });
            }

            const updated = await Order.updateStatus(id, status);

            if (!updated) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Order not found'
                });
            }

            res.json({
                status: 'success',
                message: 'Order status updated successfully'
            });
        } catch (error) {
            console.error('Error in updateOrderStatus:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    },

    // Get orders by status
    getOrdersByStatus: async (req, res) => {
        try {
            const { status } = req.params;
            const orders = await Order.getByStatus(status);

            res.json({
                status: 'success',
                data: orders
            });
        } catch (error) {
            console.error('Error in getOrdersByStatus:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }
};

module.exports = orderController;
