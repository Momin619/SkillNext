import React, { lazy, Suspense } from "react";

const LogoLoop = lazy(() => import("../react-bits-components/LogoLoop"));
const CountUp = lazy(() => import("../react-bits-components/CountUp"));

const trustedLogos = [
  {
    src: "/company-logos/google.png",
    alt: "Google",
    href: "https://google.com",
  },
  {
    src: "/company-logos/microsoft.webp",
    alt: "Microsoft",
    href: "https://microsoft.com",
  },
  {
    src: "/company-logos/linkedin.png",
    alt: "LinkedIn",
    href: "https://linkedin.com",
  },
  {
    src: "/company-logos/fiverr.webp",
    alt: "Fiverr",
    href: "https://fiverr.com",
  },
  {
    src: "/company-logos/forbes.png",
    alt: "Forbes",
    href: "https://forbes.com",
  },
  { src: "/company-logos/apple.webp", alt: "Apple", href: "https://apple.com" },
  { src: "/company-logos/udemy.png", alt: "Udemy", href: "https://udemy.com" },
  {
    src: "/company-logos/upwork.png",
    alt: "Upwork",
    href: "https://www.upwork.com",
  },
];

const statsData = [
  { label: "Users Worldwide", value: 50000 },
  { label: "Courses Completed Daily", value: 120 },
  { label: "Career Clarity Improved", value: 90, suffix: "%" },
];

export default function TrustedSection() {
  return (
    <section className="bg-black text-white py-16 px-4 md:px-12">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-center mb-12">
        Trusted by People All Over the Globe
      </h2>

      {/* Logos Carousel */}
      <Suspense fallback={null}>
        <div className="mb-16">
          <LogoLoop
            logos={trustedLogos}
            speed={100}
            logoHeight={40}
            gap={48}
            pauseOnHover={true}
            scaleOnHover={true}
            fadeOut={true}
            fadeOutColor="#000000"
          />
        </div>
      </Suspense>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
        {statsData.map((stat, index) => (
          <div key={index}>
            <span className="text-4xl md:text-5xl font-extrabold text-white block">
              <Suspense fallback={<span>...</span>}>
                <CountUp from={0} to={stat.value} duration={2} separator="," />
              </Suspense>
              {stat.suffix || ""}
            </span>
            <p className="mt-2 text-lg md:text-xl text-gray-300">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
