import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import './Admin.css';

const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch contacts
    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/contacts');
            setContacts(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    // Handle contact deletion
    const handleDelete = async (contactId) => {
        if (window.confirm('Are you sure you want to delete this contact message?')) {
            try {
                await axios.delete(`http://localhost:3000/contacts/${contactId}`);
                fetchContacts();
            } catch (error) {
                console.error('Error deleting contact:', error);
            }
        }
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="admin-container">
            <h2>Contact Messages</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact.contact_id}>
                                <td>{contact.contact_id}</td>
                                <td>{contact.name}</td>
                                <td>{contact.email}</td>
                                <td>{contact.subject}</td>
                                <td className="message-cell">
                                    <div className="message-content">
                                        {contact.message}
                                    </div>
                                </td>
                                <td>{formatDate(contact.created_date)}</td>
                                <td>
                                    <button
                                        className="action-button delete"
                                        onClick={() => handleDelete(contact.contact_id)}
                                        title="Delete Message"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Contact;
