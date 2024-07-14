import { useState, useEffect } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { 
  MdPerson, 
  MdFavorite, 
  MdShoppingBag, 
  MdSettings, 
  MdExitToApp 
} from 'react-icons/md';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from 'react-router-dom';

import Navigation from '../Layouts/Navigation';
import Footer from '../Layouts/Footer';
import UserInfo from './userInfo';
import Shipping from './shipping';
import ProcessedProd from './processedProd';
import ChangePassword from './changePassword';
import Favorites from './Favorites';

export default function Profile() {
  const isAuth = useIsAuthenticated();
  const navigate = useNavigate();
  const auth = useAuthUser();
  const signOut = useSignOut();
  const [selectedMenu, setSelectedMenu] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuth) {
      navigate('/home');
    }
  }, [isAuth, navigate]);

  const handleMenuClick = (menu) => {
    if (menu === 'logout') {
      signOut();
      navigate('/home');
    } else {
      setSelectedMenu(menu);
      setIsSidebarOpen(false);
    }
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'profile':
        return <UserInfo />;
      case 'shipped':
        return <Shipping />;
      case 'processed':
        return <ProcessedProd />;
      case 'changePassword':
        return <ChangePassword />;
      case 'favorites':
        return <Favorites />;
      default:
        return <UserInfo />;
    }
  };

  const menuItems = [
    { icon: <MdPerson />, label: 'Profile', action: () => handleMenuClick('profile') },
    { icon: <MdFavorite />, label: 'Favorites', action: () => handleMenuClick('favorites') },
    { icon: <MdShoppingBag />, label: 'Orders', badge: 1, action: () => handleMenuClick('processed') },
    { icon: <MdSettings />, label: 'Settings', action: () => handleMenuClick('changePassword') },
    { icon: <MdExitToApp />, label: 'Log Out', action: () => handleMenuClick('logout') },
  ];

  const SidebarContent = () => (
    <div className="h-auto md:h-screen">
      <Sidebar className="h-auto md:h-full">
        <div className="p-4 text-xl font-semibold">Account</div>
        <Menu>
          {menuItems.map((item, index) => (
            <MenuItem 
              key={index} 
              icon={item.icon}
              onClick={item.action}
              className="flex items-center py-2 px-4 hover:bg-gray-100"
            >
              <span className="ml-2">{item.label}</span>
              {item.badge && (
                <span className="ml-auto bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">
                  {item.badge}
                </span>
              )}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </div>
  );

  return (
    <>
      {isAuth && auth.role === 'client' ? (
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <div className="flex flex-grow relative">
            {/* Toggle button for mobile */}
            <button
              className="md:hidden absolute top-4 left-4 z-30 bg-gray-200 p-2 rounded-md"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </button>

            {/* Desktop Sidebar */}
            <div className="hidden md:block w-70 bg-white shadow-lg h-screen ">
              <SidebarContent />
            </div>

            {/* Mobile Sidebar */}
            <div
              className={`
                md:hidden absolute top-0 left-0 z-20 w-70 bg-white shadow-lg transition-transform transform
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
              `}
            >
              <SidebarContent />
            </div>

            {/* Main content */}
            <div className="flex-grow p-6">
              {renderContent()}
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <div>Please Login First!</div>
      )}
    </>
  );
}
