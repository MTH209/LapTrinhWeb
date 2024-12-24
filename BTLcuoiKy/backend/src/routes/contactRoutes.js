const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Create new contact message
router.post('/', contactController.createContact);

// Get all contact messages (admin)
router.get('/', contactController.getAllContacts);

// Get contact message by ID
router.get('/:id', contactController.getContactById);

// Get contact messages by email
router.get('/email/:email', contactController.getContactsByEmail);

// Delete contact message
router.delete('/:id', contactController.deleteContact);

module.exports = router;
