"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import Image from 'next/image';

// SwiperCore.use([Navigation, Pagination]);

const Carousel = () => {
  return (
    <div className="w-full px-4 py-6">
      <Swiper
        slidesPerView={3} 
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
        }}
      >
        <SwiperSlide>
          <div className="flex flex-col items-center bg-gray-200 rounded-lg p-4">
            <Image src="/assets/images/drugicons.png" alt="Bone and Joints" width={100} height={100} className="w-full h-auto rounded-md object-cover" />
            <p className="mt-2 text-sm font-medium text-gray-700">Bone and Joints</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center bg-gray-200 rounded-lg p-4">
            <Image src="/assets/images/drugicons.png" alt="Eyedrops" width={300} height={300} className="w-full h-auto rounded-md object-cover" />
            <p className="mt-2 text-sm font-medium text-gray-700">Eyedrops</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center bg-gray-200 rounded-lg p-4">
            <Image src="/assets/images/drugicons.png" alt="Eyedrops" width={300} height={300} className="w-full h-auto rounded-md object-cover" />
            <p className="mt-2 text-sm font-medium text-gray-700">Eyedrops</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center bg-gray-200 rounded-lg p-4">
            <Image src="/assets/images/drugicons.png" alt="Eyedrops" width={300} height={300} className="w-full h-auto rounded-md object-cover" />
            <p className="mt-2 text-sm font-medium text-gray-700">Eyedrops</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center bg-gray-200 rounded-lg p-4">
            <Image src="/assets/images/drugicons.png" alt="Eyedrops" width={300} height={300} className="w-full h-auto rounded-md object-cover" />
            <p className="mt-2 text-sm font-medium text-gray-700">Eyedrops</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center bg-gray-200 rounded-lg p-4">
            <Image src="/assets/images/drugicons.png" alt="Eyedrops" width={300} height={300} className="w-full h-auto rounded-md object-cover" />
            <p className="mt-2 text-sm font-medium text-gray-700">Eyedrops</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col items-center bg-gray-200 rounded-lg p-4">
            <Image src="/assets/images/drugicons.png" alt="Eyedrops" width={300} height={300} className="w-full h-auto rounded-md object-cover" />
            <p className="mt-2 text-sm font-medium text-gray-700">Eyedrops</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
