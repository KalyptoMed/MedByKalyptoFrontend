import React from 'react';
import HeroSection from '@/components/Home/HeroSection';
import Carousel from '@/components/Home/Carousel';
import Explore from '@/components/Home/Explore';
import FeaturedProducts from '@/components/Home/FeaturedProducts';
import ProductCategories from '@/components/Home/ProductCategories';
import About from '@/components/Home/About';
import Delivery from '@/components/Home/Delivery';

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
    </div>
  );
}
