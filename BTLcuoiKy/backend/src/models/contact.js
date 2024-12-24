const db = require('../configs/database');

const Contact = {
    // Create new contact message
    create: async (contactData) => {
        try {
            const { name, email, subject, message } = contactData;
            return new Promise((resolve, reject) => {
                db.query(
                    'INSERT INTO contact (name, email, subject, message, created_date) VALUES (?, ?, ?, ?, NOW())',
                    [name, email, subject, message],
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

    // Get all contact messages
    getAll: async () => {
        try {
            return new Promise((resolve, reject) => {
                db.query(
                    'SELECT * FROM contact ORDER BY created_date DESC',
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

    // Get contact message by ID
    getById: async (contactId) => {
        try {
            return new Promise((resolve, reject) => {
                db.query(
                    'SELECT * FROM contact WHERE contact_id = ?',
                    [contactId],
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

    // Get contact messages by email
    getByEmail: async (email) => {
        try {
            return new Promise((resolve, reject) => {
                db.query(
                    'SELECT * FROM contact WHERE email = ? ORDER BY created_date DESC',
                    [email],
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

    // Delete contact message
    delete: async (contactId) => {
        try {
            return new Promise((resolve, reject) => {
                db.query(
                    'DELETE FROM contact WHERE contact_id = ?',
                    [contactId],
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

module.exports = Contact;