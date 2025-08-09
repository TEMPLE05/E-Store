import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const SideBar = () => {
  return (
    <div className="w-[70px] md:w-[15%] min-h-screen border-r border-gray-200 bg-white shadow-sm fixed md:static z-40">
      <div className="flex flex-col items-center md:items-start gap-6 pt-6 px-2 md:px-4 text-sm">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `group flex flex-col md:flex-row items-center md:gap-3 px-2 py-2 rounded-lg w-full transition-all duration-200 ease-in-out
            ${isActive ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'}`
          }
        >
          <img
            className="w-6 h-6 transition-transform duration-200 group-hover:scale-110"
            src={assets.add_icon}
            alt="Add"
          />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `group flex flex-col md:flex-row items-center md:gap-3 px-2 py-2 rounded-lg w-full transition-all duration-200 ease-in-out
            ${isActive ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'}`
          }
        >
          <img
            className="w-6 h-6 transition-transform duration-200 group-hover:scale-110"
            src={assets.order_icon}
            alt="List"
          />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `group flex flex-col md:flex-row items-center md:gap-3 px-2 py-2 rounded-lg w-full transition-all duration-200 ease-in-out
            ${isActive ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'}`
          }
        >
          <img
            className="w-6 h-6 transition-transform duration-200 group-hover:scale-110"
            src={assets.order_icon}
            alt="Orders"
          />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
