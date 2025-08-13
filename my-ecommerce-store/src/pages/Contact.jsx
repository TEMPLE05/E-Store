import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="px-4 sm:px-10 md:px-20 py-12 border-t text-gray-700">
      {/* Section Title */}
      <div className="text-center text-3xl mb-10">
        <Title text1="CONTACT" text2="US" />
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          Got a question or feedback? We're always here to help!
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
        {/* Contact Image */}
        <div className="w-full lg:w-1/2">
          <img
            className="w-full h-auto max-w-[520px] rounded-lg shadow-md object-cover"
            src={assets.contact_img}
            alt="Contact Visual"
          />
          {/* Company Info */}
          <div className="mt-8 text-sm sm:text-base space-y-4">
            <h3 className="text-xl font-semibold text-black">Get in Touch</h3>
            <p><strong>Email:</strong> support@forever.com</p>
            <p><strong>Phone:</strong> +234 800 123 4567</p>
            <p><strong>Address:</strong> 15 Trend Lane, Victoria Island, Lagos</p>
            <p><strong>Hours:</strong> Mon - Fri, 9am - 6pm</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full lg:w-1/2 bg-gray-50 p-6 rounded-lg shadow-lg space-y-6">
          <form className="space-y-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none"
            ></textarea>
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300 w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
