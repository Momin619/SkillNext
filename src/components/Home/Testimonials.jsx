"use client";

import React, { useEffect, useState } from "react";
import Carousel from "../react-bits-components/Carousel"; // adjust path
import { FiCircle } from "react-icons/fi";

const testimonials = [
  {
    title: "Alex Rivera",
    subtitle: "Full Stack Developer",
    quote: "Helped me land my dream job!",
    icon: <FiCircle className="h-[16px] w-[16px] text-gray-400" />,
    image: "https://i.pravatar.cc/100?img=32",
  },
  {
    title: "Jordan Chen",
    subtitle: "DevOps Engineer",
    quote: "Amazing resources and support.",
    icon: <FiCircle className="h-[16px] w-[16px] text-gray-400" />,
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    title: "Morgan Blake",
    subtitle: "UI/UX Designer",
    quote: "Upgraded my skills quickly!",
    icon: <FiCircle className="h-[16px] w-[16px] text-gray-400" />,
    image: "https://i.pravatar.cc/100?img=7",
  },
  {
    title: "Casey Park",
    subtitle: "Data Scientist",
    quote: "Step-by-step guidance is great.",
    icon: <FiCircle className="h-[16px] w-[16px] text-gray-400" />,
    image: "https://i.pravatar.cc/100?img=11",
  },
  {
    title: "Sam Kim",
    subtitle: "Mobile Developer",
    quote: "Got multiple freelance projects!",
    icon: <FiCircle className="h-[16px] w-[16px] text-gray-400" />,
    image: "https://i.pravatar.cc/100?img=8",
  },
  {
    title: "Tyler Rodriguez",
    subtitle: "Cloud Architect",
    quote: "Networking boosted my career!",
    icon: <FiCircle className="h-[16px] w-[16px] text-gray-400" />,
    image: "https://i.pravatar.cc/100?img=41",
  },
];

const Testimonials = () => {
  const [baseWidth, setBaseWidth] = useState(600);

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 500) setBaseWidth(280);
      else if (window.innerWidth < 768) setBaseWidth(400);
      else if (window.innerWidth < 1024) setBaseWidth(500);
      else setBaseWidth(600);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <section className="text-white py-24 px-4 sm:px-6 md:px-16 lg:px-24">
      <div className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight drop-shadow-lg heading">
          Testimonials
        </h1>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
          Real user experiences to reinforce trust. Hear from our community.
        </p>
      </div>

      <div className="flex justify-center">
        <Carousel
          items={testimonials}
          baseWidth={baseWidth}
          loop={true}
          autoplay={true}
          autoplayDelay={3500}
          pauseOnHover={true}
          round={false}
        >
          {(item) => (
            <div className="flex flex-col items-center text-center bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl w-[90vw] sm:w-[80vw] md:w-[500px] lg:w-[600px] shadow-xl">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-4 border-2 border-gray-600"
              />
              <div className="mb-2">{item.icon}</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">
                {item.title}
              </h3>
              <p className="text-gray-400 mb-3 text-sm sm:text-base">
                {item.subtitle}
              </p>
              <p className="text-gray-200 text-base sm:text-lg font-semibold italic">
                "{item.quote}"
              </p>
            </div>
          )}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
