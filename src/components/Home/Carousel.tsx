"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const slideData = [
  {
    src: "/assets/images/afrobabe.png",
    alt: "Bone and Joints Pains",
    label: "Bone and Joints",
    bgColor: "bg-[#012ce6]",
  },
  {
    src: "/assets/images/eyedrop.png",
    alt: "Eyedrops",
    label: "Eyedrops",
    bgColor: "bg-[#854084]",
  },
  {
    src: "/assets/images/close-up-hands-with-medical-devices.png",
    alt: "Pain Relief",
    label: "Pain Relief",
    bgColor: "bg-[#6fa087]",
  },
  {
    src: "/assets/images/ophthalmologist.png",
    alt: "Eye care",
    label: "Eye care",
    bgColor: "bg-[#012ce6]",
  },
  {
    src: "/assets/images/inhaler.png",
    alt: "Respiratory",
    label: "Respiratory",
    bgColor: "bg-[#854084]",
  },
  {
    src: "/assets/images/chest.png",
    alt: "Kidney",
    label: "Kidney",
    bgColor: "bg-[#6fa087]",
  },
  {
    src: "/assets/images/close-up-hands-with-medical-devices.png",
    alt: "Medical Devices",
    label: "Medical Devices",
    bgColor: "bg-[#012ce6]",
  },
  {
    src: "/assets/images/chest.png",
    alt: "Ulcer",
    label: "Ulcer",
    bgColor: "bg-[#854084]",
  },
];

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  
  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    const timer = setInterval(() => {
      emblaApi.scrollNext(); // Move to the next slide
    }, 2000); // Adjust the delay in milliseconds

    return () => clearInterval(timer); // Cleanup the interval on unmount
  }, [emblaApi]);

  useEffect(() => {
    autoplay(); // Start autoplay when emblaApi is ready
  }, [autoplay]);

  return (
    <div className="w-full py-6  pl-1 md:pl-4 bg-[#F2F3F4]">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {slideData.map((slide, index) => (
            <div
              key={index}
              className="embla__slide min-w-[38%] md:min-w-[20%] lg:min-w-[13%] p-1 relative"
            >
              <div
                className={`flex flex-col items-center  rounded-2xl h-full ${slide.bgColor}`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={100}
                  height={100}
                  className="w-full h-32 rounded-md object-contain"
                />
                <p className="mb-2 text-sm font-medium text-white absolute bottom-1">
                  {slide.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
