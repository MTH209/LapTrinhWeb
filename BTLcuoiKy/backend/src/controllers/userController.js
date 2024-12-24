const User = require('../models/user');

const userController = {
    // Register new user
    register: async (req, res) => {
        try {
            const { fullName, email, password, phone, address } = req.body;

            // Check if user already exists
            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Email already registered'
                });
            }

            // Create new user
            const newUser = await User.create({
                fullName,
                email,
                password,
                phone,
                address
            });

            res.status(201).json({
                status: 'success',
                message: 'User registered successfully',
                data: {
                    user_id: newUser.user_id,
                    fullName: newUser.fullName,
                    email: newUser.email,
                    phone: newUser.phone,
                    address: newUser.address
                }
            });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error registering user'
            });
        }
    },

    // Login user
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Find user by email
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid email or password'
                });
            }

            // Simple password check
            if (password !== user.password) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid email or password'
                });
            }

            res.json({
                status: 'success',
                message: 'Login successful',
                data: {
                    user_id: user.user_id,
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone,
                    address: user.address
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error logging in'
            });
        }
    },

    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.getAll();
            res.json({
                status: 'success',
                data: users
            });
        } catch (error) {
            console.error('Error getting users:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error retrieving users'
            });
        }
    },

    // Get user by ID
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            
            if (!user) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found'
                });
            }

            res.json({
                status: 'success',
                data: {
                    user_id: user.user_id,
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone,
                    address: user.address
                }
            });
        } catch (error) {
            console.error('Error getting user:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error retrieving user'
            });
        }
    },

    // Update user
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { fullName, email, phone, address } = req.body;

            // Check if user exists
            const existingUser = await User.findById(id);
            if (!existingUser) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found'
                });
            }

            // Update user
            const updatedUser = await User.update(id, {
                fullName,
                email,
                phone,
                address
            });

            res.json({
                status: 'success',
                message: 'User updated successfully',
                data: {
                    user_id: updatedUser.user_id,
                    fullName: updatedUser.fullName,
                    email: updatedUser.email,
                    phone: updatedUser.phone,
                    address: updatedUser.address
                }
            });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error updating user'
            });
        }
    },

    // Delete user
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;

            // Check if user exists
            const existingUser = await User.findById(id);
            if (!existingUser) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found'
                });
            }

            // Delete user
            await User.delete(id);

            res.json({
                status: 'success',
                message: 'User deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error deleting user'
            });
        }
    }
};

module.exports = userController;