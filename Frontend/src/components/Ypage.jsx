import React from 'react'

const Ypage = () => {
  return (
    <div>
      <section className="py-12 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4">
    
    {/* Heading */}
    <h2 className="text-2xl font-bold text-center text-slate-900 mb-8">
      Why CollegeNet?
    </h2>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* Card 1 */}
      <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
          📦
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Share Items
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Rent, sell, or give away items you no longer need.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
          👥
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Campus Community
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Connect with fellow students at your university.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
          🛡️
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Trust System
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Build your reputation through successful transactions.
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
          ⏰
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Smart Reminders
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Never forget a return date with automatic reminders.
        </p>
      </div>

      {/* Card 5 */}
      <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
          🔍
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Lost & Found
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Report or find lost items on campus.
        </p>
      </div>

      {/* Card 6 */}
      <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
          💬
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Private Chat
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          Communicate securely with transaction partners.
        </p>
      </div>

    </div>
  </div>
</section>
    </div>
  )
}

export default Ypage
