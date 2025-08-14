import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Guest');
    const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';

    const { data, error: fetchError, loading, setFetchOptions } = useFetch();

    const submitLogin = (e) => {
        e.preventDefault();
        setRole('Guest'); // Set the role before making the API call

        const username = uname;
        setFetchOptions({
            url: 'http://localhost:8080/api/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { username, password },
            respf :'text'
        });
    };

    const handleAdmin = (e) => {
        e.preventDefault();
        setRole('Admin'); // Set the role before making the API call

        const username = 'employee_' + uname;
        setFetchOptions({
            url: 'http://localhost:8080/api/admin/all/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { username, password },
            respf: 'text'
        });
    };

    useEffect(() => {
        if (data && !fetchError && !loading) {
            if (role === 'Guest') {
                localStorage.setItem('jwtToken', data); // Store user token
                navigate(redirectPath); // Navigate to the original path
            } else if (role === 'Admin') {
                localStorage.setItem('AdminToken', data); // Store admin token
                navigate('/admin'); // Navigate to the admin dashboard
            }
        }
    }, [data, fetchError, loading, navigate, redirectPath, role]); // Ensure role is also in the dependency array

    return (
        <div className="relative h-screen bg-[#141414] overflow-hidden">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
                src="/public/static/5057336-hd_1920_1080_30fps.mp4"
                autoPlay
                loop
                muted
            />
            <div className="flex items-center justify-center h-full">
                <div className="bg-black bg-opacity-75 rounded-lg p-8 max-w-sm w-full z-10">
                    <h2 className="text-3xl font-bold mb-6 text-white text-center">Login</h2>
                    <form onSubmit={submitLogin}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400" htmlFor="username">
                                Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                required
                                value={uname}
                                onChange={(e) => setUname(e.target.value)}
                                className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-[#333] text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400" htmlFor="password">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-[#333] text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                placeholder="Enter your password"
                            />
                        </div>
                        {fetchError && <div className="text-red-500 text-sm mb-4">{fetchError}</div>}
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition duration-200 mb-2"
                        >
                            {role=='Guest' ?(loading ? 'Logging in...' : 'Login'):'Login'}
                        </button>
                    </form>

                    <button
                        type="button"
                        className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition duration-200 mb-4"
                        onClick={handleAdmin}
                    >
                        {role=='Role' ?(loading ? 'Logging in...' : 'Login as Admin'):'Login as Admin'}
                    </button>

                    <Link to="/auth/register" className="block text-center text-gray-400 mt-4 hover:text-white hover:underline">
                        Register
                    </Link>
                    <Link to="/" className="block text-center text-gray-400 mt-4 hover:text-white hover:underline">
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
