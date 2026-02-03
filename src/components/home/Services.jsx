"use client";
import {
  ArrowRight,
  Baby,
  Users,
  Stethoscope,
  Quote,
  Heart,
} from "lucide-react";
import React from 'react';
import CountUp from 'react-countup';
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
      const handelPush = () => {
        router.push("/services")
      }
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
              onClick={handelPush}
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

      {/* Caring is a way of life Section */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
              {/* Outer glow / depth */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-rose-200/40 via-purple-200/40 to-transparent blur-2xl"></div>

              <div className="relative z-10 max-w-lg">
                {/* Main Card */}
                <div className="relative rounded-[2rem] overflow-hidden border border-white/60 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                  {/* Image */}
                  <img
                    src="https://i.ibb.co.com/SwwxTTPQ/career-img.png"
                    alt="Happy elderly couple"
                    className="w-full h-[520px] object-cover"
                  />

                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>

                  {/* Quote Card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-rose-100">
                    <Quote className="w-8 h-8 text-rose-600 mb-3 opacity-70" />
                    <h4 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug">
                      “Age is a work of art, so take care of it!”
                    </h4>
                  </div>
                </div>

                {/* Decorative blobs */}
                <div className="absolute -top-6 -left-6 w-28 h-28 bg-purple-300/40 rounded-full blur-2xl -z-10"></div>
                <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-rose-300/40 rounded-full blur-2xl -z-10"></div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-bold text-gray-500 tracking-[0.2em] uppercase text-sm mb-2 block">
                Ageing Gracefully
              </span>
              <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Caring is a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600">
                  way of life...
                </span>
              </h2>

              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Ageing is a process of self discovery... we merely help you!
              </h3>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Morbi tempor sit amet enim sit amet dictum. Curabitur vehicula
                quam elit, in congue turpis vehicula non. In tempor lorem magna,
                sit amet scelerisque nisi vehicula a. Ut quis aliquam neque.
                Pellentesque bibendum pretium felis, et placerat tortor.
              </p>

              <div className="h-px bg-gradient-to-r from-rose-200 to-transparent mb-8"></div>

              <div className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                {[
                  "Youth is a gift of nature...",
                  "But Age is a work of art!",
                  "I am not old - I have been young",
                  "Wisdom comes with winters",
                  "Wear your years with pride",
                  "Every year is a victory",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
                    <span className="text-gray-700 font-medium text-sm">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default Services;