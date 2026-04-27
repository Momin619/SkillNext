import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = ({ border }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const location = useLocation();
  const navRef = useRef(null);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Discover Fields", path: "/sector-list" },
    { name: "Career Form", path: "/career-form" },
  ];

  useEffect(() => {
    const activeLink = navRef.current?.querySelector("a.active-link");
    if (activeLink) {
      const { offsetLeft, offsetWidth } = activeLink;
      setIndicatorStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
        opacity: 1,
      });
    } else {
      setIndicatorStyle({ opacity: 0 });
    }
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md text-white shadow-md z-50 ${
        border ? "border-b-2 border-t-0" : "border-none"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16 relative">
        {/* Logo */}
        <NavLink to={"/"}>
          <h1 className="text-2xl font-bold text-teal-400 tracking-wide">
            SkillNext
          </h1>
        </NavLink>

        {/* Desktop Navigation */}
        <nav
          ref={navRef}
          className="hidden md:flex gap-8 relative items-center"
        >
          {/* Animated Active Background */}
          <span
            className="absolute bottom-0 h-9 bg-teal-500/25 rounded-lg shadow-[0_0_12px_#14b8a6] transition-all duration-500 ease-in-out"
            style={indicatorStyle}
          ></span>

          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 z-10 ${
                  isActive
                    ? "bg-white text-black font-semibold" // ✅ Active link: white bg, black text
                    : "text-gray-300 hover:text-white hover:bg-gray-700/30" // Inactive link hover
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-300 cursor-pointer hover:text-teal-400 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-black/90 backdrop-blur-md transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-70 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-4 py-5">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `w-[90%] text-center py-3 rounded-md text-base font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white text-black font-semibold" // Active: white bg, black text
                    : "text-gray-300 hover:text-white hover:bg-gray-700/30"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
