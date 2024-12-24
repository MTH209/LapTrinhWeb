import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import './MenuList.css';

const MenuList = ({ onCartUpdate }) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    // Fetch categories and products
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, productsRes] = await Promise.all([
                    axios.get('http://localhost:3000/categories'),
                    axios.get('http://localhost:3000/products')
                ]);
                setCategories(categoriesRes.data.data);
                setProducts(productsRes.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter products by category
    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category_id === parseInt(selectedCategory));

    // Add to cart handler
    const handleAddToCart = async (product) => {
        try {

          
            // Get user from localStorage
            const userStr = localStorage.getItem('user');
            const user = userStr ? JSON.parse(userStr) : null;

            if (!user || !user.user_id) {
                alert('Please login to add items to cart');
                return;
            }

            // Ensure all required fields are present and valid
            const cartData = {
                user_id: parseInt(user.user_id),
                product_id: parseInt(product.product_id),
                quantity: 1
            };

            // Validate data before sending
            if (!cartData.user_id || !cartData.product_id || !cartData.quantity) {
                alert('Missing required fields for cart');
                return;
            }

            const response = await axios.post('http://localhost:3000/cart', cartData);

            if (response.data.status === 'success') {
                // Get cart count and update it
                const cartResponse = await axios.get(`http://localhost:3000/cart/user/${user.user_id}`);
                if (cartResponse.data.status === 'success') {
                    const totalItems = cartResponse.data.data.reduce((sum, item) => sum + item.quantity, 0);
                    onCartUpdate(totalItems);
                }
            } else {
                alert(response.data.message || 'Error adding product to cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            const errorMessage = error.response?.data?.message || 'Error adding product to cart';
            alert(errorMessage);
        }
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="menu-container">
            <div className="categories-nav">
                <button
                    className={`category-button ${selectedCategory === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedCategory('all')}
                >
                    Món hot
                </button>
                {categories.map(category => (
                    <button
                        key={category.category_id}
                        className={`category-button ${selectedCategory === category.category_id.toString() ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category.category_id.toString())}
                    >
                        {category.category_name}
                    </button>
                ))}
            </div>

            <div className="products-grid">
                {filteredProducts.map(product => (
                    <div key={product.product_id} className="product-card">
                        <img 
                            src={`http://localhost:3000${product.image_url}`} 
                            alt={product.product_name}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/default-product.png';
                            }}
                        />
                        <div className="product-info">
                            <h3>{product.product_name}</h3>
                            <p className="price">{product.price}Đ</p>
                            <button 
                                className="add-to-cart-btn"
                                onClick={() => handleAddToCart(product)}
                            >
                                <FaShoppingCart /> Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MenuList;
