"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin,
  Star,
  Clock,
  Shield,
  Award,
  Calendar,
  CheckCircle,
  ArrowLeft,
  DollarSign,
  Heart,
  User,
  Quote,
  MessageSquare,
  Sparkles,
  Zap,
} from "lucide-react";
import React, { useState } from "react";
import CaregiversModal from "@/components/modal/CaregiversModal";
import ReviewModal from "@/components/modal/ReviewModal";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { getCaregiverReviews } from "@/actions/serverData/caregiverAPi";

const DetlicesData = ({ caregiver, bookingStatus }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleBookNow = () => {
    if (!session) {
      const callbackUrl = encodeURIComponent(pathname);
      router.push(`/login?callbackUrl=${callbackUrl}`);
      return;
    }
    setIsModalOpen(true);
  };

  const { data: reviews } = useQuery({
    queryKey: ["caregiverReviews", caregiver?._id || caregiver?.id],
    queryFn: () => getCaregiverReviews(caregiver?._id || caregiver?.id),
    enabled: !!(caregiver?._id || caregiver?.id),
  });

  const handleBookingSuccess = () => {
    setIsReviewModalOpen(true);
  };

  if (!caregiver) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-rose-600 dark:border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-500 font-sans selection:bg-rose-500/30">
      {/* Enhanced Premium Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-gradient-to-br from-rose-400/20 to-purple-500/20 rounded-full blur-[120px] opacity-60 dark:opacity-40" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[800px] h-[800px] bg-gradient-to-tr from-blue-400/20 to-teal-500/20 rounded-full blur-[120px] opacity-60 dark:opacity-40" />
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-300/10 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24 relative z-10">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-white/40 dark:border-white/10 hover:border-rose-300 dark:hover:border-rose-500/50 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-rose-500 group-hover:text-white text-gray-500 dark:text-gray-400 transition-colors duration-300">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              Back to Caregivers
            </span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Sidebar - Sticky */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-4 space-y-8 sticky top-28"
          >
            {/* Ultra Premium Profile Card */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[2.5rem] p-4 shadow-2xl shadow-gray-200/50 dark:shadow-black/60 border border-white/50 dark:border-white/10 relative overflow-hidden group">
              {/* Card Decorative Header */}
              <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-rose-100 via-rose-50 to-white dark:from-rose-950/50 dark:via-gray-900 dark:to-gray-900 rounded-t-[2.5rem] opacity-80" />

              <div className="absolute top-4 right-4 z-20">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-white/20">
                  <Heart className="w-6 h-6 text-rose-500 fill-rose-500/10 hover:fill-rose-500 transition-colors cursor-pointer" />
                </div>
              </div>

              <div className="relative z-10 flex flex-col items-center pt-8">
                {/* Image Container with Glow */}
                <div className="relative">
                  <div className="absolute inset-0 bg-rose-500 blur-2xl opacity-20 dark:opacity-40 rounded-full scale-110 group-hover:scale-125 transition-transform duration-700" />
                  <div className="w-56 h-56 rounded-[2.5rem] p-2 bg-white dark:bg-gray-800 shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-500 ease-out-back relative z-10">
                    <div className="w-full h-full rounded-[2rem] overflow-hidden relative border-2 border-gray-100 dark:border-gray-700">
                      <Image
                        src={caregiver.image}
                        alt={caregiver.name}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    {/* Verified Badge */}
                    <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-900 p-2.5 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center gap-2">
                      <div className="bg-blue-500 rounded-full p-0.5">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs font-bold text-gray-700 dark:text-gray-300 pr-1">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-10 mb-6 px-4 w-full">
                  <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                    {caregiver.name}
                  </h1>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 font-semibold text-sm tracking-wide uppercase border border-rose-200 dark:border-rose-500/30">
                      {caregiver.role}
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 py-2 px-4 rounded-xl mx-auto w-fit border border-gray-100 dark:border-white/5">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span className="font-medium">{caregiver.location}</span>
                  </div>
                </div>

                {/* Quick Stats Row */}
                <div className="w-full grid grid-cols-3 gap-2 px-2 mb-4 border-t border-gray-100 dark:border-white/10 pt-6">
                  <div className="flex flex-col items-center p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {caregiver.experience}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                      Exp
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-l border-r border-gray-100 dark:border-white/10">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-1">
                      {caregiver.rating}{" "}
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                      Rating
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${caregiver.rate}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                      /Hr
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="relative group z-10">
              <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              {bookingStatus ? (
                <button
                  disabled
                  className="relative w-full py-5 px-6 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-400 font-bold flex items-center justify-center gap-3 cursor-not-allowed border border-gray-200 dark:border-gray-700"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Currently Booked</span>
                </button>
              ) : (
                <button
                  onClick={handleBookNow}
                  className="relative w-full py-5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-purple-600 text-white font-bold text-lg shadow-xl shadow-rose-500/20 hover:shadow-rose-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  <Calendar className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">Book Appointment</span>
                </button>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 dark:bg-gray-900/60 p-4 rounded-2xl border border-white/40 dark:border-white/5 flex flex-col items-center text-center gap-2 backdrop-blur-sm">
                <Shield className="w-6 h-6 text-green-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Identity Verified
                </span>
              </div>
              <div className="bg-white/60 dark:bg-gray-900/60 p-4 rounded-2xl border border-white/40 dark:border-white/5 flex flex-col items-center text-center gap-2 backdrop-blur-sm">
                <Sparkles className="w-6 h-6 text-amber-500" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Top Rated
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 space-y-8"
          >
            {/* About Section */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-10 shadow-sm border border-white/60 dark:border-white/5">
              <div className="flex items-center gap-5 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
                <div className="p-4 bg-rose-100 dark:bg-rose-500/20 rounded-[1.2rem] text-rose-600 dark:text-rose-400 shadow-inner">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                    About {caregiver.name.split(" ")[0]}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Personal Bio & Background
                  </p>
                </div>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                <p className="leading-relaxed text-lg">{caregiver.about}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-8 pt-8">
                <div className="flex items-start gap-4 p-5 rounded-[1.5rem] bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-white/5 hover:border-rose-200 dark:hover:border-rose-500/30 transition-colors">
                  <div className="p-2.5 bg-green-100 dark:bg-green-500/20 rounded-xl text-green-600 dark:text-green-400 mt-1">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                      Background Checked
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                      Comprehensive background check completed and verified by
                      our safety team.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 rounded-[1.5rem] bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-white/5 hover:border-blue-200 dark:hover:border-blue-500/30 transition-colors">
                  <div className="p-2.5 bg-blue-100 dark:bg-blue-500/20 rounded-xl text-blue-600 dark:text-blue-400 mt-1">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                      Certified Professional
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                      Holds all required certifications and training for
                      professional caregiving.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 lg:p-10 shadow-sm border border-white/60 dark:border-white/5">
              <div className="flex items-center gap-5 mb-8">
                <div className="p-4 bg-purple-100 dark:bg-purple-500/20 rounded-[1.2rem] text-purple-600 dark:text-purple-400 shadow-inner">
                  <Zap className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Services & Skills
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    What I can help you with
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {caregiver.services.map((service, index) => (
                  <div
                    key={index}
                    className="group px-6 py-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium hover:border-rose-300 dark:hover:border-rose-500/50 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:shadow-lg hover:shadow-rose-100/50 dark:hover:shadow-none hover:-translate-y-0.5 transition-all duration-300 cursor-default flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-rose-400 group-hover:bg-rose-600 transition-colors" />
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="space-y-8">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-4">
                  <span className="p-3 rounded-2xl bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400">
                    <Star className="w-7 h-7 fill-current" />
                  </span>
                  Client Reviews
                </h2>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full border border-gray-100 dark:border-white/5">
                  Based on {reviews?.length || 0} reviews
                </div>
              </div>

              {reviews?.length > 0 ? (
                <div className="grid gap-6">
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-8 rounded-[2.5rem] shadow-sm border border-white/60 dark:border-white/5 relative group hover:shadow-xl hover:shadow-rose-100/30 dark:hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300"
                    >
                      <Quote className="absolute top-8 right-8 w-16 h-16 text-gray-100 dark:text-gray-800 rotate-180 group-hover:text-rose-100 dark:group-hover:text-rose-900/20 transition-colors duration-300" />

                      <div className="flex items-start justify-between mb-6 relative z-10">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 p-1 shadow-inner">
                            <div className="w-full h-full rounded-[0.8rem] overflow-hidden relative bg-white dark:bg-gray-700">
                              {review.reviewerImage ? (
                                <img
                                  src={review.reviewerImage}
                                  alt={review.reviewerName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <User className="w-8 h-8 text-gray-400" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-xl">
                              {review.reviewerName}
                            </h4>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              {new Date(review.createdAt).toLocaleDateString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1 bg-yellow-50 dark:bg-yellow-900/10 px-4 py-2 rounded-full border border-yellow-100 dark:border-yellow-900/20 shadow-sm">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < review.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300 dark:text-gray-700"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="relative z-10">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg italic">
                          &ldquo;{review.description}&rdquo;
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-gray-800 group hover:border-rose-300 dark:hover:border-rose-500/30 transition-colors">
                  <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquare className="w-10 h-10 text-gray-400 group-hover:text-rose-500 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    No Reviews Yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-lg">
                    Be the first to share your experience with{" "}
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {caregiver.name.split(" ")[0]}
                    </span>{" "}
                    and help others make informed decisions.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <CaregiversModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        caregiver={caregiver}
        onBookingSuccess={handleBookingSuccess}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        caregiver={caregiver}
      />
    </div>
  );
};

export default DetlicesData;
