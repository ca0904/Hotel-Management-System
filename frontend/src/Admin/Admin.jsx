import AdminNavbar from './AdminNavbar';
import AdminFooter from './AdminFooter';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="AdminDashboard min-h-screen flex flex-col">
            <AdminNavbar />
            <main className="flex-grow container mx-auto p-8">
                <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

                {/* Booking Details */}
                <section className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Booking Details</h3>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <Link to="/admin/bookings" className="bg-blue-500 text-white p-2 rounded mr-2">
                            View Bookings
                        </Link>
                        
                    </div>
                </section>

                {/* Employee Management */}
                <section className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Employee Management</h3>
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        
                        <Link to="/admin/employeemanage" className="bg-green-500 text-white p-2 rounded">
                            Manage Employees
                        </Link>
                    </div>
                </section>
            </main>
            <AdminFooter />
        </div>
    );
};

export default AdminDashboard;
