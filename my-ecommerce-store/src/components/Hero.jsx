import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center sm:items-stretch bg-white overflow-hidden border-t border-gray-200">
      {/* Left Side - Text */}
      <div className="w-full sm:w-1/2 flex items-center justify-center px-6 sm:px-12 py-12">
        <div className="text-[#1a1a1a] max-w-lg space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[2px] bg-[#1a1a1a]" />
            <p className="text-sm font-semibold tracking-widest">OUR BEST SELLERS</p>
          </div>
          <h1 className="prata-regular text-4xl sm:text-5xl lg:text-6xl leading-tight font-medium">
            Discover Our<br />Top Product
          </h1>
          <div className="flex items-center gap-3 group cursor-pointer">
            <p className="text-sm font-semibold tracking-wide group-hover:underline">
              SHOP NOW
            </p>
            <div className="w-10 h-[1px] bg-[#1a1a1a] group-hover:w-14 transition-all duration-300" />
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="w-full sm:w-1/2 h-[300px] sm:h-auto">
        <img
          src={assets.hero_img}
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
