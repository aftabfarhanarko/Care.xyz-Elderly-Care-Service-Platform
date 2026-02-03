"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  MapPin,
  Clock,
  CheckCircle,
  Sparkles,
  Calendar as CalendarIcon,
  Map as MapIcon,
  Shield,
  Heart,
  Star,
  Headphones,
} from "lucide-react";
import { toast } from "sonner";
import { fromDataSaved } from "@/actions/serverData/getData";

const FillFrom = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "Babysitting",
    message: "",
    preferredContact: "Email",
    district: "",
    area: "",
    date: "",
  });

  const [locations, setLocations] = useState([]);
  const [availableAreas, setAvailableAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/resisterData.json")
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch((err) => console.error("Failed to load location data", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "district") {
      const selectedLoc = locations.find((loc) => loc.district === value);
      setAvailableAreas(selectedLoc ? selectedLoc.covered_area : []);
      setFormData((prev) => ({ ...prev, district: value, area: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fromDataSaved(formData);
      console.log("Form Data Submitted:", formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setSubmitted(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          serviceType: "Babysitting",
          message: "",
          preferredContact: "Email",
          district: "",
          area: "",
          date: "",
        });
        setAvailableAreas([]);
      }, 3000);
    } catch (error) {
      // console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-200/30 dark:bg-rose-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-[80px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto p-4 md:p-8 lg:p-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left Column: Text & Features */}
          <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-12 lg:sticky lg:top-24 pt-8"
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-medium text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Contact Support</span>
            </div>
            <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold text-rose-600 dark:text-rose-500 leading-tight">
              Lets Start a{" "}
              <span className="text-rose-600 dark:text-rose-500">
                Conversation
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
              Have questions about finding the perfect caregiver? We're here to
              help you every step of the way. Fill out the form, and our team
              will get back to you shortly.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Why Choose Us?
            </h3>
            <div className="grid gap-6">
              {[
                {
                  icon: Shield,
                  title: "Verified & Trusted",
                  desc: "Every caregiver undergoes a rigorous background check process.",
                  color: "text-blue-500",
                  bg: "bg-blue-50 dark:bg-blue-900/20",
                },
                {
                  icon: Headphones,
                  title: "24/7 Support",
                  desc: "Our dedicated support team is always available to assist you.",
                  color: "text-purple-500",
                  bg: "bg-purple-50 dark:bg-purple-900/20",
                },
                {
                  icon: Heart,
                  title: "Care with Love",
                  desc: "We prioritize caregivers who show genuine passion and care.",
                  color: "text-rose-500",
                  bg: "bg-rose-50 dark:bg-rose-900/20",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className={`p-3 rounded-xl ${feature.bg} ${feature.color}`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Email Us
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  support@babysitting.com
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Call Us
                </p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/50 relative transform hover:-translate-y-1 transition-transform duration-300"
          >
             {/* Decorative Elements */}
             <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-gradient-to-br from-rose-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />
             <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-teal-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="p-8 md:p-10 lg:p-12 relative z-10">
              <div className="mb-10 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">Send us a Message</h2>
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                      We'd love to hear from you! Please fill out the form below.
                  </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">First Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="John"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Last Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Doe"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Phone Number</label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">District</label>
                      <div className="relative">
                          <MapIcon className="absolute left-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
                          <select
                              name="district"
                              value={formData.district}
                              onChange={handleChange}
                              className="w-full pl-12 pr-10 py-4 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 outline-none transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
                          >
                              <option value="">Select District</option>
                              {locations.map((loc, idx) => (
                                  <option key={idx} value={loc.district}>{loc.district}</option>
                              ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Area</label>
                      <div className="relative">
                          <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400 pointer-events-none" />
                          <select
                              name="area"
                              value={formData.area}
                              onChange={handleChange}
                              disabled={!formData.district}
                              className="w-full pl-12 pr-10 py-4 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 outline-none transition-all text-gray-900 dark:text-white appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                              <option value="">Select Area</option>
                              {availableAreas.map((area, idx) => (
                                  <option key={idx} value={area}>{area}</option>
                              ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                      </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Preferred Date</label>
                      <div className="relative group">
                          <CalendarIcon className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                          <input
                              type="date"
                              name="date"
                              value={formData.date}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                          />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Service Type</label>
                      <div className="relative">
                          <select
                              name="serviceType"
                              value={formData.serviceType}
                              onChange={handleChange}
                              className="w-full pl-4 pr-10 py-4 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 outline-none transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
                          >
                              <option>Babysitting</option>
                              <option>Nanny Service</option>
                              <option>Senior Care</option>
                              <option>Pet Care</option>
                              <option>Special Needs Care</option>
                              <option>Housekeeping</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                      </div>
                    </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Message</label>
                  <div className="relative group">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                      <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows="4"
                          placeholder="Tell us about your care needs..."
                          className="w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 resize-none"
                      />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || submitted}
                  className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl transition-all flex items-center justify-center gap-3 group text-lg ${
                      submitted 
                      ? "bg-green-500 hover:bg-green-600 shadow-green-500/30" 
                      : "bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 shadow-rose-500/40 hover:shadow-rose-500/60 hover:-translate-y-1"
                  }`}
                >
                  {loading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : submitted ? (
                      <>
                          <CheckCircle className="w-6 h-6" />
                          Message Sent Successfully!
                      </>
                  ) : (
                      <>
                          Send Message
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
      </div>
    </div>
    </div>
  );
};

export default FillFrom;
