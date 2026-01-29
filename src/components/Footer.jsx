"use client";
import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
  Mail,
  Phone,
  MapPin,
  Award,
  Shield,
  Clock,
  ArrowRight,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-300">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto x pt-15 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-6">
            {/* Brand Column - Takes 2 columns on large screens */}
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="inline-block group">
                <img
                  src="/logo2.png"
                  className="h-14 w-auto mb-6 transition-transform duration-300 group-hover:scale-105"
                  alt="Care.xyz Logo"
                />
              </Link>
              <p className="text-gray-400 leading-relaxed text-base max-w-md">
                Connecting families with trusted caregivers since 2024. Safety,
                reliability, and love are at the heart of everything we do.
              </p>

              {/* Newsletter Signup */}
              <div className="pt-4">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-rose-500" />
                  Stay Updated
                </h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-white placeholder-gray-500 backdrop-blur-sm"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg font-medium hover:from-rose-600 hover:to-rose-700 transition-all duration-300 shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 flex items-center gap-2 group">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-4">
                <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                <div className="flex gap-3">
                  {[
                    { Icon: Facebook, label: "Facebook" },
                    { Icon: Twitter, label: "Twitter" },
                    { Icon: Instagram, label: "Instagram" },
                    { Icon: Linkedin, label: "LinkedIn" },
                  ].map(({ Icon, label }, i) => (
                    <a
                      key={i}
                      href="#"
                      aria-label={label}
                      className="w-11 h-11 bg-gradient-to-br from-gray-800 to-gray-800/50 border border-gray-700 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-rose-500 hover:to-rose-600 hover:border-rose-500 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-rose-500/20"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* For Families */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                For Families
                <div className="h-px flex-1 bg-gradient-to-r from-rose-500/50 to-transparent"></div>
              </h3>
              <ul className="space-y-3">
                {[
                  "Find a Sitter",
                  "Post a Job",
                  "How it Works",
                  "Safety & Trust",
                  "Pricing Plans",
                  "Background Checks",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="group flex items-center gap-2 hover:text-rose-400 transition-all duration-300"
                    >
                      <div className="w-1.5 h-1.5 bg-rose-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all duration-300"></div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {item}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Caregivers */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                For Caregivers
                <div className="h-px flex-1 bg-gradient-to-r from-rose-500/50 to-transparent"></div>
              </h3>
              <ul className="space-y-3">
                {[
                  "Apply to Sit",
                  "Sitter Resources",
                  "Insurance & Benefits",
                  "Success Stories",
                  "Community",
                  "Training Center",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="group flex items-center gap-2 hover:text-rose-400 transition-all duration-300"
                    >
                      <div className="w-1.5 h-1.5 bg-rose-500 rounded-full group-hover:w-2 group-hover:h-2 transition-all duration-300"></div>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {item}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Support */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                Contact
                <div className="h-px flex-1 bg-gradient-to-r from-rose-500/50 to-transparent"></div>
              </h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-3 group cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-800/50 rounded-lg flex items-center justify-center shrink-0 group-hover:from-rose-500 group-hover:to-rose-600 transition-all duration-300">
                    <MapPin className="w-5 h-5 text-rose-500 group-hover:text-white transition-colors" />
                  </div>
                  <div className="pt-1">
                    <span className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      Rangpur , Bangladesh
                    </span>
                  </div>
                </li>
                <li className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-800/50 rounded-lg flex items-center justify-center shrink-0 group-hover:from-rose-500 group-hover:to-rose-600 transition-all duration-300">
                    <Phone className="w-5 h-5 text-rose-500 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-gray-400 group-hover:text-rose-400 transition-colors">
                    01613410880
                  </span>
                </li>
                <li className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-800/50 rounded-lg flex items-center justify-center shrink-0 group-hover:from-rose-500 group-hover:to-rose-600 transition-all duration-300">
                    <Mail className="w-5 h-5 text-rose-500 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-gray-400 group-hover:text-rose-400 transition-colors">
                    aftabfarhan324@gmail.com
                  </span>
                </li>
              </ul>

              {/* Quick Support Links
              <div className="mt-8 pt-6 border-t border-gray-800">
                <h4 className="text-white font-semibold mb-4 text-sm">
                  Support
                </h4>
                <ul className="space-y-2 text-sm">
                  {["Help Center", "FAQ", "Live Chat"].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-gray-400 hover:text-rose-400 transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-10 border-t border-gray-800/50">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span>&copy; {currentYear} Care.xyz Inc.</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">All rights reserved</span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  Made with{" "}
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> for
                  families
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "Accessibility",
                ].map((item, i) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-gray-500 hover:text-rose-400 transition-colors relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-rose-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
