import React, { useState, useEffect } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { FaTrashAlt, FaCartPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Favorites = () => {
  const auth = useAuthUser();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(`https://backend-mern-store.zelobrix.com/api/user/${auth.id}/favorites`);
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Error fetching favorites');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [auth]);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`https://backend-mern-store.zelobrix.com/api/user/${auth.id}/favorites`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      if (response.ok) {
        setFavorites(favorites.filter((item) => item.id !== productId));
        toast.success('Product removed from favorites');
      } else {
        console.error('Failed to delete favorite:', data.message);
        toast.error(`Failed to delete favorite: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting favorite:', error);
      toast.error('Error deleting favorite');
    } finally {
      fetchFavorites();  // Reload favorites after a successful delete
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const response = await fetch(`https://backend-mern-store.zelobrix.com/api/user/${auth.id}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Product added to cart');
      } else {
        console.error('Failed to add to cart:', data.message);
        toast.error(`Failed to add to cart: ${data.message}`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error adding to cart');
    }
  };

  return (
    <div className='h-screen mt-20'>
      <h1 className='text-xl'>Favorites</h1>
      {loading ? (
        <p>Loading...</p>
      ) : favorites.length > 0 ? (
        <div>
          {favorites.map((item) => (
            <div key={item.id}>
              <div className="w-full flex items-center mb-4">
                <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
                  <img src={`https://backend-mern-store.zelobrix.com/download/${item.mainImage.filename}`} alt={item.title} />
                </div>
                <div className="flex-grow pl-3">
                  <h6 className="font-semibold uppercase text-gray-600"><a href={`/product/${item._id}`}>{item.title}</a></h6>
                  <p className="text-gray-400">x 1</p>
                </div>
                <div className="flex flex-col text-left text-gray-800">
                  <span className="font-semibold text-gray-600 text-xl">{item.price} MAD </span>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete from favorites"
                    >
                      <FaTrashAlt size={20} />
                    </button>
                    <button
                      onClick={() => handleAddToCart(item._id)}
                      className="text-green-500 hover:text-green-700"
                      title="Add to cart"
                    >
                      <FaCartPlus size={20} />
                    </button>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <div>You have no products in your favorites!</div>
      )}
      <ToastContainer containerId="containerB" position='top-right' />
    </div>
  );
};

export default Favorites;
