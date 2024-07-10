import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PhotoIcon } from '@heroicons/react/24/solid';
import Footer from '../Layouts/Footer';

export default function RegisterPortail() {
  const [formData, setFormData] = useState({
    FullName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    photo: null,
    password: '', // Add password field to formData
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

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length) {
      setFormData({
        ...formData,
        photo: files[0],
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.FullName.trim()) newErrors.FullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.photo) newErrors.photo = 'Profile picture is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      let route = 'https://backend-mern-store.zelobrix.com/create-seller';

      const dataToSend = new FormData();
      dataToSend.append('name', formData.FullName);
      dataToSend.append('email', formData.email);
      dataToSend.append('phoneNumber', formData.phoneNumber);
      dataToSend.append('dob', formData.dob);
      dataToSend.append('password', formData.password); // Include password in dataToSend
      if (formData.photo) {
        dataToSend.append('photo', formData.photo);
      }

      console.log('Data to be sent:', Object.fromEntries(dataToSend));

      const response = await fetch(route, {
        method: 'POST',
        body: dataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
        toast.error('failed to register', errorData);
      }

      const result = await response.json();
      console.log('Server response:', result);

      toast.success('Member created successfully');
      setFormData({
        FullName: '',
        email: '',
        phoneNumber: '',
        dob: '',
        photo: null,
        password: '', // Reset password field after successful submission
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
      <div className="flex min-h-screen bg-gray-50 text-base">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
            <span> </span>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900"><img width={"70px"} height={"70px"} src='/images/marketPlaceLogo.png' alt=""/>Sign up</h2>
            </div>

            <div className="mt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="FullName" className="block text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="FullName"
                      id="FullName"
                      autoComplete="name"
                      value={formData.FullName}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  {errors.FullName && <p className="mt-2 text-sm text-red-600">{errors.FullName}</p>}
                </div>

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
                      value={formData.email}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
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
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                </div>
                <div>
                  <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="phoneNumber"
                      id="phone-number"
                      autoComplete="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  {errors.phoneNumber && <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>}
                </div>

                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="dob"
                      id="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  {errors.dob && <p className="mt-2 text-sm text-red-600">{errors.dob}</p>}
                </div>

                <div
                  className="col-span-full"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Profile Picture*
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="photo" type="file" className="sr-only" onChange={handleInputChange} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      {formData.photo && <p className="mt-2 text-sm text-gray-600">{formData.photo.name}</p>}
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 4MB</p>
                    </div>
                  </div>
                </div>

                

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isLoading ? 'Signing up...' : 'SignUp'}
                  </button>
                </div>
                <p>Already Have an account ? <u><a href='/reward-program/login'>Log In</a> </u></p>
              </form>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <div className="absolute inset-0 h-full w-full object-cover">
            <div className="flex flex-col justify-center h-full px-8 bg-gray-100">
              <h2 className="text-3xl font-extrabold text-gray-900">Start Selling Now and Earn Up To 10K MAD a month.</h2>
              <p className="mt-3 text-lg text-gray-500">No credit card required,Free</p>
            </div>
          </div>
        </div>
        <ToastContainer position="bottom-right"/>
      </div>
      <Footer></Footer>
    </>
  );
}
