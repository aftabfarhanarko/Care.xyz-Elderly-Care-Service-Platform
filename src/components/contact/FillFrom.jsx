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
  Map as MapIcon
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
    date: ""
  });

  const [locations, setLocations] = useState([]);
  const [availableAreas, setAvailableAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch('/resisterData.json')
      .then(res => res.json())
      .then(data => setLocations(data))
      .catch(err => console.error("Failed to load location data", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "district") {
      const selectedLoc = locations.find(loc => loc.district === value);
      setAvailableAreas(selectedLoc ? selectedLoc.covered_area : []);
      setFormData(prev => ({ ...prev, district: value, area: "" }));
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
            date: ""
        });
        setAvailableAreas([]);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className=" dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 da rk:border-gray-700 relative"
      >
        <div className="p-8 md:p-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">Send Message</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-12 text-center max-w-2xl mx-auto">
                Fill out the form below to get in touch with our team. We're here to answer any questions you may have.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">First Name</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="John"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Last Name</label>
                  <div className="relative group">
                    <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Doe"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">District</label>
                    <div className="relative">
                        <MapIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                        <select
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
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
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Area</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                        <select
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            disabled={!formData.district}
                            className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Preferred Date</label>
                    <div className="relative group">
                        <CalendarIcon className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                        />
                    </div>
                  </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Service Interested In</label>
                <div className="relative">
                    <select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="w-full pl-4 pr-10 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white appearance-none cursor-pointer"
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

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Message</label>
                <div className="relative group">
                    <MessageSquare className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        placeholder="Tell us about your care needs..."
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 resize-none"
                    />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || submitted}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 group ${
                    submitted 
                    ? "bg-green-500 hover:bg-green-600 shadow-green-500/30" 
                    : "bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 shadow-rose-500/30 hover:shadow-rose-500/50 hover:-translate-y-0.5"
                }`}
              >
                {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : submitted ? (
                    <>
                        <CheckCircle className="w-5 h-5" />
                        Message Sent!
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
  );
};

export default FillFrom;
