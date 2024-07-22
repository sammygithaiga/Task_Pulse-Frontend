import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faProjectDiagram, faTasks, faSignInAlt, faBell, faUser, faSearch, faMoon, faSun, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {

    console.log(`Navigating to: ${path}`);

    console.log(Navigating to: ${path});

    window.location.href = path;
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    setIsLoggedIn(!!userToken);

    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 p-4 fixed top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">TASK PULSE</div>

        <div className="hidden md:flex space-x-4 items-center">
          <button onClick={() => handleNavigation('/home')} className="text-white hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </button>
          <button onClick={() => handleNavigation('/projects')} className="text-white hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
            <FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />
            Projects
          </button>
          <button onClick={() => handleNavigation('/tasks')} className="text-white hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
            <FontAwesomeIcon icon={faTasks} className="mr-2" />
            Tasks
          </button>
          
          {isLoggedIn ? (
            <>
              <button onClick={() => alert('Notifications clicked')} className="text-white hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium relative">
                <FontAwesomeIcon icon={faBell} />
                <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="relative">
                <button onClick={toggleMenu} className="text-white hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Profile
                </button>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-2 z-10">
                    <button onClick={() => handleNavigation('/profile')} className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">View Profile</button>
                    <button onClick={() => handleNavigation('/settings')} className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">Settings</button>
                    <button onClick={() => {
                      localStorage.removeItem('userToken');
                      setIsLoggedIn(false);
                      handleNavigation('/login');
                    }} className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button onClick={() => handleNavigation('/login')} className="text-white hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Login
              </button>
              
            </>
          )}
          <button onClick={toggleDarkMode} className="text-white hover:bg-blue-700 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          {isOpen && (
            <div className="absolute top-16 right-4 bg-blue-600 dark:bg-gray-700 py-2 px-4 rounded-md shadow-md">
              <button onClick={() => handleNavigation('/home')} className="block text-white hover:bg-blue-700 dark:hover:bg-gray-600 px-3 py-2 rounded-md text-base font-medium">
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Home
              </button>
              <button onClick={() => handleNavigation('/projects')} className="block text-white hover:bg-blue-700 dark:hover:bg-gray-600 px-3 py-2 rounded-md text-base font-medium">
                <FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />
                Projects
              </button>
              <button onClick={() => handleNavigation('/tasks')} className="block text-white hover:bg-blue-700 dark:hover:bg-gray-600 px-3 py-2 rounded-md text-base font-medium">
                <FontAwesomeIcon icon={faTasks} className="mr-2" />
                Tasks
              </button>
              <button onClick={() => handleNavigation('/login')} className="block text-white hover:bg-blue-700 dark:hover:bg-gray-600 px-3 py-2 rounded-md text-base font-medium">
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Login
              </button>
              <button onClick={() => handleNavigation('/landing')} className="block text-white hover:bg-blue-700 dark:hover:bg-gray-600 px-3 py-2 rounded-md text-base font-medium">
                Landing Page
              </button>
              <button onClick={toggleDarkMode} className="block text-white hover:bg-blue-700 dark:hover:bg-gray-600 px-3 py-2 rounded-md text-base font-medium">
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;