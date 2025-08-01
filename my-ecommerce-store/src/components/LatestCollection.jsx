import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="w-full py-16 px-4 md:px-10 lg:px-20">
      {/* Section Title */}
      <div className="text-center mb-12">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="mt-4 text-base md:text-lg text-gray-600 max-w-4xl mx-auto">
          Explore our freshest drops — handpicked designs that mix everyday comfort with head-turning flair.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8 xl:gap-10">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
