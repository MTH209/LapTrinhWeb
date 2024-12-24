const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


// Admin login
router.post('/login', adminController.adminLogin);

// Get dashboard statistics (protected by admin middleware)
router.get('/dashboard', adminController.getDashboardStats);

module.exports = router;
