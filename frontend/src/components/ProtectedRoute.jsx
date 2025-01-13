import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';

const ProtectedRoute = ({ children }) => {
    const isUserLoggedIn = localStorage.getItem('authenticated');

    return isUserLoggedIn ? (
        <>
            <Navbar />
            <div className="bg-cream min-h-screen p-4">
                {children}
            </div>
        </>
    ) : (
        <Navigate to="/login" />
    );
};
export default ProtectedRoute;