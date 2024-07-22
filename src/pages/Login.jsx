import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SERVER_URL } from '../../utils';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  role: z.string().min(2, { message: 'Role must be at least 2 characters' }),
});

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

const handleLogin = async (data) => {
  try {
    const loginResponse = await fetch(`${SERVER_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const loginData = await loginResponse.json();

    if (loginResponse.ok) {
      // Handle successful login
      console.log('Login successful:', loginData);
      localStorage.setItem('token', loginData.access_token); // Store token if needed

      // Redirect based on user role
      if (loginData.role === 'admin') {
        navigate('/admin'); // Redirect to admin view
      } else if (loginData.role === 'user') {
        navigate('/user'); // Redirect to user view
      } else {
        navigate('/home'); // Default redirect if role is unknown
      }
    } else {
      console.error('Login failed:', loginData.message);
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
};


  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/vector-damask-seamless-pattern-background-classical-luxury-old-fashioned-damask-ornament-royal-victorian-seamless-texture-wallpapers-textile-wrapping-exquisite-floral-baroque-template_1217-738.jpg?ga=GA1.1.2047667343.1720784022&semt=ais_user')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-md mx-auto p-6 bg-white bg-opacity-80 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Welcome Back!</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-700`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-700`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <input
              type="text"
              id="role"
              {...register('role')}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${errors.role ? 'border-red-500' : 'border-gray-300'} text-gray-700`}
            />
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none">
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;