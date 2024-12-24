const db = require('../configs/database');

const Product = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM products WHERE isactive = 1',
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                }
            );
        });
    },

    getById: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'SELECT * FROM products WHERE product_id = ? AND isactive = 1',
                [id],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results[0]);
                }
            );
        });
    },

    create: (productData) => {
        return new Promise((resolve, reject) => {
            const { product_name, price, quantity, image_url, category_id, isactive, created_date } = productData;
            db.query(
                'INSERT INTO products (product_name, price, quantity, image_url, category_id, isactive, created_date) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [product_name, price, quantity, image_url, category_id, isactive, created_date],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve({ ...productData, product_id: results.insertId });
                }
            );
        });
    },

    update: (id, productData) => {
        return new Promise((resolve, reject) => {
            const updateFields = [];
            const updateValues = [];
            
            // Only include fields that are present in productData
            if (productData.product_name !== undefined) {
                updateFields.push('product_name = ?');
                updateValues.push(productData.product_name);
            }
            if (productData.price !== undefined) {
                updateFields.push('price = ?');
                updateValues.push(productData.price);
            }
            if (productData.quantity !== undefined) {
                updateFields.push('quantity = ?');
                updateValues.push(productData.quantity);
            }
            if (productData.image_url !== undefined) {
                updateFields.push('image_url = ?');
                updateValues.push(productData.image_url);
            }
            if (productData.category_id !== undefined) {
                updateFields.push('category_id = ?');
                updateValues.push(productData.category_id);
            }
            if (productData.isactive !== undefined) {
                updateFields.push('isactive = ?');
                updateValues.push(productData.isactive);
            }

            // Add the ID to the values array
            updateValues.push(id);

            const query = `UPDATE products SET ${updateFields.join(', ')} WHERE product_id = ? AND isactive = 1`;
            
            db.query(
                query,
                updateValues,
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    if (results.affectedRows === 0) {
                        resolve(null);
                    } else {
                        resolve({ ...productData, product_id: id });
                    }
                }
            );
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                'UPDATE products SET isactive = 0 WHERE product_id = ? AND isactive = 1',
                [id],
                (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results.affectedRows > 0);
                }
            );
        });
    }
};

module.exports = Product;