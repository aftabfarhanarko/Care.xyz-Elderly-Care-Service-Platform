"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { caregivers } from "@/data/caregivers";
import Image from "next/image";
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
  Heart
} from "lucide-react";
import Link from "next/link";

const CaregiverDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [caregiver, setCaregiver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smooth animation
    if (params?.id) {
      const found = caregivers.find((c) => c.id === parseInt(params.id));
      setCaregiver(found);
      setLoading(false);
    }
  }, [params?.id]);

  if (loading || !caregiver) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-rose-950 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-rose-950 to-gray-900 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8 group"
        >
          <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span className="font-medium">Back to Caregivers</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Image & Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Profile Image Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <Image
                  src={caregiver.image}
                  alt={caregiver.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="mt-6 text-center pb-2">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  {caregiver.name}
                </h1>
                <p className="text-rose-400 font-medium text-lg mt-1">{caregiver.role}</p>
                
                <div className="flex items-center justify-center gap-2 mt-4 text-gray-300">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>{caregiver.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
                <h3 className="text-lg font-semibold mb-4 text-gray-200">Quick Information</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-rose-500" />
                            <span className="text-gray-300">Experience</span>
                        </div>
                        <span className="font-bold">{caregiver.experience}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-3">
                            <DollarSign className="w-5 h-5 text-green-400" />
                            <span className="text-gray-300">Rate</span>
                        </div>
                        <span className="font-bold">${caregiver.rate}/hr</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-3">
                            <Star className="w-5 h-5 text-yellow-400" />
                            <span className="text-gray-300">Rating</span>
                        </div>
                        <span className="font-bold">{caregiver.rating} ({caregiver.reviews})</span>
                    </div>
                </div>
                
                <button className="w-full mt-6 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Book Now
                </button>
            </div>
          </motion.div>

          {/* Right Column: Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8 space-y-8"
          >
            {/* About Section */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-rose-500/20 rounded-lg text-rose-400">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">About {caregiver.name.split(' ')[0]}</h2>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                    {caregiver.about}
                </p>
                
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                        <div>
                            <h4 className="font-semibold text-white">Verified Background</h4>
                            <p className="text-sm text-gray-400">Fully vetted and background checked</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                        <div>
                            <h4 className="font-semibold text-white">Certified Professional</h4>
                            <p className="text-sm text-gray-400">Holds relevant certifications</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                        <Award className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">Services Offered</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                    {caregiver.services.map((service, index) => (
                        <span 
                            key={index}
                            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-200 font-medium hover:bg-white/10 transition-colors cursor-default"
                        >
                            {service}
                        </span>
                    ))}
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-yellow-500/20 rounded-lg text-yellow-400">
                        <Heart className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold">Recent Reviews</h2>
                </div>
                <div className="space-y-4">
                    {caregiver.reviews_list.map((review) => (
                        <div key={review.id} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-white">{review.user}</h4>
                                <span className="text-sm text-gray-400">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                                    />
                                ))}
                            </div>
                            <p className="text-gray-300">{review.text}</p>
                        </div>
                    ))}
                </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverDetailsPage;
