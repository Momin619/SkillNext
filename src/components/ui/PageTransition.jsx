"use client";
import { motion } from "framer-motion";

export default function PageTransition({ children, onAnimationComplete }) {
  return (
    <motion.div
      className="bg-black min-h-screen w-full" // solid background prevents white flash
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
      onAnimationComplete={onAnimationComplete} // trigger split text after fade-in
    >
      {children}
    </motion.div>
  );
}
