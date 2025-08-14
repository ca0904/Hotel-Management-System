import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminFooter from './AdminFooter';
import useFetch from '../hooks/useFetch';

const AddEmployee = () => {
  const { data, loading, error, setFetchOptions } = useFetch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    phoneNo: [''],
    email: [''],
    roles: [],
  });
  const [successMessage, setSuccessMessage] = useState('');

  const getJwtToken = () => localStorage.getItem('AdminToken');

  // Display any error as popup (including unauthorized)
  useEffect(() => {
    if (error) {
      // you can customize unauthorized text here
      if (error.toLowerCase().includes('unauthori')) {
        window.alert('You are unauthorized to perform this');
      } else {
        window.alert(error);
      }
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e, index, field) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = e.target.value;
    setFormData(prev => ({ ...prev, [field]: updatedArray }));
  };

  const addField = (field) => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeField = (field, index) => {
    const updatedArray = [...formData[field]];
    updatedArray.splice(index, 1);
    setFormData(prev => ({ ...prev, [field]: updatedArray }));
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    if (role && !formData.roles.includes(role)) {
      setFormData(prev => ({ ...prev, roles: [...prev.roles, role] }));
    }
  };

  const handleRoleRemove = (role) => {
    setFormData(prev => ({ ...prev, roles: prev.roles.filter(r => r !== role) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const minimalFormData = {
      username: 'employee_' + formData.username,
      password: formData.password,
      phoneNo: formData.phoneNo,
      email: formData.email,
      roles: formData.roles,
    };

    setFetchOptions({
      url: 'http://localhost:8080/api/admin/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getJwtToken()}`,
      },
      body: minimalFormData,
      respf: 'text',
      onSuccess: (msg) => {
        setSuccessMessage('Employee added successfully!');
        setFormData({
          username: '',
          password: '',
          phoneNo: [''],
          email: [''],
          roles: [],
        });
      },
      onError: (msg) => {
        // fallback if hook onError didn't catch unauthorized
        if (msg.toLowerCase().includes('unauthori')) {
          window.alert('You are unauthorized to perform this');
        } else {
          window.alert(msg);
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      <main className="flex-grow container mx-auto p-8">
        <h2 className="text-2xl font-bold mb-4">Add Employee</h2>

        {loading && <p>Loading...</p>}

        {/* Only this paragraph is green */}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}

        {/* Reset text color inside form to default */}
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-900">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />

          <div>
            <label>Phone Numbers</label>
            {formData.phoneNo.map((phone, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => handleArrayChange(e, index, 'phoneNo')}
                  className="border p-2 w-full"
                />
                <button
                  type="button"
                  onClick={() => removeField('phoneNo', index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField('phoneNo')}
              className="text-blue-500"
            >
              Add Phone
            </button>
          </div>

          <div>
            <label>Emails</label>
            {formData.email.map((email, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleArrayChange(e, index, 'email')}
                  className="border p-2 w-full"
                />
                <button
                  type="button"
                  onClick={() => removeField('email', index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField('email')}
              className="text-blue-500"
            >
              Add Email
            </button>
          </div>

          <div>
            <label>Roles</label>
            <select onChange={handleRoleChange} className="border p-2 w-full">
              <option value="">Select Role</option>
              <option value="ROLE_ADMIN">Admin</option>
              <option value="ROLE_SUPER_ADMIN">Super Admin</option>
            </select>
            <div className="flex flex-wrap mt-2 gap-2">
              {formData.roles.map((role, idx) => (
                <span
                  key={idx}
                  className="bg-blue-200 px-2 py-1 rounded"
                >
                  {role}{' '}
                  <button
                    type="button"
                    onClick={() => handleRoleRemove(role)}
                    className="text-red-600 ml-1"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Add Employee'}
          </button>
        </form>
      </main>
      <AdminFooter />
    </div>
  );
};

export default AddEmployee;
