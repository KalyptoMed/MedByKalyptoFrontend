import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import HeroSection from '@/Home/HeroSection';

export default function Home() {
  return (
    <div className="justify-center ">
      <Navbar />
      <HeroSection/>
    </div>
  );
}
