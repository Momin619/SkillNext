"use client";
import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import SplitText from "../react-bits-components/SplitText";

export default function Hero() {
  const [startSplitText, setStartSplitText] = useState(false);
  const navigate = useNavigate();

  const handleGetStartedBtn = () => navigate("/sector-list");
  const handleLearnMoreBtn = () => navigate("/about");

  // Start animation immediately on first paint
  useLayoutEffect(() => {
    setStartSplitText(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8 pt-24 bg-black">
      {/* Background image is already loaded in HTML to avoid flash */}
      <img
        src="/images/hero-desktop.png"
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
      />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl heading md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight drop-shadow-lg">
          {startSplitText ? (
            <SplitText
              text="Shape Your Future with Confidence"
              className="font-semibold text-center"
              delay={50} // smaller delay
              duration={0.6} // slightly faster
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0}
              rootMargin="0px"
              textAlign="center"
            />
          ) : (
            <span className="invisible">Shape Your Future with Confidence</span>
          )}
        </h1>

        <p className="mt-4 font-inter text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
          Discover personalized career insights, mentorship, and tools to help
          you grow with purpose.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGetStartedBtn}
            className="font-button cursor-pointer w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-cyan-400 text-cyan-400 text-base sm:text-lg transition-all duration-300 hover:bg-cyan-400 hover:text-white hover:shadow-[0_0_15px_#22d3ee]"
          >
            Get Started
          </button>
          <button
            onClick={handleLearnMoreBtn}
            className="font-button cursor-pointer w-full sm:w-auto px-6 py-3 rounded-xl text-white text-base sm:text-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-300 hover:shadow-[0_0_20px_#3b82f6] hover:scale-105"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
