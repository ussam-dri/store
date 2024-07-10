import React from 'react';
import SidebarAdmin from './sideBarAdmin';
import UserInfo from '../user/userInfo';
import Navigation from '../Layouts/Navigation';
import Footer from '../Layouts/Footer';
import PortailHeader from '../Layouts/PortailHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { Navigate } from 'react-router-dom';

const AdminProfile = () => {
 const auth= useAuthUser()
 const isAuth=useIsAuthenticated()
 if(!isAuth){
  Navigate()
 }
  return (
    <>
      <PortailHeader />
      <div className="flex">
        <SidebarAdmin />

        <div className="w-full md:w-3/4 text-left p-6">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Admin Information</h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and Infos, to modify contact your DBA</p>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">auth.FullName</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Phone Number</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">+212658347462</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">oussama119driouich@gmail.com</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900"> Address</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Agadir, Morocco</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminProfile;
