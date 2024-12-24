const db = require('../configs/database');

const Cart = {
    // Add item to cart
    addItem: async (userId, productId, quantity) => {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO carts (user_id, product_id, quantity) VALUES (?, ?, ?)',
                [userId, productId, quantity],
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result.insertId);
                    }
                }
            );
        });
    },

    // Get cart items by user ID
    getByUserId: async (userId) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT c.*, p.product_name, p.price, p.image_url 
                 FROM carts c 
                 JOIN products p ON c.product_id = p.product_id 
                 WHERE c.user_id = ?`,
                [userId],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    },

    // Update cart item quantity
    updateQuantity: async (cartId, quantity) => {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE carts SET quantity = ? WHERE cart_id = ?',
                [quantity, cartId],
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result.affectedRows > 0);
                    }
                }
            );
        });
    },

    // Remove item from cart
    removeItem: async (cartId) => {
        return new Promise((resolve, reject) => {
            db.query(
                'DELETE FROM carts WHERE cart_id = ?',
                [cartId],
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result.affectedRows > 0);
                    }
                }
            );
        });
    },

    // Clear user's cart
    clearCart: async (userId) => {
        return new Promise((resolve, reject) => {
            db.query(
                'DELETE FROM carts WHERE user_id = ?',
                [userId],
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result.affectedRows > 0);
                    }
                }
            );
        });
    }
};

module.exports = Cart;