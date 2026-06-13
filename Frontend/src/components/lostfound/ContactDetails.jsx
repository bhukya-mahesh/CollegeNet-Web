import React from "react";
import {
  Phone,
  Mail,
  MessageSquare,
  Check,
  ChevronLeft,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReport } from "../../context/ReportContext";
import axios from "axios";

const ContactDetails = () => {
  const navigate = useNavigate();
  const { formData , setFormData} = useReport();

  const methods = [
    {
      id: "chat",
      title: "In-App Chat",
      desc: "Chat within app",
      icon: MessageSquare,
    },
    {
      id: "phone",
      title: "Phone",
      desc: "Share number",
      icon: Phone,
    },
    {
      id: "email",
      title: "Email",
      desc: "Use email",
      icon: Mail,
    },
  ];
const handleSubmit = async () => {
  try {
    const data = new FormData();

    data.append(
      "reportType",
      formData.reportType
    );

    data.append(
      "title",
      formData.title
    );

    data.append(
      "description",
      formData.description
    );

    data.append(
      "category",
      formData.category
    );

    data.append(
      "location",
      formData.location
    );

    data.append(
      "date",
      formData.date
    );

    data.append(
      "urgency",
      formData.urgency
    );

    data.append(
      "contactMethod",
      formData.contactMethod
    );

    data.append(
      "questions",
      JSON.stringify(
        formData.questions
      )
    );

    formData.photos.forEach((photo) => {
      data.append(
        "photos",
        photo.file
      );
    });
     console.log("FORM DATA:", formData);
     console.log("SUBMIT BUTTON CLICKED");
    await axios.post(
      "http://localhost:4545/api/lostfound/reports",
      data ,{
        withCredentials : true ,
      }
    );
    console.log("REQUEST SENT");

    alert("Report Submitted");
  } catch (error) {
    console.log(error);
  }
};

return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 border-b">
          <h2 className="text-lg font-semibold">
            Report Lost or Found Item
          </h2>

          <button
            onClick={() => navigate('/lostfound')}
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress */}
        <div className="px-5 py-4">
          <div className="flex items-center">

            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-semibold">
                  ✓
                </div>

                <div className="flex-1 h-[2px] bg-green-500 mx-2"></div>
              </React.Fragment>
            ))}

            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
              5
            </div>
          </div>

          <div className="grid grid-cols-5 mt-2 text-[11px] text-gray-500">
            <div className="text-center">Type</div>
            <div className="text-center">Details</div>
            <div className="text-center">Photos</div>
            <div className="text-center">Verify</div>
            <div className="text-center text-blue-600 font-medium">
              Contact
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 pb-5">

          {/* Title */}
          <h2 className="text-base font-semibold mb-4">
            How should people contact you?
          </h2>

          {/* Contact Cards */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {methods.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => 
                    setFormData({
                        ...formData,
                        contactMethod: item.id,
                    })
                  }
                  className={`h-24 rounded-lg border flex flex-col items-center justify-center transition
                  ${
                    formData.contactMethod === item.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Icon
                    size={20}
                    className={`mb-1 ${
                      formData.contactMethod === item.id
                        ? "text-blue-600"
                        : "text-gray-700"
                    }`}
                  />

                  <h3
                    className={`text-sm font-semibold ${
                      formData.contactMethod === item.id
                        ? "text-blue-600"
                        : "text-gray-900"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p className="text-[10px] text-gray-500">
                    {item.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Review Card */}
          <div className="bg-gray-50 rounded-lg border p-3 mb-5">

            <h3 className="text-sm font-semibold mb-3">
              Review Your Post
            </h3>

            <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-xs">

              <div>
                <span className="text-gray-500">
                  Type:
                </span>{" "}
                {formData.reportType}
              </div>

              <div>
                <span className="text-gray-500">
                  Category:
                </span>{" "}
                {formData.category}
              </div>

              <div>
                <span className="text-gray-500">
                  Title:
                </span>{" "}
                {formData.title}
              </div>

              <div>
                <span className="text-gray-500">
                  Urgency:
                </span>{" "}
                {formData.urgency}
              </div>

              <div>
                <span className="text-gray-500">
                  Location:
                </span>{" "}
                {formData.location}
              </div>

              <div>
                <span className="text-gray-500">
                  Photos:
                </span>{" "}
                {formData.photos.length} uploaded
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-4 flex justify-between items-center">

            <button 
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium"
              onClick={() => navigate("/verify-item")}
            >
              <ChevronLeft size={14} />
              Back
            </button>

            <button onClick={ handleSubmit}
              className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium"
            >
              <Check size={14} />
              Submit Post
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactDetails;