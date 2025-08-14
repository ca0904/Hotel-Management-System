import React from 'react';

const AdminFooter = () => {
    return (
        <footer className="bg-gray-800 text-white text-center p-4">
            <p>&copy; {new Date().getFullYear()} Hotel Management | Admin Panel</p>
        </footer>
    );
};

export default AdminFooter;
