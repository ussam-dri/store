import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Dialog, Disclosure, Menu } from '@headlessui/react';
import { XMarkIcon, ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';
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
  { value: 'Adidas', label: 'Adidas' },
  { value: 'Reebok', label: 'Reebok' },
  { value: 'Puma', label: 'Puma' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CatPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedBrand, setSelectedBrand] = useState('');
  const { cat, gender } = useParams();

  useEffect(() => {
    fetchProducts();
  }, [cat, gender, selectedBrand]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `https://backend-mern-store.zelobrix.com/api/products/getByGender/${cat}?gender=${gender}`;
      if (selectedBrand) url += `&tag=${selectedBrand}`;

      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand === selectedBrand ? '' : brand);
  };

  const sortedProducts = [...products].sort((a, b) => {
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

  const handleSort = (value) => {
    setSortBy(value);
    // Update the current property of the sort options
    sortOptions.forEach(option => option.current = option.value === value);
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
            <div className="text-center font-montserrat">
              <h2 className="text-5xl font-bold text-white">Home & Lifestyle</h2>
              <p className="mt-2 text-xl text-white">Elevate your home and lifestyle with our curated products</p>
            </div>
          </div>
        </div>

        <Dialog as="div" className="relative z-40 lg:hidden" open={mobileFiltersOpen} onClose={setMobileFiltersOpen}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0 flex z-40">
            <Dialog.Panel className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 flex items-center justify-between">
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
                <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                  <h3 className="flow-root">
                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">Brands</span>
                      <ChevronDownIcon className="ml-6 flex-shrink-0 h-5 w-5 text-gray-500" aria-hidden="true" />
                    </Disclosure.Button>
                  </h3>
                  <Disclosure.Panel className="pt-6">
                    <div className="space-y-4">
                      {brands.map((brand) => (
                        <div key={brand.value} className="flex items-center">
                          <input
                            id={`filter-mobile-brand-${brand.value}`}
                            name="brand[]"
                            value={brand.value}
                            type="checkbox"
                            checked={selectedBrand === brand.value}
                            onChange={() => handleBrandChange(brand.value)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label htmlFor={`filter-mobile-brand-${brand.value}`} className="ml-3 min-w-0 flex-1 text-gray-500">
                            {brand.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Disclosure.Panel>
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
                <div className="flex items-center">
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  <Link to="/category/men" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Categories
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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

              {/* Sort dropdown */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-5">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
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
                  <div className="flex items-center justify-center w-full h-full">
                    <div className="loader">Loading...</div>
                  </div>
                ) : (
                  sortedProducts.map((product) => (
                    <div key={product._id} className="group relative">
                      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                        <img
                          src={`https://backend-mern-store.zelobrix.com/download/${product.mainImage.filename}`}
                          alt={product.title}
                          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                        />
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <Link to={`/product/${product._id}`}>
                              <span aria-hidden="true" className="absolute inset-0" />
                              {product.title}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{product.tag}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">${product.price}</p>
                      </div>
                    </div>
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
