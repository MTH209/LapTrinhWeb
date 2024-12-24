const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create new order
router.post('/', orderController.createOrder);

// Get order by ID
router.get('/:id', orderController.getOrderById);

// Get user's orders
router.get('/user/:user_id', orderController.getUserOrders);

// Get all orders (admin)
router.get('/', orderController.getAllOrders);

// Update order status
router.put('/:id/status', orderController.updateOrderStatus);

// Get orders by status
router.get('/status/:status', orderController.getOrdersByStatus);

module.exports = router;
