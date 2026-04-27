"use client";
import { memo } from "react";
import { motion } from "framer-motion";
import SpotlightCard from "../react-bits-components/SpotlightCard";
import {
  FaCompass,
  FaLightbulb,
  FaUserGraduate,
  FaNetworkWired,
  FaHandshake,
  FaRocket,
} from "react-icons/fa";

const features = [
  {
    title: "Career Discovery",
    desc: "Explore paths aligned with your passion and skills.",
    Icon: FaCompass,
    gradient: "from-cyan-400 via-blue-400 to-teal-300",
  },
  {
    title: "Skill Assessment",
    desc: "Identify strengths and improve with tailored insights.",
    Icon: FaLightbulb,
    gradient: "from-yellow-400 via-orange-400 to-amber-300",
  },
  {
    title: "Learning Resources",
    desc: "Access curated tutorials and professional courses.",
    Icon: FaUserGraduate,
    gradient: "from-blue-400 via-indigo-400 to-purple-400",
  },
  {
    title: "Networking Opportunities",
    desc: "Connect with mentors and expand your network.",
    Icon: FaNetworkWired,
    gradient: "from-purple-400 via-fuchsia-400 to-pink-400",
  },
  {
    title: "Internships & Jobs",
    desc: "Find opportunities that match your goals.",
    Icon: FaHandshake,
    gradient: "from-green-400 via-emerald-400 to-lime-300",
  },
  {
    title: "Career Growth Insights",
    desc: "Receive personalized guidance for your career.",
    Icon: FaRocket,
    gradient: "from-pink-400 via-rose-400 to-red-400",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05, // small stagger, looks smooth
      type: "spring",
      stiffness: 160, // slightly firmer for smooth pop
      damping: 20, // higher damping for less overshoot
    },
  }),
};

const Features = () => {
  return (
    <section className="relative bg-black text-white py-24 px-6 overflow-hidden">
      {/* Background lights */}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 relative z-10"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight drop-shadow-lg heading">
          Explore SkillNext Features
        </h1>
        <p className="text-gray-400 font-inter text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
          Tools designed to help you discover, learn, and grow — seamlessly.
        </p>
      </motion.div>

      {/* Feature Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 justify-items-center max-w-7xl mx-auto">
        {features.map(({ title, desc, Icon, gradient }, i) => (
          <motion.div
            key={title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.9 }}
          >
            <SpotlightCard
              spotlightColor="rgba(255,255,255,0.05)"
              className="w-64 sm:w-72 lg:w-80 h-64 sm:h-72 lg:h-80 flex flex-col items-center justify-center
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

export default memo(Features);
