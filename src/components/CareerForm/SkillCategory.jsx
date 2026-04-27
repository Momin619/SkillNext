import React from "react";

const SkillCategory = ({
  title,
  color,
  icon,
  skills,
  category,
  softSkills,
  handleSkillChange,
  removeSkill,
  error, // ✅ New prop for validation error
}) => (
  <div>
    <h5
      className={`text-${color}-400 font-semibold text-sm mb-2 flex items-center gap-1`}
    >
      {icon} {title}
    </h5>

    <select
      onChange={(e) => {
        const val = e.target.value;
        if (val) handleSkillChange(category, val);
      }}
      className={`w-full p-3 bg-gray-800 border rounded-md focus:ring-2 transition-all ${
        error
          ? "border-red-500 focus:ring-red-500"
          : `border-gray-700 focus:ring-${color}-500`
      }`}
    >
      <option value="">Select {title}</option>
      {skills.map((s) => (
        <option key={s}>{s}</option>
      ))}
    </select>

    {/* Selected skills */}
    <div className="flex flex-wrap gap-2 mt-3">
      {softSkills[category].map((skill) => (
        <span
          key={skill}
          className={`px-3 py-1 rounded-full text-sm bg-${color}-900/30 border border-${color}-500 text-${color}-300 flex items-center gap-1`}
        >
          {skill}
          <button
            type="button"
            onClick={() => removeSkill(category, skill)}
            className="text-red-400 hover:text-red-500 font-bold"
          >
            ×
          </button>
        </span>
      ))}
    </div>

    {/* ✅ Show error message if missing */}
    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
  </div>
);

export default SkillCategory;
