"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, Clock, Shield, MapPin, Star, Menu, X } from "lucide-react";

// Orbiting Item Component
const OrbitingItem = ({ radiusClass, duration, reverse, icon, title, subtitle }) => {
  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${radiusClass} pointer-events-none`}
    >
      <div
        className="w-full h-full animate-orbit"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -mt-6 sm:-mt-8"
          style={{
            animation: `reverse-orbit ${duration}s linear infinite`,
            animationDirection: reverse ? 'normal' : 'reverse',
          }}
        >
          <div className="flex items-center gap-3 bg-[#1a1a2e]/90 backdrop-blur-md border border-[#E8956A]/30 p-3 rounded-2xl shadow-xl min-w-[140px]">
            <div className="p-2 bg-[#E8956A]/20 rounded-lg text-[#E8956A]">
              {icon}
            </div>
            <div>
              <h4 className="text-white text-xs sm:text-sm font-bold whitespace-nowrap">{title}</h4>
              <p className="text-gray-400 text-[10px] sm:text-xs whitespace-nowrap">{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Banner Section
const Banner = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-[#0B0B0B] via-[#1a1a2e] to-[#0B0B0B] overflow-hidden pt-20">
      <style jsx>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-orbit {
          animation: orbit linear infinite;
        }
      `}</style>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-[#E8956A] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-[#E8956A] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 sm:left-1/3 w-40 sm:w-64 h-40 sm:h-64 bg-[#E8956A] rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(#E8956A 1px, transparent 1px), linear-gradient(90deg, #E8956A 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="relative max-w-[95%] xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 z-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#E8956A]/20 backdrop-blur-sm border border-[#E8956A]/30 rounded-full px-3 sm:px-4 py-2"
            >
              <Heart className="w-4 h-4 text-[#E8956A]" />
              <span className="text-[#E8956A] text-xs sm:text-sm font-medium">
                #1 Trusted Care Provider
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight"
            >
              Professional Care
              <span className="block bg-gradient-to-r from-[#E8956A] to-[#F5A876] bg-clip-text text-transparent">
                For Your Family
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0"
            >
              Find verified caretakers for babysitting, elderly care, and special needs support. 
              Trusted professionals available 24/7 for your peace of mind.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <button className="bg-gradient-to-r from-[#E8956A] to-[#F5A876] hover:from-[#F5A876] hover:to-[#E8956A] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold shadow-lg shadow-[#E8956A]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#E8956A]/70 hover:scale-105">
                Find a Caretaker
              </button>
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                Become a Caregiver
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E8956A]">
                  5000+
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">Caregivers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E8956A]">
                  24/7
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">Support</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E8956A]">
                  100%
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">Verified</div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Animated Orbit */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center mt-8 lg:mt-0">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative z-20 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-gradient-to-br from-[#E8956A] to-[#F5A876] rounded-full shadow-2xl shadow-[#E8956A]/50 flex flex-col items-center justify-center text-center p-6 sm:p-8 border-4 border-white/20"
            >
              <Heart className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-white mb-2 sm:mb-4 animate-pulse" />
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                Trusted Care
              </h3>
              <p className="text-white/80 text-xs sm:text-sm">
                Vetted professionals for your loved ones.
              </p>
            </motion.div>

            {/* Dashed Orbit Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[300px] h-[300px] rounded-full border border-dashed border-[#E8956A]/20"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[450px] h-[450px] rounded-full border border-dashed border-[#E8956A]/20"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[600px] h-[600px] rounded-full border border-dashed border-[#E8956A]/20"></div>
            </div>

            {/* Orbiting Elements */}
            <OrbitingItem
              radiusClass="w-[300px] h-[300px]"
              duration={25}
              icon={<Shield className="w-5 h-5 sm:w-6 sm:h-6" />}
              title="Verified"
              subtitle="Background Checked"
            />
            <OrbitingItem
              radiusClass="w-[450px] h-[450px]"
              duration={35}
              reverse={true}
              icon={<Users className="w-5 h-5 sm:w-6 sm:h-6" />}
              title="Expert Care"
              subtitle="Professional Trained"
            />
            <OrbitingItem
              radiusClass="w-[600px] h-[600px]"
              duration={45}
              icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6" />}
              title="Always Ready"
              subtitle="On-Demand Service"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section
const Services = () => {
  const services = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Childcare & Babysitting",
      description: "Experienced caregivers for safe and nurturing childcare at home.",
      color: "from-[#E8956A] to-[#F5A876]"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Elderly Care",
      description: "Compassionate support for seniors with daily living assistance.",
      color: "from-[#E8956A] to-[#F5A876]"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Special Needs Care",
      description: "Specialized caregivers trained for specific health conditions.",
      color: "from-[#E8956A] to-[#F5A876]"
    },
  ];

  return (
    <section className="py-20 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Choose from our comprehensive range of care services
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-gradient-to-br from-[#1a1a2e] to-[#0B0B0B] border border-[#E8956A]/20 rounded-xl p-8 hover:border-[#E8956A]/50 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center text-white mb-4`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorks = () => {
  const steps = [
    { step: "1", title: "Create Account", description: "Sign up and complete your profile" },
    { step: "2", title: "Browse Caregivers", description: "View verified professionals" },
    { step: "3", title: "Schedule Service", description: "Book your preferred caregiver" },
    { step: "4", title: "Enjoy Peace of Mind", description: "Reliable care for your family" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#1a1a2e] to-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#E8956A] to-[#F5A876] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const testimonials = [
    { name: "Sarah M.", rating: 5, text: "Found an amazing caregiver for my elderly mom. Professional and caring!" },
    { name: "John D.", rating: 5, text: "Best platform for finding babysitters. Verified and reliable caregivers." },
    { name: "Emma L.", rating: 5, text: "Peace of mind knowing my child is in safe hands. Highly recommended!" },
  ];

  return (
    <section className="py-20 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            What Families Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-gradient-to-br from-[#1a1a2e] to-[#0B0B0B] border border-[#E8956A]/20 rounded-xl p-8"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#E8956A] text-[#E8956A]" />
                ))}
              </div>
              <p className="text-gray-300 mb-4">"{item.text}"</p>
              <p className="text-[#E8956A] font-semibold">{item.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#E8956A] to-[#F5A876]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Find Quality Care?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join thousands of families who trust our platform
          </p>
          <button className="bg-white text-[#E8956A] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
            Get Started Today
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// Main App Component
export default function CareServicesApp() {
  return (
    <div className="bg-[#0B0B0B] min-h-screen">
      <Banner />
      <Services />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </div>
  );
}