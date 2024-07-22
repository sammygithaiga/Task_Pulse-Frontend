import React from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

import { SERVER_URL } from '../../utils';


const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  username: z.string().min(2, 'Username is required'),
  phone: z.string().min(10, 'Phone number is required'),

  role: z.string().min(1, 'Role is required'), 
});


  workType: z.string().min(1, 'Type of work is required'),
  location: z.string().min(2, 'Location is required'),
});


const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });


  const onSubmit = async (data) => {
    console.log('Form data:', data); // Log the form data to ensure it is correct

    try {
      const response = await fetch(`${SERVER_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
        phone: data.phone,
        }),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);

      if (response.ok) {
        console.log('Signup successful:', result);
        navigate('/home');
      } else {
        console.error('Signup failed:', result.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }

  const onSubmit = (data) => {
    console.log(data);
  
    navigate('/home');

  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{

        backgroundImage: `url('https://img.freepik.com/free-vector/vector-damask-seamless-pattern-background-classical-luxury-old-fashioned-damask-ornament-royal-victorian-seamless-texture-wallpapers-textile-wrapping-exquisite-floral-baroque-template_1217-738.jpg?ga=GA1.1.2047667343.1720784022&semt=ais_user')`,

        backgroundImage: 'url(https://t4.ftcdn.net/jpg/02/91/16/45/240_F_291164587_Yfc4PDeUCrVZHsW7IFBwajf9JwM7b7Kz.jpg)',

        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-3xl mx-auto p-8 bg-white bg-opacity-80 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              {...register('username')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.username ? 'border-red-500' : ''}`}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              id="phone"
              {...register('phone')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.phone ? 'border-red-500' : ''}`}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>
          <div className="mb-4">

            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <input
              type="text"
              id="role"
              {...register('role')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.role ? 'border-red-500' : ''}`}
            />
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}

            <label htmlFor="workType" className="block text-sm font-medium text-gray-700 mb-2">Type of Work Done</label>
            <input
              type="text"
              id="workType"
              {...register('workType')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.workType ? 'border-red-500' : ''}`}
            />
            {errors.workType && <p className="text-red-500 text-sm">{errors.workType.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              id="location"
              {...register('location')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.location ? 'border-red-500' : ''}`}
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}

          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-teal-700 focus:outline-none"
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
