const Cart = require('../models/cart');
const Product = require('../models/product');

const cartController = {
    // Add item to cart
    addToCart: async (req, res) => {
        try {
            const { user_id, product_id, quantity } = req.body;

            // Validate input
            if (!user_id || !product_id || !quantity) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Missing required fields'
                });
            }

            // Check if product exists
            const product = await Product.getById(product_id);
            if (!product) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Product not found'
                });
            }

            // Ensure the product quantity is valid
            if (product.quantity < quantity) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Not enough product quantity available'
                });
            }

            // Add to cart
            const cartId = await Cart.addItem(user_id, product_id, quantity);

            res.status(201).json({
                status: 'success',
                message: 'Item added to cart',
                data: { cart_id: cartId }
            });
        } catch (error) {
            console.error('Error in addToCart:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    },

    // Get user's cart
    getCart: async (req, res) => {
        try {
            const { user_id } = req.params;

            const cartItems = await Cart.getByUserId(user_id);

            res.json({
                status: 'success',
                data: cartItems
            });
        } catch (error) {
            console.error('Error in getCart:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    },

    // Update cart item quantity
    updateCartItem: async (req, res) => {
        try {
            const { cart_id } = req.params;
            const { quantity } = req.body;

            if (!quantity) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Quantity is required'
                });
            }

            const updated = await Cart.updateQuantity(cart_id, quantity);

            if (!updated) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Cart item not found'
                });
            }

            res.json({
                status: 'success',
                message: 'Cart item updated'
            });
        } catch (error) {
            console.error('Error in updateCartItem:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    },

    // Remove item from cart
    removeFromCart: async (req, res) => {
        try {
            const { cart_id } = req.params;

            const deleted = await Cart.removeItem(cart_id);

            if (!deleted) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Cart item not found'
                });
            }

            res.json({
                status: 'success',
                message: 'Item removed from cart'
            });
        } catch (error) {
            console.error('Error in removeFromCart:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    },

    // Clear user's cart
    clearCart: async (req, res) => {
        try {
            const { user_id } = req.params;

            const cleared = await Cart.clearCart(user_id);

            res.json({
                status: 'success',
                message: 'Cart cleared'
            });
        } catch (error) {
            console.error('Error in clearCart:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }
};

module.exports = cartController;
