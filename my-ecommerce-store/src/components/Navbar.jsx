import React, { useState,useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

  const [visible, setVisible] = useState(false);

  const {setShowSearch, getCartCount,navigate,token,setToken,setCartItems} = useContext(ShopContext);

  const logOut = () =>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    
  }
  return (
     <div className="flex items-center justify-between py-5 font-medium px-4 sm:px-8 md:px-12">
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
          <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-6 cursor-pointer' alt="" />

          <div className='group relative'>
            <img  onClick={()=> token ? null : navigate('/login') }className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
            {/*drop down*/}
            {token && 
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700 rounded'>
                <p className='cursor-pointer hover:text-black'>Profile</p>
                <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logOut} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>}
          </div>
          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-5 min-w-5' alt="" />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
          </Link>
         <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="" className="sm:hidden" />
        </div>
        {/*sidebar for mobile view*/}
        <div className={`fixed top-0 right-0 h-full bg-white z-50 transition-transform duration-300 ease-in-out ${visible ? 'translate-x-0 w-full' : 'translate-x-full w-0'}`}>
          <div className='flex flex-col text-gray-600'>
              <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                <img className='w-6 h-6 rotate-180' src={assets.dropdown_icon} alt="" />
                <p>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
          </div>
        </div>
      </div>
  );
};

export default Navbar;
