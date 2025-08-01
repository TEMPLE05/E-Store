import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';

const getRandomStatus = () => {
  const statuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const statusColors = {
  Processing: 'bg-yellow-100 text-yellow-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};

const Orders = () => {
  const { cartItems, products, currency } = useContext(ShopContext);
  const [orderedItems, setOrderedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size,
            quantity: cartItems[productId][size],
            status: getRandomStatus(),
          });
        }
      }
    }
    setOrderedItems(tempData);
  }, [cartItems]);

  return (
    <div className="px-4 py-12 min-h-[70vh] border-t bg-gradient-to-b from-gray-50 via-white to-white">
      <Title text1="YOUR" text2="ORDERS" />

      {orderedItems.length === 0 ? (
        <p className="text-center text-gray-500 mt-16 text-lg">You haven't placed any orders yet.</p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {orderedItems.map((item, index) => {
            const product = products.find((p) => p._id === item._id);
            if (!product) return null;

            return (
              <div
                key={index}
                onClick={() => navigate(`/product/${item._id}`)}
                className="bg-white border border-gray-100 p-5 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col"
              >
                <div className="relative h-44 overflow-hidden rounded-xl mb-4 bg-gray-100">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 mb-2 leading-tight">
                  {product.name}
                </h3>
                <div className="text-sm text-gray-500 flex flex-wrap gap-4 mb-2">
                  <span>Size: <span className="font-semibold text-gray-700">{item.size}</span></span>
                  <span>Qty: <span className="font-semibold text-gray-700">{item.quantity}</span></span>
                </div>
                <div className="text-gray-900 font-bold text-base mb-3">
                  {currency}{(product.price * item.quantity).toLocaleString()}
                </div>
                <div
                  className={`w-fit px-3 py-1 text-xs font-medium rounded-full ${statusColors[item.status]}`}
                >
                  {item.status}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="text-center mt-16">
        <button
          onClick={() => navigate('/')}
          className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-900 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Orders;
