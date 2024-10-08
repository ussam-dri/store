import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';


const CustomAlert = ({ message, type, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  const alertTypeClass = type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';

  return (
    <div className={`fixed z-50  top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md ${alertTypeClass}`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-lg font-semibold">&times;</button>
      </div>
    </div>
  );
};

const Cart = () => {
  const auth = useAuthUser();

  const [open, setOpen] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [remove, setRemove] = useState(0);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`https://backend-mern-store.zelobrix.com/api/user/${auth.id}/cart`);
      const data = await response.json();
      setCartItems(data.cartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [remove]);

  useEffect(() => {
    // Calculate subtotal when cart items change
    const calculateSubtotal = () => {
      let total = 0;
      cartItems.forEach((item) => {
        total += parseFloat(item.price);
      });
      setSubtotal(total.toFixed(2));
    };

    calculateSubtotal();
  }, [cartItems]);

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch(`https://backend-mern-store.zelobrix.com/api/user/${auth.id}/cart/${productId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        setRemove(remove + 1);
        setAlert({ show: true, message: 'Product removed from cart', type: 'success' });
      } else {
        setAlert({ show: true, message: 'Failed to remove product from cart. Please try again.', type: 'error' });
      }
      // Update cartItems state with the updated list after deletion
      setCartItems(data.cartItems);
      
      // Fetch updated cart items from server
      await fetchCartItems();
    } catch (error) {
      console.error('Error removing product from cart:', error);
      setAlert({ show: true, message: 'Failed to remove product from cart. Please try again.', type: 'error' });
    }
  };

  return (
    <div className='text-sm'>
      <CustomAlert
        message={alert.message}
        type={alert.type}
        show={alert.show}
        onClose={() => setAlert({ ...alert, show: false })}
      />
      <Transition show={open}>
        <Dialog className="relative z-[30]" onClose={setOpen}>        
          <TransitionChild
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <DialogPanel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {cartItems.map((product) => (
                                <li key={product._id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    {product && product.mainImage?.filename ? (
                                      <img
                                        src={`https://backend-mern-store.zelobrix.com/download/${product.mainImage.filename}`}
                                        alt={product.title}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    ) : (
                                      <img
                                        src="placeholder_image_url_here"
                                        alt="placeholder"
                                        className="h-full w-full object-cover object-center"
                                      />
                                    )}
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href={`/product/${product._id}`}>{product.title}</a>
                                        </h3>
                                        <p className="ml-4">{product.price} MAD</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{product.tag}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">Qty x1{product.quantity}</p>
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() => handleRemoveFromCart(product._id)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                              {cartItems.length === 0 && (
                                <div className="text-center text-gray-500">
                                  Are you blind? All of these products and your cart is still empty!
                                </div>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>{subtotal} MAD</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                          <a
                            href="/checkout"
                            className={`flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                            style={{ pointerEvents: cartItems.length === 0 ? 'none' : 'auto' }}
                          >
                            Checkout
                          </a>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{' '}
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Cart;
