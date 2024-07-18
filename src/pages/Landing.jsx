import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const LandingPage = () => {
  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
    window.location.href = path; 
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/3d-render-grunge-room-interior-with-foggy-atmosphere_1048-14608.jpg?w=996&t=st=1721313292~exp=1721313892~hmac=08925affd2970222982c33669db3755233325dc79200e638b41a30b575d72ce6')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-8 bg-gray-800 bg-opacity-50 shadow-lg rounded-lg text-white">
        <h1 className="text-4xl font-bold text-center mb-6">Welcome to Task Pulse</h1>
        <p className="text-lg text-gray-300 text-center mb-8">Your ultimate solution for managing tasks efficiently.</p>
        
       
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-6 rounded-lg bg-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold text-white mb-4">Task Organization</h2>
            <p className="text-gray-300">Easily organize your tasks into projects, categories, and deadlines.</p>
          </div>
          <div className="p-6 rounded-lg bg-gray-700 shadow-md">
            <h2 className="text-2xl font-semibold text-white mb-4">Collaboration</h2>
            <p className="text-gray-300">Collaborate with team members by assigning tasks and tracking progress.</p>
          </div>
        
        </section>
        
        
        <div className="mb-8">
          <img src="/images/mobile-scheduling.jpg" alt="Mobile Scheduling" className="mx-auto rounded-lg shadow-md" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>

        {
        <div className="flex justify-center">
          <button onClick={() => handleNavigation('/login')} className="bg-blue-600 text-white py-3 px-6 rounded-md mr-4 hover:bg-blue-700 focus:outline-none">
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            Login
          </button>
          <button onClick={() => handleNavigation('/signup')} className="bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 focus:outline-none">
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
