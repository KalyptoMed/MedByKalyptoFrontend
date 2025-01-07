import React from 'react';
import HeroSection from '@/Home/HeroSection';
import Carousel from '@/Home/Carousel';
import Explore from '@/Home/Explore';
import FeaturedProducts from '@/Home/FeaturedProducts';
import ProductCategories from '@/Home/ProductCategories';
import About from '@/Home/About';
import Delivery from '@/Home/Delivery';
import Footer from '@/Footer/Footer';

export default function Home() {
  return (
    <div className="justify-center bg-white overflow-hidden">
      <HeroSection/>
      <Carousel/>
      <Explore/>
      <FeaturedProducts/>
      <ProductCategories/>
      <About/>
      <Delivery/>
      <Footer/>
    </div>
  );
}
