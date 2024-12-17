import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-4 bg-gray-800 text-white p-4 fixed bottom-0 left-0 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Copyright */}
        <p className="mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} Your Name. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/swetapadmakar95"
            className="hover:text-gray-400 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/swetapadmakar"
            className="hover:text-gray-400 transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
