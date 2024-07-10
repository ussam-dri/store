import React, { useState } from 'react';
import { 
  UserIcon, 
  HeartIcon, 
  ShoppingBagIcon, 
  KeyIcon,
  MenuIcon,
  XIcon
} from '@heroicons/react/outline';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: 'Overview', icon: UserIcon },
    { name: 'favorites', icon: HeartIcon },
    { name: 'Orders', icon: ShoppingBagIcon },
    { name: 'Change Password', icon: KeyIcon },
  ];

  return (
    <>
      <button 
        onClick={toggleSidebar} 
        className="md:hidden fixed top-4 left-4 z-20 bg-purple-600 text-white p-2 rounded-md"
      >
        {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      <div className={`
        fixed left-0 top-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:h-auto
        w-64 md:w-auto
      `}>
        <nav className="p-4">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-4">
                <a href="#" className="flex items-center text-gray-700 hover:text-purple-600">
                  <item.icon className="h-5 w-5 mr-2" />
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;