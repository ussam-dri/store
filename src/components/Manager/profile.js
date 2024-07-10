import React from 'react';
import ManagerSidebar from './ManagerSideB';
import UserInfo from '../user/userInfo';
import Navigation from '../Layouts/Navigation';
import Footer from '../Layouts/Footer';
import PortailHeader from '../Layouts/PortailHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useNavigate } from 'react-router-dom';
const ManagerProfile = () => {
  const nav =useNavigate();

    const auth= useAuthUser();
    if(auth.role !=="manager"){
      setTimeout(() => {
        nav('/home');
      }, 3000);
    }
  return (
    <>
      <PortailHeader />
      <div className="flex">
        <ManagerSidebar />

        <div className="w-full md:w-3/4 text-left p-6">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Manager Information</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and Infos, to modify contact your DBA</p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{auth.name}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Phone Number</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{auth.phoneNumber}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{auth.email}</dd>
              </div>
              
            </dl>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManagerProfile;
