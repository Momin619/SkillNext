import React, { useState } from "react";
import SkillCategory from "./SkillCategory";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Briefcase,
  Settings,
  Sliders,
  Star,
  DollarSign,
  Brain,
  MapPin,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { FaArrowRightLong, FaChartBar } from "react-icons/fa6";

import data from "../../data/data.json";
import Loader from "../ui/Loader";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import "../../styles/index.css";
const CareerForm = () => {
  const [step, setStep] = useState(1);
  const [recommendations, setRecommendations] = useState([]);
  const [softSkillErrors, setSoftSkillErrors] = useState({
    thinking: "",
    working: "",
    social: "",
  });

  const [softSkills, setSoftSkills] = useState({
    thinking: [],
    working: [],
    social: [],
  });
  // ✅ Add or remove skill in hook form + state

  const handleSkillChange = (category, skill) => {
    setSoftSkills((prev) => {
      const alreadySelected = prev[category].includes(skill);
      const updated = alreadySelected
        ? prev[category].filter((s) => s !== skill)
        : [...prev[category], skill];
      const newFormValues = { ...prev, [category]: updated };
      setValue("softSkills", newFormValues);
      setSoftSkillErrors((prev) => ({
        ...prev,
        [category]: "",
      }));

      return newFormValues;
    });
  };
  const removeSkill = (category, skill) => {
    setSoftSkills((prev) => {
      const updated = prev[category].filter((s) => s !== skill);
      const newFormValues = { ...prev, [category]: updated };
      setValue("softSkills", newFormValues);
      setSoftSkillErrors((prev) => ({
        ...prev,
        [category]: "",
      }));

      return newFormValues;
    });
  };
  // Example submit function

  const [loading, setLoading] = useState(false);
  // define states for each category

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const selectedSector = data.sectors.find((s) => s.name === watch("sector"));
  const selectedField = selectedSector?.fields.find(
    (f) => f.name === watch("field")
  );
  const subfields = selectedField?.subFields ?? [];

  // === Utility functions ===
  const parseSalaryRange = (salaryStr) => {
    if (!salaryStr || typeof salaryStr !== "string") return [0, 0];
    const nums = salaryStr.match(/\d{1,3}(?:,\d{3})*/g);
    if (!nums || nums.length < 2) return [0, 0];
    const min = parseInt(nums[0].replace(/,/g, ""));
    const max = parseInt(nums[1].replace(/,/g, ""));
    return [min, max];
  };

  const detectFlexType = (text) => {
    const f = text.toLowerCase();
    if (f.includes("remote") && f.includes("on-site")) return "hybrid";
    if (f.includes("remote")) return "remote";
    return "on-site";
  };

  const generateRecommendations = (values) => {
    if (!selectedField || !subfields.length) return [];

    const minExpected = parseInt(values.salaryMin) || 0;
    const maxExpected = parseInt(values.salaryMax) || 0;
    const workPref = (values.workFlexibility || "").toLowerCase();
    const popularity = selectedField.popularityScore || 70;

    // ✅ Merge all skill categories
    const allUserSkills = [
      ...softSkills.thinking,
      ...softSkills.working,
      ...softSkills.social,
    ].map((s) => s.toLowerCase());

    return subfields
      .map((sf) => {
        const [min, max] = parseSalaryRange(sf.averageSalary.local);
        const avgSalary = (min + max) / 2 || 0;

        // 💰 Salary match score
        let salaryScore = 60;
        if (minExpected && maxExpected && avgSalary > 0) {
          if (avgSalary >= minExpected && avgSalary <= maxExpected) {
            salaryScore = 100;
          } else {
            const diff =
              avgSalary < minExpected
                ? minExpected - avgSalary
                : avgSalary - maxExpected;
            salaryScore = Math.max(40, 100 - diff / 200);
          }
        }

        // 🧍 Work flexibility match
        const flexType = detectFlexType(sf.workFlexibility);
        let flexScore = 60;
        if (workPref.includes(flexType)) flexScore = 100;

        // 🧠 Soft skill matching (improved)
        const allSfSkills = Object.values(sf.softSkills || {}).flat();
        const sfSkills = allSfSkills.map((s) => s.toLowerCase());

        const overlap = allUserSkills.filter((s) =>
          sfSkills.includes(s)
        ).length;

        const skillScore = sfSkills.length
          ? Math.min((overlap / sfSkills.length) * 100, 100)
          : 60;

        // 🧾 Final weighted score
        const totalScore = Math.round(
          salaryScore * 0.4 +
            flexScore * 0.3 +
            skillScore * 0.2 +
            popularity * 0.1
        );

        return {
          ...sf,
          totalScore,
          avgSalary,
          salaryScore,
          flexScore,
          skillScore,
          flexType,
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 3);
  };

  const nextStep = async () => {
    let fieldsToValidate = [];

    if (step === 1) fieldsToValidate = ["name", "email"];
    if (step === 2) fieldsToValidate = ["sector"];
    if (step === 3) fieldsToValidate = ["field"];
    if (step === 4)
      fieldsToValidate = ["salaryMin", "salaryMax", "workFlexibility"];

    // 🔹 Validate form inputs for current step
    const valid = await trigger(fieldsToValidate);

    // 🔹 Custom validation for Step 4 soft skills
    if (step === 4) {
      const newErrors = {
        thinking:
          softSkills.thinking.length === 0
            ? "Please select at least one thinking skill"
            : "",
        working:
          softSkills.working.length === 0
            ? "Please select at least one working skill"
            : "",
        social:
          softSkills.social.length === 0
            ? "Please select at least one social skill"
            : "",
      };

      setSoftSkillErrors(newErrors);

      // ❌ Stop if any skill error exists
      if (Object.values(newErrors).some((e) => e)) return;
    }

    // ✅ Proceed only if all fields valid
    if (valid) setStep((p) => p + 1);
  };

  const backStep = () => setStep((p) => p - 1);

  const onSubmit = async (values) => {
    // 🔹 Soft skill validation again for safety (in case user skipped steps)
    const newErrors = {
      thinking:
        softSkills.thinking.length === 0
          ? "Please select at least one thinking skill"
          : "",
      working:
        softSkills.working.length === 0
          ? "Please select at least one working skill"
          : "",
      social:
        softSkills.social.length === 0
          ? "Please select at least one social skill"
          : "",
    };

    setSoftSkillErrors(newErrors);

    // ❌ Stop if any soft skill missing
    if (Object.values(newErrors).some((e) => e)) return;

    // ✅ Everything valid, generate recommendations
    setLoading(true);
    setRecommendations([]);
    setStep(5);

    await new Promise((r) => setTimeout(r, 5000));
    setRecommendations(generateRecommendations(values));
    setLoading(false);
  };

  const progress = (step / 5) * 100;

  // === UI ===
  return (
    <>
      <Navbar border={true} />
      <div className="min-h-screen bg-black text-white flex justify-center items-center px-4 sm:px-6 md:px-10 py-10 pt-28">
        <div className="w-full max-w-4xl bg-gradient-to-br from-gray-900 via-black to-gray-950 rounded-2xl md:rounded-3xl shadow-2xl p-5 sm:p-8 md:p-10 border border-gray-800">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 drop-shadow-md">
            Career Discovery Wizard
          </h2>

          {/* Progress bar */}
          <div className="w-full bg-gray-800 h-2 rounded-full mb-10 overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {/* === Step 1 === */}
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                >
                  <h3 className="flex items-center text-lg sm:text-xl font-semibold mb-6">
                    <User className="mr-2 text-blue-400" /> Step 1: Personal
                    Info
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Name */}
                    <div>
                      <label className="text-sm text-gray-300 flex items-center gap-1">
                        <User size={14} /> Name
                      </label>
                      <input
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            message: "Name should be 4 Letters long",
                            value: 4,
                          },
                        })}
                        className={`w-full p-3 mt-1 bg-gray-800 border rounded-md ${
                          errors.name ? "border-red-500" : "border-gray-700"
                        } focus:ring-2 focus:ring-blue-500`}
                        autoFocus={true}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-sm text-gray-300 flex items-center gap-1">
                        <Mail size={14} /> Email
                      </label>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email format",
                          },
                        })}
                        className={`w-full p-3 mt-1 bg-gray-800 border rounded-md ${
                          errors.email ? "border-red-500" : "border-gray-700"
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-[0_0_15px_#6366f1] transition"
                    >
                      Next <ArrowRight className="inline ml-2 w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* === Step 2 === */}
              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="flex items-center text-lg sm:text-xl font-semibold mb-6">
                    <Briefcase className="mr-2 text-blue-400" /> Step 2: Choose
                    Sector
                  </h3>

                  <select
                    {...register("sector", { required: "Sector is required" })}
                    onChange={(e) => setValue("sector", e.target.value)}
                    className={`w-full p-3 bg-gray-800 border rounded-md ${
                      errors.sector ? "border-red-500" : "border-gray-700"
                    } focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Select Sector</option>
                    {data.sectors.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  {errors.sector && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.sector.message}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                    <button
                      type="button"
                      onClick={backStep}
                      className="px-6 py-2 rounded-md bg-gray-800 hover:bg-gray-700"
                    >
                      <ArrowLeft className="inline mr-2 w-4 h-4" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-[0_0_15px_#6366f1]"
                    >
                      Next <ArrowRight className="inline ml-2 w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* === Step 3 === */}
              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="flex items-center text-lg sm:text-xl font-semibold mb-6">
                    <Settings className="mr-2 text-blue-400" /> Step 3: Choose
                    Field
                  </h3>

                  <select
                    {...register("field", { required: "Field is required" })}
                    onChange={(e) => setValue("field", e.target.value)}
                    className={`w-full p-3 bg-gray-800 border rounded-md ${
                      errors.field ? "border-red-500" : "border-gray-700"
                    } focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Select Field</option>
                    {selectedSector?.fields.map((f) => (
                      <option key={f.id} value={f.name}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                  {errors.field && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.field.message}
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                    <button
                      type="button"
                      onClick={backStep}
                      className="px-6 py-2 rounded-md bg-gray-800 hover:bg-gray-700"
                    >
                      <ArrowLeft className="inline mr-2 w-4 h-4" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-[0_0_15px_#6366f1]"
                    >
                      Next <ArrowRight className="inline ml-2 w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
              {step === 4 && (
                <motion.div
                  key="s4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h3 className="flex items-center text-lg sm:text-xl md:text-2xl font-semibold mb-6 text-blue-400">
                    <Sliders className="mr-2" /> Step 4: Preferences
                  </h3>

                  {/* === Salary Inputs === */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                    <div>
                      <label className="text-sm text-gray-300">
                        Min Expected Salary (USD)
                      </label>
                      <input
                        type="number"
                        step={1000}
                        autoFocus
                        {...register("salaryMin", {
                          required: "Minimum salary is required",
                          min: {
                            value: 1000,
                            message: "Salary must be at least 1000",
                          },
                        })}
                        className={`w-full p-3 mt-1 bg-gray-800 border rounded-md ${
                          errors.salaryMin
                            ? "border-red-500"
                            : "border-gray-700"
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.salaryMin && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.salaryMin.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm text-gray-300">
                        Max Expected Salary (USD)
                      </label>
                      <input
                        type="number"
                        step={1000}
                        {...register("salaryMax", {
                          required: "Maximum salary is required",
                          validate: (value) => {
                            const min = watch("salaryMin");
                            if (value && +value < +min)
                              return "Max salary should be greater than minimum salary";
                            return true;
                          },
                        })}
                        className={`w-full p-3 mt-1 bg-gray-800 border rounded-md ${
                          errors.salaryMax
                            ? "border-red-500"
                            : "border-gray-700"
                        } focus:ring-2 focus:ring-blue-500`}
                      />
                      {errors.salaryMax && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.salaryMax.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* === Work Style === */}
                  <div className="mb-8">
                    <label className="text-sm text-gray-300">
                      Preferred Work Style
                    </label>
                    <select
                      {...register("workFlexibility", {
                        required: "Please select a preferred work style",
                      })}
                      className={`w-full p-3 mt-1 bg-gray-800 border rounded-md ${
                        errors.workFlexibility
                          ? "border-red-500"
                          : "border-gray-700"
                      } focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Select</option>
                      <option>Remote</option>
                      <option>On-site</option>
                      <option>Hybrid</option>
                    </select>
                    {errors.workFlexibility && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.workFlexibility.message}
                      </p>
                    )}
                  </div>

                  {/* === Soft Skills === */}
                  <h4 className="text-lg sm:text-xl font-semibold mb-4 text-purple-400 flex items-center gap-2">
                    <Brain size={18} /> Soft Skills Selection
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Thinking Skills */}
                    <SkillCategory
                      title="Thinking Skills"
                      color="cyan"
                      icon={<Brain size={14} />}
                      skills={[
                        "Curious",
                        "Focused",
                        "Logical",
                        "Creative",
                        "Analytical",
                        "Observant",
                        "Open-minded",
                        "Critical",
                        "Strategic",
                        "Practical",
                      ]}
                      category="thinking"
                      softSkills={softSkills}
                      handleSkillChange={handleSkillChange}
                      removeSkill={removeSkill}
                      error={softSkillErrors.thinking}
                    />

                    {/* Working Skills */}
                    <SkillCategory
                      title="Working Skills"
                      color="purple"
                      icon={<Settings size={14} />}
                      skills={[
                        "Organized",
                        "Reliable",
                        "Responsible",
                        "Punctual",
                        "Efficient",
                        "Adaptable",
                        "Hardworking",
                        "Patient",
                        "Teamworker",
                        "Flexible",
                      ]}
                      category="working"
                      softSkills={softSkills}
                      handleSkillChange={handleSkillChange}
                      removeSkill={removeSkill}
                      error={softSkillErrors.working}
                    />

                    {/* Social Skills */}
                    <SkillCategory
                      title="Social Skills"
                      color="yellow"
                      icon={<Star size={14} />}
                      skills={[
                        "Kind",
                        "Respectful",
                        "Honest",
                        "Friendly",
                        "Polite",
                        "Helpful",
                        "Fair",
                        "Patient",
                        "Cooperative",
                        "Supportive",
                      ]}
                      category="social"
                      softSkills={softSkills}
                      handleSkillChange={handleSkillChange}
                      removeSkill={removeSkill}
                      error={softSkillErrors.social}
                    />
                  </div>

                  {/* === Navigation Buttons === */}
                  <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
                    <button
                      type="button"
                      onClick={backStep}
                      className="px-6 py-2 rounded-md bg-gray-800 hover:bg-gray-700"
                    >
                      <ArrowLeft className="inline mr-2 w-4 h-4" /> Back
                    </button>
                    <motion.button
                      type="submit"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(59,130,246,0.5)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="relative flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                   font-medium text-white bg-[#0f172a] hover:bg-[#1e293b]
                   border border-[#334155] transition-all duration-300
                   shadow-[inset_0_0_10px_rgba(59,130,246,0.4)]"
                    >
                      <span>Get Recommendations</span>
                      <FaArrowRightLong className="text-blue-400 text-lg sm:text-xl" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* === Step 5 (Results) === */}
              {step === 5 && (
                <motion.div
                  key="s5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-blue-400">
                        🌟 Your Career Recommendations
                      </h3>
                      {recommendations.length ? (
                        (console.log(recommendations),
                        (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {recommendations.map((r, i) => (
                              <div
                                key={r.id}
                                className={`p-5 border rounded-xl transition hover:scale-[1.02] duration-300 ${
                                  i === 0
                                    ? "border-blue-500 bg-gradient-to-br from-blue-950 to-gray-900"
                                    : "border-gray-700 bg-gray-900"
                                }`}
                              >
                                {i === 0 && (
                                  <span className="text-xs text-yellow-400 bg-yellow-900 px-2 py-1 rounded-full mb-2 inline-block">
                                    <Star className="inline w-3 h-3 mr-1" />{" "}
                                    Best Match
                                  </span>
                                )}

                                <h4 className="text-blue-300 font-semibold text-lg">
                                  {r.name}
                                </h4>
                                <p className="text-gray-400 text-sm mt-1">
                                  {r.description}
                                </p>

                                <div className="text-sm mt-3 space-y-1 text-gray-300">
                                  <p>
                                    <DollarSign className="inline text-green-500 w-4 h-4 mr-1" />{" "}
                                    Avg Salary: ${r.avgSalary.toLocaleString()}
                                  </p>
                                  <p>
                                    <Brain className="inline w-4 h-4 mr-1" />{" "}
                                    Soft Skill Match: {r.skillScore.toFixed(0)}%
                                  </p>
                                  <p>
                                    <MapPin className="inline text-red-500 w-4 h-4 mr-1" />{" "}
                                    Work Flexibility: {r.workFlexibility}
                                  </p>
                                  <p className="flex items-center  gap-2 text-sm">
                                    <FaChartBar className="text-blue-400 w-4 h-4" />
                                    Total Score: {r.totalScore}%
                                  </p>
                                  <p className="mt-3 text-">
                                    <Link
                                      to={`/subfield/${r.id}`}
                                      className={`inline-block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 
                                     ${
                                       i === 0
                                         ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/30"
                                         : "bg-gray-800 hover:bg-gray-700 text-blue-300 hover:text-blue-200 shadow-md hover:shadow-blue-400/20"
                                     }`}
                                    >
                                      Explore field
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 text-center">
                          No suitable subfields found. Try adjusting
                          preferences.
                        </p>
                      )}
                      <div className="flex justify-center mt-8">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-6 py-2 rounded-md bg-gray-800 hover:bg-gray-700 flex items-center gap-2"
                        >
                          <RotateCcw className="w-4 h-4" /> Restart
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CareerForm;
