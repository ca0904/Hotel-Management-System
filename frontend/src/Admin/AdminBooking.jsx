import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminFooter from './AdminFooter';
import useFetch from '../hooks/useFetch';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { data, loading, error, setFetchOptions } = useFetch();

  // Fetch all bookings on mount or after changes
  const fetchAll = () => {
    setFetchOptions({
      url: 'http://localhost:8080/api/booking/admin/all',
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem('AdminToken')}`
      }
    });
  };

  useEffect(fetchAll, []);

  useEffect(() => {
    if (data) setBookings(data);
  }, [data]);

  // Cancel booking by ID
  const handleCancel = async (bookingId) => {
    if (!window.confirm(`Cancel booking #${bookingId}?`)) return;
    try {
      const res = await fetch(
        `http://localhost:8080/api/booking/${bookingId}`,
        {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('AdminToken')}` }
        }
      );
      if (!res.ok) throw new Error(res.statusText);
      // Refresh list
      fetchAll();
    } catch (e) {
      alert('Failed to cancel: ' + e.message);
    }
  };

  return (
    <div className="AdminBookings min-h-screen flex flex-col bg-gray-100">
      <AdminNavbar />

      <main className="flex-grow container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">All Bookings</h2>

        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p className="text-red-500">Error fetching bookings: {error}</p>
        ) : (
          <div className="overflow-x-auto bg-white p-4 rounded-lg shadow">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Booking ID</th>
                  <th className="border p-2">Guest Username</th>
                  <th className="border p-2">Check-In</th>
                  <th className="border p-2">Check-Out</th>
                  <th className="border p-2">Rooms</th>
                  <th className="border p-2">Amount</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((b) => (
                    <tr key={b.bookingId}>
                      <td className="border p-2">{b.bookingId}</td>
                      <td className="border p-2">{b.username}</td>
                      <td className="border p-2">{new Date(b.checkInDate).toLocaleDateString()}</td>
                      <td className="border p-2">{new Date(b.checkOutDate).toLocaleDateString()}</td>
                      <td className="border p-2">{b.roomNos?.join(', ')}</td>
                      <td className="border p-2">{b.amount.toFixed(2)}</td>
                      <td className="border p-2">
                        <button
                          className="bg-red-500 text-white py-1 px-4 rounded"
                          onClick={() => handleCancel(b.bookingId)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-4">No bookings found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <AdminFooter />
    </div>
  );
};

export default AdminBookings;
