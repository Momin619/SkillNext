import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFoundTemplate = ({
  title,
  message,
  linkText = "Back to Sector List",
  linkTo = "/sector-list",
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center bg-zinc-900/70 backdrop-blur-md border border-gray-800 p-8 rounded-2xl shadow-[0_0_25px_rgba(255,255,255,0.05)] max-w-md w-full"
      >
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-wide"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed"
        >
          {message}
        </motion.p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to={linkTo}
            className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
          >
            {linkText}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundTemplate;
