"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MdEngineering } from "react-icons/md";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import NotFoundTemplate from "./NotFoundTemplate";
import { MdTrendingUp, MdWorkspacePremium } from "react-icons/md";
import Loader from "../ui/Loader";
import { GiPathDistance } from "react-icons/gi";
import {
  FaHandsHelping,
  FaExclamationCircle,
  FaBriefcase,
  FaMoneyBillWave,
  FaTools,
  FaUsers,
  FaGlobeAmericas,
} from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
const icons = {
  "Average Salary": <FaMoneyBillWave className="text-4xl text-emerald-400" />,
  "Future Outlook": <MdTrendingUp className="text-4xl text-green-400" />,
  "Job Market": <FaGlobeAmericas className="text-4xl text-orange-400" />,
  Skills: <FaTools className="text-4xl text-cyan-400" />,
  "Soft Skills": <FaHandsHelping className="text-4xl text-pink-400" />,
  Challenges: <FaExclamationCircle className="text-4xl text-red-400" />,
  "Career Path": <GiPathDistance className="text-4xl text-purple-400" />,
  Certifications: <MdWorkspacePremium className="text-4xl text-yellow-400" />,
  "Work Flexibility": <FaBriefcase className="text-4xl text-indigo-400" />,
};

export default function SubFieldDetail() {
  const { subfieldId } = useParams();
  const [subfield, setSubfield] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    import("../../data/mapData")
      .then((mod) => {
        const data = mod.subfieldMap[subfieldId];
        if (data) setSubfield(data);
        else setError("Subfield not found");
      })
      .catch(() => setError("Error loading data"));
  }, [subfieldId]);

  if (error)
    return (
      <div className="bg-black min-h-screen flex flex-col">
        <Navbar border />
        <NotFoundTemplate
          title="Sub Field Not Found"
          message="The sub-field you’re looking for couldn’t be found or has been removed."
        />
        <Footer />
      </div>
    );
  if (!subfield) return <Loader />;
  const infoSections = [
    { title: "Average Salary", content: subfield.averageSalary },
    { title: "Future Outlook", content: subfield.futureOutlook },
    { title: "Job Market", content: subfield.jobMarket },
    { title: "Skills", content: subfield.skills },
    { title: "Soft Skills", content: subfield.softSkills },
    { title: "Challenges", content: subfield.challenges },
    { title: "Career Path", content: subfield.careerPath },
    { title: "Certifications", content: subfield.certifications },
    { title: "Work Flexibility", content: subfield.workFlexibility },
  ];
  const renderSoftSkills = (softSkills) => {
    if (!softSkills) return null;

    // Map category names to icons
    const iconMap = {
      thinkingSkills: <GiBrain className="text-5xl text-cyan-400" />, // analytical & problem-solving
      workingSkills: <MdEngineering className="text-5xl text-purple-400" />, // technical & practical
      socialSkills: <FaUsers className="text-5xl text-pink-400" />, // teamwork & communication
    };

    return (
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {Object.entries(softSkills).map(([category, skills], idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              boxShadow: "0 0 25px rgba(0,255,255,0.25)",
            }}
            className="relative flex flex-col items-center text-center bg-[#11121b]/70 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:border-cyan-400/30 transition-all duration-500 overflow-hidden"
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl" />

            {/* Icon */}
            <div className="mb-4">
              {iconMap[category] || (
                <FaBrain className="text-5xl text-cyan-400" />
              )}
            </div>

            {/* Category Title */}
            <h3 className="text-lg sm:text-xl font-semibold mb-5 text-white capitalize tracking-wide">
              {category.replace(/([A-Z])/g, " $1").trim()}
            </h3>

            {/* Skill tags */}
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="px-4 py-1.5 text-sm rounded-full bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/10 transition-all duration-200"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Glow line bottom */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent rounded-full"></div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Navbar border={true} />

      {/* HERO SECTION */}
      <section className="relative min-h-[48vh] sm:min-h-[55vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 lg:px-20 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden pt-20 sm:pt-24 pb-8 sm:pb-10">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight z-10 leading-tight"
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {subfield.name}
        </motion.h1>

        <motion.p
          className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed z-10 px-2 sm:px-0"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {subfield.description}
        </motion.p>
      </section>

      {/* INFO SECTIONS */}
      <section className="relative bg-black text-white py-10 sm:py-14 md:py-18 px-4 sm:px-6 md:px-12 lg:px-20 -mt-6 sm:-mt-8">
        <div className="max-w-6xl mx-auto flex flex-col gap-10 sm:gap-14 md:gap-16">
          {infoSections.map((sec, i) => {
            if (!sec.content) return null;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.6 }}
                className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-7 md:p-9 lg:p-10 shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:shadow-[0_0_50px_rgba(139,92,246,0.25)] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  {/* Icon */}
                  <div className="p-4 sm:p-5 bg-white/10 rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex-shrink-0 self-center sm:self-start">
                    {icons[sec.title] || (
                      <FaBrain className="text-4xl sm:text-5xl text-blue-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center sm:text-left">
                    {/* Heading */}
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      {sec.title}
                    </h2>

                    {/* Points / Content */}
                    <div className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed space-y-1 sm:space-y-2 text-left">
                      {sec.title === "Soft Skills" ? (
                        renderSoftSkills(sec.content)
                      ) : typeof sec.content === "object" &&
                        !Array.isArray(sec.content) ? (
                        <ul className="space-y-1">
                          {Object.entries(sec.content).map(([k, v]) => (
                            <li key={k}>
                              <span className="text-blue-400 capitalize">
                                {k}:
                              </span>{" "}
                              {v}
                            </li>
                          ))}
                        </ul>
                      ) : Array.isArray(sec.content) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {sec.content.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{sec.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
}
