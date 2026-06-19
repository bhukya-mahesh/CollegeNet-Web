import React, { useEffect, useState } from "react";
import {
  MapPin,
  Calendar,
  AlertTriangle,
  MessageCircle,
  Shield,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ReportCardDetails = () => {
  const { id } = useParams();
  console.log("ID:", id);
  const navigate = useNavigate();
  const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4545/api";
 const SERVER_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:4545";

  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      
      const { data } = await axios.get(
        `${API_URL}/lostfound/reports-card-details/${id}`,
        {
    withCredentials: true,
  }

      );

      if (data.success) {
        setReport(data.report);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!report) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  console.log(report);
console.log("REPORT USER ID:", report.userId);


  return (
    <div className="max-w-6xl mx-auto p-6">

      <button
        onClick={() => navigate('/lostfound')}
        className="flex items-center gap-2 mb-4"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Photos */}
        <div>

          {/* <img
            src={`${SERVER_URL}/${report.photos?.[0]}`}
            alt={report.title}
            className="w-full h-[400px] object-cover rounded-xl"
          /> */}
           
           <img
  src={report.photos?.[0]}
  alt={report.title}
  className="w-full h-[400px] object-cover rounded-xl"
/>

          <div className="grid grid-cols-4 gap-2 mt-3">
            {/* {report.photos?.map((photo, index) => (
              <img
                key={index}
                src={`${SERVER_URL}/${photo}`}
                alt=""
                className="h-20 w-full object-cover rounded-lg"
              />
            ))} */}

            {report.photos?.map((photo, index) => (
  <img
    key={index}
    src={photo}
    alt=""
    className="h-20 w-full object-cover rounded-lg"
  />
))}

          </div>

        </div>

        {/* Details */}
        <div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold
            ${
              report.reportType === "lost"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {report.reportType.toUpperCase()}
          </span>

          <h1 className="text-3xl font-bold mt-3">
            {report.title}
          </h1>

          <p className="text-gray-600 mt-4">
            {report.description}
          </p>

          <div className="space-y-3 mt-6">

            <div className="flex gap-2">
              <MapPin size={18} />
              {report.location}
            </div>

            <div className="flex gap-2">
              <Calendar size={18} />
              {new Date(report.date).toLocaleDateString()}
            </div>

            <div className="flex gap-2">
              <AlertTriangle size={18} />
              {report.urgency}
            </div>

          </div>

          <div className="mt-8 border rounded-xl p-4">

            <h2 className="font-bold mb-3">
              Report Information
            </h2>

            <div className="space-y-2 text-sm">

              <p>
                Category: {report.category}
              </p>

              <p>
                Contact Method:
                {" "}
                {report.contactMethod}
              </p>

              <p>
                Status:
                {" "}
                {report.status}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Verification Questions */}

      {report.questions?.length > 0 && (
        <div className="mt-8 border rounded-xl p-6">

          <div className="flex items-center gap-2 mb-4">
            <Shield size={20} />
            <h2 className="font-bold">
              Verification Questions
            </h2>
          </div>

          {report.questions.map((q, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 mb-3"
            >
              <p>
                {q.question}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}

      <div className="flex gap-4 mt-8">
        

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Claim Item
        </button>


        <button
    
          onClick={() => navigate(`/chat/${report.userId}`,
             {
        state: {
          reporterName:
            report.userId.name,
          },
        }
          )}
      

          className="border px-6 py-3 rounded-lg flex items-center gap-2"
        >
          <MessageCircle size={18} />
          Chat with Reporter
        </button>

      </div>

    </div>
  );
};

export default ReportCardDetails;