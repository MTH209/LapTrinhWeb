import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const Cart = ({ isOpen, onClose, onCartCountChange }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Calculate total
    const total = cartItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    // Update cart count whenever cartItems changes
    useEffect(() => {
        const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        onCartCountChange?.(totalCount);
    }, [cartItems, onCartCountChange]);

    // Fetch cart items
    const fetchCartItems = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.user_id) {
                setError('Please login to view cart');
                setLoading(false);
                return;
            }

            const response = await axios.get(`http://localhost:3000/cart/user/${user.user_id}`);
            if (response.data.status === 'success') {
                setCartItems(response.data.data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching cart:', error);
            setError('Error loading cart items');
            setLoading(false);
        }
    };

    // Update quantity
    const updateQuantity = async (cartId, newQuantity) => {
        try {
            if (newQuantity < 1) return;

            const response = await axios.put(`http://localhost:3000/cart/${cartId}`, {
                quantity: newQuantity
            });

            if (response.data.status === 'success') {
                setCartItems(cartItems.map(item => 
                    item.cart_id === cartId 
                        ? { ...item, quantity: newQuantity }
                        : item
                ));
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            alert('Error updating quantity');
        }
    };

    // Remove item from cart
    const removeFromCart = async (cartId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/cart/${cartId}`);
            
            if (response.data.status === 'success') {
                setCartItems(cartItems.filter(item => item.cart_id !== cartId));
            }
        } catch (error) {
            console.error('Error removing item:', error);
            alert('Error removing item from cart');
        }
    };

    // Clear cart
    const clearCart = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.user_id) return;

            const response = await axios.delete(`http://localhost:3000/cart/user/${user.user_id}`);
            
            if (response.data.status === 'success') {
                setCartItems([]);
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
            alert('Error clearing cart');
        }
    };

    // Handle checkout
    const handleCheckout = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.user_id) {
                alert('Please login to checkout');
                return;
            }

            // Create an order for each cart item
            for (const item of cartItems) {
                const orderData = {
                    user_id: user.user_id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    status: 'pending'
                };

                const response = await axios.post('http://localhost:3000/orders', orderData);
                
                if (response.data.status !== 'success') {
                    throw new Error(response.data.message || 'Error creating order');
                }
            }

            // Clear the cart after successful orders
            await clearCart();
            alert('Order placed successfully!');
            onClose();
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('Error placing order');
        }
    };

    // Fetch cart items when component mounts or cart is opened
    useEffect(() => {
        if (isOpen) {
            fetchCartItems();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="cart-overlay">
            <div className="cart">
                <div className="cart-header">
                    <h2>Your Cart</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>

                {loading ? (
                    <div className="cart-loading">Loading...</div>
                ) : error ? (
                    <div className="cart-error">{error}</div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.length === 0 ? (
                                <p className="empty-cart">Your cart is empty</p>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.cart_id} className="cart-item">
                                        <img 
                                            src={`http://localhost:3000${item.image_url}`}
                                            alt={item.product_name}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/default-product.png';
                                            }}
                                        />
                                        <div className="item-details">
                                            <h3>{item.product_name}</h3>
                                            <p className="price">{item.price}Đ</p>
                                        </div>
                                        <div className="quantity-controls">
                                            <button 
                                                onClick={() => updateQuantity(item.cart_id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <FaMinus />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.cart_id, item.quantity + 1)}
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                        <button 
                                            className="remove-button"
                                            onClick={() => removeFromCart(item.cart_id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="cart-footer">
                                <div className="cart-actions">
                                    <button 
                                        className="clear-cart-button"
                                        onClick={clearCart}
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                                <div className="total">
                                    <span>Total:</span>
                                    <span>{total}Đ</span>
                                </div>
                                <button 
                                    className="checkout-button"
                                    onClick={handleCheckout}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Cart;
