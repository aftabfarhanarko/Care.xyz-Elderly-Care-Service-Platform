"use client";
import React from "react";
import { Star, Quote, User } from "lucide-react";
import { motion } from "framer-motion";

const ServicesReview = ({ reviews = [] }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 shadow-sm">
        <p className="text-gray-500 text-lg">No service reviews available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.map((review, index) => (
        <motion.div
          key={review._id || index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 relative group"
        >
          <div className="absolute top-8 right-8 text-rose-100 group-hover:text-rose-50 transition-colors">
            <Quote size={48} fill="currentColor" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={`${
                    i < (review.rating || 5)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-200"
                  }`}
                />
              ))}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed min-h-[80px]">
              "{review.comment || review.review || "No review text provided."}"
            </p>

            <div className="flex items-center gap-4">
              {review.reviewerImage || review.user?.image ? (
                <img
                  src={review.reviewerImage || review.user?.image}
                  alt={review.reviewerName || review.user?.name || "Reviewer"}
                  className="w-12 h-12 rounded-full object-cover border-2 border-rose-100"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-100 to-purple-100 flex items-center justify-center text-rose-600 font-bold text-lg">
                  {(review.user?.name || review.reviewerName || "A").charAt(0)}
                </div>
              )}
              <div>
                <h4 className="font-bold text-gray-900">
                  {review.user?.name || review.reviewerName || "Anonymous"}
                </h4>
                <p className="text-sm text-gray-500">
                  {review.serviceName || "Service User"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServicesReview;
