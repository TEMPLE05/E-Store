import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (Array.isArray(products)) {
      setLatestProducts(products.slice(0, 12));
    }
  }, [products]);

  // Mobile: show 6 items initially, desktop: show 8
  const displayProducts = showAll 
    ? latestProducts 
    : latestProducts.slice(0, window.innerWidth < 768 ? 6 : 8);

  return (
    <div className="w-full py-12 px-4 bg-white">
      
      {/* Mobile-Optimized Header */}
      <div className="text-center mb-8">
        <Title text1="LATEST" text2="ARRIVALS" />
        <p className="mt-3 text-sm md:text-base text-gray-600 max-w-md mx-auto leading-relaxed">
          Fresh styles just dropped. Discover what's new and trending.
        </p>
      </div>

      {/* Mobile-First Product Grid */}
      <div className="max-w-7xl mx-auto">
        
        {/* Products Grid - Mobile Optimized */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {displayProducts.map((item, index) => (
            <div key={index} className="group">
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </div>
          ))}
        </div>

        {/* Show More/Less Button - Mobile Friendly */}
        {latestProducts.length > (window.innerWidth < 768 ? 6 : 8) && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full md:w-auto bg-white border border-black text-black px-8 py-3 text-sm font-medium uppercase tracking-wide hover:bg-black hover:text-white transition-all duration-300"
            >
              {showAll ? 'Show Less' : `View All (${latestProducts.length})`}
            </button>
          </div>
        )}

        {/* Mobile Categories Quick Filter */}
        <div className="mt-8 md:hidden">
          <div className="flex overflow-x-auto gap-3 pb-2 -mx-2 px-2">
            {['All', 'Men', 'Women', 'Kids', 'Accessories'].map((category) => (
              <button
                key={category}
                className="flex-shrink-0 px-4 py-2 text-xs font-medium border border-gray-200 rounded-full whitespace-nowrap hover:border-black transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Trust Badges */}
      <div className="mt-12 md:hidden">
        <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-600">
          <div>
            <div className="w-8 h-8 bg-gray-100 rounded-full mx-auto mb-2 flex items-center justify-center">
              🚚
            </div>
            <div className="font-medium">Free Shipping</div>
          </div>
          <div>
            <div className="w-8 h-8 bg-gray-100 rounded-full mx-auto mb-2 flex items-center justify-center">
              ↩️
            </div>
            <div className="font-medium">Easy Returns</div>
          </div>
          <div>
            <div className="w-8 h-8 bg-gray-100 rounded-full mx-auto mb-2 flex items-center justify-center">
              ⭐
            </div>
            <div className="font-medium">Quality First</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;