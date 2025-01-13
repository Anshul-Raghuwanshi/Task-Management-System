import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length > 0 && password.length > 0 && username !== '' && password !== '') {
      await axios
        .post('http://localhost:5000/api/users/login', { username, password })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem('token', JSON.stringify(res.data.userToken));
          localStorage.setItem('userID', JSON.stringify(res.data.user._id));
          localStorage.setItem('admin', JSON.stringify(res.data.user.admin));
          localStorage.setItem('authenticated', 'true');
          navigate('/');
        })
        .catch((err) => alert(err.response.data.error));
    } else {
      alert('Credentials are not valid');
    }
  };

  return (
    <div className="bg-teal-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Login to Your Account</h2>
        <form onSubmit={handleSubmit} method="POST">
          {/* Username Field */}
          <div className="mb-6">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your username"
              autoComplete="on"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:ring-2 focus:ring-teal-400 transition-colors duration-200 ease-in-out"
          >
            Login
          </button>
        </form>

        {/* Redirect to SignUp */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to={'/signup'} className="text-teal-600 hover:underline">Create New</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;