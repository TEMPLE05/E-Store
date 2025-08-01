import React from "react";
import { assets } from "../assets/assets";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 px-6 sm:px-12 py-16 border-t mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center lg:justify-items-start text-center lg:text-left">

        {/* Logo & About */}
        <div className="max-w-xs">
          <img src={assets.logo} alt="Logo" className="w-24 mx-auto lg:mx-0 mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Discover fashion that fits your lifestyle. Quality products, seamless shopping, fast delivery, and top-tier customer support.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Company</h3>
          <ul className="flex flex-col gap-1 text-gray-500">
            <li><Link to="/about" className="hover:text-black">About</Link></li>
            <li><Link to="/contact" className="hover:text-black">Contact</Link></li>
            <li><Link to="/delivery" className="hover:text-black">Delivery</Link></li>
            <li><Link to="/collection" className="hover:text-black">Collection</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4 text-lg">Get in Touch</h3>
          <ul className="flex flex-col gap-1 text-gray-500">
            <li className="flex items-center gap-2 justify-center lg:justify-start"><Mail size={16} /> support@example.com</li>
            <li className="flex items-center gap-2 justify-center lg:justify-start"><Phone size={16} /> +234 813 715 5469</li>
            <li className="flex items-center gap-2 justify-center lg:justify-start"><MapPin size={16} /> Abuja, Nigeria</li>
          </ul>
          <div className="flex justify-center lg:justify-start gap-4 mt-4 text-gray-600">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="w-full h-48 sm:h-56 lg:h-64 rounded-lg overflow-hidden">
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.9519296562127!2d7.492727475052384!3d9.056605689102712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0a4eab308a17%3A0x7f86a7cb39b9d80c!2sTranscorp%20Hilton%20Abuja!5e0!3m2!1sen!2sng!4v1721243917169!5m2!1sen!2sng"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            className="border-0"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mt-12 border-t pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} MARKET. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
