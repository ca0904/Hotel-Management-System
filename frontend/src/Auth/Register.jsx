import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [aadharNo, setAadharNo] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [firstName, setFirstName] = useState('');
    const [gender, setGender] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [lastName, setLastName] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [state, setState] = useState('');
    const [password, setPassword] = useState('');
    const [emails, setEmails] = useState(['']);
    const [phones, setPhones] = useState(['']);
    
    const [error, setError] = useState(null);

    const { data, error: fetchError, loading, setFetchOptions } = useFetch();

    const isValidPassword = (password) => {
        return (
            password.length >= 8 &&
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[!@#$%^&*]/.test(password)
        );
    };

    const handleRegister = (e) => {
        e.preventDefault();

        // Validate password
        // if (!isValidPassword(password)) {
        //     setError("Password must contain at least 8 characters, an uppercase letter, a number, and a special character.");
        //     return;
        // }

        // Filter out empty values from emails and phones
        const validEmails = emails.filter((email) => email.trim() !== '');
        const validPhones = phones.filter((phone) => phone.trim() !== '');

        const data1 = {
            username,
            aadharNo,
            city,
            country,
            firstName,
            gender,
            houseNo,
            lastName,
            pinCode,
            state,
            password,
            emails: validEmails, // Array of emails
            phones: validPhones, // Array of phone numbers
        };

        // Debugging
        console.log(JSON.stringify(data1));

        // Sending data to backend
        setFetchOptions({
            url: 'http://localhost:8080/api/register',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: data1,
            respf:'text'
        });
    };

    // Add a new email field
    const addEmailField = () => {
        setEmails([...emails, '']);
    };

    // Remove an email field
    const removeEmailField = (index) => {
        const newEmails = [...emails];
        newEmails.splice(index, 1);
        setEmails(newEmails);
    };

    // Add a new phone field
    const addPhoneField = () => {
        setPhones([...phones, '']);
    };

    // Remove a phone field
    const removePhoneField = (index) => {
        const newPhones = [...phones];
        newPhones.splice(index, 1);
        setPhones(newPhones);
    };

    return (
        <div className="relative h-screen bg-[#141414] overflow-hidden min-h-screen">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
                src="/public/static/5057336-hd_1920_1080_30fps.mp4" // Replace with your video path
                autoPlay
                loop
                muted
            />
    
            <div className="flex items-center justify-center h-full">
                <div className="bg-black bg-opacity-75 rounded-lg p-8 max-w-sm sm:max-w-md w-full z-10 overflow-y-auto max-h-full">
                    <h2 className="text-3xl font-bold mb-6 text-white text-center">Register</h2>
                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400" htmlFor="username">
                                Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-[#333] text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                placeholder="Choose a username"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400" htmlFor="aadharNo">
                                Aadhar No:
                            </label>
                            <input
                                type="text"
                                id="aadharNo"
                                value={aadharNo}
                                onChange={(e) => setAadharNo(e.target.value)}
                                className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-[#333] text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                placeholder="Enter Aadhar No"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400" htmlFor="firstName">
                                First Name:
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-[#333] text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                placeholder="Enter First Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400" htmlFor="lastName">
                                Last Name:
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-[#333] text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                placeholder="Enter Last Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400" htmlFor="gender">
                                Gender:
                            </label>
                            <input
                                type="text"
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-[#333] text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                placeholder="Enter Gender"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400" htmlFor="houseNo">
                                House No:
                            </label>
                            <input
                                type="text"
                                id="houseNo"
                                value={houseNo}
                                onChange={(e) => setHouseNo(e.target.value)}
                                className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-[#333] text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                placeholder="Enter House No"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400" htmlFor="city">
                                City:
                            </label>
                            <input
                                type="text"
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-[#333] text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                placeholder="Enter City"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400" htmlFor="state">
                                State:
                            </label>
                            <input
                                type="text"
                                id="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-[#333] text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                placeholder="Enter State"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400" htmlFor="country">
                                Country:
                            </label>
                            <input
                                type="text"
                                id="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-[#333] text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                placeholder="Enter Country"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400" htmlFor="pinCode">
                                Pin Code:
                            </label>
                            <input
                                type="text"
                                id="pinCode"
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                                className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-[#333] text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                placeholder="Enter Pin Code"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400" htmlFor="password">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-[#333] text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                placeholder="Create Password"
                            />
                        </div>

                        {/* Emails and Phones Input */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400" htmlFor="email">
                                Email:
                            </label>
                            {emails.map((email, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            const newEmails = [...emails];
                                            newEmails[index] = e.target.value;
                                            setEmails(newEmails);
                                        }}
                                        className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-[#333] text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                        placeholder="Email"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeEmailField(index)}
                                        className="ml-2 text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addEmailField}
                                className="text-blue-500"
                            >
                                Add another email
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400" htmlFor="phone">
                                Phone Number:
                            </label>
                            {phones.map((phone, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => {
                                            const newPhones = [...phones];
                                            newPhones[index] = e.target.value;
                                            setPhones(newPhones);
                                        }}
                                        className="mt-1 block w-full border border-gray-700 rounded-md p-2 bg-[#333] text-white placeholder-gray-500 focus:border-red-500 focus:ring-red-500"
                                        placeholder="Phone Number"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removePhoneField(index)}
                                        className="ml-2 text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addPhoneField}
                                className="text-blue-500"
                            >
                                Add another phone number
                            </button>
                        </div>

                        {/* Error Message */}
                        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                        {data && !loading && !fetchError && <p className="text-red-500 text-sm mt-2">{data}</p>}

                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-center text-white">
                        Already have an account?{' '}
                        <Link to="/auth/login" className="text-red-500 hover:text-red-400">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
