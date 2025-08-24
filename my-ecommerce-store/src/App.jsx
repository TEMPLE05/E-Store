import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Orders from './pages/Orders';
import Contact from './pages/Contact';
import PlaceOrder from './pages/PlaceOrder';
import Profile from './pages/profile';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Product from './pages/Product';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Searchbar from './components/Searchbar';
import ScrollToTop from './components/ScrollToTop'; // ✅ NEW
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="w-full">
      <Navbar />
      <Searchbar />
      <ScrollToTop /> {/* ✅ ADD THIS */}
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
