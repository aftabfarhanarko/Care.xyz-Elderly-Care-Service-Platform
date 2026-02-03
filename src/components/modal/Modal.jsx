"use client";
import React, { useState, useEffect } from "react";
import {
  X,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  ChevronDown,
  Building,
  Home,
  Map,
  User,
  Info,
  DollarSign,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { savedServicesData } from "@/actions/serverData/getData";
import { useQueryClient } from "@tanstack/react-query";

const Modal = ({ isOpen, onClose, service, locationData, SetIsOpenModal, onBookingSuccess }) => {
  const queryClient = useQueryClient();
  const session = useSession();
  const user = session?.data?.user;

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    duration: "",
    dutyTime: "",
    division: "",
    district: "",
    city: "",
    area: "",
    address: "",
    moreInfo: "",
  });

  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    if (service?.priceVal && formData.duration) {
      const duration = parseFloat(formData.duration) || 0;
      setTotalCost(duration * service.priceVal);
    } else {
      setTotalCost(0);
    }
  }, [formData.duration, service]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        userName: user.name || "",
        userEmail: user.email || "",
      }));
    }
  }, [user]);

  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]); // In case multiple cities per district
  const [areas, setAreas] = useState([]);

  // Reset form when modal closes or opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Extract unique regions (Divisions)
  const divisions = locationData
    ? [...new Set(locationData.map((item) => item.region))]
    : [];

  // Handle Division Change
  const handleDivisionChange = (e) => {
    const selectedDivision = e.target.value;
    setFormData((prev) => ({
      ...prev,
      division: selectedDivision,
      district: "",
      city: "",
      area: "",
    }));

    if (locationData) {
      const filteredDistricts = locationData
        .filter((item) => item.region === selectedDivision)
        .map((item) => item.district);
      setDistricts([...new Set(filteredDistricts)]);
    }
  };

  // Handle District Change
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setFormData((prev) => ({
      ...prev,
      district: selectedDistrict,
      city: "",
      area: "",
    }));

    if (locationData) {
      const relevantEntries = locationData.filter(
        (item) => item.district === selectedDistrict,
      );
      // Assuming one city per district based on JSON, but handling array just in case
      const filteredCities = relevantEntries.map((item) => item.city);
      setCities([...new Set(filteredCities)]);

      // If only one city, auto-select it? Maybe let user select.
      if (filteredCities.length === 1) {
        handleCityChange(
          { target: { value: filteredCities[0] } },
          selectedDistrict,
        );
      }
    }
  };

  // Handle City Change (or auto-called)
  const handleCityChange = (e, currentDistrict = formData.district) => {
    const selectedCity = e.target.value;
    setFormData((prev) => ({
      ...prev,
      city: selectedCity,
      district: currentDistrict,
      area: "",
    }));

    if (locationData) {
      const entry = locationData.find(
        (item) =>
          item.district === currentDistrict && item.city === selectedCity,
      );
      if (entry && entry.covered_area) {
        setAreas(entry.covered_area);
      } else {
        setAreas([]);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SetIsOpenModal(false);

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
            <!-- Service Info -->
            <div class="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-600">
              <div class="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Service</p>
                <p class="font-bold text-gray-900 dark:text-white text-lg">${service?.name}</p>
              </div>
            </div>

            <!-- Details Grid -->
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Duration</p>
                <p class="font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-rose-500"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  ${formData.duration} Hours
                </p>
              </div>
              <div class="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Duty Time</p>
                <p class="font-semibold text-gray-900 dark:text-white flex items-center gap-1 truncate">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-rose-500"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  ${formData.dutyTime}
                </p>
              </div>
            </div>

            <!-- Location -->
            <div class="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
              <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Location</p>
              <p class="font-semibold text-gray-900 dark:text-white truncate flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-rose-500"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                ${formData.area}, ${formData.city}
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
          // Prepare Booking Data
          const bookingData = {
            serviceId: service?.id || service?._id,
            serviceName: service?.name,
            servicePricePerHour: service?.priceVal,
            user: {
              name: formData.userName,
              email: formData.userEmail,
              image: user?.image || "",
            },
            bookingDetails: {
              duration: formData.duration,
              dutyTime: formData.dutyTime,
              location: {
                division: formData.division,
                district: formData.district,
                city: formData.city,
                area: formData.area,
                address: formData.address,
              },
              moreInfo: formData.moreInfo,
            },
            financials: {
              totalCost: totalCost,
              currency: "USD",
            },
            status: "pending",
            createdAt: new Date().toISOString(),
          };
          const result = await savedServicesData(bookingData);

          // console.log("Booking Request Data:", result);

          // Invalidate the booking status query to update the UI immediately
          queryClient.invalidateQueries([
            "bookingStatus",
            service?._id || service?.id,
          ]);

          if (onBookingSuccess) {
            onBookingSuccess();
          }

          swalWithBootstrapButtons.fire({
            title: "Booking Confirmed!",
            text: "Your booking request has been submitted successfully.",
            icon: "success",
            customClass: {
              popup:
                "rounded-[2rem] dark:bg-gray-800 dark:text-white p-0 overflow-hidden",
              confirmButton:
                "bg-rose-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-rose-700 transition-all shadow-lg hover:shadow-rose-500/30",
              title:
                "text-2xl font-bold text-gray-900 dark:text-white mb-2 pt-8",
              htmlContainer:
                "text-center px-8 pb-8 text-gray-600 dark:text-gray-300",
              actions: "pb-8 px-8 w-full justify-center",
            },
          });

          setFormData({
            userName: user?.name || "",
            userEmail: user?.email || "",
            duration: "",
            dutyTime: "",
            division: "",
            district: "",
            city: "",
            area: "",
            address: "",
            moreInfo: "",
          });

          onClose();
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
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative border border-gray-100 dark:border-gray-700"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md z-10 px-8 py-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    Book {service?.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Fill in the details to schedule your service
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Body */}
              <div className="p-8 space-y-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-500" />
                      Personal Details
                    </h3>

                    {user?.image && (
                      <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-md"
                        />
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Name
                        </label>
                        <input
                          type="text"
                          name="userName"
                          value={formData.userName}
                          readOnly
                          className="w-full px-5 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none transition-all dark:text-white cursor-not-allowed opacity-70"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email
                        </label>
                        <input
                          type="email"
                          name="userEmail"
                          value={formData.userEmail}
                          readOnly
                          className="w-full px-5 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none transition-all dark:text-white cursor-not-allowed opacity-70"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Duration Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-rose-500" />
                      Duration & Timing
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Service Duration (Hours)
                        </label>
                        <input
                          type="number"
                          name="duration"
                          required
                          min="1"
                          placeholder="e.g., 5"
                          value={formData.duration}
                          onChange={handleChange}
                          className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all dark:text-white"
                        />
                      </div>
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Duty Time
                        </label>
                        <input
                          type="text"
                          name="dutyTime"
                          required
                          placeholder="e.g., 9:00 AM - 5:00 PM"
                          value={formData.dutyTime}
                          onChange={handleChange}
                          className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Total Cost Display */}
                    <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl border border-rose-100 dark:border-rose-900/30 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold">
                        <DollarSign className="w-5 h-5" />
                        <span>Estimated Total Cost</span>
                      </div>
                      <div className="text-2xl font-extrabold text-gray-900 dark:text-white">
                        ${totalCost.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Location Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-purple-500" />
                      Location Details
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Division */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Division
                        </label>
                        <div className="relative">
                          <select
                            name="division"
                            value={formData.division}
                            onChange={handleDivisionChange}
                            required
                            className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all appearance-none dark:text-white"
                          >
                            <option value="">Select Division</option>
                            {divisions.map((div) => (
                              <option key={div} value={div}>
                                {div}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* District */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          District
                        </label>
                        <div className="relative">
                          <select
                            name="district"
                            value={formData.district}
                            onChange={handleDistrictChange}
                            required
                            disabled={!formData.division}
                            className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all appearance-none disabled:opacity-50 dark:text-white"
                          >
                            <option value="">Select District</option>
                            {districts.map((dist) => (
                              <option key={dist} value={dist}>
                                {dist}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* City */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          City
                        </label>
                        <div className="relative">
                          <select
                            name="city"
                            value={formData.city}
                            onChange={handleCityChange}
                            required
                            disabled={!formData.district}
                            className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all appearance-none disabled:opacity-50 dark:text-white"
                          >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      {/* Area */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Area
                        </label>
                        <div className="relative">
                          <select
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            required
                            disabled={!formData.city}
                            className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all appearance-none disabled:opacity-50 dark:text-white"
                          >
                            <option value="">Select Area</option>
                            {areas.map((area) => (
                              <option key={area} value={area}>
                                {area}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Full Address */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Detailed Address
                      </label>
                      <textarea
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="House No, Road No, Block, etc."
                        rows="2"
                        className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all dark:text-white resize-none"
                      />
                    </div>
                  </div>

                  {/* More Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Info className="w-5 h-5 text-green-500" />
                      More Information
                    </h3>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Additional Notes or Requests
                      </label>
                      <textarea
                        name="moreInfo"
                        value={formData.moreInfo}
                        onChange={handleChange}
                        placeholder="Any specific instructions or requirements..."
                        rows="3"
                        className="w-full px-5 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all dark:text-white resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold text-lg shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Confirm Booking
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
