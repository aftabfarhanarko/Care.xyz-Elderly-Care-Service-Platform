"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Shield,
  Star,
  Clock,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Baby,
  Smile,
  Calendar,
  MapPin,
  Bell,
  CreditCard,
  MessageSquare,
  Search,
  Video,
  Lock,
  Zap,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ImprovedAboutPage() {
  const [activeTab, setActiveTab] = useState(0);

  const stats = [
    { number: "15K+", label: "Happy Families", icon: Smile },
    { number: "4.9", label: "Average Rating", icon: Star },
    { number: "100%", label: "Verified Sitters", icon: Shield },
    { number: "24/7", label: "Support Available", icon: Clock },
  ];

  const values = [
    {
      title: "Safety First",
      description:
        "Every caregiver undergoes our rigorous 7-step background check and safety training.",
      icon: Shield,
      color: "from-blue-400 to-blue-600",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Loving Care",
      description:
        "We don't just watch kids; we engage, teach, and nurture them with genuine affection.",
      icon: Heart,
      color: "from-rose-400 to-rose-600",
      bg: "bg-rose-50 dark:bg-rose-900/20",
    },
    {
      title: "Reliability",
      description:
        "Count on us when you need us. Real-time updates and guaranteed backup support.",
      icon: CheckCircle,
      color: "from-emerald-400 to-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
  ];

  const services = [
    {
      title: "Occasional Sitting",
      desc: "Perfect for date nights, appointments, or running errands.",
      icon: Star,
      image:
        "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800&q=80",
    },
    {
      title: "Regular Nanny",
      desc: "Consistent care schedule tailored to your family's routine.",
      icon: Users,
      image:
        "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    },
    {
      title: "Newborn Care",
      desc: "Specialized support for infants and new parents.",
      icon: Baby,
      image:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80",
    },
    {
      title: "Event Care",
      desc: "Professional supervision for weddings and parties.",
      icon: Calendar,
      image:
        "https://images.unsplash.com/photo-1530047625168-4b29bfbbe1fc?w=800&q=80",
    },
  ];

  const appFeatures = [
    {
      title: "Smart Search & Filters",
      description:
        "Find the perfect sitter using advanced filters by location, availability, experience, and special skills.",
      icon: Search,
      color: "bg-purple-500",
    },
    {
      title: "Real-Time Booking",
      description:
        "Book instantly or schedule in advance. See sitter availability in real-time with calendar integration.",
      icon: Calendar,
      color: "bg-blue-500",
    },
    {
      title: "In-App Messaging",
      description:
        "Communicate directly with sitters, share photos, and get instant updates during care sessions.",
      icon: MessageSquare,
      color: "bg-green-500",
    },
    {
      title: "Live GPS Tracking",
      description:
        "Track your sitter's arrival and get location updates during outings for complete peace of mind.",
      icon: MapPin,
      color: "bg-red-500",
    },
    {
      title: "Video Profiles",
      description:
        "Watch introduction videos from sitters to find the perfect personality match for your family.",
      icon: Video,
      color: "bg-indigo-500",
    },
    {
      title: "Secure Payments",
      description:
        "Cashless, contactless payments with automatic receipts and tip options built right in.",
      icon: CreditCard,
      color: "bg-amber-500",
    },
    {
      title: "Smart Notifications",
      description:
        "Get instant alerts for booking confirmations, sitter arrivals, activity updates, and check-outs.",
      icon: Bell,
      color: "bg-pink-500",
    },
    {
      title: "Background Verified",
      description:
        "Every sitter profile shows verified badges, certifications, and comprehensive background check results.",
      icon: Lock,
      color: "bg-cyan-500",
    },
    {
      title: "Instant Match",
      description:
        "Need a sitter now? Our AI instantly matches you with available, nearby sitters in under 2 minutes.",
      icon: Zap,
      color: "bg-orange-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Mother of 2",
      content:
        "This app completely changed how we handle childcare. The sitters are amazing and the booking process is so simple!",
      rating: 5,
      image: "https://i.pravatar.cc/100?img=1",
    },
    {
      name: "Michael Chen",
      role: "Working Dad",
      content:
        "Love the real-time updates and GPS tracking. I always know my kids are safe and having fun.",
      rating: 5,
      image: "https://i.pravatar.cc/100?img=3",
    },
    {
      name: "Emily Rodriguez",
      role: "First-time Mom",
      content:
        "The video profiles helped me find the perfect sitter for my newborn. Couldn't be happier!",
      rating: 5,
      image: "https://i.pravatar.cc/100?img=5",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans overflow-hidden">
      {/* Hero Section - Fully Responsive */}

      {/* Stats Section - Fully Responsive */}
      {/* <section className="py-8 sm:py-10 bg-rose-600 dark:bg-rose-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2 sm:mb-3 text-rose-200">
                  <stat.icon size={24} className="sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
                  {stat.number}
                </h3>
                <p className="text-rose-100 text-xs sm:text-sm font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Mission & Values - Fully Responsive */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
              More Than Just Babysitting
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg px-4">
              We're building a community of trust, where parents can breathe
              easy and children can thrive in a safe, engaging environment.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl ${value.bg} border border-transparent hover:border-rose-100 dark:hover:border-rose-900 transition-all duration-300 group`}
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <value.icon size={24} className="sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Features Section - New & Responsive */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
              Powerful Features in Your Pocket
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg px-4">
              Everything you need to find, book, and manage trusted childcare -
              all in one beautiful, easy-to-use app.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {appFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 group hover:border-rose-200 dark:hover:border-rose-800"
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon size={24} className="sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Tabs - Fully Responsive */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 w-full"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Tailored Care for Every Family
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg">
                Every family is unique. That's why we offer flexible care
                options designed to fit your specific needs and schedule.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-3 sm:gap-4 ${
                      activeTab === index
                        ? "bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setActiveTab(index)}
                  >
                    <div
                      className={`p-2 rounded-lg flex-shrink-0 ${
                        activeTab === index
                          ? "bg-rose-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                      }`}
                    >
                      <service.icon size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`font-semibold text-sm sm:text-base ${
                          activeTab === index
                            ? "text-rose-900 dark:text-rose-100"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {service.title}
                      </h4>
                      {activeTab === index && (
                        <p className="text-xs sm:text-sm text-rose-700 dark:text-rose-300 mt-1">
                          {service.desc}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 w-full relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
                >
                  <img
                    src={services[activeTab].image}
                    alt={services[activeTab].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 sm:p-8">
                    <div className="text-white">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2">
                        {services[activeTab].title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-200">
                        {services[activeTab].desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Decorative dots */}
              <div className="absolute -z-10 top-6 sm:top-10 -right-6 sm:-right-10 grid grid-cols-4 gap-1 sm:gap-2 hidden sm:grid">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-rose-200 dark:bg-rose-800"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - New & Responsive */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
              Loved by Families Everywhere
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg px-4">
              Don't just take our word for it - hear from parents who trust us
              with their most precious treasures.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Fully Responsive */}
      {/* <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-rose-600 to-orange-600 dark:from-rose-800 dark:to-orange-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
              Ready to Experience Worry-Free Childcare?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-rose-100 mb-8 sm:mb-10 px-4">
              Join thousands of families who've found their perfect sitter.
              Download the app or book online today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-rose-600 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group text-sm sm:text-base">
                Get Started Free
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-rose-600 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
}
