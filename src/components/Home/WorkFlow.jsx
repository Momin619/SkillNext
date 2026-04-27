"use client";
import { memo } from "react";
import { motion } from "framer-motion";
import SpotlightCard from "../react-bits-components/SpotlightCard";
import {
  FaSearch,
  FaBookOpen,
  FaPaperPlane,
  FaHandshake,
} from "react-icons/fa";

const steps = [
  {
    title: "Discover Opportunities",
    desc: "Explore career paths that match your skills and interests.",
    Icon: FaSearch,
    gradient: "from-cyan-400 via-blue-400 to-teal-300",
  },
  {
    title: "Learn & Upskill",
    desc: "Access curated resources to level up your expertise.",
    Icon: FaBookOpen,
    gradient: "from-yellow-400 via-orange-400 to-amber-300",
  },
  {
    title: "Apply Confidently",
    desc: "Showcase your skills and apply to the right roles.",
    Icon: FaPaperPlane,
    gradient: "from-blue-400 via-indigo-400 to-purple-400",
  },
  {
    title: "Network & Grow",
    desc: "Connect with mentors and peers to expand your reach.",
    Icon: FaHandshake,
    gradient: "from-purple-400 via-fuchsia-400 to-pink-400",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      type: "spring",
      stiffness: 160,
      damping: 20,
    },
  }),
};

const WorkFlow = () => {
  return (
    <section className="relative bg-black text-white py-24 px-6 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 relative z-10"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight drop-shadow-lg heading">
          Our Approach
        </h1>
        <p className="text-gray-400 font-inter text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
          Follow these simple steps to start your journey — smooth and
          effortless.
        </p>
      </motion.div>

      {/* Workflow Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-4xl mx-auto">
        {steps.map(({ title, desc, Icon, gradient }, i) => (
          <motion.div
            key={title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.9 }}
            className="w-full flex justify-center" // ensures cards align correctly
          >
            <SpotlightCard
              spotlightColor="rgba(255,255,255,0.05)"
              className="w-full sm:w-72 lg:w-72 h-64 sm:h-72 lg:h-72 flex flex-col items-center justify-center
       bg-black/30 backdrop-blur-md border border-gray-700"
            >
              <motion.div
                className={`p-4 rounded-2xl bg-gradient-to-tr ${gradient} inline-flex items-center justify-center mb-5`}
                whileHover={{
                  rotate: [0, 8, -6, 4, 0],
                  transition: { duration: 0.6, ease: "easeInOut" },
                }}
              >
                <Icon className="w-10 h-10 text-black" />
              </motion.div>
              <h3 className="text-lg md:text-xl font-semibold text-center">
                {title}
              </h3>
              <p className="text-gray-400 text-sm md:text-base mt-2 leading-relaxed text-center">
                {desc}
              </p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default memo(WorkFlow);
