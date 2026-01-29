"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Shield,
  Star,
  CheckCircle2,
  Users,
  Search,
  ArrowRight,
  Play,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SLIDES = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1974&auto=format&fit=crop",
    alt: "Happy Baby Care",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1974&auto=format&fit=crop",
    alt: "Compassionate Senior Care",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=1974&auto=format&fit=crop",
    alt: "Family Trust & Bonding",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1974&auto=format&fit=crop",
    alt: "Child Development & Play",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1974&auto=format&fit=crop",
    alt: "Elderly Companionship",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1974&auto=format&fit=crop",
    alt: "Educational Nanny",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1581579186913-45ac3e6e3dd2?q=80&w=1974&auto=format&fit=crop",
    alt: "Professional Housekeeping",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=1974&auto=format&fit=crop",
    alt: "Loving Pet Care",
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1510154221556-06256b3560b8?q=80&w=1974&auto=format&fit=crop",
    alt: "Peaceful Baby Sleep",
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=1974&auto=format&fit=crop",
    alt: "Happy Family Moments",
  },
];

const Banner = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[95vh] bg-gradient-to-b from-rose-50/50 via-white to-white overflow-hidden flex items-center pt-24 pb-12">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-rose-100/40 rounded-full blur-[100px] opacity-60 mix-blend-multiply" />
        <div className="absolute top-[30%] -left-[10%] w-[600px] h-[600px] bg-pink-100/40 rounded-full blur-[100px] opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-[0%] right-[20%] w-[500px] h-[500px] bg-orange-50/40 rounded-full blur-[80px] opacity-50 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-rose-100 rounded-full pl-2 pr-5 py-1.5 shadow-lg shadow-rose-100/50"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-rose-100 border-2 border-white flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs text-gray-500 font-medium">
                  Trusted by
                </span>
                <span className="text-sm font-bold text-rose-950">
                  10,000+ Families
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-3xl lg:text-5xl font-bold leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 tracking-tight pb-2">
                Premium Care <br />
                For Your Loved Ones
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-xl font-medium">
                Experience the peace of mind that comes with professional,
                verified care. We connect you with elite caregivers who treat
                your family like their own.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button onClick={()=> router.push("/caregivers")} className="px-8 py-4.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold shadow-xl shadow-rose-600/20 hover:shadow-rose-600/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-3 group">
                <Search className="w-5 h-5" />
                Find a Caregiver
                <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
              </button>
            
              <button  onClick={()=> router.push("/services")} className="px-8 py-4.5 rounded-2xl bg-white border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md">
               <Search className="w-5 h-5" />
                Find a Services
                <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 pt-6 border-t border-rose-100/50">
              {[
                { icon: Shield, text: "100% Verified Staff" },
                { icon: Heart, text: "Compassionate Care" },
                { icon: Star, text: "Top-Rated Professionals" },
                { icon: CheckCircle2, text: "Safety First Protocol" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-gray-600 group"
                >
                  <div className="p-2 rounded-lg bg-rose-50 text-rose-600 group-hover:bg-rose-100 transition-colors">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visuals - Premium Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block h-[650px]"
          >
            {/* Main Image Container */}
            <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-rose-900/10 border-[8px] border-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={SLIDES[currentSlide].image}
                    alt={SLIDES[currentSlide].alt}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Slider Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === idx
                        ? "w-8 bg-white"
                        : "w-2 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Info Cards - Premium Glassmorphism */}

            {/* Card 1: Live Status */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute top-12 -right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 z-30 w-56"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">
                    Care in Action
                  </div>
                  <div className="text-xs text-gray-500">
                    Live monitoring active
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Rating */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute bottom-20 -left-12 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 z-30 max-w-[240px]"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                    >
                      <img
                        src={`https://i.pravatar.cc/100?img=${i + 20}`}
                        alt="User"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 pl-2">+2k Reviews</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <div className="text-xs font-bold text-gray-900">
                    4.9/5 Average Rating
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl animate-pulse delay-700" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
