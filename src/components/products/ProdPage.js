import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from '../Layouts/Navigation';
import Footer2 from '../Layouts/Footer2';
import Example from './Related';
import CollapsibleDescription from './CollapsibleDescription'; // Import the collapsible component

const ProdPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState(null);

  const [mainImage, setMainImage] = useState(null);
  const auth = useAuthUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://backend-mern-store.zelobrix.com/product/${id}`);
        const data = await response.json();
        setProduct({
          ...data,
          images: [data.mainImage, ...data.images.filter(image => image.filename !== data.mainImage.filename)],
        });
        setBrand(data.tag)
        setMainImage(data.mainImage); // Set the initial main image
        console.log(data);
      } catch (error) {
        console.error('Error fetching the product:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToCart = async () => {
    if (!auth || !auth.id) {
      toast.info('Please log in to add items to your cart', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      toast.success(data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      <Navigation />
      <ToastContainer  containerId="addTOCART"/>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full">
              <img
                alt="ecommerce"
                className="w-full h-auto object-cover object-center rounded"
                src={mainImageUrl}
              />
              <div className="flex mt-4">
                {images.map((image, index) => (
                  <img
                    key={index}
                    alt="thumbnail"
                    className="w-20 h-20 object-cover object-center rounded mx-2 cursor-pointer"
                    src={`https://backend-mern-store.zelobrix.com/download/${image.filename}`}
                    onClick={() => handleThumbnailClick(image)}
                  />
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{tag || 'Brand Name'}</h2>
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
                <span className="title-font font-medium text-2xl text-gray-900">{price || '0.00'} MAD</span>
                <button 
                  className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Example  brand={brand} id={id}/>
      <Footer2 />
    </div>
  );
};

export default ProdPage;
