import React from "react";
import {
  X,
  Check,
  Shield,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReport } from "../../context/ReportContext";

const VerifyItem = ({questions = []}) => {
  const navigate = useNavigate();
  const { formData, setFormData }  = useReport();

  const addQuestion = () => {
    if ((formData.questions || []).length >= 5) return;

    setFormData({
      ...formData,
      questions: [
        ...(formData.questions || []),
        {
          question: "",
          answer: "",
        },
      ],
    });
  };

  const handleChange = (index, field, value) => {
    const updated = [...(formData.questions || [])];
    updated[index][field] = value;
    setFormData({ ...formData, questions: updated });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl max-h-[85vh] rounded-xl shadow-xl flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 border-b">
          <h2 className="text-lg font-semibold">
            Report Lost or Found Item
          </h2>

          <button onClick={()=> navigate('/lostfound')}>
            <X size={20} />
          </button>
        </div>
          {/* Progress */}
<div className="px-5 py-4">
  <div className="flex items-center">
    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-semibold">
      ✓
    </div>
    <div className="flex-1 h-[2px] bg-green-500 mx-2"></div>
    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-semibold">
      ✓
    </div>
    <div className="flex-1 h-[2px] bg-green-500 mx-2"></div>
    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-semibold">
      ✓
    </div>
    <div className="flex-1 h-[2px] bg-green-500 mx-2"></div>
    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-semibold">
      4
    </div>
    <div className="flex-1 h-[2px] bg-gray-200 mx-2"></div>
    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-semibold">
      5
    </div>
  </div>

  <div className="grid grid-cols-5 mt-2 text-[11px] text-gray-500">
    <div className="text-center">Type</div>
    <div className="text-center">Details</div>
    <div className="text-center"> Photos</div>
    <div className="text-center text-blue-600 font-medium">Verify</div>
    <div className="text-center">Contact</div>
  </div>
</div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* Info Card */}
          <div className="bg-blue-50 rounded-lg p-4 flex gap-3">
            <Shield
              size={24}
              className="text-blue-600 flex-shrink-0 mt-1"
            />

            <div>
              <h3 className="text-base font-semibold text-blue-900">
                Verification Questions
              </h3>

              <p className="text-xs text-blue-700 mt-1">
                Add questions only the true owner would know.
                This helps verify legitimate claims.
              </p>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-3">
            {(formData.questions || []
            ).map((item, index) => (
              <div
                key={index}
                className="border rounded-lg p-4"
              >
                <h4 className="text-sm font-semibold mb-3">
                  Question {index + 1}
                </h4>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="e.g., What stickers are on the laptop?"
                    value={item.question}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "question",
                        e.target.value
                      )
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <input
                    type="text"
                    placeholder="Expected answer (only you will see this)"
                    value={item.answer}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "answer",
                        e.target.value
                      )
                    }
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Add Question */}
          {(formData.questions || []).length < 5 && (
            <button
              onClick={addQuestion}
              className="w-full mt-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 flex items-center justify-center gap-2"
            >
              <Plus size={14} />
              Add Another Question
            </button>
          )}

          {/* Skip Text */}
          <p className="text-center text-xs text-gray-500 mt-4">
            Skip this step if you don't want to add verification questions
          </p>
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-between">
          <button
            onClick={() => navigate('/report-photos')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
          >
            <ChevronLeft size={16} />
            Back
          </button>

          <button
            onClick={() => navigate('/contact-info')}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default VerifyItem;