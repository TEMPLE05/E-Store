import React, { useState, useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';

const Navbar = () => {

  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(null);

  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems, backendUrl } = useContext(ShopContext);

  const logOut = () => {
    setVisible(false); // Close mobile menu
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    setUser(null) // Clear user data
  }

  // Fetch user data when token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token && !user) {
        try {
          const res = await axios.get(`${backendUrl}/api/user/profile`, {
            headers: { token },
          });
          if (res.data.success) {
            setUser(res.data.user);
          }
        } catch (err) {
          console.error('Failed to fetch user:', err);
        }
      }
    };

    fetchUser();
  }, [token, backendUrl, user]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (visible && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-trigger')) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [visible]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [visible]);

  return (
    <>
      <div className="flex items-center justify-between py-5 font-medium px-4 sm:px-8 md:px-12 relative z-40">
        <Link to='/'>
          <img src={assets.logo} className='w-36' alt="Logo" />
        </Link>

        <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-2/4 h-[1.5px] border-none bg-gray-700 hidden" />
          </NavLink>

          <NavLink to="/collection" className="flex flex-col items-center gap-1">
            <p>COLLECTION</p>
            <hr className="w-2/4 h-[1.5px] border-none bg-gray-700 hidden" />
          </NavLink>

          <NavLink to="/about" className="flex flex-col items-center gap-1">
            <p>ABOUT</p>
            <hr className="w-2/4 h-[1.5px] border-none bg-gray-700 hidden" />
          </NavLink>

          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            <p>CONTACT</p>
            <hr className="w-2/4 h-[1.5px] border-none bg-gray-700 hidden" />
          </NavLink>
        </ul>

        <div className="flex items-center gap-6">
          <img 
            onClick={() => setShowSearch(true)} 
            src={assets.search_icon} 
            className='w-6 cursor-pointer hover:opacity-70 transition-opacity' 
            alt="Search" 
          />

          {/* Desktop Profile Dropdown */}
          <div className='group relative hidden sm:block'>
            <img 
              onClick={() => token ? null : navigate('/login')} 
              className='w-5 cursor-pointer hover:opacity-70 transition-opacity' 
              src={assets.profile_icon} 
              alt="Profile" 
            />
            {token && 
              <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-white shadow-lg border rounded-lg text-gray-700'>
                  <Link to='/profile' className='cursor-pointer hover:text-black transition-colors py-1'>
                    Profile
                  </Link>
                  <Link to='/orders' className='cursor-pointer hover:text-black transition-colors py-1'>
                    Orders
                  </Link>
                  <p onClick={logOut} className='cursor-pointer hover:text-black transition-colors py-1 border-t pt-2'>
                    Logout
                  </p>
                </div>
              </div>
            }
          </div>

          {/* Cart Icon */}
          <Link to='/cart' className='relative hover:opacity-70 transition-opacity'>
            <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
            {getCartCount() > 0 && (
              <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] animate-pulse'>
                {getCartCount()}
              </p>
            )}
          </Link>

          {/* Mobile Menu Trigger */}
          <button 
            onClick={() => setVisible(true)} 
            className="sm:hidden menu-trigger p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <img src={assets.menu_icon} alt="Menu" className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 sm:hidden ${
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setVisible(false)}
      />

      {/* Enhanced Mobile Sidebar */}
      <div className={`
        mobile-menu fixed top-0 right-0 h-full bg-white z-50 
        transition-transform duration-300 ease-in-out shadow-2xl
        ${visible ? 'translate-x-0 w-80' : 'translate-x-full w-0'}
        sm:hidden
      `}>
        {visible && (
          <div className='flex flex-col h-full'>
            {/* Header */}
            <div className='flex items-center justify-between p-4 border-b border-gray-200 bg-white'>
              <h2 className='text-lg font-semibold text-black'>Menu</h2>
              <button 
                onClick={() => setVisible(false)} 
                className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                aria-label="Close menu"
              >
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* User Section */}
            {token ? (
              <div className='p-4 bg-gray-50 border-b border-gray-200'>
                <div className='flex items-center gap-3 mb-3'>
                  <img src={assets.profile_icon} alt="Profile" className="w-8 h-8" />
                  <div>
                    <span className='text-black font-medium block'>Welcome back!</span>
                    <span className='text-gray-600 text-sm'>{user?.name || 'Loading...'}</span>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                  <Link 
                    to='/profile' 
                    onClick={() => setVisible(false)}
                    className='bg-black text-white text-center py-2 px-3 rounded-lg text-sm hover:bg-gray-800 transition-colors'
                  >
                    Profile
                  </Link>
                  <Link 
                    to='/orders' 
                    onClick={() => setVisible(false)}
                    className='bg-gray-800 text-white text-center py-2 px-3 rounded-lg text-sm hover:bg-gray-700 transition-colors'
                  >
                    Orders
                  </Link>
                </div>
              </div>
            ) : (
              <div className='p-4 bg-gray-50 border-b border-gray-200'>
                <Link 
                  to='/login' 
                  onClick={() => setVisible(false)}
                  className='block bg-black text-white text-center py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium'
                >
                  Sign In / Sign Up
                </Link>
              </div>
            )}

            {/* Navigation Links */}
            <div className='flex-1 py-4'>
              <div className='space-y-1 px-4'>
                <NavLink 
                  onClick={() => setVisible(false)} 
                  className='block py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-black' 
                  to='/'
                >
                  🏠 Home
                </NavLink>
                <NavLink 
                  onClick={() => setVisible(false)} 
                  className='block py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-black' 
                  to='/collection'
                >
                  👕 Collection
                </NavLink>
                <NavLink 
                  onClick={() => setVisible(false)} 
                  className='block py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-black' 
                  to='/about'
                >
                  ℹ️ About
                </NavLink>
                <NavLink 
                  onClick={() => setVisible(false)} 
                  className='block py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-black' 
                  to='/contact'
                >
                  📞 Contact
                </NavLink>
                <Link 
                  onClick={() => setVisible(false)} 
                  className='block py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-black' 
                  to='/cart'
                >
                  🛒 Cart {getCartCount() > 0 && `(${getCartCount()})`}
                </Link>
              </div>
            </div>

            {/* Footer Actions */}
            {token && (
              <div className='p-4 border-t border-gray-200 bg-gray-50'>
                <button
                  onClick={logOut}
                  className='w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium'
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;