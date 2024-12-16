import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 w-full fixed top-0 left-0 z-10 shadow-md">
      <nav className="flex justify-between items-center">
        {/* Logo/Title */}
        <h1 className="text-xl font-bold">Portfolio Dashboard</h1>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `mx-2 px-3 py-2 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `mx-2 px-3 py-2 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `mx-2 px-3 py-2 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
            }
          >
            Analytics
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `mx-2 px-3 py-2 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
            }
          >
            Tasks
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `mx-2 px-3 py-2 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
            }
          >
            Contact
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
