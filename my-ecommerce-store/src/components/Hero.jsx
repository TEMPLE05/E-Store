import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="w-full bg-white border-t border-gray-200">
      {/* Mobile-First Stack Layout */}
      <div className="flex flex-col md:flex-row min-h-[85vh] md:min-h-[70vh]">
        
        {/* Text Section - Full width on mobile, half on desktop */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 md:py-16">
          <div className="text-center md:text-left max-w-lg space-y-8">
            
            {/* Tag Line */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-8 md:w-10 h-[1px] bg-black" />
              <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase">
                Our Best Sellers
              </p>
            </div>
            
            {/* Main Headline - Mobile Optimized */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight">
                <span className="block">Discover</span>
                <span className="block">Our Latest</span>
                <span className="block font-medium">Collection</span>
              </h1>
            </div>
            
            {/* CTA Button - Mobile Friendly */}
            <div className="pt-4">
              <button className="group w-full md:w-auto bg-black text-white px-8 py-4 text-sm font-medium tracking-wide uppercase transition-all duration-300 hover:bg-gray-800 active:scale-98">
                <span className="flex items-center justify-center md:justify-start gap-3">
                  Shop Now
                  <div className="w-6 h-[1px] bg-white group-hover:w-8 transition-all duration-300" />
                </span>
              </button>
            </div>
            
            {/* Mobile Stats */}
            <div className="flex justify-center md:justify-start gap-8 pt-6 text-xs uppercase tracking-wider text-gray-600">
              <div>
                <div className="font-medium text-black">500+</div>
                <div>Products</div>
              </div>
              <div>
                <div className="font-medium text-black">50K+</div>
                <div>Customers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Section - Full width on mobile */}
        <div className="w-full md:w-1/2 relative">
          <div className="h-[60vh] md:h-full relative overflow-hidden">
            <img
              src={assets.hero_img}
              alt="Featured Collection"
              className="w-full h-full object-cover object-center"
            />
            
            {/* Mobile Overlay Text */}
            <div className="absolute inset-0 bg-black/10 md:hidden" />
            <div className="absolute bottom-6 left-6 right-6 md:hidden">
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg">
                <p className="text-xs font-medium text-black/80">
                  Premium Quality • Fast Shipping • 30-Day Returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Scroll Indicator */}
      <div className="flex justify-center pb-6 md:hidden">
        <div className="w-6 h-10 border border-black/20 rounded-full flex justify-center">
          <div className="w-[1px] h-3 bg-black/40 mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Hero;