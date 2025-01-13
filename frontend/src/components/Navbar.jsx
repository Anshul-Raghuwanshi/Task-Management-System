import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [admin, setAdmin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const hyperlinks = [
        { name: 'Dashboard', href: '/' },
        { name: 'Tasks', href: '/AssignedTasks' },
    ];

    useEffect(() => {
        setAdmin(JSON.parse(localStorage.getItem('admin')));
    }, []);

    return (
        <nav className="bg-creamish/90 backdrop-blur-md text-gray-800 p-4 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-semibold">
                    <Link to="/" className="hover:underline text-teal-600">
                        Task Manager
                    </Link>
                </h1>
                <button
                    className="sm:hidden text-gray-800 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                        />
                    </svg>
                </button>
                <ul
                    className={`sm:flex sm:items-center sm:space-x-6 ${
                        isOpen ? 'block' : 'hidden'
                    } absolute sm:static top-14 right-6 bg-creamish text-gray-800 sm:bg-transparent w-full sm:w-auto rounded-lg sm:rounded-none p-4 sm:p-0`}
                >
                    {hyperlinks.map((link, index) => (
                        <li key={index}>
                            <Link
                                to={link.href}
                                className="block py-2 px-4 text-lg sm:inline-block sm:px-0 sm:py-0 hover:underline hover:text-gray-600"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                    {admin && (
                        <li>
                            <Link
                                to="/createtask"
                                className="block py-2 px-4 text-lg font-semibold text-teal-600 hover:underline"
                            >
                                Create Task
                            </Link>
                        </li>
                    )}
                    <li>
                        <button
                            className="block py-2 px-4 text-lg font-semibold text-red-600 hover:underline focus:outline-none"
                            onClick={() => {
                                const confirmLogout = window.confirm(
                                    'Are you sure you want to logout?'
                                );
                                if (!confirmLogout) {
                                    return;
                                }
                                localStorage.removeItem('authenticated');
                                localStorage.removeItem('token');
                                localStorage.removeItem('userID');
                                window.location.reload();
                            }}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
