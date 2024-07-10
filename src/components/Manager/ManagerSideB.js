import React, { useState } from 'react';
import { 
  ChartBarIcon, 
  ShoppingBagIcon, 
  InboxIcon, 
  UserCircleIcon, 
  CogIcon, 
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManagerSidebar = () => {
  const [isECommerceOpen, setIsECommerceOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
const signOFF =     useSignOut();
const nav =useNavigate();

  const handleIconClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const signoutt =() => {
    signOFF();
    toast.success('logged Out!')
    setTimeout(() => {
      nav('/reward-program/login');
    }, 1000);

  };

  return (
    <div className={`h-full ${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg p-4 transition-all duration-300 `}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-semibold ${isSidebarOpen ? 'block' : 'hidden'}`}>Manager Panel</h2>
        <button onClick={handleIconClick}>
          {isSidebarOpen ? <ChevronLeftIcon className="h-6 w-6 text-gray-500" /> : <ChevronRightIcon className="h-6 w-6 text-gray-500" />}
        </button>
      </div>
      
      <ul className="space-y-2">
        <li className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer" onClick={handleIconClick}>
          <div className="flex items-center">
            <ChartBarIcon className="h-5 w-5 text-gray-500" />
            <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-3`}><a href='/manager/dashboard'>Dashboard</a></span>
          </div>
        </li>
        
        <li>
          <div 
            className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer"
            onClick={() => {
              setIsECommerceOpen(!isECommerceOpen);
            }}
          >
            <div className="flex items-center">
              <ShoppingBagIcon className="h-5 w-5 text-gray-500" />
              <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-3`}>E-Commerce</span>
            </div>
            {isSidebarOpen && (
              <div>
                {isECommerceOpen ? (
                  <ChevronUpIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                )}
              </div>
            )}
          </div>
          {isECommerceOpen && isSidebarOpen && (
            <ul className="ml-6 mt-2 space-y-2">
              <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer" onClick={handleIconClick}>
                <ChevronDownIcon className="h-3 w-3 mr-2 text-gray-500" />
                <span>Orders</span>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer" onClick={handleIconClick}>
                <ChevronDownIcon className="h-3 w-3 mr-2 text-gray-500" />
                <span>Products</span>
              </li>
            </ul>
          )}
        </li>
        
        <li className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer" onClick={handleIconClick}>
          <div className="flex items-center">
            <InboxIcon className="h-5 w-5 text-gray-500" />
            <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-3`}>Requests</span>
          </div>
          {isSidebarOpen && (
            <span className="bg-gray-200 text-xs font-medium px-2 py-1 rounded-full">14</span>
          )}
        </li>
        
        <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer" onClick={handleIconClick}>
          <UserCircleIcon className="h-5 w-5 text-gray-500" />
          <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-3`}><a href="/manager/profile">Profile </a></span>
        </li>
        
        <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer" onClick={handleIconClick}>
          <CogIcon className="h-5 w-5 text-gray-500" />
          <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-3`}>Settings</span>
        </li>
        
        <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer" onClick={handleIconClick}>
          <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-500" />
          <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-3`}><button onClick={signoutt}>Log Out</button></span>
        </li>
      </ul>
    </div>
  );
};

export default ManagerSidebar;
