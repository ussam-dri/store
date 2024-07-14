import React, { useState, useEffect } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { FaTrashAlt, FaCartPlus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Favorites = () => {
  const auth = useAuthUser();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

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
        setAlert({ show: true, message: 'Deleted from favorites!', type: 'success' });
      } else {
        console.error('Failed to delete favorite:', data.message);
        setAlert({ show: true, message: 'Error deleting from favorites!', type: 'error' });
      }
    } catch (error) {
      console.error('Error deleting favorite:', error);
      setAlert({ show: true, message: 'Error deleting from favorites!', type: 'error' });
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
        setAlert({ show: true, message: 'Added to cart!', type: 'success' });
      } else {
        console.error('Failed to add to cart:', data.message);
        setAlert({ show: true, message: 'Error adding to cart!', type: 'error' });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setAlert({ show: true, message: 'Error adding to cart!', type: 'error' });
    }
  };

  return (
    <div className="h-screen mt-20">
      <h1 className="text-xl">Favorites</h1>

      {loading ? (
        <p>Loading...</p>
      ) : favorites.length > 0 ? (
        <div className="max-h-80 overflow-y-auto"> {/* Tailwind CSS classes for scrollable container */}
          <CustomAlert
            message={alert.message}
            type={alert.type}
            show={alert.show}
            onClose={() => setAlert({ ...alert, show: false })}
          />
          {favorites.map((item) => (
  <div key={item.id}>
    <div className="w-full flex items-center mb-4">
      <div className="overflow-hidden rounded-lg w-16 h-16 bg-gray-50 border border-gray-200">
        <img src={`https://backend-mern-store.zelobrix.com/download/${item.mainImage.filename}`} alt={item.title} />
      </div>
      <div className="flex-grow pl-3">
        <h6 className="font-semibold uppercase text-gray-600 text-xs">
          <a href={`/product/${item._id}`}>
            {item.title.split(' ').slice(0, 3).join(' ')}
            {item.title.split(' ').length > 3 ? '...' : ''}
          </a>
        </h6>
        <p className="text-gray-400">x 1</p>
      </div>
      <div className="flex flex-col text-left text-gray-800">
        <span className="font-semibold text-black text-sm"><b>{item.price} MAD</b></span>
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
      <ToastContainer containerId="containerB" position="top-right" />
    </div>
  );
};

export default Favorites;
