import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword && name.length > 0 && password.length > 0 && name !== '' && password !== '') {
      await axios
        .post('http://localhost:5000/api/users/signup', { username: name, password, admin })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => alert(err.response.data.error));

      navigate('/login');
      setName('');
      setPassword('');
      setConfirmPassword('');
    } else {
      alert('Credentials are not valid');
    }
  };

  return (
    <div className="bg-gradient-to-r from-teal-100 to-teal-300 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create an Account</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Create an account to get started</p>
        
        <form onSubmit={handleSubmit} method="POST">
          {/* Username Field */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              id="name"
              autoComplete="on"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              placeholder="Enter your password"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              placeholder="Re-enter your password"
            />
          </div>

          {/* Admin Checkbox */}
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="admin"
              checked={admin}
              onChange={() => setAdmin(!admin)}
              className="mr-3"
            />
            <label htmlFor="admin" className="text-gray-700 text-sm font-semibold">Sign up as Admin</label>
          </div>

          {/* Info Text */}
          <div className="mb-4">
            <p className="text-xs text-gray-600">* Admins have full access to create and manage tasks for users.</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 focus:ring-2 focus:ring-teal-400 transition-colors duration-200 ease-in-out"
          >
            Create Account
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="text-xs text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to={'/login'} className="text-teal-600 hover:underline">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;