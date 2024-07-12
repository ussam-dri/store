import React, { useState, useEffect, useCallback } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { toast, ToastContainer } from 'react-toastify';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-toastify/dist/ReactToastify.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://backend-mern-store.zelobrix.com';

const ProdList = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedTag, setSelectedTag] = useState('All Brands');
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(0);
  const [productsToShow, setProductsToShow] = useState(15);
  const auth = useAuthUser();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setDisplayedProducts(data.slice(0, 15));
      } catch (error) {
        console.error('Error fetching the products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!auth || !auth.id) {
        setFavorites([]);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/user/${auth.id}/favorites`);
        if (!response.ok) throw new Error('Failed to fetch favorites');
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError('Failed to load favorites. Please try again later.');
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, [auth]);

  const filterProducts = useCallback((tag) => {
    setSelectedTag(tag);
    const filtered = tag === 'All Brands'
      ? products
      : products.filter(product => product.tag.toUpperCase() === tag.toUpperCase());
    setFilteredProducts(filtered);
    setDisplayedProducts(filtered.slice(0, 15));
    setProductsToShow(15);
  }, [products]);

  const loadMoreProducts = () => {
    setProductsToShow(prev => {
      const newCount = prev + 15;
      setDisplayedProducts(filteredProducts.slice(0, newCount));
      return newCount;
    });
  };

  const toggleFavorite = useCallback(async (productId) => {
    if (!auth || !auth.id) {
      toast.info('Please login first to favorite a product.', {
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
      const isFavorite = favorites.some(fav => fav._id === productId);
      const method = isFavorite ? 'DELETE' : 'POST';

      const response = await fetch(`${API_URL}/api/user/${auth.id}/favorites`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) throw new Error('Failed to update favorite status');

      setFavorites(prev => {
        if (isFavorite) {
          return prev.filter(fav => fav._id !== productId);
        } else {
          return [...prev, { _id: productId }];
        }
      });
    } catch (error) {
      console.error('Error changing favorite status:', error);
      toast.error('Failed to update favorite status. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [favorites, auth]);

  const handleMouseEnter = (productId, imageCount) => {
    setHoveredProduct(productId);
    setHoveredImageIndex((prevIndex) => (prevIndex + 1) % imageCount);
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
    setHoveredImageIndex(0);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white">
      <ToastContainer />

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
          {['All Brands', 'Nike', 'Adidas', 'Puma', 'Reebok'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => filterProducts(tag)}
              className={`${
                selectedTag === tag ? 'text-white bg-gray-700' : 'text-gray-900 bg-white'
              } border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3`}
            >
              {tag}
            </button>
          ))}
        </div>

        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 md:grid-cols-3">
          {displayedProducts.map((product) => {
            const mainImage = product.mainImage;
            const currentImage = hoveredProduct === product._id && product.images.length > 0 
              ? product.images[hoveredImageIndex] 
              : mainImage;
            return (
              <div 
                key={product._id} 
                className="group relative"
                onMouseEnter={() => handleMouseEnter(product._id, product.images.length)}
                onMouseLeave={handleMouseLeave}
              >
                <a href={`/product/${product._id}`}>
                  <div className="aspect-h-9 aspect-w-9 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <LazyLoadImage
                      src={`${API_URL}/download/${currentImage.filename}`}
                      alt={product.title}
                      effect="blur"
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                </a>
                <div className="absolute top-2 right-2 cursor-pointer" onClick={() => toggleFavorite(product._id)}>
                  {favorites.some(fav => fav._id === product._id) ? (
                    <img width="20" height="20" src="https://img.icons8.com/material-sharp/24/filled-like.png" alt={`Remove ${product.title} from favorites`} />
                  ) : (
                    <img width="20" height="20" src="https://img.icons8.com/material-outlined/24/like--v1.png" alt={`Add ${product.title} to favorites`} />
                  )}
                </div>
                <div className="mt-4 flex flex-col justify-between">
                <h1 className="text-xs text-gray-700">{product.title}</h1>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center">
                    {Array.from({ length: product.rating }, (_, i) => (
                      <span key={i} className="star text-xs">★</span>
                    ))}
                  </div>
                  <p className="text-xs font-medium text-gray-900"><b>{product.price} MAD</b></p>
                </div>
              </div>
              </div>
            );
          })}
        </div>
        {productsToShow < filteredProducts.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreProducts}
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProdList;
