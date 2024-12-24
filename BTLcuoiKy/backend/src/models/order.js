const db = require('../configs/database');

const Order = {
    // Create new order
    create: async (orderData) => {
        return new Promise((resolve, reject) => {
            const { user_id, product_id, quantity, status } = orderData;
            db.query(
                'INSERT INTO orders (user_id, product_id, quantity, status) VALUES (?, ?, ?, ?)',
                [user_id, product_id, quantity, status],
                (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result.insertId);
                }
            );
        });
    },

    // Get order by ID
    getById: async (orderId) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT o.*, p.product_name, p.price 
                 FROM orders o 
                 JOIN products p ON o.product_id = p.product_id 
                 WHERE o.order_id = ?`,
                [orderId],
                (err, results) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(results[0]);
                }
            );
        });
    },

    // Get orders by user ID
    getByUserId: async (userId) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT o.*, p.product_name, p.price 
                 FROM orders o 
                 JOIN products p ON o.product_id = p.product_id 
                 WHERE o.user_id = ?
                 ORDER BY o.order_date DESC`,
                [userId],
                (err, results) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(results);
                }
            );
        });
    },

    // Get all orders (for admin)
    getAll: async () => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT o.*, p.product_name, p.price 
                 FROM orders o 
                 JOIN products p ON o.product_id = p.product_id 
                 ORDER BY o.order_date DESC`,
                (err, results) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(results);
                }
            );
        });
    },

    // Update order status
    updateStatus: async (orderId, status) => {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE orders SET status = ? WHERE order_id = ?',
                [status, orderId],
                (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result.affectedRows > 0);
                }
            );
        });
    },

    // Get orders by status
    getByStatus: async (status) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT o.*, p.product_name, p.price 
                 FROM orders o 
                 JOIN products p ON o.product_id = p.product_id 
                 WHERE o.status = ?
                 ORDER BY o.order_date DESC`,
                [status],
                (err, results) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(results);
                }
            );
        });
    }
};

module.exports = Order;