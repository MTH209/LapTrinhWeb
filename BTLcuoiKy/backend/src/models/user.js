const db = require('../configs/database');

const User = {
    // Get all users (excluding passwords)
    getAll: async () => {
        try {
            return new Promise((resolve, reject) => {
                db.query(
                    'SELECT user_id, fullName, email, phone, address FROM users',
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

    // Create new user
    create: async ({ fullName, email, password, phone, address }) => {
        try {
            return new Promise((resolve, reject) => {
                db.query(
                    'INSERT INTO users (fullName, email, password, phone, address) VALUES (?, ?, ?, ?, ?)',
                    [fullName, email, password, phone, address],
                    (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        // Get the created user (excluding password)
                        if (result.insertId) {
                            db.query(
                                'SELECT user_id, fullName, email, phone, address FROM users WHERE user_id = ?',
                                [result.insertId],
                                (err, users) => {
                                    if (err) {
                                        reject(err);
                                        return;
                                    }
                                    resolve(users[0]);
                                }
                            );
                        } else {
                            resolve(null);
                        }
                    }
                );
            });
        } catch (error) {
            throw error;
        }
    },

    // Find user by email (including password for login verification)
    findByEmail: async (email) => {
        try {
            return new Promise((resolve, reject) => {
                db.query(
                    'SELECT * FROM users WHERE email = ?',
                    [email],
                    (err, users) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(users[0]);
                    }
                );
            });
        } catch (error) {
            throw error;
        }
    },

    // Find user by ID
    findById: async (id) => {
        try {
            return new Promise((resolve, reject) => {
                db.query(
                    'SELECT user_id, fullName, email, phone, address FROM users WHERE user_id = ?',
                    [id],
                    (err, users) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(users[0]);
                    }
                );
            });
        } catch (error) {
            throw error;
        }
    },

    // Update user
    update: async (id, { fullName, email, phone, address }) => {
        try {
            return new Promise((resolve, reject) => {
                db.query(
                    'UPDATE users SET fullName = ?, email = ?, phone = ?, address = ? WHERE user_id = ?',
                    [fullName, email, phone, address, id],
                    (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (result.affectedRows > 0) {
                            // Get updated user
                            db.query(
                                'SELECT user_id, fullName, email, phone, address FROM users WHERE user_id = ?',
                                [id],
                                (err, users) => {
                                    if (err) {
                                        reject(err);
                                        return;
                                    }
                                    resolve(users[0]);
                                }
                            );
                        } else {
                            resolve(null);
                        }
                    }
                );
            });
        } catch (error) {
            throw error;
        }
    },

    // Change password
    changePassword: async (id, newPassword) => {
        try {
            return new Promise((resolve, reject) => {
                db.query(
                    'UPDATE users SET password = ? WHERE user_id = ?',
                    [newPassword, id],
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

    // Verify password
    verifyPassword: (inputPassword, storedPassword) => {
        return inputPassword === storedPassword;
    },

    // Delete user
    delete: async (id) => {
        try {
            return new Promise((resolve, reject) => {
                db.query(
                    'DELETE FROM users WHERE user_id = ?',
                    [id],
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

module.exports = User;