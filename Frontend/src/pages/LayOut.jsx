import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/SideBar'
import socket from '../socket'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const LayOut = () => {
   const { user } = useAuth();

  useEffect(() => {
    
  if (!user?._id) return;

  socket.connect();

  socket.emit(
    "addUser",
    user._id
  );

  socket.on(
    "receiveMessage",
    (msg) => {
      console.log(msg);
    }
  );

    return () => {
       socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [user]);

  return (
    <div className='flex flex-col'>
            <Sidebar />
           <div className="ml-80 min-h-screen bg-gray-50">
            <Outlet />
      </div>
    </div>
  )
}

export default LayOut
