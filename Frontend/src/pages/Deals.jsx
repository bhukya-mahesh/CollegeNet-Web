import React, { useState } from "react";

const Deals = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "completed", label: "Completed" },
    { id: "disputed", label: "Disputed" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-slate-900 mb-6">
        My Transactions
      </h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-slate-800 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm h-80 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg text-slate-500">No transactions found</h2>
        </div>
      </div>
    </div>
  );
};

export default Deals;