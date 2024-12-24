const Category = require('../models/category');

const categoryController = {
    // Get all categories
    getAllCategories: async (req, res) => {
        try {
            const categories = await Category.getAll();
            res.json({
                status: 'success',
                data: categories
            });
        } catch (error) {
            console.error('Error getting categories:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error getting categories'
            });
        }
    },

    // Create new category
    createCategory: async (req, res) => {
        try {
            const { category_name } = req.body;
            const categoryData = {
                category_name,
                category_isactive: true
            };

            const newCategory = await Category.create(categoryData);
            res.json({
                status: 'success',
                message: 'Category created successfully',
                data: newCategory
            });
        } catch (error) {
            console.error('Error creating category:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error creating category'
            });
        }
    },

    // Update category
    updateCategory: async (req, res) => {
        try {
            const categoryId = req.params.id;
            const { category_name } = req.body;
            
            const updatedCategory = await Category.update(categoryId, { category_name });
            if (!updatedCategory) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Category not found'
                });
            }

            res.json({
                status: 'success',
                message: 'Category updated successfully',
                data: updatedCategory
            });
        } catch (error) {
            console.error('Error updating category:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error updating category'
            });
        }
    },

    // Delete category
    deleteCategory: async (req, res) => {
        try {
            const categoryId = req.params.id;
            
            const deleted = await Category.delete(categoryId);
            if (!deleted) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Category not found'
                });
            }

            res.json({
                status: 'success',
                message: 'Category deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting category:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error deleting category'
            });
        }
    },

    // Toggle category status
    toggleStatus: async (req, res) => {
        try {
            const categoryId = req.params.id;
            const category = await Category.getById(categoryId);
            
            if (!category) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Category not found'
                });
            }

            const newStatus = category.category_isactive === 1 ? 0 : 1;
            const updated = await Category.update(categoryId, {
                category_isactive: newStatus
            });

            res.json({
                status: 'success',
                message: 'Category status updated successfully',
                data: updated
            });
        } catch (error) {
            console.error('Error toggling category status:', error);
            res.status(500).json({
                status: 'error',
                message: 'Error updating category status'
            });
        }
    }
};

module.exports = categoryController;
