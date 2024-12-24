import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Product.css';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({
        product_name: '',
        price: '',
        quantity: '',
        category_id: '',
        image_url: null
    });
    const [editProduct, setEditProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch products and categories on component mount
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // Fetch all products
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/products');
            setProducts(response.data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3000/categories');
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Handle file input change
    const handleFileChange = (e) => {
        if (editProduct) {
            setEditProduct({ ...editProduct, image_url: e.target.files[0] });
        } else {
            setNewProduct({ ...newProduct, image_url: e.target.files[0] });
        }
    };

    // Handle form submission for new product
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newProduct).forEach(key => {
            if (key === 'image_url' && newProduct[key]) {
                formData.append('image', newProduct[key]);
            } else if (newProduct[key]) {
                formData.append(key, newProduct[key]);
            }
        });

        try {
            await axios.post('http://localhost:3000/products', formData);
            setNewProduct({
                product_name: '',
                price: '',
                quantity: '',
                category_id: '',
                image_url: null
            });
            fetchProducts();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    // Handle product update
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editProduct) return;

        const formData = new FormData();
        Object.keys(editProduct).forEach(key => {
            if (key === 'image_url' && editProduct[key]) {
                formData.append('image', editProduct[key]);
            } else if (editProduct[key]) {
                formData.append(key, editProduct[key]);
            }
        });

        try {
            await axios.put(`http://localhost:3000/products/${editProduct.product_id}`, formData);
            setEditProduct(null);
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Handle product deletion
    const handleDelete = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await axios.delete(`http://localhost:3000/products/${productId}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="product-container">
            <div className="product-header">
                <h2>Product Management</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Add/Edit Product Form */}
            <form onSubmit={editProduct ? handleUpdate : handleSubmit} className="product-form">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={editProduct ? editProduct.product_name : newProduct.product_name}
                    onChange={(e) => editProduct 
                        ? setEditProduct({ ...editProduct, product_name: e.target.value })
                        : setNewProduct({ ...newProduct, product_name: e.target.value })
                    }
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={editProduct ? editProduct.price : newProduct.price}
                    onChange={(e) => editProduct
                        ? setEditProduct({ ...editProduct, price: e.target.value })
                        : setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    required
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={editProduct ? editProduct.quantity : newProduct.quantity}
                    onChange={(e) => editProduct
                        ? setEditProduct({ ...editProduct, quantity: e.target.value })
                        : setNewProduct({ ...newProduct, quantity: e.target.value })
                    }
                    required
                />
                <select
                    value={editProduct ? editProduct.category_id : newProduct.category_id}
                    onChange={(e) => editProduct
                        ? setEditProduct({ ...editProduct, category_id: e.target.value })
                        : setNewProduct({ ...newProduct, category_id: e.target.value })
                    }
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.category_id} value={category.category_id}>
                            {category.category_name}
                        </option>
                    ))}
                </select>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <button type="submit" className="btn-submit">
                    {editProduct ? 'Update Product' : 'Add Product'}
                </button>
                {editProduct && (
                    <button 
                        type="button" 
                        className="btn-cancel"
                        onClick={() => setEditProduct(null)}
                    >
                        Cancel
                    </button>
                )}
            </form>

            {/* Products List */}
            <div className="product-list">
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.product_id}>
                                <td>
                                    {product.image_url ? (
                                        <img 
                                            src={`http://localhost:3000${product.image_url}`}
                                            alt={product.product_name}
                                            className="product-thumbnail"
                                        />
                                    ) : (
                                        <div className="no-image">No Image</div>
                                    )}
                                </td>
                                <td>{product.product_name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    {categories.find(c => c.category_id === product.category_id)?.category_name}
                                </td>
                                <td>
                                    <span className={`status ${product.isactive ? 'active' : 'inactive'}`}>
                                        {product.isactive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button 
                                            onClick={() => setEditProduct(product)}
                                            className="btn-edit"
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(product.product_id)}
                                            className="btn-delete"
                                        >
                                            <FaTrash /> Delete
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

export default Product;
