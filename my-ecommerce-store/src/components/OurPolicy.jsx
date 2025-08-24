import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange",
      description: "Hassle-free exchange within 30 days",
      mobile_title: "Easy Exchange"
    },
    {
      icon: assets.quality_icon,
      title: "Free Returns",
      description: "7-day return policy with original packaging",
      mobile_title: "Free Returns"
    },
    {
      icon: assets.support_img,
      title: "24/7 Support",
      description: "Round-the-clock customer assistance",
      mobile_title: "24/7 Support"
    }
  ];

  return (
    <div className="w-full bg-gray-50 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Mobile-First Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-light text-black mb-2">
            Why Choose Us
          </h2>
          <p className="text-sm text-gray-600">
            Your satisfaction is our priority
          </p>
        </div>

        {/* Mobile-Optimized Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {policies.map((policy, index) => (
            <div 
              key={index}
              className="bg-white p-6 md:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center group"
            >
              {/* Icon */}
              <div className="mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-black transition-colors duration-300">
                  <img 
                    src={policy.icon} 
                    className="w-6 h-6 md:w-8 md:h-8 group-hover:brightness-0 group-hover:invert transition-all duration-300" 
                    alt={policy.title}
                  />
                </div>
              </div>
              
              {/* Content */}
              <div>
                <h3 className="text-base md:text-lg font-medium text-black mb-2 md:mb-3">
                  {policy.mobile_title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {policy.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA Section */}
        <div className="mt-8 md:mt-12 text-center md:hidden">
          <p className="text-sm text-gray-600 mb-4">
            Have questions about our policies?
          </p>
          <button className="bg-black text-white px-6 py-2 text-sm font-medium rounded hover:bg-gray-800 transition-colors">
            Contact Support
          </button>
        </div>

        {/* Desktop Additional Info */}
        <div className="hidden md:block mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-8 text-center text-sm text-gray-600">
            <div>
              <div className="font-medium text-black mb-1">Fast Processing</div>
              <div>Orders processed within 24 hours</div>
            </div>
            <div>
              <div className="font-medium text-black mb-1">Secure Payment</div>
              <div>256-bit SSL encryption</div>
            </div>
            <div>
              <div className="font-medium text-black mb-1">Satisfaction Guarantee</div>
              <div>100% money-back guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;