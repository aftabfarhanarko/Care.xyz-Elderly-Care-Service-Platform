"use client";
import React from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

const FullAboutPages = () => {
  return (
    <div className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Our Mission to Provide <br />
                <span className="text-rose-600">Exceptional Care</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                At Care.xyz, we believe that everyone deserves high-quality
                care. Our platform connects you with verified, trained, and
                compassionate professionals who treat your family like their
                own.
              </p>
            </div>

            <ul className="space-y-4">
              {[
                "Strict background checks for all caregivers",
                "24/7 support and monitoring",
                "Personalized care plans",
                "Affordable and transparent pricing",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 text-lg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center text-rose-600 font-bold hover:text-rose-700 transition-colors group text-lg"
              >
                Learn more about us
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 relative">
            {/* Decorative Background Card */}
            <div className="absolute top-4 left-4 w-full h-full bg-rose-100 dark:bg-rose-900/30 rounded-3xl -z-10 transform translate-x-4 translate-y-4"></div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Medical Professionals Team"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullAboutPages;
