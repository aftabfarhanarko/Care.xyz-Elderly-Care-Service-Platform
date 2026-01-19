import {
  ArrowRight,
  Baby,
  Users,
  Stethoscope,
  
} from "lucide-react";
import React from 'react';
import CountUp from 'react-countup';
import { motion } from "framer-motion";
import Link from "next/link";
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Services = () => {
      const services = [
        {
          id: 1,
          name: "Baby Care",
          icon: Baby,
          description:
            "Professional babysitting for your little ones. Safe, fun, and educational activities included.",
          color: "bg-blue-100 text-blue-600",
          priceVal: 15,
        },
        {
          id: 2,
          name: "Elderly Care",
          icon: Users,
          description:
            "Compassionate companionship and assistance with daily activities for your seniors.",
          color: "bg-purple-100 text-purple-600",
          priceVal: 20,
        },
        {
          id: 3,
          name: "Sick Care",
          icon: Stethoscope,
          description:
            "Dedicated support for recovery and health monitoring by certified nurses.",
          color: "bg-rose-100 text-rose-600",
          priceVal: 25,
        },
      ];
    return (
        <div>
            {/* 4. Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-semibold tracking-wide uppercase text-sm">
              What We Offer
            </span>
            <h2 className="mt-2 text-4xl font-bold text-gray-900 mb-4">
              Our Premium Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Comprehensive care solutions tailored to your specific needs,
              delivered by professionals.
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div
                  className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-gray-900">
                    <CountUp
                      end={service.priceVal}
                      prefix="$"
                      suffix="/hr"
                      duration={2.5}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </span>
                  <Link
                    href={`/services/${service.id}`}
                    className="inline-flex items-center text-rose-600 font-semibold hover:text-rose-700 transition-colors"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
        </div>
    );
};

export default Services;