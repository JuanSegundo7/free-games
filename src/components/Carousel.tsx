import React, { useState } from "react";
import Image from "next/image";

interface CarouselProps {
  screenshots: { id: number; image: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ screenshots }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full max-w-[740px] duration-500 mb-2">
      <div className="relative w-full max-w-[740px] h-96 overflow-hidden rounded-lg duration-500">
        <Image
          src={screenshots[currentIndex].image}
          alt={`Image ${currentIndex + 1}`}
          layout="fill"
          objectFit="cover"
          className="w-full h-full max-w-[740px] duration-500 rounded-lg"
        />
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-0 transform -translate-y-1/2  px-2 py-1 mx-1 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 transition rounded-full"
        >
          <Image
            src="/svgs/arrow-left.svg"
            alt="Previous"
            width={12}
            height={12}
          />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 px-2 py-1 mx-1 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 transition rounded-full"
        >
          <Image
            src="/svgs/arrow-right.svg"
            alt="Next"
            width={12}
            height={12}
          />
        </button>
      </div>
      <div className="flex justify-start mt-4">
        {screenshots.map((screenshot, index) => (
          <div
            key={screenshot.id}
            className={`cursor-pointer duration-500 mr-2 mt-2 ${
              index === currentIndex ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => handleChange(index)}
          >
            <Image
              src={screenshot.image}
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={100}
              className="rounded-md h-[56px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
