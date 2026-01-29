"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Clock,
  User,
  Mail,
  DollarSign,
  CheckCircle,
  Briefcase,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { caregiverDataSaved } from "@/actions/serverData/caregiverAPi";
import { useQueryClient } from "@tanstack/react-query";

const CaregiversModal = ({ isOpen, onClose, caregiver, onBookingSuccess }) => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    service: "",
    days: 1,
    hoursPerDay: 4,
    startDate: "",
    startTime: "",
  });

  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    if (caregiver && formData.days && formData.hoursPerDay) {
      const rate = Number(caregiver.rate) || 0;
      const days = Number(formData.days) || 0;
      const hours = Number(formData.hoursPerDay) || 0;
      const cost = rate * days * hours;
      setTotalCost(cost);
    }
  }, [caregiver, formData.days, formData.hoursPerDay]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose(true);
    // Validate inputs
    if (!formData.startDate || !formData.startTime || !formData.service) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please select a service, start date, and time.",
      });
      return;
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        popup:
          "rounded-[2rem] dark:bg-gray-800 dark:text-white p-0 overflow-hidden",
        confirmButton:
          "bg-rose-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-rose-700 transition-all mx-2 shadow-lg hover:shadow-rose-500/30 transform hover:-translate-y-0.5",
        cancelButton:
          "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 font-bold py-3 px-8 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all mx-2 transform hover:-translate-y-0.5",
        title: "text-2xl font-bold text-gray-900 dark:text-white mb-1 pt-8",
        htmlContainer: "text-left px-8 pb-8",
        actions: "pb-8 px-8 w-full justify-center gap-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Confirm Booking",
        html: `
        <div class="space-y-6 mt-4">
          <p class="text-gray-500 dark:text-gray-400 text-center text-sm">Please review your booking details below before proceeding.</p>
          
          <div class="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 space-y-4">
            <!-- Caregiver Info -->
            <div class="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-600">
              <div class="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400 overflow-hidden">
                ${
                  caregiver?.image
                    ? `<img src="${caregiver.image}" alt="${caregiver.name}" class="w-full h-full object-cover" />`
                    : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
                }
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Caregiver</p>
                <p class="font-bold text-gray-900 dark:text-white text-lg">${caregiver?.name}</p>
              </div>
            </div>

            <!-- Details Grid -->
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2 bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Service Type</p>
                <p class="font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-rose-500"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                  ${formData.service}
                </p>
              </div>
              <div class="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Duration</p>
                <p class="font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-rose-500"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  ${formData.days} Days
                </p>
              </div>
              <div class="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Daily Hours</p>
                <p class="font-semibold text-gray-900 dark:text-white flex items-center gap-1 truncate">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-rose-500"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  ${formData.hoursPerDay} Hrs/Day
                </p>
              </div>
            </div>

            <!-- Schedule -->
            <div class="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Start Schedule</p>
              <p class="font-semibold text-gray-900 dark:text-white truncate flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-rose-500"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                ${formData.startDate} at ${formData.startTime}
              </p>
            </div>

            <!-- Total Cost -->
            <div class="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-600 mt-2">
              <span class="font-bold text-gray-600 dark:text-gray-300">Total Cost</span>
              <span class="text-2xl font-extrabold text-rose-600 dark:text-rose-400">$${totalCost.toLocaleString()}</span>
            </div>
          </div>
        </div>
      `,
        showCancelButton: true,
        confirmButtonText: "Confirm Booking",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        focusConfirm: false,
        width: "32rem",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          // Here you would typically send the booking data to your backend
          const savedData = {
            caregiverId: caregiver._id || caregiver.id,
            caregiverName: caregiver.name,
            caregiverImage: caregiver.image,
            bookerEmail: session?.user?.email,
            bookerName: session?.user?.name,
            state:"pending",
            bookerImages: session?.user?.image,
            createdAt: new Date().toISOString(),
            ...formData,
            totalCost,
          };

          const saveResult = await caregiverDataSaved(savedData);

          console.log("This Data Saved DB", saveResult);

          // Invalidate the booking status query to update the UI immediately
          queryClient.invalidateQueries(["bookingStatus", caregiver._id || caregiver.id]);

          setFormData({
            days: 1,
            hoursPerDay: 4,
            startDate: "",
            startTime: "",
          });

          onClose();
          
          if (onBookingSuccess) {
            onBookingSuccess();
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your booking process has been cancelled :)",
            icon: "error",
            customClass: {
              popup:
                "rounded-[2rem] dark:bg-gray-800 dark:text-white p-0 overflow-hidden",
              confirmButton:
                "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 font-bold py-3 px-8 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all",
              title:
                "text-2xl font-bold text-gray-900 dark:text-white mb-2 pt-8",
              htmlContainer:
                "text-center px-8 pb-8 text-gray-600 dark:text-gray-300",
              actions: "pb-8 px-8 w-full justify-center",
            },
          });
        }
      });
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
          className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
        >
          {/* Header */}
          <div className="relative h-32 bg-gradient-to-r from-rose-500 to-purple-600 p-6 flex items-center justify-between">
            <div className="text-white z-10">
              <h2 className="text-2xl font-bold">Book {caregiver?.name}</h2>
              <p className="opacity-90 text-sm mt-1">
                Complete the details below to secure your booking
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors z-10 backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-900/20 rounded-full blur-2xl" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar"
          >
            {/* User Details Section */}
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-4 border border-gray-100 dark:border-gray-700/50">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                Your Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <User className="w-4 h-4 text-rose-500" /> Name
                  </label>
                  <input
                    type="text"
                    value={session?.user?.name || "Guest User"}
                    disabled
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-rose-500" /> Email
                  </label>
                  <input
                    type="text"
                    value={session?.user?.email || "guest@example.com"}
                    disabled
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Booking Details Section */}
            <div className="space-y-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Booking Preferences
              </h3>

              {/* Service Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Select Service
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all outline-none appearance-none"
                  >
                    <option value="" disabled>
                      Select a service...
                    </option>
                    {caregiver?.services?.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Duration */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Duration (Days)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="days"
                      min="1"
                      max="30"
                      value={formData.days}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Hours Per Day */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Hours per Day
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      name="hoursPerDay"
                      min="1"
                      max="24"
                      value={formData.hoursPerDay}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Start Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all outline-none accent-rose-500"
                  />
                </div>

                {/* Start Time */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all outline-none accent-rose-500"
                  />
                </div>
              </div>
            </div>

            {/* Cost Breakdown & Summary */}
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-5 border border-gray-100 dark:border-gray-700/50 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Payment Summary
              </h3>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Hourly Rate
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-200">
                  ${caregiver?.rate}/hr
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Daily Hours
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-200">
                  {formData.hoursPerDay} hrs/day
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Daily Subtotal
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-200">
                  $
                  {(
                    Number(caregiver?.rate || 0) *
                    Number(formData.hoursPerDay || 0)
                  ).toFixed(2)}{" "}
                  /day
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                  Total Duration
                </span>
                <span className="font-medium text-gray-900 dark:text-gray-200">
                  {formData.days} days
                </span>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-600 pt-3 mt-2 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Estimated Cost
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    Includes all fees and taxes
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-rose-600 dark:text-rose-400 block">
                    ${totalCost}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 px-6 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-[2] py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Confirm Booking
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CaregiversModal;
