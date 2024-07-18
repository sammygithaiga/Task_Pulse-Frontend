import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faProjectDiagram, faTasks, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
    window.location.href = path; 
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">TASK PULSE</div>

        <div className="hidden md:flex space-x-4">
          <button onClick={() => handleNavigation('/home')} className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </button>
          <button onClick={() => handleNavigation('/projects')} className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
            <FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />
            Projects
          </button>
          <button onClick={() => handleNavigation('/tasks')} className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
            <FontAwesomeIcon icon={faTasks} className="mr-2" />
            Tasks
          </button>
          <button onClick={() => handleNavigation('/login')} className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            Login
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          {isOpen && (
            <div className="absolute top-16 right-4 bg-blue-600 py-2 px-4 rounded-md shadow-md">
              <button onClick={() => handleNavigation('/home')} className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </button>
              <button onClick={() => handleNavigation('/projects')} className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium">
                <FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />
                Projects
              </button>
              <button onClick={() => handleNavigation('/tasks')} className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium">
                <FontAwesomeIcon icon={faTasks} className="mr-2" />
                Tasks
              </button>
              <button onClick={() => handleNavigation('/login')} className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium">
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Login
              </button>
              <button onClick={() => handleNavigation('/landing')} className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium">
                Landing Page
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
