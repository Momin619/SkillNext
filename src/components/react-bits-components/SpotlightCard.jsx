"use client";
import { useState, useRef, memo } from "react";

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(255,255,255,0.1)",
}) => {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!hovered || !spotlightRef.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.transform = `translate(${x - 150}px, ${
      y - 150
    }px)`;
    spotlightRef.current.style.opacity = 1;
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (spotlightRef.current) spotlightRef.current.style.opacity = 0;
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 transition-transform duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] ${className}`}
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute w-[300px] h-[300px] rounded-full opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 60%)`,
          transform: "translate(-150px, -150px)",
        }}
      />
      {children}
    </div>
  );
};

export default memo(SpotlightCard);
