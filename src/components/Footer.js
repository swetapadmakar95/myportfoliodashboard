import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-4 bg-gray-800 text-white p-4 fixed bottom-0 left-0 w-full">
      <div className="flex justify-between">
        <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
        <div>
          <a href="https://github.com/swetapadmakar95" className="mx-2" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/swetapadmakar" className="mx-2" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
