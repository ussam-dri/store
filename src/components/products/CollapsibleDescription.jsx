import React, { useState } from 'react';

const CollapsibleDescription = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleDescription}>
        <h2 className="text-lg font-semibold text-gray-900">Description</h2>
        <svg
          className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <p className={`mt-2 text-gray-600 ${isExpanded ? '' : 'line-clamp-2'}`}>{description}</p>
    </div>
  );
};

export default CollapsibleDescription;
