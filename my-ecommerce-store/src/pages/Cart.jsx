import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [removedItem, setRemovedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const handleRemove = (id, size) => {
    setRemovedItem(`${id}-${size}`);
    setTimeout(() => {
      updateQuantity(id, size, 0);
      setRemovedItem(null);
    }, 300);
  };

  return (
    <div className="border-t pt-14 px-4 sm:px-6 lg:px-20 xl:px-32 bg-gray-50 min-h-screen">
      <div className="text-3xl font-semibold mb-6">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div className="space-y-6">
        {cartData.length === 0 ? (
          <div className="text-center text-gray-500 text-lg mt-20">Your cart is empty.</div>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            const isRemoving = removedItem === `${item._id}-${item.size}`;

            return (
              <div
                key={index}
                onClick={() => navigate(`/product/${item._id}`)}
                className={`transition-all duration-300 ${
                  isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                } bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.015] p-4 flex flex-col sm:flex-row items-center gap-6 cursor-pointer`}
              >
                <div className="flex items-center gap-4 w-full sm:w-2/3">
                  <img
                    className="w-20 h-20 object-cover rounded-xl"
                    src={productData.image[0]}
                    alt={productData.name}
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-base sm:text-lg font-medium">{productData.name}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <span>
                        {currency}
                        {productData.price}
                      </span>
                      <span className="px-2 py-0.5 border border-gray-300 rounded-md bg-gray-100 text-xs">
                        {item.size}
                      </span>
                    </div>
                    {productData.stock && productData.stock < 5 && (
                      <p className="text-red-600 text-xs mt-1">Only {productData.stock} left!</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:w-1/3 justify-end sm:justify-between">
                  <input
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      e.stopPropagation();
                      const value = Number(e.target.value);
                      if (value > 0) updateQuantity(item._id, item.size, value);
                    }}
                    className="border border-gray-300 w-16 text-center px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-black/60"
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                  />
                  <img
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRemove(item._id, item.size);
                    }}
                    className="w-5 h-5 cursor-pointer"
                    src={assets.bin_icon}
                    alt="remove"
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {cartData.length > 0 && (
        <div className="flex justify-end mt-16">
          <div className="w-full sm:w-[400px] bg-white p-6 rounded-xl shadow-lg">
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={() => navigate('/Place-order')}
                className="bg-black hover:bg-gray-900 text-white text-sm mt-6 px-6 py-3 rounded-md transition-all duration-300"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
