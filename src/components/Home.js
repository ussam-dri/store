import React from 'react';
import Header from './Layouts/Header';
import Footer from './Layouts/Footer';
import Categories from './Layouts/categories';
import Navigation from './Layouts/Navigation';

const Home = () => {
  return (
    <div>
        <Navigation></Navigation>
      {/* <img src="/images/logoaa.jpg" alt=""/> */}
      <div className='slider w-full'>

{/* <div className="relative   h-full">
<img className="h-full w-full object-cover rounded-md" src="images/slider.jpg" alt="Random image"/>
<div className="absolute inset-0 bg-gray-700 opacity-30 rounded-md"></div>
<div className="absolute inset-0 flex items-center justify-center">
<h2 className="text-white text-3xl font-bold">20% Off ! SHOP NOW</h2>
</div>
</div>        */}


<div id="gallery" className=" relative w-full" data-carousel="slide">
    {/* <!-- Carousel wrapper --> */}
    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
         {/* <!-- Item 1 --> */}
        <div className="hidden duration-1000 ease-in-out" data-carousel-item>
            <img src="images/products/slider11.jpg" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt=""/>
        </div>
        {/* <!-- Item 2 --> */}
        <div className="hidden duration-1000 ease-in-out" data-carousel-item="active">
            <img src="images/products/slider2.jpg" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt=""/>
        </div>
        {/* <!-- Item 3 --> */}
        <div className="hidden duration-1000 ease-in-out" data-carousel-item>
            <img src="images/products/slider3.jpg" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt=""/>
        </div>
      
    </div>
    <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
    </button>
</div>

 </div>
      <Categories></Categories>
      <Footer />
    </div>
  );
};

export default Home;
