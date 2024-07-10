import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from '../Layouts/Navigation';
import Footer from '../Layouts/Footer';
import ManagerSidebar from './ManagerSideB';
import { PhotoIcon } from '@heroicons/react/24/solid';
import PortailHeader from '../Layouts/PortailHeader';

export default function AddSeller() {
  const [formData, setFormData] = useState({
    FullName: '',
    email: '',
    phoneNumber: '',
    role: 'Seller',
    dob: '',
    photo: null,
    // **Password is not stored in state, generated on submit**
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const generatePassword = () => {
    const passphrase = '34jzoz_du"uç"é_u é_pu_rç'; // Improve password complexity
    const currentTime = Date.now().toString();
    return btoa(currentTime + passphrase);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.FullName.trim()) newErrors.FullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.photo) newErrors.photo = 'Profile picture is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      let route = '';
      switch (formData.role) {
        case 'Seller':
          route = 'https://backend-mern-store.zelobrix.com/create-seller';
          break;
        case 'Manager':
          route = 'https://backend-mern-store.zelobrix.com/create-manager';
          break;
        default:
          route = 'https://backend-mern-store.zelobrix.com/create-seller';
          break;
      }

      const generatedPassword = generatePassword();
      console.log('Generated password:', generatedPassword); // For debugging only, remove in production

      const dataToSend = new FormData();
      dataToSend.append('name', formData.FullName);
      dataToSend.append('email', formData.email);
      dataToSend.append('phoneNumber', formData.phoneNumber);
      dataToSend.append('dob', formData.dob);
      // **Include generated password in FormData**

      dataToSend.append('password', generatedPassword);
      if (formData.photo) {
        dataToSend.append('photo', formData.photo);
      }

      const response = await fetch(route, {
        method: 'POST',
        body: dataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const result = await response.json();
      console.log('Server response:', result);

      toast.success('Member created successfully');
      // Reset form
      setFormData({
        FullName: '',
        email: '',
        phoneNumber: '',
        role: 'Seller',
        dob: '',
        photo: null,
      });
    } catch (error) {
      console.error('Error creating member:', error.message);
      toast.error(`Failed to create member: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <PortailHeader></PortailHeader>
      <div className="flex">
        <div className="hidden md:block">
          <ManagerSidebar />
        </div>
        <div className="flex-1 p-6">
          <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Create a New Member</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  This user can get their password by using forgot password upon their first login.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                  <div className="sm:col-span-3">
                    <label htmlFor="FullName" className="block text-sm font-medium leading-6 text-gray-900">
                      Full name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="FullName"
                        id="FullName"
                        autoComplete="family-name"
                        value={formData.FullName}
                        onChange={handleInputChange}
                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.FullName ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      />
                      {errors.FullName && <p className="mt-2 text-sm text-red-600">{errors.FullName}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.email ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      />
                      {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="phone-number" className="block text-sm font-medium leading-6 text-gray-900">
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="phoneNumber"
                        id="phone-number"
                        autoComplete="tel"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.phoneNumber ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      />
                      {errors.phoneNumber && <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-900">
                      Role
                    </label>
                    <div className="mt-2">
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option value="Seller">Seller</option>
                        <option value="Manager">Manager</option>
                      </select>
                    </div>
                  </div>
                  <input
                        type="hidden"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.password ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      />
                  <div className="sm:col-span-3">
                    <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                      Date of Birth
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${errors.dob ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                      />
                      {errors.dob && <p className="mt-2 text-sm text-red-600">{errors.dob}</p>}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                      Profile Picture*
                    </label>
                    <div className="mt-2 flex items-center">
                      <label
                        htmlFor="photo"
                        className="relative cursor-pointer flex items-center justify-center rounded-md bg-white border border-gray-300 shadow-sm py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload</span>
                        <input
                          id="photo"
                          name="photo"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleInputChange}
                        />
                      </label>
                      {formData.photo && (
                        <span className="ml-2 text-xs leading-5 text-gray-500">{formData.photo.name}</span>
                      )}
                    </div>
                  </div>

                  {/* Hidden password field */}
                  <input
                    type="hidden"
                    name="password"
                    value={formData.password}
                    readOnly
                  />

                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" />
    </>
  );
}
