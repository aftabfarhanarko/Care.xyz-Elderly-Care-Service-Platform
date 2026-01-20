"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Shield,
  Star,
  CheckCircle2,
  Users,
  Search,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="relative min-h-[90vh] bg-gradient-to-b from-slate-50 to-white overflow-hidden flex items-center pt-20">
      {/* Soft Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] bg-teal-50/50 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[0%] right-[20%] w-[400px] h-[400px] bg-rose-50/50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 shadow-sm"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] overflow-hidden"
                  >
                    <span className="sr-only">User</span>
                    <Users className="w-3 h-3 text-slate-400" />
                  </div>
                ))}
              </div>
              <span className="text-slate-600 text-sm font-medium">
                Trusted by 10,000+ Families
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] text-slate-900">
                Compassionate Care <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                  For Your Loved Ones
                </span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Find professional, verified caregivers for children, seniors,
                and pets. We connect families with trusted experts who treat
                your loved ones like their own.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button className="px-8 py-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-lg shadow-teal-600/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Find a Caregiver
              </button>
              <button className="px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                Become a Caregiver
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: Shield, text: "Background Verified" },
                { icon: Heart, text: "Compassionate Care" },
                { icon: Star, text: "Top-Rated Pros" },
                { icon: CheckCircle2, text: "Safety First" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-slate-600"
                >
                  <item.icon className="w-5 h-5 text-teal-500 fill-teal-50" />
                  <span className="font-medium text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visuals */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Main Image Container */}
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200 border-8 border-white bg-slate-100 aspect-[4/5] max-h-[600px] w-full mx-auto">
              {/* Placeholder for real image - using a gradient/pattern for now if no image provided */}
              <div className="absolute inset-0 bg-slate-100 flex items-end justify-center">
                {/* Abstract Representation of Caregiver/Family */}
                <div className="w-full h-full bg-gradient-to-b from-slate-50 to-slate-200 relative">
                  {/* You would typically use <Image /> here with a real photo */}
                  <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                    <Users className="w-32 h-32 opacity-20" />
                  </div>
                </div>
              </div>

              {/* Floating Info Cards */}

              {/* Card 1: Review */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-12 -right-12 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 w-48 z-20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      4.9/5 Rating
                    </div>
                    <div className="text-[10px] text-slate-500">
                      From parents
                    </div>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[95%] bg-yellow-400 rounded-full" />
                </div>
              </motion.div>

              {/* Card 2: Status */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-12 -left-12 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    100% Verified
                  </div>
                  <div className="text-xs text-slate-500">Safety Guarantee</div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-teal-100/30 to-blue-100/30 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
