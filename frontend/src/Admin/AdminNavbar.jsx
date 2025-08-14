import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('AdminToken');
        navigate('/');
    };

    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <div className="space-x-4">
                    <Link to="/admin/overview" className="hover:text-blue-400">Overview</Link>
                    <Link to="/admin/bookings" className="hover:text-blue-400">Bookings</Link>
                    <Link to="/admin/rooms" className="hover:text-blue-400">Manage Rooms</Link>
                    <Link to="/admin/employeemanage" className="hover:text-blue-400">Employee</Link>
                    <Link to="/admin/add-employee" className="hover:text-blue-400">Add Employee</Link>
                    <button onClick={handleLogout} className="text-red-400">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
