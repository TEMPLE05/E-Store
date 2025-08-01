import React from 'react'

const NewsLetterBox = () => {

  const onSubmitHandler = (event) => {
    event.preventDefault()
    // You can add form logic here (e.g. show success message, send to backend etc.)
    console.log("Subscribed!")
  }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>
        Subscribe now & get 20% off on your first order
      </p>
      <p className='text-gray-400 mt-3'>
        Stay updated with our latest news and exclusive offers. For new unit supply. Subscribe to our newsletter and enjoy a 20% discount on your first order. Don't miss out on the latest trends and special promotions. Join our community today!
      </p>
      <form
        onSubmit={onSubmitHandler}
        className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'
      >
        <input
          className='w-full sm:flex-1 outline-none'
          type='email'
          placeholder='Enter your email'
          required
        />
        <button
          type='submit'
          className='bg-black text-white text-xs px-10 py-4'
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  )
}

export default NewsLetterBox
