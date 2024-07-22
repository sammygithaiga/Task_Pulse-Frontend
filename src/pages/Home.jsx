import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaTelegramPlane, FaFacebookF, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-psd/3d-geometric-black-scene-with-cube-podium-editable-light-product-placement_167960-36.jpg?ga=GA1.1.2047667343.1720784022&semt=sph')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-black bg-opacity-50 rounded-lg shadow-lg mx-4 mt-4 mb-4">
        <h1 className="text-4xl font-bold text-center text-white mb-6">WELCOME TO TASK PULSE</h1>
        <p className="text-lg text-gray-300 text-center mb-8">
          Manage your projects with ease and efficiency. Whether you're a solo entrepreneur or part of a large team, 
          ProjectMaster provides all the tools you need to stay organized and productive.
        </p>
        <button
          onClick={() => navigate('/projects')}
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded transition duration-300"
        >
          Get Started
        </button>

        {/* Example Images */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <img src="https://img.freepik.com/free-photo/puzzled-surprised-computer-analyst-has-coffee-break-reads-published-web-page-wears-round-spectacles-poses-desktop-against-blue-wall-with-written-information_273609-34362.jpg?ga=GA1.1.2047667343.1720784022&semt=ais_user" alt="Feature 1" className="rounded-lg shadow-lg transform transition-transform duration-300 scale-90 hover:scale-110"/>
          <img src="https://img.freepik.com/premium-photo/man-suit-writing-wall-with-sticky-notes_161362-40941.jpg?ga=GA1.1.2047667343.1720784022&semt=ais_user" alt="Feature 2" className="rounded-lg shadow-lg transform transition-transform duration-300 scale-90 hover:scale-110"/>
          <img src="https://img.freepik.com/free-photo/emotional-angry-afro-american-lady-holds-paper-document-mobile-phone-frustrated-by-failure-make-successful-project_273609-34364.jpg?ga=GA1.1.2047667343.1720784022&semt=ais_user" alt="Feature 3" className="rounded-lg shadow-lg transform transition-transform duration-300 scale-90 hover:scale-110"/>
        </div>

        {/* Circles with Hover Effect */}
        <div className="flex justify-center mt-8 space-x-4">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
            <span className="text-white text-lg font-semibold">1</span>
          </div>
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
            <span className="text-white text-lg font-semibold">2</span>
          </div>
          <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
            <span className="text-white text-lg font-semibold">3</span>
          </div>
        </div>
      </div>

      {/* Information Cards */}
      <div className="flex flex-col items-center p-6 mb-4">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Why Choose Task Pulse?</h2>
          <div className="flex flex-col space-y-6">
            <div className="p-4 bg-black bg-opacity-70 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-lg font-semibold mb-2 text-white">Smart Task Management</h3>
              <p className="text-gray-300">
                Stay on top of your tasks with intelligent scheduling and reminders. Organize your to-do lists, set deadlines, and never miss a due date again.
              </p>
            </div>
            <div className="p-4 bg-black bg-opacity-70 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-lg font-semibold mb-2 text-white">Collaborative Tools</h3>
              <p className="text-gray-300">
                Work seamlessly with your team. Share tasks, track progress, and communicate directly within the platform. Collaboration has never been easier.
              </p>
            </div>
            <div className="p-4 bg-black bg-opacity-70 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-lg font-semibold mb-2 text-white">Customizable Dashboards</h3>
              <p className="text-gray-300">
                Tailor your dashboard to your needs. View your projects, tasks, and deadlines in a way that works best for you with our flexible and user-friendly interface.
              </p>
            </div>
            <div className="p-4 bg-black bg-opacity-70 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-lg font-semibold mb-2 text-white">Real-Time Analytics</h3>
              <p className="text-gray-300">
                Track your performance with real-time data. Our analytics tools provide insights into your productivity and project progress, helping you make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About and User Feedback */}
      <div className="flex flex-col items-center p-6 space-y-6 mb-4">
        <div className="w-full max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">About Task Pulse</h2>
          <p className="text-base text-gray-300 mb-8">
            ProjectMaster is designed to streamline project management and improve productivity. Our mission is to provide a user-friendly, powerful platform that helps individuals and teams achieve their goals. With a focus on intuitive design and comprehensive features, we aim to make project management simple and effective.
          </p>
        </div>
        <div className="w-full max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">What Our Users Say</h2>
          <div className="space-y-4">
            <blockquote className="bg-black bg-opacity-70 p-4 rounded-lg shadow-lg text-gray-300">
              <p>“ProjectMaster has transformed the way our team manages projects. The collaborative tools and customizable dashboards are game-changers!”</p>
              <footer className="mt-2">– Samuel Githaiga, Team Lead</footer>
            </blockquote>
            <blockquote className="bg-black bg-opacity-70 p-4 rounded-lg shadow-lg text-gray-300">
              <p>“I love how easy it is to track my tasks and deadlines. ProjectMaster is an essential tool for my daily work.”</p>
              <footer className="mt-2">– Nazlin Jemeli, Freelancer</footer>
            </blockquote>
          </div>
        </div>
        <div className="w-full max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-base text-gray-300 mb-8">
            Join thousands of users who are already enjoying the benefits of ProjectMaster. Sign up today and take control of your projects like never before.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded transition duration-300"
          >
            Sign Up Now
          </button>
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-4">
  <div className="text-center mb-2">You can find us on these platforms:</div>
  <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-4">
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#C13584] hover:text-[#a02d74] flex items-center justify-center">
      <FaInstagram size={24} className="transform transition-transform duration-300 hover:scale-125 mr-2" /> Instagram
    </a>
    <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-[#0088cc] hover:text-[#006a9a] flex items-center justify-center">
      <FaTelegramPlane size={24} className="transform transition-transform duration-300 hover:scale-125 mr-2" /> Telegram
    </a>
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:text-[#145dbf] flex items-center justify-center">
      <FaFacebookF size={24} className="transform transition-transform duration-300 hover:scale-125 mr-2" /> Facebook
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#1DA1F2] hover:text-[#1a91da] flex items-center justify-center">
      <FaTwitter size={24} className="transform transition-transform duration-300 hover:scale-125 mr-2" /> Twitter
    </a>
    <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:text-[#1e8e6f] flex items-center justify-center">
      <FaWhatsapp size={24} className="transform transition-transform duration-300 hover:scale-125 mr-2" /> Whatsapp
    </a>
    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[#FF0000] hover:text-[#cc0000] flex items-center justify-center">
      <FaYoutube size={24} className="transform transition-transform duration-300 hover:scale-125 mr-2" /> Youtube
    </a>
  </div>
  <div className="text-center mb-2">
    <p>Phone: 0712345678</p> OR
    <p>Phone: 0710602258</p> ...
    <p>Email: support@yourwebsite.com</p> OR
    <p>Email: contact@yourwebsite.com</p>
  </div>
  <div className="text-center">
    <p className="text-sm">© 2024 Your Website. All rights reserved.</p>
  </div>
</footer>

    </div>
  );
};

export default Home;
