import React from 'react';
import HeroSection from '@/Home/HeroSection';
import Carousel from '@/Home/Carousel';
import Explore from '@/Home/Explore';
import FeaturedProducts from '@/Home/FeaturedProducts';
import ProductCategories from '@/Home/ProductCategories';

export default function Home() {
  return (
    <div className="justify-center bg-white overflow-hidden">
      <HeroSection/>
      <Carousel/>
      <Explore/>
      <FeaturedProducts/>
      <ProductCategories/>
    </div>
  );
}
