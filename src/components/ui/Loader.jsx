"use client";

import React from "react";
import { motion } from "framer-motion";

const Loader = () => {
  const loaderVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1.2,
        ease: "linear",
      },
    },
  };

  const dotVariants = {
    animate: (i) => ({
      y: [0, -15, 0],
      transition: {
        repeat: Infinity,
        repeatDelay: 0.2,
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <motion.div
        className="w-16 h-16 border-4 border-white border-t-indigo-500 rounded-full"
        variants={loaderVariants}
        animate="animate"
      />
      <div className="flex space-x-2 absolute bottom-[-30px]">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 bg-indigo-500 rounded-full"
            custom={i}
            variants={dotVariants}
            animate="animate"
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
