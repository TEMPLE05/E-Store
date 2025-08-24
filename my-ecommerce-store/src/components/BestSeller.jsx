import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext); 
  const [bestSeller, setBestSeller] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!Array.isArray(products)) return;

    const bestproduct = products.filter((item) => item.bestseller);
    setBestSeller(bestproduct.slice(0, 6)); // Show up to 6 bestsellers
  }, [products]);

  // Mobile carousel logic
  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev >= bestSeller.length - 2 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev <= 0 ? bestSeller.length - 2 : prev - 1
    );
  };

  if (bestSeller.length === 0) {
    return (
      <div className="py-12 px-4 text-center">
        <Title text1="BEST" text2="SELLERS" />
        <p className="text-gray-600 mt-4">No bestsellers available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="w-full py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Title text1="BEST" text2="SELLERS" />
          <p className="text-sm md:text-base text-gray-600 mt-3 max-w-md mx-auto">
            Customer favorites that keep selling out
          </p>
        </div>

        {/* Mobile Carousel View (md:hidden) */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ 
                transform: `translateX(-${currentSlide * 50}%)`,
                width: `${bestSeller.length * 50}%`
              }}
            >
              {bestSeller.map((item, index) => (
                <div key={index} className="w-1/2 px-2 flex-shrink-0">
                  <ProductItem
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {bestSeller.slice(0, -1).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-black' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Mobile Arrow Navigation */}
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={prevSlide}
              className="w-8 h-8 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="w-8 h-8 border border-black rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >
              →
            </button>
          </div>
        </div>

        {/* Desktop Grid View (hidden md:block) */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {bestSeller.slice(0, 3).map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <button className="bg-white border border-black text-black px-8 py-3 text-sm font-medium uppercase tracking-wide hover:bg-black hover:text-white transition-all duration-300">
            View All Bestsellers
          </button>
        </div>

        {/* Mobile Stats */}
        <div className="mt-8 md:hidden">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-lg font-bold text-black">{bestSeller.length}</div>
            <div className="text-xs text-gray-600 uppercase tracking-wide">
              Bestselling Items
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-black text-sm">★</span>
            ))}
          </div>
          <p className="text-xs md:text-sm text-gray-600">
            Loved by 10,000+ customers worldwide
          </p>
        </div>
      </div>
    </div>
  );
};

export default BestSeller;