import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminFooter from './AdminFooter';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const EmployeeManage = () => {
    const { data: employees, loading, error, setFetchOptions: setEmployeeFetchOptions } = useFetch();
    const { data: deletedata, loading: loadingRoles, error: errorRoles, setFetchOptions: setDeleteFetchOptions } = useFetch();
    const [employeeData, setEmployeeData] = useState([]);
    const [del, setDel] = useState(false);
    const navigate = useNavigate();

    const getJwtToken = () => localStorage.getItem('AdminToken');

    useEffect(() => {
        setEmployeeFetchOptions({
            url: 'http://localhost:8080/api/admin/all/employees',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getJwtToken()}`,
            }
        });
    }, []);

    useEffect(() => {
        if (employees) {
            console.log(employees); // Check the response data format
            setEmployeeData(Array.isArray(employees) ? employees : []); // Ensure it's an array
        }
    }, [employees]);

    const handleEditEmployee = (username) => {
        window.location.href = `/admin/edit-employee/${username}`;
    };

    const handleDeleteEmployee = (username) => {
        setDeleteFetchOptions({
            url: `http://localhost:8080/api/admin/employee/${username}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getJwtToken()}`,
            },
            respf: 'text',
            onSuccess: () => {
                setDel(true);
                navigate('/admin/employeemanage');
            }
        });
        setDel(true);
        navigate('/admin/employeemanage');
    };

    return (
        <div className="EmployeeManage min-h-screen flex flex-col">
            <AdminNavbar />
            <main className="flex-grow container mx-auto p-8">
                <h2 className="text-2xl font-bold mb-4">Employee Management</h2>

                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                {!loading && !employeeData.length && <p>No employees found.</p>}
                {deletedata && <p>{deletedata}</p>}

                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2">Username</th>
                            <th className="px-4 py-2">Salary</th>
                            <th className="px-4 py-2">Address</th>
                            {/* <th className="px-4 py-2">Roles</th> */}
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeData.map((employee) => (
                            <tr key={employee.username}>
                                <td className="border px-4 py-2">{employee.username}</td>
                                <td className="border px-4 py-2">{employee.salary}</td>
                                <td className="border px-4 py-2">
                                    {/* <p>House No: {employee.house_no}</p> */}
                                    <p>City: {employee.city}</p>
                                    <p>State: {employee.state}</p>
                                    <p>Country: {employee.country}</p>
                                    {/* <p>Pin Code: {employee.pin_code}</p> */}
                                </td>
                                {/* <td className="border px-4 py-2">
                                    {employee.roles && employee.roles.length > 0
                                        ? employee.roles.map((role, index) => (
                                              <span key={index} className="mr-2">{role}</span>
                                          ))
                                        : 'No roles assigned'}
                                </td> */}
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleEditEmployee(employee.username)}
                                        className="bg-green-500 text-white p-2 rounded mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteEmployee(employee.username)}
                                        className="bg-red-500 text-white p-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            <AdminFooter />
        </div>
    );
};

export default EmployeeManage;
