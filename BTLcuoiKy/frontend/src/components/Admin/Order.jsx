import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaCheck } from 'react-icons/fa';
import './Admin.css';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [editOrder, setEditOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    // Status options
    const statusOptions = [
        'Pending',
        'Delivered',
        'Cancelled'
    ];

    // Fetch orders
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:3000/orders');
            setOrders(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Handle status update
    const handleStatusUpdate = async (orderId) => {
        if (!editOrder) return;

        try {
            await axios.put(`http://localhost:3000/orders/${orderId}/status`, {
                status: editOrder.status
            });
            setEditOrder(null);
            fetchOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    // Calculate total amount
    const calculateTotal = (order) => {
        return order.price * order.quantity;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="admin-container">
            <h2>Order Management</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User ID</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Date</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.user_id}</td>
                                <td>{order.product_name}</td>
                                <td>{order.quantity}</td>
                                <td>{formatDate(order.order_date)}</td>
                                <td>{calculateTotal(order)}</td>
                                <td>
                                    {editOrder?.order_id === order.order_id ? (
                                        <select
                                            value={editOrder.status}
                                            onChange={(e) => setEditOrder({
                                                ...editOrder,
                                                status: e.target.value
                                            })}
                                        >
                                            {statusOptions.map((status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span className={`status-badge status-${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </span>
                                    )}
                                </td>
                                <td>
                                    {editOrder?.order_id === order.order_id ? (
                                        <button
                                            className="action-button save"
                                            onClick={() => handleStatusUpdate(order.order_id)}
                                        >
                                            <FaCheck />
                                        </button>
                                    ) : (
                                        <button
                                            className="action-button edit"
                                            onClick={() => setEditOrder(order)}
                                        >
                                            <FaEdit />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Order;
