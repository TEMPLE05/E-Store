import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-md sticky top-0 z-50">
      <img
        src={assets.logo}
        alt="Logo"
        className="w-24 sm:w-32 object-contain transition duration-300 hover:scale-105"
      />

      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg transition duration-300 hover:scale-105"
      >
        Log Out
      </button>
    </nav>
  );
};

export default Navbar;
