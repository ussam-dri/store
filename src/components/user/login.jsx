import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import Footer from '../Layouts/Footer';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

const LoginPortail = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const signOutt=useSignOut();


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backend-mern-store.zelobrix.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        signOutt();
        if (signIn({
          auth: {
            token: data.tokens,
            type: 'Bearer'
          },
          userState: {
            FullName: data.FullName,
            PhoneNumber:data.phoneNumber,
            email: data.email,
            id: data.id,
            role: data.role
          }
        })) {
          navigate('/'); // Navigate to the home page or any other page after successful login
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error in login');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login');
    }
  };

  // Function to handle forgot password click
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backend-mern-store.zelobrix.comforgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Password reset email sent:', data.message);
        // Optionally, show a success message to the user
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error initiating password reset');
      }
    } catch (error) {
      console.error('Error initiating password reset:', error);
      setError('An error occurred initiating password reset');
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in</h2>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {error && <div className="text-red-500 text-sm">{error}</div>}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="/resetPassword" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
              <p className='mt-2'>Don't have an account? <a href='/register'><u>Sign Up</u></a></p>
            </form>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <div className="absolute inset-0 h-full w-full object-cover">
            <div className="flex flex-col justify-center h-full px-8 bg-gray-100">
            <h2 className="text-3xl font-extrabold text-gray-900">Start Shopping Now and Save Up To 40% on first purchase.</h2>
            <p className="mt-3 text-lg text-gray-500">Free shipping for all carts higher than 1000 MAD</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPortail;
