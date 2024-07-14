import React, { useState, useEffect } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { toast } from 'react-toastify';

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
    <div className={`fixed z-50 top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md ${alertTypeClass}`}
         style={{ maxWidth: '90vw', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      <div className="flex justify-between items-center">
        <span className="overflow-hidden">{message}</span>
        <button onClick={onClose} className="ml-4 text-lg font-semibold">&times;</button>
      </div>
    </div>
  );
};

const ChangePassword = () => {
  const auth = useAuthUser();
  const userId = auth.id; // Assuming useAuthUser provides id of authenticated user
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await fetch('https://backend-mern-store.zelobrix.com/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId, Newpassword: formData.newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlert({ show: true, message: 'Password changed successfully', type: 'success' });
        setFormData({ newPassword: '', confirmPassword: '' }); // Clear form after success
      } else {
        setAlert({ show: true, message: 'Password change failed', type: 'no' });
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setAlert({ show: true, message: 'Password change failed', type: 'no' });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white mt-0">
      <CustomAlert
        message={alert.message}
        type={alert.type}
        show={alert.show}
        onClose={() => setAlert({ ...alert, show: false })}
      />
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Change Password</h2>
        {message && <div className="text-center mb-4 text-red-500">{message}</div>}
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Change Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
