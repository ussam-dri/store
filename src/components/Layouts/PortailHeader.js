import React from 'react'

const PortailHeader = () => {
  return (
    <div>
        
        <header class="text-gray-600 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
     <img height={"46px"} width={"46px"} src='/images/marketplace.png'/>
      <span class="ml-3 text-xl">ShoppeLux Portail</span>
    </a>
    <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <a class="mr-5 hover:text-gray-900" href="/">Home</a>
      <a class="mr-5 hover:text-gray-900" href="#">About Program</a>
      <a class="mr-5 hover:text-gray-900" href="#">Contact Us</a>
      <a class="mr-5 hover:text-gray-900" href="#">Privacy Policy</a>
    </nav>
    <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Support &nbsp; <img  width={"24px"} height={"24px"} src="/images/icons8-headphones-64.png"/>
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
</header>
<hr></hr>
    </div>
  )
}

export default PortailHeader