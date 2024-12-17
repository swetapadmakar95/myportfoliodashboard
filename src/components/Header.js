import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4 w-full fixed top-0 left-0 z-10 shadow-md">
      <nav className="flex justify-between items-center">
        {/* Logo/Title */}
        <h1 className="text-xl font-bold">Portfolio Dashboard</h1>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle Navigation"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <div
          className={`absolute md:relative top-16 md:top-0 left-0 md:flex md:items-center w-full md:w-auto bg-gray-800 md:bg-transparent transition-all duration-300 ease-in-out ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="flex flex-col md:flex-row md:space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `mx-2 px-3 py-2 rounded ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `mx-2 px-3 py-2 rounded ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              Projects
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `mx-2 px-3 py-2 rounded ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              Analytics
            </NavLink>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `mx-2 px-3 py-2 rounded ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              Tasks
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `mx-2 px-3 py-2 rounded ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              Contact
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
