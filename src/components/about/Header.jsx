"use client";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <div>
      {/* 3. About Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission to Provide <br />
                <span className="text-rose-600 dark:text-rose-500">
                  Exceptional Care
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                At Care.xyz, we believe that everyone deserves high-quality
                care. Our platform connects you with verified, trained, and
                compassionate professionals who treat your family like their
                own.
              </p>
              <ul className="space-y-4">
                {[
                  "Strict background checks for all caregivers",
                  "24/7 support and monitoring",
                  "Personalized care plans",
                  "Affordable and transparent pricing",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10">
                <Link
                  href="/about"
                  className="text-rose-600 dark:text-rose-500 font-semibold hover:text-rose-700 dark:hover:text-rose-400 flex items-center"
                >
                  Learn more about us <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-200 to-purple-200 rounded-3xl transform rotate-3 scale-105 opacity-50"></div>
              <div className="relative h-[500px] bg-gray-100 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="https://i.ibb.co.com/JWyNNW1v/image.png"
                  className=" h-full w-full object-cover"
                ></img>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* https://i.ibb.co.com/PZqzDh1w/image.png */}
    </div>
  );
};

export default Header;
