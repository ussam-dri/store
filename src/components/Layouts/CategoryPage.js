import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Dialog, Disclosure, Menu } from '@headlessui/react';
import { XMarkIcon, ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Importing blur effect CSS
import Navigation from './Navigation';
import Footer from './Footer';

const sortOptions = [
  { name: 'Most Popular', value: 'popular', current: true },
  { name: 'Best Rating', value: 'rating-desc', current: false },
  { name: 'Price: Low to High', value: 'price-asc', current: false },
  { name: 'Price: High to Low', value: 'price-desc', current: false },
];

const brands = [
  { value: 'Nike', label: 'Nike' },
  { value: 'adidas', label: 'Adidas' },
  { value: 'Reebok', label: 'Reebok' },
  { value: 'Puma', label: 'Puma' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const LoadingSpinner = () => (
  <svg className="animate-spin h-10 w-10 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export default function CatPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedBrand, setSelectedBrand] = useState('Nike');
  const { cat } = useParams();

  useEffect(() => {
    fetchProducts();
  }, [cat, selectedBrand, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const fetchAndSortProducts = async () => {
        try {
          let url = `https://backend-mern-store.zelobrix.com/api/products/getByGender/${cat}`;

          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log('Fetched data:', data);
      
          if (!Array.isArray(data.products)) {
            throw new Error('Expected data.products to be an array');
          }
      
          const filteredProducts = data.products.filter(product => product.tag === selectedBrand);
          console.log('Filtered products:', filteredProducts);
      
          let sortedProducts = [...filteredProducts];
          sortedProducts.sort((a, b) => {
            switch (sortBy) {
              case 'rating-desc':
                return b.rating - a.rating;
              case 'price-asc':
                return a.price - b.price;
              case 'price-desc':
                return b.price - a.price;
              default:
                return 0;
            }
          });
      
          setProducts(sortedProducts);
        } catch (error) {
          console.error('Failed to fetch and sort products:', error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchAndSortProducts();
      
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const handleBrandChange = (brand) => {
    setLoading(true);
    setSelectedBrand(brand === selectedBrand ? '' : brand);
  };

  const handleSort = (value) => {
    setLoading(true);
    setSortBy(value);
  };

  return (
    <>
      <Navigation />
      <div className="bg-white">
        {/* Slider Section */}
        <div className="relative w-full h-96">
          <video 
            src="/runing-video.mp4" 
            className="w-full h-full object-cover"
            autoPlay 
            loop 
            muted
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-center font-adihausdin">
          <h2 className="text-5xl font-bold text-white">Step Up Your Style</h2>
          {/* Responsive text */}
          <p className="mt-2 text-xl text-white lg:text-base">Discover the perfect pair with our exclusive selection of shoes.</p>
        </div>
</div>

        </div>

        <Dialog as="div" className="relative z-40 lg:hidden" open={mobileFiltersOpen} onClose={setMobileFiltersOpen}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 flex z-40">
            <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 flex  justify-between">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {/* Brand Filter */}
                <Disclosure as="div" className="border-t border-gray-200 px-4 py-6" defaultOpen={true}>
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">Brands</span>
                          <span className="ml-6 flex items-center">
                            <ChevronDownIcon
                              className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-6">
                          {brands.map((brand) => (
                            <div key={brand.value} className="flex items-center">
                              <input
                                id={`filter-mobile-${brand.value}`}
                                name="brand[]"
                                value={brand.value}
                                type="checkbox"
                                checked={selectedBrand === brand.value}
                                onChange={() => handleBrandChange(brand.value)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-mobile-${brand.value}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {brand.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex py-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <div>
                  <Link to="/" className="text-gray-400 hover:text-gray-500">
                    Home
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">/
                    <Link to={`/category/${cat}`} className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 capitalize">
                    {cat}
                  </Link>
                </div>
              </li>
            </ol>
          </nav>

          <div className="border-b border-gray-200 pb-10 pt-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 capitalize">{cat}</h1>
            <p className="mt-4 text-base text-gray-500">Explore our exclusive range of {cat} products.</p>
          </div>

          <div className="lg:grid lg:grid-cols-4 lg:gap-x-8 lg:items-start">
            {/* Filters */}
            <aside className="hidden lg:block">
              <h2 className="sr-only">Filters</h2>

              <div className="sticky top-4 divide-y divide-gray-200 space-y-10">
                {/* Brand Filter */}
                <div className="border-b border-gray-200 pb-10">
                  <Disclosure as="div" defaultOpen={true}>
                    <h3 className="text-lg font-medium text-gray-900">Brands</h3>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-4">
                        {brands.map((brand) => (
                          <div key={brand.value} className="flex items-center">
                            <input
                              id={`filter-brand-${brand.value}`}
                              name="brand[]"
                              value={brand.value}
                              type="checkbox"
                              checked={selectedBrand === brand.value}
                              onChange={() => handleBrandChange(brand.value)}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor={`filter-brand-${brand.value}`} className="ml-3 text-gray-600">
                              {brand.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </Disclosure>
                </div>
              </div>
            </aside>

            {/* Product grid */}
            <section aria-labelledby="product-heading" className="mt-6 lg:mt-0 lg:col-span-3">
              <h2 id="product-heading" className="sr-only">
                Products
              </h2>

              {/* Mobile filter dialog */}
              <div className="relative">
                <button
                  type="button"
                  className="inline-flex lg:hidden mb-4 absolute right-0"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="text-sm font-medium text-gray-700">Filters</span>
                  <FunnelIcon
                    className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </button>
              </div>

              {/* Sort dropdown */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-5">
                <Menu as="div" className="relative inline-block text-left z-10">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Menu.Items className="absolute left-0 mt-2 w-40 origin-top-left bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.value}>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => handleSort(option.value)}
                            className={classNames(
                              option.current ? 'font-medium text-gray-900' : 'text-gray-700',
                              active ? 'bg-gray-100' : '',
                              'block w-full text-left px-4 py-2 text-sm'
                            )}
                          >
                            {option.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </div>

              {/* Product list */}
              <div className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 md:grid-cols-3">
                {loading ? (
                  <div className="col-span-full flex items-center justify-center h-64">
                    <LoadingSpinner />
                  </div>
                ) : (
                  products.map((product) => (
                    <a key={product._id} href={`https://mern-store.zelobrix.com/product/${product._id}`}>
                      <div className="group relative">
                        <div className="aspect-h-9 aspect-w-9 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                          <LazyLoadImage
                            alt={product.title}
                            effect="blur" // Apply the blur effect if imported
                            src={`https://backend-mern-store.zelobrix.com/download/${product.mainImage.filename}`}
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                          />
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
                    </a>
                  ))
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
