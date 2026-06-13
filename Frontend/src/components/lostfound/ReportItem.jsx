import React, { useState } from "react";
import { X, AlertCircle, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReport } from "../../context/ReportContext";

const ReportItem = ({ onClose }) => {
 
  const navigate = useNavigate();
  const { formData, setFormData } = useReport();

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold">
            Report Lost or Found Item
          </h2>

          <button onClick={()=> navigate('/lostfound')}>
            <X size={22} />
          </button>
        </div>
         {/* Progress */}
<div className="px-6 pt-6">
  {/* Circles + Lines */}
  <div className="flex items-center">
    {[1, 2, 3, 4, 5].map((step, index) => (
      <React.Fragment key={step}>
        <div className="flex flex-col items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
              step === 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {step}
          </div>
        </div>

        {index < 4 && (
          <div className="flex-1 h-[2px] bg-gray-200 mx-2"></div>
        )}
      </React.Fragment>
    ))}
  </div>

  {/* Labels */}
  <div className="grid grid-cols-5 mt-3 text-xs text-gray-500">
    <div className="text-center">Type</div>
    <div className="text-center">Details</div>
    <div className="text-center">Photos</div>
    <div className="text-center">Verify</div>
    <div className="text-center">Contact</div>
  </div>
</div>   
      
        {/* Content */}
        <div className="px-6 py-8">
          <h3 className="text-2xl font-bold text-center mb-8">
            What would you like to report?
          </h3>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Lost */}
            <button
              onClick={() => setFormData({ ...formData, reportType: "lost" })}
              className={`border-2 rounded-xl p-6 transition text-center
              ${
                formData.reportType === "lost"
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 hover:border-red-300"
              }`}
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
                <AlertCircle
                  size={30}
                  className="text-red-500"
                />
              </div>

              <h4 className="text-xl font-bold mb-2">
                I Lost Something
              </h4>

              <p className="text-sm text-gray-500">
                Report an item you've lost and need help finding.
              </p>
            </button>

            {/* Found */}
            <button
              onClick={() => 
                setFormData({ 
                    ...formData,
                    reportType: "found"
                })
              }
              className={`border-2 rounded-xl p-6 transition text-center
              ${
                formData.reportType === "found"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check
                  size={30}
                  className="text-green-500"
                />
              </div>

              <h4 className="text-xl font-bold mb-2">
                I Found Something
              </h4>

              <p className="text-sm text-gray-500">
                Report an item you've found and want to return.
              </p>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-6 py-4 border-t">
          <button
            onClick={()=> navigate('/lostfound')}
            className="px-5 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200"
          >
            Cancel
          </button>

          <button onClick={() => navigate('/claim-item')}
            disabled={!formData.reportType}
            className={`px-6 py-2 rounded-lg text-sm font-medium text-white
            ${
              formData.reportType
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportItem;