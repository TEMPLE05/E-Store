import React, { useContext, useState, useEffect } from 'react';
import Title from '../components/Title';
import axios from 'axios';
import CartTotal from '../components/CartTotal';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { 
    navigate, 
    backendUrl, 
    token, 
    cartItems, 
    setCartItems, 
    getCartAmount, 
    delivery_fee, 
    products,
    handleGuestCheckout 
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  // Check if user is logged in when component mounts
  useEffect(() => {
    if (!handleGuestCheckout()) {
      return; // Will redirect to login
    }
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    // Double check authentication before placing order
    if (!token) {
      toast.error("Please login to place an order");
      navigate('/login');
      return;
    }

    try {
      let orderItems = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === productId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[productId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      const addressString = `${formData.firstName} ${formData.lastName}, ${formData.street}, ${formData.city}, ${formData.state}, ${formData.zipcode}, ${formData.country}, Phone: ${formData.phone}, Email: ${formData.email}`;

      let orderData = {
        address: addressString,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method === 'cod' ? 'COD' : 'BANK_TRANSFER'
      };

      console.log("=== FRONTEND method state ===", method);
      console.log("=== FRONTEND orderData ===", JSON.stringify(orderData, null, 2));

      const response = await axios.post(
        backendUrl + '/api/order/place',
        orderData,
        { headers: { token } }
      );

      console.log("=== FRONTEND server response ===", response.data);

      if (response.data.success) {
        setCartItems({});
        toast.success("Order placed successfully!");
        navigate('/orders');
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.error("=== FRONTEND error placing order ===", error);
      toast.error("Something went wrong placing your order.");
    }
  };

  // Show loading or redirect message if not authenticated
  if (!token) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-lg font-medium text-gray-600 mb-4">
            Please login to proceed with checkout
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="bg-black text-white px-8 py-3 text-sm rounded-lg hover:bg-gray-800 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col sm:flex-row justify-between gap-6 pt-5 sm:pt-14 min-h-[60vh] border-t-2 bg-white p-4 sm:p-8 rounded-lg shadow-lg'
    >
      {/* Delivery Info */}
      <div className='flex flex-col w-full sm:max-w-[380px] bg-gray-50 p-4 rounded-lg shadow-sm'>
        <div className='text-xl sm:text-2xl my-3 font-semibold text-gray-700'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3 mb-2'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-2 px-3 w-full' type="text" placeholder='First Name' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-2 px-3 w-full' type="text" placeholder='Last name' />
        </div>
        <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-2 px-3 w-full mb-2' type="email" placeholder='Email Address' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-2 px-3 w-full mb-2' type="text" placeholder='Street Name' />
        <div className='flex gap-3 mb-2'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-2 px-3 w-full' type="text" placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-2 px-3 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3 mb-2'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-2 px-3 w-full' type="number" placeholder='Zip code' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-2 px-3 w-full' type="text" placeholder='Country' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-2 px-3 w-full' type="number" placeholder='Phone Number' />
      </div>

      {/* Cart Summary */}
      <div className='mt-8 sm:mt-0'>
        <CartTotal />
      </div>

      {/* Payment Method */}
      <div className='mt-12 sm:mt-0 bg-gray-50 p-4 rounded-lg shadow-sm w-full sm:max-w-[380px]'>
        <Title text1={'PAYMENT'} text2={'METHOD'} />
        <div className='flex gap-3 flex-col mt-4'>
          <div
            onClick={() => setMethod('cod')}
            className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-lg hover:shadow-md transition ${method === 'cod' ? 'border-green-500 bg-green-50' : ''}`}
          >
            <p className={`min-w-[14px] h-[14px] border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
            <p className='text-gray-700 font-medium'>Cash on Delivery</p>
          </div>

          <div
            onClick={() => setMethod('bank')}
            className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-lg hover:shadow-md transition ${method === 'bank' ? 'border-green-500 bg-green-50' : ''}`}
          >
            <p className={`min-w-[14px] h-[14px] border rounded-full ${method === 'bank' ? 'bg-green-500' : ''}`}></p>
            <p className='text-gray-700 font-medium'>Bank Transfer / Card</p>
          </div>
        </div>

        <div className='w-full text-end mt-8'>
          <button
            type='submit'
            className='bg-black text-white px-16 py-3 text-sm rounded-lg hover:bg-gray-800 transition'
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;