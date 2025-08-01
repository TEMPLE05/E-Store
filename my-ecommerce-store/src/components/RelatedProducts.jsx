import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { products } from '../assets/assets';
import Title from './Title';
import Product from '../pages/Product';
import ProductItem from './ProductItem';

const RelatedProducts = ({category,subcategory}) => {

    const {products} = useContext(ShopContext);
    const [related,setRelated]= useState([]);

    useEffect(()=>{

        if (products.length > 0) {

            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subcategory === item.subcategory)

            setRelated(productsCopy.slice(0,5));
        }
    },[products,category,subcategory])

  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-colo-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {related.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
            ))}
        </div>
    </div>
  )
}

export default RelatedProducts