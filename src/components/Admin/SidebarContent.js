// SidebarContent.js
import React from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const SidebarContent = ({ menuItems, isSidebarOpen, isECommerceOpen, setIsECommerceOpen }) => {
  return (
    <ul className="space-y-2">
      {menuItems.map((item, index) => (
        <li key={index} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer" onClick={item.action}>
          <div className="flex items-center">
            {item.icon}
            <span className={`${isSidebarOpen ? 'block' : 'hidden'} ml-3`}>{item.label}</span>
          </div>
          {item.badge && isSidebarOpen && (
            <span className="bg-gray-200 text-xs font-medium px-2 py-1 rounded-full">{item.badge}</span>
          )}
          {item.subItems && isSidebarOpen && (
            <div onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the parent onClick
              setIsECommerceOpen(!isECommerceOpen);
            }}>
              {isECommerceOpen ? (
                <ChevronUpIcon className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 text-gray-500" />
              )}
            </div>
          )}
        </li>
      ))}
      {isECommerceOpen && isSidebarOpen && (
        <ul className="ml-6 mt-2 space-y-2">
          {menuItems.find(item => item.subItems)?.subItems.map((subItem, subIndex) => (
            <li key={subIndex} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer" onClick={subItem.action}>
              <span>{subItem.label}</span>
            </li>
          ))}
        </ul>
      )}
    </ul>
  );
};

export default SidebarContent;
