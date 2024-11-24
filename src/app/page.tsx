import React from 'react';
import HeroSection from '@/Home/HeroSection';
import Carousel from '@/Home/Carousel';
import Explore from '@/Home/Explore';
export default function Home() {
  return (
    <div className="justify-center ">
      <HeroSection/>
      <Carousel/>
      <Explore/>
    </div>
  );
}
