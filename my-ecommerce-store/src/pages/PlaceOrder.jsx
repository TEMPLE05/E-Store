import React, { useContext, useEffect, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { cartItems, products } = useContext(ShopContext);
  const [method, setMethod] = useState('cod');
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        if (cartItems[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: cartItems[productId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-6 pt-5 sm:pt-14 min-h-[60vh] border-t-2 px-4 sm:px-10">
      {/* LEFT: Delivery Info + Order Summary */}
      <div className="w-full lg:max-w-[55%] flex flex-col gap-8">
        {/* Delivery Information */}
        <div className="bg-white border p-5 rounded-lg shadow-sm">
          <Title text1="DELIVERY" text2="INFORMATION" />
          <form className="grid sm:grid-cols-2 gap-4 mt-4">
            <input type="text" required placeholder="First Name" className="border p-3 text-sm rounded-md focus:ring-2 focus:ring-black/30 placeholder:text-gray-400" />
            <input type="text" required placeholder="Last Name" className="border p-3 text-sm rounded-md focus:ring-2 focus:ring-black/30 placeholder:text-gray-400" />
            <input type="email" required placeholder="Email Address" className="sm:col-span-2 border p-3 text-sm rounded-md focus:ring-2 focus:ring-black/30 placeholder:text-gray-400" />
            <input type="text" required placeholder="Street Address" className="sm:col-span-2 border p-3 text-sm rounded-md focus:ring-2 focus:ring-black/30 placeholder:text-gray-400" />
            <input type="text" placeholder="City" className="border p-3 text-sm rounded-md focus:ring-2 focus:ring-black/30 placeholder:text-gray-400" />
            <input type="text" placeholder="State" className="border p-3 text-sm rounded-md focus:ring-2 focus:ring-black/30 placeholder:text-gray-400" />
            <input type="number" placeholder="Zip Code" className="border p-3 text-sm rounded-md focus:ring-2 focus:ring-black/30 placeholder:text-gray-400" />
            <input type="text" placeholder="Country" className="border p-3 text-sm rounded-md focus:ring-2 focus:ring-black/30 placeholder:text-gray-400" />
            <input type="tel" placeholder="Phone Number" className="sm:col-span-2 border p-3 text-sm rounded-md focus:ring-2 focus:ring-black/30 placeholder:text-gray-400" />
            <textarea placeholder="Delivery Notes (optional)" className="sm:col-span-2 border p-3 text-sm rounded-md focus:ring-2 focus:ring-black/30 placeholder:text-gray-400 resize-none" rows={3} />
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white border p-5 rounded-lg shadow-sm">
          <Title text1="ORDER" text2="SUMMARY" />
          <div className="space-y-4 mt-4">
            {cartData.map((item, index) => {
              const product = products.find(p => p._id === item._id);
              if (!product) return null;

              return (
                <div key={index} className="flex items-center justify-between border p-3 rounded-lg shadow-sm">
                  <div className="flex items-center gap-4">
                    <img className="w-14 h-14 object-cover rounded" src={product.image[0]} alt={product.name} />
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">Size: {item.size}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    ₦{(product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT: Payment Method & Total */}
      <div className="w-full lg:w-[40%] space-y-8">
        <CartTotal />

        <div className="bg-white border p-5 rounded-lg shadow-sm">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex flex-col gap-3 mt-4">
            {/* Stripe Option */}
            <div
              onClick={() => setMethod('stripe')}
              className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${method === 'stripe' ? 'bg-gray-100' : ''}`}
            >
              <span className={`w-4 h-4 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`} />
              <img className="h-5" src={assets.stripe_logo} alt="stripe" />
            </div>

            {/* Razorpay Option */}
            <div
              onClick={() => setMethod('razorpay')}
              className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${method === 'razorpay' ? 'bg-gray-100' : ''}`}
            >
              <span className={`w-4 h-4 border rounded-full ${method === 'razorpay' ? 'bg-green-500' : ''}`} />
              <img className="h-5" src={assets.razorpay_logo} alt="razorpay" />
            </div>

            {/* Cash on Delivery Option */}
            <div
              onClick={() => setMethod('cod')}
              className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${method === 'cod' ? 'bg-gray-100' : ''}`}
            >
              <span className={`w-4 h-4 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`} />
              <span className="text-sm font-medium">Cash on Delivery</span>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <div className="text-end">
          <button
            onClick={() => navigate('/orders')}
            className="bg-black text-white px-8 py-3 text-sm rounded-lg shadow hover:bg-gray-900 transition"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
