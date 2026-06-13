import React from 'react'

const Newsletter = () => {
  return (
    <div>
      <section className="py-12 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4">
    <div className="bg-blue-600 rounded-2xl py-12 px-6 text-center">
      
      <h2 className="text-2xl font-bold text-white mb-4">
        Ready to start sharing?
      </h2>

      <p className="text-base text-blue-100 max-w-3xl mx-auto leading-relaxed">
        Join hundreds of students who are already saving money and reducing
        waste by sharing items on ShareNet.
      </p>

      <div className="mt-6">
        <button  onClick={() => window.location.href = '/register'}
        className="bg-white text-slate-900 text-sm font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition">
          Sign Up with Campus Email
        </button>
      </div>

    </div>
  </div>
</section>
    </div>
  )
}

export default Newsletter
