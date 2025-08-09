import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import SideBar from './Components/SideBar'
import { Routes, Route } from 'react-router-dom'
import Add from './Pages/Add'
import List from './Pages/List'
import Orders from './Pages/orders'
import Login from './Components/Login'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(()=>{
    localStorage.setItem('token',token)

  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* ToastContainer handles notifications globally */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        pauseOnHover
        draggable
        theme="light"
      />

      {token === ""
        ? <Login setToken={setToken} />
        : < >
            <Navbar setToken={setToken}/>
            <hr />
            <div className='flex w-full'>
              <SideBar />
              <div className='w-[70%] mx-auto ml-[max(5w,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/List' element={<List token={token} />} />
                  <Route path='/orders' element={<Orders token={token} />} />
                </Routes>
              </div>
            </div>
          </>
      }
    </div>
  )
}
 
export default App
