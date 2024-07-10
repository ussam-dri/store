import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, UserPlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import SidebarAdmin from './sideBarAdmin';
import Navigation from '../Layouts/Navigation';
import Footer from '../Layouts/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PortailHeader from '../Layouts/PortailHeader';

const Dashboard = () => {
  const [managers, setManagers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const employed = '19/09/17';
  const status = 'ONLINE';

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const deleteUser = async (id, type) => {
    try {
      let response;
      if (type === 'seller') {
        response = await fetch(`https://backend-mern-store.zelobrix.com/delete-seller/${id}`, { method: 'DELETE' });
      } else if (type === 'manager') {
        response = await fetch(`https://backend-mern-store.zelobrix.com/delete-manager/${id}`, { method: 'DELETE' });
      }
      if (response.ok) {
        if (type === 'seller') {
          setSellers(sellers.filter(seller => seller._id !== id));
        } else if (type === 'manager') {
          setManagers(managers.filter(manager => manager._id !== id));
        }
        toast.success('Deleted successfully');
      } else {
        toast.error('Error deleting');
      }
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error('Error deleting');
    }
  };

  useEffect(() => {
    const fetchManagers = async () => {
      const response = await fetch('https://backend-mern-store.zelobrix.com/get-all-managers');
      const data = await response.json();
      setManagers(data);
    };

    const fetchSellers = async () => {
      const response = await fetch('https://backend-mern-store.zelobrix.com/get-all-sellers');
      const data = await response.json();
      setSellers(data);
    };

    fetchManagers();
    fetchSellers();
  }, []);

  const filteredMembers = [...managers, ...sellers].filter(member => {
    if (filter !== 'All' && member.role !== filter.toLowerCase()) return false;
    if (searchQuery && !member.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
        <PortailHeader/>
      <div className="flex">
        <div className="hidden md:block">
          <SidebarAdmin />
        </div>
        <div className="flex-1 p-6">
          <div className="block md:hidden">
            <p className="text-center text-gray-600">Please use a desktop to view this page</p>
          </div>
          <div className="hidden md:block">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Members list</h2>
                <p className="text-gray-600">See information about all Managers and Sellers</p>
              </div>
              <div className="space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center">
                  <UserPlusIcon className="h-5 w-5 mr-2" />
                  <a href='/admin/addMember'>ADD MEMBER</a>
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="space-x-1">
                {['All', 'manager', 'seller'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-4 py-2 rounded-md ${tab === filter ? 'bg-gray-200' : 'bg-white'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-md"
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Member</th>
                  <th className="py-3 px-6 text-left">Function</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Employed</th>
                  <th className="py-3 px-6 text-left"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {filteredMembers.map((member) => (
                  <tr key={member._id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2">
                          <img className="w-10 h-10 rounded-full"
                            src={`https://backend-mern-store.zelobrix.com/download/${member.photo.filename}`}
                            alt={member.name} />
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <p className="font-medium">{member.role}</p>
                      <p className="text-xs text-gray-500">verified</p>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span className={`py-1 px-3 rounded-full text-xs ${
                        status === 'ONLINE' ? 'bg-green-200 text-green-600' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">{formatDate(member.employed)}</td>
                    <td className="py-3 px-6 text-left">
                      <a href={`/admin/editMember/${member.role}/${member._id}`} className="text-gray-500 hover:text-gray-700">
                        <PencilIcon className="h-5 w-5" />
                      </a>
                      <button
                        onClick={() => deleteUser(member._id, member.role)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-gray-600">Page 1 of 10</p>
              <div className="space-x-2">
                <button className="px-4 py-2 border rounded-md">PREVIOUS</button>
                <button className="px-4 py-2 border rounded-md">NEXT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
