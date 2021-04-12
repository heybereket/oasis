import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between py-8">
      <img src="/static/oasis-logo.png" alt="Oasis Logo" className="w-32" />
      <ul className="flex items-center space-x-6 md:space-x-10 text-lg text-gray-300">
        <li>
          <a href="#" className="hover:text-gray-200">GitHub</a>
        </li>
        <li>
          <a href="#" className="hover:text-gray-200">Discord</a>
        </li>
      </ul>
    </nav>
  );
};
