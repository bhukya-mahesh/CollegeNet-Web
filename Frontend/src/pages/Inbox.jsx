import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Inbox = () => {
  const [activeTab, setActiveTab] = useState("received");
  const [conversations, setConversations] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

useEffect(() => {
   if(!user?._id) return ;
  axios
    .get(
      `http://localhost:4545/api/messages/conversations/${user._id}`
    )
    .then((res) =>{
       console.log("CONVERSATIONS:", res.data);
      setConversations(
        res.data.conversations || []
      );
    }
    );

}, [user]);

 console.log("STATE:" ,conversations);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Inbox</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setActiveTab("received")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            activeTab === "received"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-slate-800 hover:bg-gray-200"
          }`}
        >
          Received Requests (0)
        </button>

        <button
          onClick={() => setActiveTab("sent")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
            activeTab === "sent"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-slate-800 hover:bg-gray-200"
          }`}
        >
          Sent Requests (0)
        </button>
      </div>

      {/* Content Card */}
<div className="bg-white border border-gray-200 rounded-lg shadow-sm">

  {conversations.length === 0 ? (

    <div className="h-80 flex items-center justify-center">
      <p className="text-lg text-slate-500">
        No conversations yet
      </p>
    </div>

  ) : (

    conversations.map((chat) => (

      <div
        key={chat.userId}
        onClick={() => navigate(`/chat/${chat.userId}`)}
        className="flex items-center gap-4 p-4 border-b hover:bg-gray-50 cursor-pointer"
      >

        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
          {chat.userName?.charAt(0)}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold">
            {chat.userName}
          </h3>

          <p className="text-gray-500 text-sm truncate">
            {chat.lastMessage}
          </p>
        </div>

      </div>

    ))

  )}

</div>
    </div>
  );
};

export default Inbox;