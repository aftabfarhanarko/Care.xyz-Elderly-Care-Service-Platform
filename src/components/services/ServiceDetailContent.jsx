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
  Sparkles,
  Zap,
  Quote,
  MessageSquare,
} from "lucide-react";
import CountUp from "react-countup";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../modal/Modal";
import ServiceReviewModal from "../modal/ServiceReviewModal";
import { singleData, getServiceReviews } from "@/actions/serverData/getData";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ServiceDetailContent = ({ service }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeImage, setActiveImage] = useState(0);
  const [isOpenModal, SetIsOpenModal] = useState(false);
  const [isOpenReviewModal, setIsOpenReviewModal] = useState(false);
  const { data: session } = useSession();

  // Fetch Location Data using TanStack Query
  const { data: locationData = [] } = useQuery({
    queryKey: ["locationData"],
    queryFn: async () => {
      const res = await fetch("/resisterData.json");
      return res.json();
    },
  });

  // Fetch Booking Status using TanStack Query
  const { data: bookingStatus } = useQuery({
    queryKey: ["bookingStatus", service?._id || service?.id],
    queryFn: async () => {
      const query = { service_id: service?._id || service?.id };
      const result = await singleData(query);
      return result;
    },
    enabled: !!(service?._id || service?.id) && !!session,
  });

  // Fetch Reviews using TanStack Query
  const { data: reviews = [] } = useQuery({
    queryKey: ["serviceReviews", service?._id || service?.id],
    queryFn: async () => {
      const result = await getServiceReviews(service?._id || service?.id);
      return result;
    },
    enabled: !!(service?._id || service?.id),
  });

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
          <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-rose-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Service Not Found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            The service you are looking for might have been removed or is
            temporarily unavailable.
          </p>
          <button
            onClick={alert("Set Now")}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:scale-105 transition-transform"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[service.icon] || Baby;
  const images = Array.isArray(service.images) ? service.images : [];
  const features = Array.isArray(service.features) ? service.features : [];
  const caregiverRequirements = Array.isArray(service.caregiverRequirements)
    ? service.caregiverRequirements
    : [];
  const additionalServices = Array.isArray(service.additionalServices)
    ? service.additionalServices
    : [];
  const customerReviews = Array.isArray(service.customerReviews)
    ? service.customerReviews
    : [];
  const serviceAvailability = service.serviceAvailability || {};
  const availabilityDays = Array.isArray(serviceAvailability.days)
    ? serviceAvailability.days
    : [];

  const showModal = () => {
    if (!session) {
      const callbackUrl = encodeURIComponent(pathname);
      router.push(`/login?callbackUrl=${callbackUrl}`);
      return;
    }
    SetIsOpenModal(true);
  };

  const displayReviews =
    reviews.length > 0
      ? reviews
      : Array.isArray(service.customerReviews)
        ? service.customerReviews
        : [];
  const averageRating =
    displayReviews.length > 0
      ? (
          displayReviews.reduce((acc, rev) => acc + rev.rating, 0) /
          displayReviews.length
        ).toFixed(1)
      : "New";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        {/* Breadcrumb / Back Link */}
        <Link
          href="/services"
          className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 mb-8 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center mr-3 group-hover:border-rose-200 dark:group-hover:border-rose-900/50 transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          Back to Services
        </Link>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content - Left Column */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Header Section */}
            <motion.div
              variants={fadeInUp}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative z-10">
                <div className="flex items-start gap-6">
                  <div
                    className={`w-20 h-20 md:w-24 md:h-24 ${
                      service.color || "bg-blue-50 text-blue-600"
                    } rounded-3xl flex items-center justify-center shadow-lg shadow-gray-200 dark:shadow-none shrink-0`}
                  >
                    <IconComponent className="w-10 h-10 md:w-12 md:h-12" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider border border-rose-100 dark:border-rose-900/30">
                        Premium Service
                      </span>
                      {service.category && (
                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold uppercase tracking-wider">
                          {service.category}
                        </span>
                      )}
                    </div>
                    <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold text-rose-600 dark:text-rose-500 leading-tight mb-3">
                      {service.name}
                    </h1>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/10 px-2 py-1 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-gray-900 dark:text-white">
                          {averageRating}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-1">
                          ({displayReviews.length} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <ShieldCheck className="w-4 h-4 text-green-500" />
                        Verified Provider
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-left md:text-right bg-gray-50 dark:bg-gray-700/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50 min-w-[140px]">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Starting at
                  </p>
                  <div className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center md:justify-end gap-1">
                    <span className="text-lg text-gray-400 align-top">$</span>
                    <CountUp
                      end={service.priceVal}
                      duration={1.5}
                      separator=","
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    per hour
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700/50">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  About this Service
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {service.detailedDescription || service.description}
                </p>
              </div>

              {/* Image Gallery */}
              {images.length > 0 && (
                <div className="mt-8">
                  <div className="aspect-video w-full rounded-3xl overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700 relative group shadow-inner">
                    <img
                      src={images[activeImage]}
                      alt={`${service.name} ${activeImage + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                          activeImage === idx
                            ? "border-rose-500 ring-2 ring-rose-500/20 scale-105"
                            : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
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

              {/* Features Grid */}
              <div className="mt-10">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Key Features
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:border-rose-200 dark:hover:border-rose-900/30 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center mr-3 shadow-sm text-green-500 group-hover:text-green-600 group-hover:scale-110 transition-all">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-200 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Additional Info Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center mb-6 text-rose-600 dark:text-rose-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Caregiver Requirements
                </h3>
                <ul className="space-y-4">
                  {caregiverRequirements.map((req, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-gray-600 dark:text-gray-300 text-sm font-medium"
                    >
                      <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 mr-3 flex-shrink-0 shadow-sm shadow-rose-500/50" />
                      {req}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400">
                  <Car className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Additional Services
                </h3>
                <ul className="space-y-4">
                  {additionalServices.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-gray-600 dark:text-gray-300 text-sm font-medium"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0 shadow-sm shadow-blue-500/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Reviews Section */}
            <motion.div
              variants={fadeInUp}
              className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Customer Reviews
                </h3>
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300">
                  {displayReviews.length} Verified Reviews
                </div>
              </div>

              {displayReviews.length > 0 ? (
                <div className="grid gap-6">
                  {displayReviews.map((review, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group relative p-6 md:p-8 bg-gray-50 dark:bg-gray-900/30 rounded-[2rem] border border-gray-100 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-none transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-md">
                            {review.reviewerImage ? (
                              <img
                                src={review.reviewerImage}
                                alt={review.reviewerName || "Reviewer"}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-rose-100 to-purple-100 dark:from-rose-900/50 dark:to-purple-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400 font-bold text-lg">
                                {(
                                  review.reviewerName ||
                                  review.user ||
                                  "A"
                                ).charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                              {review.reviewerName ||
                                review.user ||
                                "Anonymous"}
                            </h4>
                            {review.reviewerEmail && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                {review.reviewerEmail}
                              </p>
                            )}
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {review.createdAt
                                ? new Date(
                                    review.createdAt,
                                  ).toLocaleDateString()
                                : "Recently"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-200 dark:text-gray-700"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="relative pl-8">
                        <Quote className="w-6 h-6 text-rose-200 dark:text-rose-900/50 absolute left-0 top-0 transform -scale-x-100" />
                        <p className="text-gray-600 dark:text-gray-300 text-lg italic leading-relaxed">
                          "{review.description || review.comment}"
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/30 rounded-[2rem] border border-dashed border-gray-200 dark:border-gray-700">
                  <div className="w-16 h-16 mx-auto bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm mb-4 text-gray-400 dark:text-gray-500">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    No Reviews Yet
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                    Be the first to share your experience with this service!
                    Book now to leave a review.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Sidebar - Right Column */}
          <div className="relative">
            <motion.div
              className="space-y-8 sticky top-28"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Booking Card */}
              <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 shadow-xl shadow-rose-500/5 border border-gray-100 dark:border-gray-700 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-500/10 to-transparent rounded-bl-[2.5rem] -mr-8 -mt-8" />

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 relative z-10">
                  Book This Service
                </h3>

                <div className="space-y-6 mb-8 relative z-10">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-rose-500 shadow-sm">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wide mb-1">
                        Availability
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {availabilityDays.join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700/50">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center text-blue-500 shadow-sm">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wide mb-1">
                        Hours
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {serviceAvailability.hours}
                      </p>
                    </div>
                  </div>
                </div>

                {bookingStatus ? (
                  <button
                    disabled
                    className="group relative block w-full py-4 px-6 bg-gray-400 dark:bg-gray-600 text-white rounded-xl font-bold text-center cursor-not-allowed shadow-none transition-all overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Already Booked <CheckCircle className="w-5 h-5" />
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={showModal}
                    className="group relative block w-full py-4 px-6 bg-gradient-to-r from-rose-600 to-purple-600 text-white rounded-xl font-bold text-center shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:-translate-y-0.5 transition-all overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Book Now{" "}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                )}

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <ShieldCheck className="w-3 h-3 text-green-500" />
                  Secure booking & free cancellation
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-[2rem] p-8 border border-blue-100 dark:border-blue-800/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full blur-xl" />

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 relative z-10">
                  Have Questions?
                </h3>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {service.contactInfo?.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm group-hover:scale-110 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {service.contactInfo?.email}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpenModal}
        onClose={() => SetIsOpenModal(false)}
        service={service}
        locationData={locationData}
        SetIsOpenModal={SetIsOpenModal}
        onBookingSuccess={() => setIsOpenReviewModal(true)}
      />

      {/* Review Modal */}
      <ServiceReviewModal
        isOpen={isOpenReviewModal}
        onClose={() => setIsOpenReviewModal(false)}
        service={service}
      />

      {/* Mobile Fixed Booking Bar - Visible only on small/medium screens */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 p-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] pb-safe">
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Total</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white">
                <CountUp end={service.priceVal} duration={1} separator="," />
              </span>
              <span className="text-gray-500 dark:text-gray-400 font-medium text-sm">/hr</span>
            </div>
          </div>
          <button
            onClick={showModal}
            disabled={bookingStatus?.length > 0}
            className={`flex-1 max-w-xs py-3 px-6 rounded-xl font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all duration-300 ${
              bookingStatus?.length > 0 
              ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed border border-gray-200 dark:border-gray-700" 
              : "bg-gradient-to-r from-rose-600 to-purple-600 text-white active:scale-95"
            }`}
          >
            {bookingStatus?.length > 0 ? (
                <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Booked</span>
                </>
            ) : (
                <>
                    <Calendar className="w-5 h-5" />
                    <span>Book Now</span>
                </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailContent;
