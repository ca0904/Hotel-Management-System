import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminFooter from './AdminFooter';
import useFetch from '../hooks/useFetch';

const EditEmployee = () => {
  const { username } = useParams();
  const { data: employee, loading, error, setFetchOptions } = useFetch();
  const { data: updatedata, setFetchOptions: setFetchupdate } = useFetch();
  const [formData, setFormData] = useState({
    salary: '',
    state: '',
    country: '',
    city: '',
  });
  const navigate = useNavigate();

  const getJwtToken = () => localStorage.getItem('AdminToken');

  // Fetch employee on mount
  useEffect(() => {
    setFetchOptions({
      url: `http://localhost:8080/api/admin/employee/${username}`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${getJwtToken()}` },
      onError: (msg) => {
        window.alert(msg);
        navigate('/admin/employeemanage');
      }
    });
  }, [username]);

  // Alert any fetch error
  useEffect(() => {
    if (error) {
      window.alert(error);
    }
  }, [error]);

  // Populate form when data arrives
  useEffect(() => {
    if (employee) {
      setFormData({
        salary: employee.salary || '',
        state: employee.state || '',
        country: employee.country || '',
        city: employee.city || '',
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFetchupdate({
      url: `http://localhost:8080/api/admin/employee/${username}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getJwtToken()}`,
      },
      body: formData,
      respf: 'text',
      onSuccess: (msg) => {
        window.alert(msg);
        navigate('/admin/employeemanage');
      },
      onError: (msg) => window.alert(msg)
    });
  };

  return (
    <div className="EditEmployee min-h-screen flex flex-col">
      <AdminNavbar />
      <main className="flex-grow container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Edit Employee - {username}</h2>

        {loading && <div>Loading...</div>}

        {!loading && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Salary */}
            <div>
              <label className="block">Salary:</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="border rounded px-4 py-2 w-full"
              />
            </div>

            {/* State */}
            <div>
              <label className="block">State:</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="border rounded px-4 py-2 w-full"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block">Country:</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="border rounded px-4 py-2 w-full"
              />
            </div>

            {/* City */}
            <div>
              <label className="block">City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="border rounded px-4 py-2 w-full"
              />
            </div>

            {/* Updated Data Message */}
            {/* removed inline message; onSuccess now alerts */}

            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded"
            >
              Save Changes
            </button>
          </form>
        )}
      </main>
      <AdminFooter />
    </div>
  );
};

export default EditEmployee;
