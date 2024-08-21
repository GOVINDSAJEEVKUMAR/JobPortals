import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MessageSquare } from 'lucide-react';
import { userAuth } from '../../Context/userAuth';
import toast from 'react-hot-toast';
import axios from "axios"

export default function Navbar() {
  const navigate = useNavigate();
  const { token, user, logout } = userAuth();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);
  const [messageDropdown, setMessageDropdown] = useState(false);

  const handleLogout = () => {
    // const [logoutSuccess, setLogoutSuccess] = useState(false);
    // const navigate = useNavigate();
  
    axios.post('http://localhost:8020/job/logout')
      .then((response) => {
        if (response.status === 200) {
          setLogoutSuccess(true);
          toast.success('Logout successful');
          setTimeout(() => {
            setLogoutSuccess(false);
            navigate('/');
          }, 3000);
        } else {
          toast.error('Logout failed');
        }
      })
      .catch((error) => {
        toast.error('An error occurred during logout');
        console.error('Logout error:', error);
      });
  };

  const toggleDropdown = (dropdown) => {
    if (dropdown === 'profile') {
      setProfileDropdown(!profileDropdown);
      setNotificationDropdown(false);
      setMessageDropdown(false);
    } else if (dropdown === 'notification') {
      setNotificationDropdown(!notificationDropdown);
      setProfileDropdown(false);
      setMessageDropdown(false);
    } else if (dropdown === 'message') {
      setMessageDropdown(!messageDropdown);
      setProfileDropdown(false);
      setNotificationDropdown(false);
    }
  };
  // const imageUrl = `http://localhost:8020/uploads/${userDetails.profilePhoto}`;
  return (
    <nav className=" bg-blend-multiply shadow-md ">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">JobPortal</h1>
        <div className="flex items-center space-x-8">
          {user && (
            <>
              <div className="relative">
                <Bell
                  className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600"
                  onClick={() => toggleDropdown('notification')}
                />
                {notificationDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div className="block px-4 py-2 text-gray-800">No notifications</div>
                  </div>
                )}
              </div>
              <div className="relative">
                <MessageSquare
                  className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600"
                  onClick={() => toggleDropdown('message')}
                />
                {messageDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div className="block px-4 py-2 text-gray-800">
                      No messages
                    </div>
                  </div>
                )}
              </div>
              
              <div className=" flex gap-5 p-2 m-2">
              <h2 className='text-xl '>{user.role}</h2>
                <img
                  className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
                  src={`http://localhost:8020/uploads/${user.profilePhoto}`}
                  // src='https://i.pinimg.com/474x/7b/73/b0/7b73b0c9c456500e10e6e25a2100be78.jpg'
                  alt="Profile"
                  onClick={() => toggleDropdown('profile')}
                />
                
                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg ">
                    <button
                      onClick={() => navigate(`/details/${user._id}`)}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
