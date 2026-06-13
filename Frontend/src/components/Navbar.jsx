import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {

  const navigate = useNavigate()
  const { isLoggedIn, user, logout } = useAuth()


  return (
//     <div className='w-full flex justify-between items-center p-4 sm:px-6 sm:px-24 absolute top-0'>
    
//       <button className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'>
//   Login
// </button>
//     </div>

  <div>
    <nav className="w-full bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
    
    {/* Logo */}
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
        <span onClick={() => navigate('/')}
         className="text-white text-base font-bold">C</span>
      </div>

      <h1 className="text-xl font-bold text-slate-900">
        CollegeNet
      </h1>
    </div>

    {/* Nav Buttons */}
    <div className="flex items-center gap-4">
  {isLoggedIn ? (
    <>
      <span className="text-sm font-medium text-slate-700">
        {user?.name}
      </span>

      <button
        onClick={logout}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => navigate("/login")}
        className="text-sm text-slate-600 hover:text-blue-600"
      >
        Login
      </button>

      <button
        onClick={() => navigate("/register")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Sign Up
      </button>
    </>
  )}
</div>

  </div>
</nav>
  </div>
  )
}

export default Navbar
