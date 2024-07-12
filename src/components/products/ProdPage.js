import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from '../Layouts/Navigation';
import Footer2 from '../Layouts/Footer2';
import Example from './Related';
import CollapsibleDescription from './CollapsibleDescription'; // Import the collapsible component
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
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


const ProdPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState(null);
  const [gender, setGender] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const auth = useAuthUser();
  const isAuth = useIsAuthenticated();
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const imagesPerPage = 3;
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const handleNext = () => {
    if (currentStartIndex + imagesPerPage < images.length) {
      setCurrentStartIndex(currentStartIndex + imagesPerPage);
    }
  };

  const handlePrev = () => {
    if (currentStartIndex - imagesPerPage >= 0) {
      setCurrentStartIndex(currentStartIndex - imagesPerPage);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://backend-mern-store.zelobrix.com/product/${id}`);
        const data = await response.json();
        setProduct({
          ...data,
          images: [data.mainImage, ...data.images.filter(image => image.filename !== data.mainImage.filename)],
        });
        setBrand(data.tag);
        setGender(data.gender);
        setMainImage(data.mainImage); // Set the initial main image
      } catch (error) {
        console.error('Error fetching the product:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuth || !auth.id) {
      setAlert({ show: true, message: 'Please Log In first', type: 'hell-nah' });

      return;
    }

    try {
      const response = await fetch(`https://backend-mern-store.zelobrix.com/api/user/${auth.id}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: id }),
      });
      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }
      const data = await response.json();
      setAlert({ show: true, message: 'Product Added to cart', type: 'success' });

    } catch (error) {
      console.error('Error adding product to cart:', error);
      setAlert({ show: true, message: 'failed to add Product to cart', type: 'hell-nah' });

    }
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { tag, title, price, description, rating, images } = product;
  const mainImageUrl = `https://backend-mern-store.zelobrix.com/download/${mainImage.filename}`;

  // Default static values
  const defaultColors = ['#000000', '#FFFFFF', '#4B0082'];
  const defaultSizes = ['39', '40', '41', '42'];

  return (
    <div>
       <CustomAlert
        message={alert.message}
        type={alert.type}
        show={alert.show}
        onClose={() => setAlert({ ...alert, show: false })}
      />
      <Navigation />
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full">
              <img
                alt="ecommerce"
                className="w-full h-auto object-cover object-center rounded"
                src={mainImageUrl}
              />
              <div className="flex items-center mt-4 space-x-2">
                {currentStartIndex > 0 && (
                  <button
                    onClick={handlePrev}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
              <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/back--v1.png" alt="forward--v1"/>  
              </button>
                )}
                <div className="flex overflow-hidden">
                  {images.slice(currentStartIndex, currentStartIndex + imagesPerPage).map((image, index) => (
                    <img
                      key={index}
                      alt="thumbnail"
                      className="w-20 h-20 object-cover object-center rounded mx-2 cursor-pointer sm:w-16 sm:h-16 md:w-20 md:h-20"
                      src={`https://backend-mern-store.zelobrix.com/download/${image.filename}`}
                      onClick={() => handleThumbnailClick(image)}
                    />
                  ))}
                </div>
                {currentStartIndex + imagesPerPage < images.length && (
                  <button
                    onClick={handleNext}
                    className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
              <img width="24" height="24" src="https://img.icons8.com/ios-filled/50/forward--v1.png" alt="forward--v1"/>  
                  </button>
                )}
              </div>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{tag || 'Brand Name'},{gender || 'Gender'}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{title || 'Product Title'}</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className={`w-4 h-4 ${index < (rating || 0) ? 'text-indigo-500' : 'text-gray-300'}`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  ))}
                  <span className="text-gray-600 ml-3">{rating} Reviews</span>
                </span>
              </div>
              <CollapsibleDescription description={description || 'Product Description'} />
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                      {defaultSizes.map((size, index) => (
                        <option key={index}>{size}</option>
                      ))}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900"><b>{price || '0.00'} MAD</b></span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800" onClick={handleAddToCart}>
                <span className="relative flex items-center">
                  <svg className="w-3.5 h-3.5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                  </svg>
                  <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Add to cart
                  </span>
                </span>
              </button>

              </div>
            </div>
          </div>
        </div>
      </section>
      <Example brand={brand} id={id} gender={gender} />
      <Footer2 />
    </div>
  );
};

export default ProdPage;
