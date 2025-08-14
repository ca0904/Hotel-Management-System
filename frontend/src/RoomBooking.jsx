import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from './hooks/useFetch';
import Navbar from './Navbar';
import Footer from './Footer';

const RoomBooking = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ checkInDate: '', checkOutDate: '', noOfGuests: '' });
  const { data, loading, error, setFetchOptions } = useFetch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const submitBooking = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('jwtToken');

    setFetchOptions({
      url: 'http://localhost:8080/api/booking/guest/request',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: {
        checkInDate: form.checkInDate,
        checkOutDate: form.checkOutDate,
        noOfGuests: Number(form.noOfGuests),
        username: 'guest1'
      },
      respf: 'text'
    });
  };

  useEffect(() => {
    if (!loading) {
      if (data) {
        if (typeof data === 'string' && data.startsWith('Booking successful')) {
          navigate('/confirmation', { state: { bookingDetails: { message: data } } });
        } else {
          navigate('/confirmation', { state: { errorMessage: data } });
        }
      } else if (error) {
        navigate('/confirmation', { state: { errorMessage: error?.message || String(error) } });
      }
    }
  }, [data, error, loading, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Book a Room</h2>
        <form onSubmit={submitBooking} className="space-y-4 max-w-md">
          <div>
            <label>Check-in Date:</label>
            <input
              type="date"
              name="checkInDate"
              value={form.checkInDate}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Check-out Date:</label>
            <input
              type="date"
              name="checkOutDate"
              value={form.checkOutDate}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Number of Guests:</label>
            <input
              type="number"
              name="noOfGuests"
              value={form.noOfGuests}
              onChange={handleChange}
              min="1"
              required
              className="border p-2 w-full"
            />
          </div>
          {error && <p className="text-red-500">{error?.message || String(error)}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Book Now'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default RoomBooking;