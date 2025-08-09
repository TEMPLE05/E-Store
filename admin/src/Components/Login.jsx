import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets' // Make sure your logo is here

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
      if (response.data.success) {
        setToken(response.data.token)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-md">
        
        {/* Logo and Title */}
        <div className="flex items-center justify-between mb-6">
          <img src={assets.logo} alt="Logo" className="w-16 h-16 object-contain" />
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border focus:outline-none focus:ring-1 focus:ring-black"
              type="email"
              placeholder="Use admin email"
              required
            />
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border focus:outline-none focus:ring-1 focus:ring-black"
              type="password"
              placeholder="Use admin password"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-900 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
