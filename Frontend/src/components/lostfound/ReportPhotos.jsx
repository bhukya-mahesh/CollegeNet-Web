import React, { useRef } from "react";
import {
  X,
  Check,
  Upload,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReport } from "../../context/ReportContext";

const ReportPhotos = () => {
  const navigate = useNavigate();
  const { formData, setFormData } = useReport();
  const fileInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);

    if (formData.photos.length + files.length > 5) {
      alert("Maximum 5 photos allowed");
      return;
    }

    const newPhotos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData({
       ...formData,
       photos: [...formData.photos, ...newPhotos] });
  };

  const removePhoto = (index) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-xl flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold">
            Report Lost or Found Item
          </h2>

          <button onClick={()=> navigate('/lostfound')}>
            <X size={24} />
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
    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
      3
    </div>
    <div className="flex-1 h-[2px] bg-gray-200 mx-2"></div>
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
    <div className="text-center text-blue-600 font-medium">
      Photos 
    </div>
    <div className="text-center">Verify</div>
    <div className="text-center">Contact</div>
  </div>
</div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">

          <h3 className="text-2xl font-bold mb-2">
            Add Photos (Optional)
          </h3>

          <p className="text-gray-500 mb-6">
            Add up to 5 photos to help identify the item
          </p>

          {/* Small Upload Box */}
          <button
            onClick={() => fileInputRef.current.click()}
            className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:bg-gray-50"
          >
            <Upload
              size={32}
              className="text-gray-400 mb-2"
            />

            <span className="text-gray-500 text-sm">
              Add Photo
            </span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />

          {/* Preview Area */}
          <div className="mt-6 border-2 border-dashed border-gray-200 rounded-2xl p-6 min-h-[220px]">

            {formData.photos.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-10">
                <Upload
                  size={60}
                  className="text-gray-300 mb-4"
                />

                <h4 className="text-2xl text-gray-500">
                  No photos added yet
                </h4>

                <button
                  onClick={() => fileInputRef.current.click()}
                  className="text-blue-600 mt-3 text-lg"
                >
                  Click to upload
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="relative"
                    >
                      <img
                        src={photo.preview}
                        alt=""
                        className="w-full h-32 object-cover rounded-xl"
                      />

                      <button
                        onClick={() =>
                          removePhoto(index)
                        }
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-gray-500 mt-4">
                  {formData.photos.length}/5 photos uploaded
                </p>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-5 border-t">
          <button
            onClick={()=> navigate('/claim-item')}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-xl font-medium"
          >
            <ChevronLeft size={18} />
            Back
          </button>

          <button
            onClick={()=> navigate('/verify-item')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium"
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReportPhotos;