'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const slides = [
  '/assets/slider/01.png',
  '/assets/slider/02.png',
  '/assets/slider/03.png',
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  //h-[30vh]  md:h-[80vh]
  return (
    <div className="relative w-full aspect-video bg-gray-100 rounded-lg mb-8 overflow-hidden ">
      {/* <div className=' relative w-full h-full  flex transition-all ease-in-out duration-1000'>
                {slides.map(slide => (
                    <div key={slide} className=' w-full h-full'>

                        <Image
                            src={slide}
                            alt='slide'
                            fill
                        />
                    </div>
                ))
                }

            </div> */}
      {/* <img src="images/main-s/lider/01.png" className="w-full aspect-video rounded-lg" alt="" /> */}

      <Image src={slides[0]} fill alt="slide" />
    </div>
  );
};

export default Slider;
