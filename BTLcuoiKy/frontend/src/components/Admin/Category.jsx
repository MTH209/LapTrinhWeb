import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import './Category.css';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ category_name: '' });
    const [editCategory, setEditCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3000/categories');
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Handle form submission for new category
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/categories', newCategory);
            setNewCategory({ category_name: '' });
            fetchCategories();
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    // Handle category update
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editCategory) return;

        try {
            await axios.put(`http://localhost:3000/categories/${editCategory.category_id}`, {
                category_name: editCategory.category_name
            });
            setEditCategory(null);
            fetchCategories();
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    // Handle category deletion
    const handleDelete = async (categoryId) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;

        try {
            await axios.delete(`http://localhost:3000/categories/${categoryId}`);
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    // Handle status toggle
    const handleToggleStatus = async (categoryId) => {
        try {
            await axios.put(`http://localhost:3000/categories/${categoryId}/toggle-status`);
            fetchCategories();
        } catch (error) {
            console.error('Error toggling category status:', error);
        }
    };

    // Filter categories based on search term
    const filteredCategories = categories.filter(category =>
        category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="category-container">
            <div className="category-header">
                <h2>Category Management</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Add/Edit Category Form */}
            <form onSubmit={editCategory ? handleUpdate : handleSubmit} className="category-form">
                <input
                    type="text"
                    placeholder="Category Name"
                    value={editCategory ? editCategory.category_name : newCategory.category_name}
                    onChange={(e) => editCategory 
                        ? setEditCategory({ ...editCategory, category_name: e.target.value })
                        : setNewCategory({ ...newCategory, category_name: e.target.value })
                    }
                    required
                />
                <button type="submit" className="btn-submit">
                    {editCategory ? 'Update Category' : 'Add Category'}
                </button>
                {editCategory && (
                    <button 
                        type="button" 
                        className="btn-cancel"
                        onClick={() => setEditCategory(null)}
                    >
                        Cancel
                    </button>
                )}
            </form>

            {/* Categories List */}
            <div className="category-list">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCategories.map(category => (
                            <tr key={category.category_id}>
                                <td>{category.category_name}</td>
                                <td>
                                    <span className={`status ${category.category_isactive ? 'active' : 'inactive'}`}>
                                        {category.category_isactive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            onClick={() => setEditCategory(category)}
                                            className="btn-edit"
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(category.category_id)}
                                            className="btn-delete"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                        <button 
                                            onClick={() => handleToggleStatus(category.category_id)}
                                            className={`btn-toggle ${category.category_isactive ? 'active' : ''}`}
                                        >
                                            {category.category_isactive ? <FaToggleOn /> : <FaToggleOff />}
                                            {category.category_isactive ? ' Active' : ' Inactive'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Category;
