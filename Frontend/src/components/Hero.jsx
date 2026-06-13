import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Hero = () => {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/items')
    } else {
      navigate('/login')
    }
  }

  return (
    <div>
      <section className="flex flex-col items-center justify-center text-center py-16 px-4 bg-white min-h-screen">
        
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4 max-w-3xl">
          Share More,{" "}
          <span className="text-blue-600">Save More</span>
        </h1>

        <p className="mt-4 max-w-xl text-sm sm:text-base text-gray-700 leading-relaxed">
          CollegeNet is your trusted platform where students rent, sell, and share everything they need. Join your college community today.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
            onClick={handleGetStarted}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-2 rounded-lg transition duration-300"
          >
            Get Started
          </button>

          <button
            onClick={handleGetStarted}
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-sm px-6 py-2 rounded-lg transition duration-300"
          >
            Browse Items
          </button>
        </div>

        <button
          onClick={() => navigate("/how-it-works")}
          className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white text-gray-700 text-xs hover:bg-gray-50 transition duration-300"
        >
          <span className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-bold">
            ?
          </span>
          <span>Learn how CollegeNet works →</span>
        </button>

      </section>
    </div>
  )
}

export default Hero