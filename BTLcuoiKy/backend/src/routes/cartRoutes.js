const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add item to cart
router.post('/', cartController.addToCart);

// Get user's cart
router.get('/user/:user_id', cartController.getCart);

// Update cart item quantity
router.put('/:cart_id', cartController.updateCartItem);

// Remove item from cart
router.delete('/:cart_id', cartController.removeFromCart);

// Clear user's cart
router.delete('/user/:user_id', cartController.clearCart);

module.exports = router;
