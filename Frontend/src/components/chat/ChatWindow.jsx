import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Send,
  User,
} from "lucide-react";
import { useNavigate ,useParams } from "react-router-dom";
import socket from "../../socket";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

const ChatWindow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4545/api";

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);


  const { receiverId } = useParams();
   const { user, loading } = useAuth();
  const currentUser = user?._id;

  const reporterName =
  location.state?.reporterName ||
  "Reporter";

  useEffect(() => {

    if(!currentUser || !receiverId) return;
  const fetchMessages = async () => {

    try {
      const { data } =
        await axios.get(
          `${API_URL}/messages/${currentUser}/${receiverId}`
        );
      if (data.success) {
        setMessages(
          data.messages
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchMessages();

}, [currentUser, receiverId]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    if (!currentUser || !receiverId) return;

    const newMessage = {
      senderId: currentUser,
      receiverId,
      text: message,
      createdAt: new Date(),
    };

    socket.emit(
      "sendMessage",
      newMessage
    );

    setMessages((prev) => [
      ...prev,
      newMessage,
    ]);

    setMessage("");
  };

   if (loading) {
  return (
    <div className="h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}

  return (
    <div className="h-screen bg-gray-100 flex flex-col">

      {/* Header */}
      <div className="bg-white border-b px-5 py-4 flex items-center justify-between shadow-sm">

        <div className="flex items-center gap-3">

          <button
            onClick={() => navigate(-1)}
            className="hover:bg-gray-100 p-2 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <User size={20} />
          </div>

          <div>
            <h2 className="font-semibold">
                 {reporterName}

            </h2>

            <p className="text-xs text-gray-600">
                 Chat
            </p>
          </div>

        </div>

      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">

        {messages.map((msg, index) => {

          const isMine =
            msg.senderId === currentUser;

          return (
            <div
              key={index}
              className={`flex ${
                isMine
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${
                  isMine
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-white text-gray-900 rounded-bl-sm"
                }`}
              >
                <p>{msg.text}</p>

                <p
                  className={`text-[10px] mt-1 ${
                    isMine
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {new Date(
                    msg.createdAt
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef} />

      </div>

      {/* Input */}
      <div className="bg-white border-t p-4">

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            className="flex-1 border rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full"
          >
            <Send size={18} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default ChatWindow;