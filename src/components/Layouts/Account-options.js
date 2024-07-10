import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AccountOp({name}) {
    const signOut = useSignOut()
const nav =useNavigate();
const signingout = () => {
    signOut();
    toast.info('You Signed Out Successfully', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
    // Delay navigation by 3 seconds
    setTimeout(() => {
      nav('/home');
    }, 3000);
  };


  return (

    <Menu as="div" className="relative inline-block text-left">
            <ToastContainer />

      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
         {name}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
        <form method="POST" action="#">
          <MenuItem>
            {({ focus }) => (
              <a
                href="/profile"
                className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
              >
                Account 
              </a>
            )}
          </MenuItem>
          </form>
         
          <form>
            <MenuItem>
              {({ focus }) => (
                <button
                  
                  className={classNames(
                    focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full px-4 py-2 text-left text-sm',
                  )}
                  onClick={() => signingout()}
                >
                        Sign Out

                </button>
              )}
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  )
}
