import React from 'react'
import Navbar from '../componants/Navi'
import Announce from '../componants/Announce';
import Slider from '../componants/Slider';
import SellingProducts from '../componants/SellingProducts';
import ProductType from '../componants/ProductType';

import Footer from '../componants/Footer';
import Newsletter from '../componants/Newsletter';

const Home = () => {
  return (
    <div>
    <Announce/>
     <Navbar/>
     <Slider/>
    <ProductType/>
    <SellingProducts/>
    <Newsletter/>
    <Footer/>
    </div>
  );
}

export default Home
