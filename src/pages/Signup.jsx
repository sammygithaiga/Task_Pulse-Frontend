import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  // Example function to handle signup form submission
  const handleSignup = (e) => {
    e.preventDefault();
    // Perform signup logic here
    console.log('Signing up...');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none" required />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input type="password" id="password" name="password" className="w-full px-3 py-2 border rounded-lg focus:outline-none" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none">Sign Up</button>
      </form>
      <p className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in here</Link>
      </p>
    </div>
  );
};

export default Signup;
