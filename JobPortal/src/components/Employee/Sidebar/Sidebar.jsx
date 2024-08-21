import React, { useState } from 'react';
import { Menu, X, Home, User, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      <div className={`fixed inset-0 z-40 bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`} onClick={toggleSidebar}></div>
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-md transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
          <h1 className="text-xl font-bold">Menu</h1>
          <button onClick={toggleSidebar}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4">
          <a href="#" className="flex items-center p-2 mb-2 text-gray-800 hover:bg-gray-100">
            <Home className="w-6 h-6 mr-2" />
            Home
          </a>
          <a href="#" className="flex items-center p-2 mb-2 text-gray-800 hover:bg-gray-100">
            <User className="w-6 h-6 mr-2" />
            Profile
          </a>
          <a href="#" className="flex items-center p-2 mb-2 text-gray-800 hover:bg-gray-100">
            <Settings className="w-6 h-6 mr-2" />
            Settings
          </a>
          <a href="#" className="flex items-center p-2 mb-2 text-gray-800 hover:bg-gray-100">
            <LogOut className="w-6 h-6 mr-2" />
            Logout
          </a>
        </nav>
      </div>
      <div className="flex-1 p-4">
        <button onClick={toggleSidebar} className="text-gray-800 focus:outline-none">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
