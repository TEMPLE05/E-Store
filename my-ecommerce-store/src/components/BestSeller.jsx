import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { products } from '../assets/assets';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { Products } = useContext(ShopContext);
  const [BestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestproduct = products.filter((item) => item.bestseller);
    setBestSeller(bestproduct.slice(0, 3));
  }, []);

  return (
    <div className='my-10 px-4 sm:px-6 lg:px-8'>
      {/* Title */}
      <div className='text-center py-8 max-w-2xl mx-auto'>
        <Title text1='BEST' text2='SELLERS' />
        <p className='text-xs sm:text-sm md:text-base text-gray-600'>
          Explore our best-selling products that have captured the hearts of our customers.
        </p>
      </div>

      {/* Centered Grid */}
      <div className='flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {BestSeller.map((item, index) => (
            <ProductItem
              key={index}
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
