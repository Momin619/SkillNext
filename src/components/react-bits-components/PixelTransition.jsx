"use client";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function PixelTransition({
  firstContent,
  secondContent,
  gridSize = 7,
  pixelColor = "#facc15",
  animationStepDuration = 0.3,
  className = "",
  style = {},
}) {
  const containerRef = useRef(null);
  const pixelGridRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Generate pixel grid
  useEffect(() => {
    const grid = pixelGridRef.current;
    if (!grid) return;
    grid.innerHTML = "";
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pixel = document.createElement("div");
        pixel.classList.add("absolute");
        pixel.style.width = `${100 / gridSize}%`;
        pixel.style.height = `${100 / gridSize}%`;
        pixel.style.left = `${col * (100 / gridSize)}%`;
        pixel.style.top = `${row * (100 / gridSize)}%`;
        pixel.style.backgroundColor = pixelColor;
        pixel.style.opacity = 0;
        grid.appendChild(pixel);
      }
    }
  }, [gridSize, pixelColor]);

  // Animate pixels
  const animatePixels = (showSecond) => {
    const pixels = pixelGridRef.current?.children;
    if (!pixels) return;

    gsap.killTweensOf(pixels);
    gsap.set(pixels, { opacity: 0 });

    gsap.to(pixels, {
      opacity: showSecond ? 1 : 0,
      stagger: 0.03,
      duration: animationStepDuration,
      ease: "power1.inOut",
      onComplete: () => {
        setIsHovered(showSecond);
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-pointer group ${className}`}
      style={style}
      onMouseEnter={() => animatePixels(true)}
      onMouseLeave={() => animatePixels(false)}
    >
      {/* Pixel overlay */}
      <div
        ref={pixelGridRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* Contents */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        {!isHovered && firstContent}
        {isHovered && secondContent}
      </div>
    </div>
  );
}
