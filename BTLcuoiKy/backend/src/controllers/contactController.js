const Contact = require('../models/contact');

const contactController = {
    // Create new contact message
    createContact: async (req, res) => {
        try {
            const { name, email, subject, message } = req.body;

            // Validate input
            if (!name || !email || !subject || !message) {
                return res.status(400).json({
                    status: 'error',
                    message: 'All fields are required'
                });
            }

            const contactId = await Contact.create({
                name,
                email,
                subject,
                message
            });

            res.status(201).json({
                status: 'success',
                message: 'Contact message sent successfully',
                data: { contact_id: contactId }
            });
        } catch (error) {
            console.error('Error in createContact:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    },

    // Get all contact messages (admin)
    getAllContacts: async (req, res) => {
        try {
            const contacts = await Contact.getAll();
            res.json({
                status: 'success',
                data: contacts
            });
        } catch (error) {
            console.error('Error in getAllContacts:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    },

    // Get contact message by ID
    getContactById: async (req, res) => {
        try {
            const contactId = req.params.id;
            const contact = await Contact.getById(contactId);
            
            if (!contact) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Contact message not found'
                });
            }

            res.json({
                status: 'success',
                data: contact
            });
        } catch (error) {
            console.error('Error in getContactById:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    },

    // Get contact messages by email
    getContactsByEmail: async (req, res) => {
        try {
            const email = req.params.email;
            const contacts = await Contact.getByEmail(email);
            res.json({
                status: 'success',
                data: contacts
            });
        } catch (error) {
            console.error('Error in getContactsByEmail:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    },

    // Delete contact message
    deleteContact: async (req, res) => {
        try {
            const contactId = req.params.id;
            const success = await Contact.delete(contactId);
            
            if (!success) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Contact message not found'
                });
            }

            res.json({
                status: 'success',
                message: 'Contact message deleted successfully'
            });
        } catch (error) {
            console.error('Error in deleteContact:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }
};

module.exports = contactController;
