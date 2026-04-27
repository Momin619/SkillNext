import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { sectors } from "../../data/mapData";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import NotFoundTemplate from "./NotFoundTemplate";
const Sector = () => {
  const { sectorId } = useParams();
  const sector = sectors.find((s) => s.id === parseInt(sectorId));

  if (!sector)
    return (
      <div className="bg-black min-h-screen flex flex-col">
        <Navbar border />
        <NotFoundTemplate
          title="Sector Not Found"
          message="Sorry, the sector you’re looking for doesn’t exist or has been removed."
        />
        <Footer />
      </div>
    );

  return (
    <>
      <Navbar border />

      {/* Hero Section */}
      <section className="relative bg-black text-white min-h-[70vh] flex flex-col justify-center items-center px-6 md:px-20 text-center overflow-hidden pt-32 md:pt-40">
        {/* Ambient grid + soft glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <motion.h1
          className="relative z-10 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {sector.name}
        </motion.h1>

        <motion.p
          className="relative z-10 text-gray-400 text-base sm:text-lg md:text-xl mt-6 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Discover the groundbreaking fields shaping the world of{" "}
          <span className="text-white font-semibold">{sector.name}</span>.
        </motion.p>
      </section>

      {/* Centered Fields Grid */}
      <section className="relative bg-black py-24 px-4 sm:px-8 md:px-12 overflow-hidden flex justify-center">
        {/* Ambient glow background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_70%)] blur-3xl" />

        <motion.div
          className="relative z-10 w-full max-w-6xl mx-auto flex flex-wrap justify-center gap-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
        >
          {sector.fields?.map((field, i) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <Link
                to={`/field/${field.id}`}
                className="group relative block w-[260px] sm:w-[280px] h-[260px] sm:h-[280px] rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_25px_rgba(59,130,246,0.08)] hover:shadow-[0_0_45px_rgba(59,130,246,0.25)] transition-all duration-700"
              >
                {/* Glow Sweep */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                  }}
                />

                {/* Hover Border Glow */}
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-blue-400/40 transition-all duration-700" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
                  <motion.h3
                    className="text-lg sm:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    {field.name.length > 22
                      ? field.name.slice(0, 22) + "..."
                      : field.name}
                  </motion.h3>
                  <p className="text-gray-400 text-sm sm:text-base">
                    {field.subFields?.length ?? 0} specializations →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default Sector;
