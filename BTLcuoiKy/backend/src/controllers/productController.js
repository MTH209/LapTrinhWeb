const Product = require('../models/product');
const path = require('path');
const fs = require('fs');

const productController = {
    // Get all products
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.getAll();
            res.json({
                status: 'success',
                data: products
            });
        } catch (error) {
            console.error('Error getting products:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error getting products'
            });
        }
    },

    // Get product by ID
    getProductById: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.getById(id);

            if (!product) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Product not found'
                });
            }

            res.json({
                status: 'success',
                data: product
            });
        } catch (error) {
            console.error('Error in getProductById:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    },

    // Get products by category
    getProductsByCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const products = await Product.getByCategory(categoryId);

            res.json({
                status: 'success',
                data: products
            });
        } catch (error) {
            console.error('Error in getProductsByCategory:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    },

    // Create new product
    createProduct: async (req, res) => {
        try {
            const { 
                product_name, 
                price, 
                quantity, 
                category_id 
            } = req.body;

            let image_url = '';
            if (req.file) {
                image_url = '/uploads/products/' + req.file.filename;
            }

            const productData = {
                product_name,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                category_id: parseInt(category_id),
                image_url,
                isactive: 1,
                created_date: new Date()
            };

            const newProduct = await Product.create(productData);
            res.json({
                status: 'success',
                message: 'Product created successfully',
                data: newProduct
            });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error creating product'
            });
        }
    },

    // Update product
    updateProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const { 
                product_name, 
                price, 
                quantity, 
                category_id 
            } = req.body;

            let updateData = {
                product_name,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                category_id: parseInt(category_id)
            };

            if (req.file) {
                // Delete old image if exists
                const oldProduct = await Product.getById(productId);
                if (oldProduct && oldProduct.image_url) {
                    const oldImagePath = path.join(__dirname, '../../public', oldProduct.image_url);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }

                updateData.image_url = '/uploads/products/' + req.file.filename;
            }

            const updatedProduct = await Product.update(productId, updateData);
            if (!updatedProduct) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Product not found'
                });
            }

            res.json({
                status: 'success',
                message: 'Product updated successfully',
                data: updatedProduct
            });
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error updating product'
            });
        }
    },

    // Delete product
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            
            // Get product to delete image
            const product = await Product.getById(productId);
            if (!product) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Product not found'
                });
            }

            // Delete image file if exists
            if (product.image_url) {
                const imagePath = path.join(__dirname, '../../public', product.image_url);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            const deleted = await Product.delete(productId);
            if (!deleted) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Product not found'
                });
            }

            res.json({
                status: 'success',
                message: 'Product deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error deleting product'
            });
        }
    },

    // Toggle product status
    toggleStatus: async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await Product.getById(productId);
            
            if (!product) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Product not found'
                });
            }

            const newStatus = product.isactive === 1 ? 0 : 1;
            const updated = await Product.update(productId, {
                isactive: newStatus
            });

            res.json({
                status: 'success',
                message: 'Product status updated successfully',
                data: updated
            });
        } catch (error) {
            console.error('Error toggling product status:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error updating product status'
            });
        }
    },

    // Update product quantity
    updateProductQuantity: async (req, res) => {
        try {
            const { id } = req.params;
            const { quantity } = req.body;

            if (quantity === undefined) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Quantity is required'
                });
            }

            const updated = await Product.updateQuantity(id, quantity);

            if (!updated) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Product not found'
                });
            }

            res.json({
                status: 'success',
                message: 'Product quantity updated successfully'
            });
        } catch (error) {
            console.error('Error in updateProductQuantity:', error);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }
};

module.exports = productController;
