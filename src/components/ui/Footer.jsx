import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-0">
        {/* Brand / Logo */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            SkillNext
          </h2>
          <p className="text-gray-400 max-w-sm">
            Empowering youth with mentorship, guidance, and skill-building
            resources to shape their future.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-blue-500 transition text-lg">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-400 transition text-lg">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-500 transition text-lg">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-600 transition text-lg">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <a href="/" className="hover:text-white transition">
            Home
          </a>
          <a href="/about" className="hover:text-white transition">
            About Us
          </a>
          <a href="/sector-list" className="hover:text-white transition">
            Fields
          </a>
          <a href="/career-form" className="hover:text-white transition">
            Career Form
          </a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-white">Contact</h3>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <FaEnvelope className="mt-1 text-blue-400" />
              <a
                href="mailto:info@skillnext.com"
                className="hover:text-white transition"
              >
                info@skillnext.com
              </a>
            </div>
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="mt-1 text-green-400" />
              <a
                href="tel:+923218430064"
                className="hover:text-white transition"
              >
                +92 321 843 0064
              </a>
            </div>
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-red-400" />
              <span>123 Main Street, Rawalpindi, Pakistan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} SkillNext. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
