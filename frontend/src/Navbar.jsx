import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [Loggedin,setLoggedin] = useState(localStorage.getItem('jwtToken') ? true : false);

    return (
        <nav className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-red-600">
                    Haven Hotel
                </Link>

                {/* Links */}
                <div className="space-x-4">
                    <Link to="/" className="hover:text-gray-400">Home</Link>
                    <Link to="/booking" className="hover:text-gray-400">Booking</Link>
                    <Link to="/about" className="hover:text-gray-400">About Us</Link>
                    <Link to="/review" className="hover:text-gray-400">Review</Link>

                    {Loggedin ? (
                        <Link
                            to="/"
                            onClick={() => {localStorage.removeItem('jwtToken');
                                setLoggedin(false)
                            }}
                            className="hover:text-gray-400"
                        >
                            Logout
                        </Link>
                    ) : (
                        <Link to="/auth/login" className="hover:text-gray-400">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
