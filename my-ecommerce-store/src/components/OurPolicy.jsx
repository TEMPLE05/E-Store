import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">

      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt=""/>
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hassle free exchange policies</p>
      </div>
         <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt=""/>
        <p className='font-semibold'>free return with untampered packaging</p>
        <p className='text-gray-400'>7 Day return policy</p>
      </div> <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt=""/>
        <p className='font-semibold'>Customer Support</p>
        <p className='text-gray-400'>We offer 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy