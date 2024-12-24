const db = require('../configs/database');

const Category = {
    // Get all active categories
    getAll: async () => {
        try {
            return new Promise((resolve, reject) => {
                db.query(
                    'SELECT * FROM categories WHERE category_isactive = 1',
                    (err, results) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(results);
                    }
                );
            });
        } catch (error) {
            throw error;
        }
    },

    // Get category by ID
    getById: async (categoryId) => {
        try {
            return new Promise((resolve, reject) => {
                db.query(
                    'SELECT * FROM categories WHERE category_id = ? AND category_isactive = 1',
                    [categoryId],
                    (err, results) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(results[0]);
                    }
                );
            });
        } catch (error) {
            throw error;
        }
    },

    // Create new category
    create: async (categoryData) => {
        try {
            const { category_name } = categoryData;
            return new Promise((resolve, reject) => {
                db.query(
                    'INSERT INTO categories (category_name, category_isactive, created_date) VALUES (?, 1, NOW())',
                    [category_name],
                    (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(result.insertId);
                    }
                );
            });
        } catch (error) {
            throw error;
        }
    },

    // Update category
    update: async (categoryId, categoryData) => {
        try {
            const { category_name } = categoryData;
            return new Promise((resolve, reject) => {
                db.query(
                    'UPDATE categories SET category_name = ? WHERE category_id = ?',
                    [category_name, categoryId],
                    (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(result.affectedRows > 0);
                    }
                );
            });
        } catch (error) {
            throw error;
        }
    },

    // Soft delete category (set category_isactive = 0)
    delete: async (categoryId) => {
        try {
            return new Promise((resolve, reject) => {
                db.query(
                    'UPDATE categories SET category_isactive = 0 WHERE category_id = ?',
                    [categoryId],
                    (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(result.affectedRows > 0);
                    }
                );
            });
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Category;