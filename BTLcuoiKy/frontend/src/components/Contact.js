import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        status: 'Unread' // Default status for new messages
    });
    const [submitStatus, setSubmitStatus] = useState({
        message: '',
        type: '' // 'success' or 'error'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/contacts', formData);
            if (response.data.status === 'success') {
                setSubmitStatus({
                    message: 'Thank you for your message! We will get back to you soon.',
                    type: 'success'
                });
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    status: 'Unread'
                });
            }
        } catch (error) {
            setSubmitStatus({
                message: 'Failed to send message. Please try again.',
                type: 'error'
            });
            console.error('Error sending contact form:', error);
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-content">
                <h1>Contact Us</h1>
                <p>Have questions? We'd love to hear from you.</p>
                
                {submitStatus.message && (
                    <div className={`alert alert-${submitStatus.type}`}>
                        {submitStatus.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="Subject"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Your message"
                            rows="5"
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Send Message
                    </button>
                </form>

                <div className="contact-info">
                    <div className="info-item">
                        <h3>Email</h3>
                        <p>support@foodorder.com</p>
                    </div>
                    <div className="info-item">
                        <h3>Phone</h3>
                        <p>+1 234 567 8900</p>
                    </div>
                    <div className="info-item">
                        <h3>Address</h3>
                        <p>123 Food Street, Kitchen City, FC 12345</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
