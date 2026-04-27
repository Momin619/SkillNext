import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
const AboutUs = () => {
  const growthData = [
    { year: "2020", users: 850 },
    { year: "2021", users: 1780 },
    { year: "2022", users: 2895 },
    { year: "2023", users: 4120 },
    { year: "2024", users: 6235 },
    { year: "2025", users: 9870 },
  ];

  const sections = [
    {
      title: "Our Vision",
      desc: "To create a thriving community where youth can access guidance, mentorship, and resources to pursue their passions confidently.",
      color: "bg-blue-400",
    },
    {
      title: "Our Mission",
      desc: "To provide young individuals with personalized guidance, skill-building resources, and mentorship to help them achieve their professional and personal goals.",
      color: "bg-purple-400",
    },
    {
      title: "Why SkillNext?",
      desc: "Many youths have ambition but lack guidance. SkillNext bridges that gap providing mentorship, skill development, and actionable guidance.",
      color: "bg-pink-400",
    },
  ];

  return (
    <>
      <Navbar border />

      {/* Hero */}
      <section className="bg-black min-h-[70vh] flex flex-col justify-center items-center text-center px-6 md:px-20">
        <motion.h1
          className="text-5xl md:text-7xl font-bold heading text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About SkillNext
        </motion.h1>
        <motion.p
          className="mt-4 md:mt-6 text-base md:text-xl text-gray-300 max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          SkillNext empowers youth with mentorship, guidance, and skill-building
          resources. We bridge the gap between ambition and achievement.
        </motion.p>
      </section>

      {/* Vision / Mission / Why Us */}
      <section className="bg-black py-12 md:py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-20">
          {sections.map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.84 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              {/* Content */}
              <div className="flex flex-col">
                <div className="flex items-center">
                  {/* Single vertical line aligned with heading */}
                  <div
                    className={`w-1 rounded-full mr-4 ${item.color}`}
                    style={{
                      height: "4em", // scales with heading
                    }}
                  ></div>

                  {/* Heading */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                    {item.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-base sm:text-lg md:text-2xl leading-relaxed mt-4 md:ml-5">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;
