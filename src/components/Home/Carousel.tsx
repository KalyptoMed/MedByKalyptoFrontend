"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const slideData = [
  { src: "/assets/images/afrobabe.png", alt: "Bone and Joints", label: "Bone and Joints" },
  { src: "/assets/images/drugicons.png", alt: "Eyedrops", label: "Eyedrops" },
  { src: "/assets/images/drugicons.png", alt: "Pain Relief", label: "Pain Relief" },
  { src: "/assets/images/drugicons.png", alt: "Vitamins", label: "Vitamins" },
  { src: "/assets/images/drugicons.png", alt: "Skin Care", label: "Skin" },
  { src: "/assets/images/drugicons.png", alt: "Skin Care", label: "Skin Care 1" },
  { src: "/assets/images/drugicons.png", alt: "Skin Care", label: "Skin Care 2" },
  { src: "/assets/images/drugicons.png", alt: "Skin Care", label: "Skin Care 3" },
];

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full py-4 bg-[#F2F3F4]">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {slideData.map((slide, index) => (
            <div key={index} className="embla__slide min-w-[38%] md:min-w-[20%] lg:min-w-[15%] p-1">
              <div className="flex flex-col items-center bg-slate-400 rounded-2xl h-full">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={100}
                  height={100}
                  className="w-full h-24 rounded-md object-contain"
                />
                <p className="mb-2 text-sm font-medium text-gray-700">{slide.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    
    </div>
  );
};

export default Carousel;
