import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/about';
import Orders from './pages/Orders';
import Contact from './pages/contact';
import PlaceOrder from './pages/PlaceOrder';
import Cart from './pages/cart';
import Login from './pages/login';
import Product from './pages/Product';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import Searchbar from './components/searchbar';
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
