import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const transactions = [
  { id: 1, company: 'Spotify', logo: 'spotify-logo.png', amount: 2500, date: 'Wed 3:00pm', status: 'PAID', account: 'Visa 1234', expiry: '06/2026' },
  { id: 2, company: 'Amazon', logo: 'amazon-logo.png', amount: 5000, date: 'Wed 1:00pm', status: 'PAID', account: 'Master Card 1234', expiry: '06/2026' },
  { id: 3, company: 'Pinterest', logo: 'pinterest-logo.png', amount: 3400, date: 'Mon 7:40pm', status: 'PENDING', account: 'Master Card 1234', expiry: '06/2026' },
  { id: 4, company: 'Google', logo: 'google-logo.png', amount: 1000, date: 'Wed 5:00pm', status: 'PAID', account: 'Visa 1234', expiry: '06/2026' },
  { id: 5, company: 'netflix', logo: 'netflix-logo.png', amount: 14000, date: 'Wed 3:30am', status: 'CANCELLED', account: 'Visa 1234', expiry: '06/2026' },
];

const statusColors = {
  PAID: 'bg-green-100 text-green-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

const ProductList = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Recent Transactions</h2>
        <p className="text-gray-600">These are details about the last transactions</p>
      </div>
      
      <div className="flex justify-between mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border rounded-md"
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          DOWNLOAD
        </button>
      </div>
      
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Transaction</th>
            <th className="py-3 px-6 text-left">Amount</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Account</th>
            <th className="py-3 px-6 text-left"></th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <div className="mr-2">
                    <img className="w-6 h-6" src={transaction.logo} alt={transaction.company} />
                  </div>
                  <span>{transaction.company}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-left">${transaction.amount.toLocaleString()}</td>
              <td className="py-3 px-6 text-left">{transaction.date}</td>
              <td className="py-3 px-6 text-left">
                <span className={`${statusColors[transaction.status]} py-1 px-3 rounded-full text-xs`}>
                  {transaction.status}
                </span>
              </td>
              <td className="py-3 px-6 text-left">
                <div>
                  <div className="font-medium">{transaction.account}</div>
                  <div className="text-xs text-gray-500">{transaction.expiry}</div>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
                <button className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="flex justify-between items-center mt-6">
        <button className="px-4 py-2 border rounded-md">PREVIOUS</button>
        <div className="flex">
          {[1, 2, 3, '...', 8, 9, 10].map((page, index) => (
            <button key={index} className={`mx-1 px-3 py-1 rounded-md ${page === 1 ? 'bg-gray-800 text-white' : 'text-gray-600'}`}>
              {page}
            </button>
          ))}
        </div>
        <button className="px-4 py-2 border rounded-md">NEXT</button>
      </div>
    </div>
  );
};

export default ProductList;