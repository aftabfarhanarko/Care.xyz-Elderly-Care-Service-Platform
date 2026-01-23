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
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="">
              <img src="/logo2.png" className="h-13 w-38 mb-10"></img>
            </Link>
            <p className="text-gray-400 leading-relaxed">
              Connecting families with trusted caregivers since 2024. Safety,
              reliability, and love are at the heart of everything we do.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* For Families */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">For Families</h3>
            <ul className="space-y-4">
              {[
                "Find a Sitter",
                "Post a Job",
                "How it Works",
                "Safety & Trust",
                "Pricing Plans",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-rose-600 rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Caregivers */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">
              For Caregivers
            </h3>
            <ul className="space-y-4">
              {[
                "Apply to Sit",
                "Sitter Resources",
                "Insurance & Benefits",
                "Success Stories",
                "Community",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors flex items-center"
                  >
                    <span className="w-1.5 h-1.5 bg-rose-600 rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-rose-500 mr-3 mt-1 shrink-0" />
                <span>
                  123 Caregiver Lane,
                  <br />
                  San Francisco, CA 94105
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-rose-500 mr-3 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-rose-500 mr-3 shrink-0" />
                <span>support@care.xyz</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>&copy; {currentYear} Care.xyz Inc. All rights reserved.</div>
          <div className="flex space-x-8">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
