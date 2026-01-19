"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  MapPin,
  DollarSign,
  Calendar,
  Baby,
  PawPrint,
  Stethoscope,
  Users,
  Star,
  Phone,
  Mail,
  ShieldCheck,
  Heart,
  Car,
  ChevronRight,
  Activity,
  Brain,
  Utensils,
  Accessibility,
  Pill,
  Pause,
  Puzzle,
  Bandage,
  Infinity,
  Home,
  Moon,
  BrainCircuit,
  Mic,
  Book,
  Droplet,
  Armchair,
  HeartPulse,
  Bus,
  Building,
  Waves,
  Ambulance,
  Search,
  Filter,
} from "lucide-react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const iconMap = {
  Baby,
  Users,
  Stethoscope,
  Activity,
  Brain,
  Heart,
  Utensils,
  Accessibility,
  Pill,
  Pause,
  Puzzle,
  Bandage,
  Infinity,
  Car,
  Home,
  Moon,
  BrainCircuit,
  Mic,
  Book,
  Droplet,
  Armchair,
  HeartPulse,
  Bus,
  Building,
  Waves,
  Ambulance,
  PawPrint,
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServiceDetailContent = ({ service }) => {
  const [activeImage, setActiveImage] = useState(0);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Service Not Found
          </h2>
          <Link
            href="/services"
            className="text-rose-600 dark:text-rose-400 hover:underline mt-4 block"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[service.icon] || Baby;
  const images = service.images || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/services"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Services
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Section */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 ${
                      service.color || "bg-blue-100 text-blue-600"
                    } rounded-2xl flex items-center justify-center`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {service.name}
                    </h1>
                    <div className="flex items-center gap-2 mt-2 text-gray-500 dark:text-gray-400">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {service.customerReviews?.length > 0
                          ? (
                              service.customerReviews.reduce(
                                (acc, rev) => acc + rev.rating,
                                0
                              ) / service.customerReviews.length
                            ).toFixed(1)
                          : "New"}
                      </span>
                      <span>
                        ({service.customerReviews?.length || 0} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    $
                    <CountUp
                      end={service.priceVal}
                      duration={2}
                      separator=","
                    />
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">
                    /hour
                  </span>
                </div>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {service.detailedDescription || service.description}
              </p>

              {/* Image Gallery */}
              {images.length > 0 && (
                <div className="mb-8">
                  <div className="aspect-video w-full rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 relative group">
                    <img
                      src={images[activeImage]}
                      alt={`${service.name} ${activeImage + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                          activeImage === idx
                            ? "border-rose-600"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="grid md:grid-cols-2 gap-4">
                {service.features?.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Additional Services & Requirements */}
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-rose-600" />
                  Caregiver Requirements
                </h3>
                <ul className="space-y-3">
                  {service.caregiverRequirements?.map((req, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-gray-600 dark:text-gray-300"
                    >
                      <span className="w-1.5 h-1.5 bg-rose-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Car className="w-5 h-5 text-blue-600" />
                  Additional Services
                </h3>
                <ul className="space-y-3">
                  {service.additionalServices?.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-gray-600 dark:text-gray-300"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Reviews Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Customer Reviews
              </h3>
              <div className="space-y-6">
                {service.customerReviews?.map((review, idx) => (
                  <div
                    key={idx}
                    className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-6 last:pb-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {review.user}
                      </h4>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-8">
            {/* Booking Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Service Availability
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Days
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {service.serviceAvailability?.days?.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Hours
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {service.serviceAvailability?.hours}
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href={`/booking/${service._id}`}
                className="block w-full py-4 px-6 bg-rose-600 text-white rounded-xl font-bold text-center hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200 dark:shadow-rose-900/30 mb-4"
              >
                Book This Service
              </Link>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                Free cancellation up to 24 hours before appointment
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Have Questions?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{service.contactInfo?.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{service.contactInfo?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailContent;
