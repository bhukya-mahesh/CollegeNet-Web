import React, { useState } from 'react';
import ItemDetails from '../components/ItemDetails';


const ItemDetailsDemo = () => {
  const [showDetails, setShowDetails] = useState(true);

  const handleRequest = (itemId, mode) => {
    alert(`${mode === 'Give Away' ? 'Claimed' : 'Requested'} item ${itemId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">ItemDetails Preview</h1>
          <p className="text-gray-600">Demo of the ItemDetails component with dummy data</p>
        </div>

        {showDetails && (
          <ItemDetails 
            item={dummyItem}
            onClose={() => setShowDetails(false)}
            onRequest={handleRequest}
          />
        )}

        {!showDetails && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <button
              onClick={() => setShowDetails(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Show ItemDetails
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetailsDemo;
