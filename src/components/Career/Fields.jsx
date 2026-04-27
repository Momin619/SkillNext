import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fieldMap } from "../../data/mapData";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import NotFoundTemplate from "./NotFoundTemplate";
const Fields = () => {
  const { fieldId } = useParams();
  const field = fieldMap[fieldId];

  if (!field)
    return (
      <div className="bg-black min-h-screen flex flex-col">
        <Navbar border />
        <NotFoundTemplate
          title="Field Not Found"
          message="The field you’re trying to view isn’t available or may have been deleted."
        />
        <Footer />
      </div>
    );

  return (
    <>
      <Navbar border={true} />

      {/* Hero Section */}
      <section className="relative bg-black text-white min-h-[50vh] flex flex-col justify-center items-center text-center px-6 md:px-20 pt-28 md:pt-32 overflow-hidden">
        {/* Subtle glow + grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

        <motion.h1
          className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {field.name}
        </motion.h1>

        <motion.p
          className="relative z-10 text-gray-400 text-base sm:text-lg md:text-xl mt-4 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Discover the subfields shaping{" "}
          <span className="text-white font-semibold">{field.name}</span> — each
          offering unique career paths and expertise.
        </motion.p>
      </section>

      {/* Subfields Section */}
      {/* Subfields Section */}
      <section className="relative bg-black py-16 md:py-20 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06)_0%,transparent_70%)] blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2
            className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-10 md:mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Explore Subfields
          </motion.h2>

          {/* Responsive Grid */}
          {/* Responsive Grid */}
          <div
            className="
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    lg:grid-cols-3 
    2xl:grid-cols-4 
    gap-8 sm:gap-10 lg:gap-12 
    justify-center 
    items-stretch 
    max-w-[90rem] 
    mx-auto 
  "
          >
            {field.subFields?.map((sub, i) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.04 }}
                className="flex justify-center"
              >
                <Link
                  to={`/subfield/${sub.id}`}
                  className="
          group relative 
          w-64 h-64 sm:w-72 sm:h-72 
          rounded-2xl overflow-hidden 
          border border-white/10 
          backdrop-blur-xl bg-white/5 
          hover:bg-white/10 
          transition-all duration-500 
          flex flex-col items-center justify-center text-center 
          shadow-[0_0_25px_rgba(59,130,246,0.1)] 
          hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]
        "
                >
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.1),transparent_60%)]"
                    animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="relative z-10 px-4">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300 whitespace-normal">
                      {sub.name}
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base">
                      Tap to explore →
                    </p>
                  </div>

                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-blue-500/40 transition-all duration-500"></div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Fields;
