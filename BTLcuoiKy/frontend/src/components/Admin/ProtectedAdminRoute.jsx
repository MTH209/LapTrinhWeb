import React, { useEffect } from 'react';

const ProtectedAdminRoute = ({ children }) => {
    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if (!isAdmin) {
            window.location.href = '/admin/login';
        }
    }, []);

    return children;
};

export default ProtectedAdminRoute;
