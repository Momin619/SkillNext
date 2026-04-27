"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // or 'next/link' if using Next.js
import Navbar from "./Navbar";
import Footer from "./Footer";
const NotFound = () => {
  return (
    <>
      <Navbar border />
      <section className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6">
        <motion.h1
          className="text-[10rem] md:text-[12rem] heading font-extrabold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl mt-4 font-inter text-gray-200 text-center max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Oops! The page you are looking for cannot be found. It might have been
          moved or deleted.
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            to="/"
            className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
          >
            Go Back Home
          </Link>
        </motion.div>

        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {/* Floating circles for subtle effect */}
        </motion.div>
      </section>
      <Footer />
    </>
  );
};

export default NotFound;
