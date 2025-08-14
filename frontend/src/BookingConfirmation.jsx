import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const BookingConfirmation = () => {
  const location = useLocation();
  const { bookingDetails, errorMessage } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <main className="flex-grow container mx-auto my-16 p-8 bg-white rounded-lg shadow">
        {errorMessage ? (
          <>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Booking Error</h2>
            <p className="text-gray-700">{typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage)}</p>
            <div className="mt-6">
              <Link to="/booking" className="text-blue-500 hover:underline">
                Try Again
              </Link>
            </div>
          </>
        ) : bookingDetails ? (
          <>
            <h2 className="text-2xl font-bold text-green-600 mb-4">Booking Confirmed!</h2>
            <p className="text-gray-700">{bookingDetails.message}</p>
            <div className="mt-6">
              <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Back to Home
              </Link>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;
