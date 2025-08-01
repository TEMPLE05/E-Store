import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div className="px-4 sm:px-10 md:px-20 py-12 border-t text-gray-700">
      {/* Section Title */}
      <div className="text-3xl text-center mb-12">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* Content Block */}
      <div className="flex flex-col lg:flex-row gap-14 items-start">
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={assets.about_img}
            alt="About FOREVER"
            className="w-full h-full object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Text + Newsletter */}
        <div className="flex flex-col gap-8 w-full lg:w-1/2">
          <div className="space-y-6">
            <p className="text-lg">
              At <span className="font-semibold text-black">FOREVER</span>, we focus on making your shopping experience
              smooth, simple, and stylish. Every part of the journey — from browsing products to managing your cart and
              placing orders — is built for ease and clarity.
            </p>

            <p className="text-lg">
              With a clean design and smart features, we ensure you get what you need quickly and hassle-free.
            </p>

            <div>
              <h3 className="text-xl font-bold text-black mb-2">Our Mission</h3>
              <p className="text-lg">
                Our mission is to create a seamless online shopping experience that combines functionality, style, and
                simplicity. We aim to deliver a platform where users can explore products, manage orders, and check out with
                ease — every detail crafted to put the customer first.
              </p>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="mt-6">
            <NewsLetterBox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
