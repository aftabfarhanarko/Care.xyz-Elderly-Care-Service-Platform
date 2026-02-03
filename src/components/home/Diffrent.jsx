"use client";
import Link from "next/link";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Star,
  BookOpen,
  Moon,
  Plane,
  Coffee,
  CheckCircle,
  Shield,
  Clock,
  Heart,
  Award,
  MapPin,
  Calendar,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideIn = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6 } },
};

const Diffrent = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const occasions = [
    {
      title: "Date Night",
      icon: Moon,
      color: "bg-indigo-100 text-indigo-600",
      gradient: "from-indigo-500 to-purple-600",
      description: "Evening care for your special moments",
      popular: true,
    },
    {
      title: "After School",
      icon: BookOpen,
      color: "bg-orange-100 text-orange-600",
      gradient: "from-orange-500 to-red-600",
      description: "Homework help & activities",
      popular: false,
    },
    {
      title: "Travel Nanny",
      icon: Plane,
      color: "bg-sky-100 text-sky-600",
      gradient: "from-sky-500 to-blue-600",
      description: "Care on the go",
      popular: false,
    },
    {
      title: "Overnight",
      icon: Coffee,
      color: "bg-purple-100 text-purple-600",
      gradient: "from-purple-500 to-pink-600",
      description: "24/7 trusted support",
      popular: true,
    },
  ];

  const topCaregivers = [
    {
      name: "Sarah M.",
      role: "Certified Nanny",
      rating: 4.9,
      reviews: 124,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
      verified: true,
      yearsExp: 8,
      location: "New York, NY",
      hourlyRate: 25,
      badges: ["Background Checked", "CPR Certified", "Top Rated"],
      availability: "Available Now",
      specialties: ["Newborn Care", "Twins", "Special Needs"],
      responseTime: "< 2 hours",
      featured: true,
    },
    {
      name: "David R.",
      role: "Elderly Specialist",
      rating: 5.0,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      verified: true,
      yearsExp: 12,
      location: "Los Angeles, CA",
      hourlyRate: 30,
      badges: ["Medical Training", "Background Checked", "Elite"],
      availability: "Available This Week",
      specialties: ["Dementia Care", "Post-Surgery", "Companionship"],
      responseTime: "< 1 hour",
      featured: true,
    },
    {
      name: "Jessica T.",
      role: "Pediatric Nurse",
      rating: 4.8,
      reviews: 215,
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400",
      verified: true,
      yearsExp: 6,
      location: "Chicago, IL",
      hourlyRate: 28,
      badges: ["RN Licensed", "Background Checked", "Top Rated"],
      availability: "Available Now",
      specialties: ["Infant Care", "Medical Needs", "Night Nurse"],
      responseTime: "< 3 hours",
      featured: false,
    },
    {
      name: "Maria G.",
      role: "Special Needs Care",
      rating: 4.9,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      verified: true,
      yearsExp: 10,
      location: "Houston, TX",
      hourlyRate: 32,
      badges: ["Certified Specialist", "Background Checked", "Elite"],
      availability: "Available Tomorrow",
      specialties: ["Autism", "Behavioral Support", "Therapy Integration"],
      responseTime: "< 2 hours",
      featured: true,
    },
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Trusted Caregivers" },
    { icon: Shield, value: "100%", label: "Background Checked" },
    { icon: Star, value: "4.9", label: "Average Rating" },
    { icon: TrendingUp, value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-100 to-indigo-100 rounded-full blur-3xl opacity-30 -z-10"></div>

      {/* Stats Bar */}
      <section className="py-12 bg-gradient-to-r from-rose-50 via-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="text-center group cursor-pointer"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-lg mb-3 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-7 h-7 text-rose-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Occasions Section - Enhanced */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span className="text-sm font-semibold text-rose-600">
                Premium Care Options
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 pb-1 mb-4">
              Care for Every Moment
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whatever your schedule, we have a sitter for that. Professional,
              vetted, and ready to help.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {occasions.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="relative group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-xl -z-10 from-rose-200 to-pink-200"></div>
                <div className="relative p-8 rounded-3xl border-2 border-gray-100 bg-white hover:border-transparent hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  {/* Popular Badge */}
                  {item.popular && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full">
                        <Star className="w-3 h-3 fill-current" />
                        Popular
                      </span>
                    </div>
                  )}

                  <div className="relative">
                    <div
                      className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                    >
                      <item.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center text-rose-600 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Caregivers Section - Premium */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideIn}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-50 to-pink-50 rounded-full mb-3">
                <Award className="w-4 h-4 text-rose-600" />
                <span className="text-sm font-semibold text-rose-600">
                  Premium Caregivers
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 pb-1 mb-3">
                Meet Our Top Caregivers
              </h2>
              <p className="text-lg text-gray-600 max-w-xl">
                Handpicked professionals with verified credentials and
                outstanding reviews
              </p>
            </motion.div>

            {/* <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                    activeFilter === filter
                      ? "bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-rose-300 hover:shadow-md"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div> */}
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {topCaregivers.map((caregiver, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="group relative"
              >
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-rose-200 h-full flex flex-col">
                  {/* Featured Badge */}
                  {caregiver.featured && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-600 text-white text-[10px] font-bold rounded-full shadow-md uppercase tracking-wide">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Image Container - Reduced Height */}
                  <div className="h-56 relative overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={caregiver.image}
                      alt={caregiver.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      style={{ objectPosition: "top" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content - Compact */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="mb-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">
                          {caregiver.name}
                        </h3>
                        {caregiver.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-500 fill-blue-500/10" />
                        )}
                      </div>
                      <p className="text-rose-600 font-bold text-xs uppercase tracking-wide">
                        {caregiver.role}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-gray-900 text-sm">
                        {caregiver.rating}
                      </span>
                      <span className="text-gray-400 text-xs">
                        ({caregiver.reviews} reviews)
                      </span>
                    </div>

                    {/* Details - Compact List */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <Award className="w-3.5 h-3.5 text-rose-400" />
                        <span>{caregiver.yearsExp} years exp.</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" />
                        <span>{caregiver.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                        <Clock className="w-3.5 h-3.5 text-rose-400" />
                        <span>Replying in {caregiver.responseTime}</span>
                      </div>
                    </div>

                    {/* Badges - Compact */}
                    <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                      {caregiver.badges.slice(0, 2).map((badge, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-md border border-rose-100"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-extrabold text-gray-900">
                          ${caregiver.hourlyRate}
                        </span>
                        <span className="text-gray-400 text-xs font-medium">
                          /hr
                        </span>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5" />
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
          >
            <Link
              href="/caregivers"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
            >
              <Users className="w-5 h-5" />
              View All {topCaregivers.length * 12}+ Caregivers
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Diffrent;
