import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/Relatedproducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    const foundProduct = products.find(item => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  }, [productId, products]);

  return productData ? (
    <div className="pt-28 px-4 sm:px-10 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Product Images */}
        <div className="flex flex-col lg:flex-row gap-4 flex-1">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-auto">
            {productData.image.map((img, index) => (
              <img
                key={index}
                onClick={() => setImage(img)}
                src={img}
                alt="product thumbnail"
                className="w-20 h-20 object-cover cursor-pointer border rounded hover:shadow-md"
              />
            ))}
          </div>
          <div className="flex-1">
            <img src={image} alt="main product" className="w-full h-auto rounded shadow-md" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-semibold">{productData.name}</h1>

          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="star" className="w-4" />
            ))}
            <img src={assets.star_dull_icon} alt="star dull" className="w-4" />
            <span className="text-gray-600 ml-2">(122)</span>
          </div>

          <p className="text-3xl font-bold text-gray-800">{currency}{productData.price}</p>
          <p className="text-gray-700 leading-relaxed">{productData.description}</p>

          <div>
            <p className="mb-2 font-medium">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`px-4 py-2 border rounded transition-all duration-200 ${item === size ? 'bg-black text-white border-black' : 'bg-white text-gray-800 border-gray-300 hover:border-black'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className="w-full sm:w-auto px-6 py-3 bg-black text-white text-sm rounded hover:bg-gray-800 transition"
          >
            ADD TO CART
          </button>

          <ul className="text-sm text-gray-500 mt-6 space-y-1">
            <li>✔️ 100% original products</li>
            <li>✔️ Cash on delivery available</li>
            <li>✔️ Easy returns within 7 days</li>
          </ul>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-16">
        <div className="border-b flex gap-6">
          <button className="py-3 px-5 font-medium border-b-2 border-black">Description</button>
          <button className="py-3 px-5 text-gray-500 hover:text-black">Reviews (122)</button>
        </div>
        <div className="bg-gray-50 p-6 text-gray-700 mt-4 rounded">
          <p className="mb-4">
            <strong>Men’s Pink Cotton Polo Shirt</strong> — Elevate your everyday style with this breathable cotton shirt. It features a soft pink tone and a crisp white collar for a modern look.
          </p>
          <ul className="space-y-2">
            <li><strong>Material:</strong> 100% Pure Cotton</li>
            <li><strong>Fit:</strong> Relaxed / Oversized</li>
            <li><strong>Design:</strong> Drop shoulders, short sleeves, hidden button placket</li>
            <li><strong>Color:</strong> Soft blush pink with white accents</li>
            <li><strong>Perfect For:</strong> Casual wear, summer days, or layering</li>
          </ul>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <RelatedProducts category={productData.category} subcategory={productData.subcategory} />
      </div>
    </div>
  ) : (
    <div className="min-h-[200px] flex justify-center items-center text-gray-400 animate-pulse">Loading product...</div>
  );
};

export default Product;
