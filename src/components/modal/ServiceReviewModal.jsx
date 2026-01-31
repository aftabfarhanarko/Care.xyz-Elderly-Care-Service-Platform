"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, User, MessageSquare, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { saveServiceReview } from "@/actions/serverData/getData";
import { useQueryClient } from "@tanstack/react-query";

const ServiceReviewModal = ({ isOpen, onClose, service }) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      Swal.fire({
        icon: "warning",
        title: "Rating Required",
        text: "Please select a star rating.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        serviceId: service._id || service.id,
        serviceName: service.name,
        reviewerName: session?.user?.name || "Anonymous",
        reviewerEmail: session?.user?.email,
        reviewerImage: session?.user?.image,
        rating,
        description,
        createdAt: new Date().toISOString(),
      };

      await saveServiceReview(reviewData);

      queryClient.invalidateQueries(["serviceReviews", service._id || service.id]);

      Swal.fire({
        icon: "success",
        title: "Review Submitted!",
        text: "Thank you for your feedback.",
        timer: 2000,
        showConfirmButton: false,
      });

      // Reset form
      setRating(0);
      setDescription("");
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 dark:border-white/10"
        >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          {/* Header */}
          <div className="relative bg-gradient-to-r from-rose-600 to-purple-600 p-8 flex items-center justify-between overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="text-white z-10 relative">
              <h2 className="text-3xl font-bold flex items-center gap-2">
                 Write a Review <Sparkles className="w-5 h-5 text-yellow-300" />
              </h2>
              <p className="opacity-90 text-sm mt-1 font-medium text-rose-100">
                Share your experience with {service?.name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors z-10 backdrop-blur-md border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6 relative z-10">
            {/* User Info (Read Only) */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-white/5">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-inner">
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-full h-full p-2.5 text-gray-400" />
                )}
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-lg">
                  {session?.user?.name || "Guest"}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {session?.user?.email}
                </p>
              </div>
            </div>

            {/* Rating Stars */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Your Rating
              </label>
              <div className="flex gap-3 justify-center p-4 bg-gray-50 dark:bg-gray-800/30 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none transition-all duration-300 hover:scale-125"
                  >
                    <Star
                      className={`w-10 h-10 transition-colors duration-200 ${
                        star <= (hoverRating || rating)
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-md"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 uppercase tracking-wide">
                <MessageSquare className="w-4 h-4 text-rose-500" />
                Review Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us about your experience..."
                rows={4}
                required
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all outline-none resize-none shadow-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-rose-500/20 hover:shadow-rose-500/40 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none overflow-hidden relative group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                 {isSubmitting ? "Submitting..." : "Submit Review"}
                 {!isSubmitting && <Sparkles className="w-5 h-5" />}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ServiceReviewModal;
