import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGear, FaGraduationCap, FaMicrophone, FaLeaf } from "react-icons/fa6";
import { RiComputerFill } from "react-icons/ri";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoMdFootball, IoMdPlanet } from "react-icons/io";
import { MdOutlineMonitorHeart } from "react-icons/md";
import { BsBrushFill } from "react-icons/bs";
import { GiInjustice } from "react-icons/gi";
import { FaPlaneUp } from "react-icons/fa6";
import Navbar from "../ui/Navbar";
import sectorList from "../../data/sectorList.json";
import Footer from "../ui/Footer";
const sectorIcons = {
  "Engineering & Technology": <FaGear />,
  "Computer Science & IT": <RiComputerFill />,
  "Education & Research": <FaGraduationCap />,
  "Media & Communication": <FaMicrophone />,
  Sports: <IoMdFootball />,
  Agriculture: <FaLeaf />,
  "Health & Medicine": <MdOutlineMonitorHeart />,
  "Environmental & Earth Sciences": <FaGlobeAmericas />,
  "Space & Aeronautics": <IoMdPlanet />,
  "Aviation & Aeronautical Operations": <FaPlaneUp />,
  "Arts, Design & Creative Industries": <BsBrushFill />,
  "Law, Governance & Security": <GiInjustice />,
};

export default function SectorListPage() {
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-950 to-black text-white">
        <Navbar border={true} />

        <section className="flex flex-col items-center justify-center px-4 sm:px-8 py-32 md:py-36 w-full min-h-screen">
          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 leading-tight tracking-tight drop-shadow-[0_0_25px_rgba(255,255,255,0.1)]">
            Explore Career Sectors
          </h1>

          {/* Grid */}
          <div className="grid gap-6 sm:gap-8 md:gap-10 w-full max-w-7xl grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
            {sectorList.map((sector) => (
              <Link
                key={sector.id}
                to={`/sector/${sector.id}`}
                className="relative group cursor-pointer rounded-3xl p-[1px] bg-gradient-to-br from-yellow-500/30 via-gray-800/30 to-transparent hover:from-yellow-500/60 transition-all duration-300 w-full max-w-[95%] sm:max-w-[380px] md:max-w-[400px] lg:max-w-[420px]"
              >
                <div className="rounded-3xl bg-gray-900/80 backdrop-blur-xl p-6 flex flex-col justify-between h-full border border-gray-800 hover:border-yellow-500/40 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,0,0.05)]">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      transition={{ type: "spring", stiffness: 250 }}
                      className="relative flex-shrink-0"
                    >
                      <div className="absolute inset-0 rounded-full blur-xl bg-yellow-400/10"></div>
                      <div className="relative text-4xl text-yellow-400 drop-shadow-[0_0_15px_rgba(255,255,0,0.25)]">
                        {sectorIcons[sector.sector] || <FaGear />}
                      </div>
                    </motion.div>
                    <h2
                      className="text-lg sm:text-xl font-semibold text-gray-100 truncate w-full"
                      title={sector.sector}
                    >
                      {sector.sector}
                    </h2>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 text-xs uppercase tracking-wider text-gray-500 group-hover:text-yellow-300 transition-all duration-300">
                    Click to explore fields
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
