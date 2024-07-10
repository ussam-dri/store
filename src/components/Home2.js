import React from 'react'
import Navigation from './Layouts/Navigation'
import Hero from './Hero'
import Footer from './Layouts/Footer'
import Categories from './Layouts/categories'
import ProdList from './ProdList'
import Brands from './products/Brands'
import Footer2 from './Layouts/Footer2'
const Home2 = () => {
  
  return (
    <div>
        <Navigation></Navigation>
        <Hero></Hero>
        {/* <Categories></Categories> */}
        <ProdList></ProdList>
        <Brands></Brands>
{/* <Footer></Footer> */}
<hr></hr>
<Footer2></Footer2>
    </div>
  )
}

export default Home2