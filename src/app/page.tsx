import React from 'react';
import HeroSection from '@/Home/HeroSection';
import Carousel from '@/Home/carousel';

export default function Home() {
  return (
    <div className="justify-center ">
      <HeroSection/>
      <Carousel/>
    </div>
  );
}
