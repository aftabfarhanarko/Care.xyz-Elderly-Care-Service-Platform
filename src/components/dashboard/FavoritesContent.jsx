"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Trash2,
  CheckCircle,
  Briefcase,
  AlertCircle,
  Search,
  CheckCheck,
  Heart,
  List,
  LayoutGrid,
  Filter,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  MapPin,
  FileText,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";
import Swal from "sweetalert2";
import {
  deleteCaregivers,
  updateCaregivers,
} from "@/actions/serverData/dashbordApi";

const FavoritesContent = ({ data = [] }) => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const favorites = Array.isArray(data) && data.length > 0 ? data : [];

  // Helper to clean image URLs (remove backticks/quotes)
  const cleanImageUrl = (url) => {
    if (!url) return null;
    return url.replace(/[`'"]/g, "").trim();
  };

  // Filter items
  const filteredFavorites = favorites.filter(
    (item) =>
      item.caregiverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.service?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredFavorites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFavorites = filteredFavorites.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const getStatusConfig = (state = "pending") => {
    const status = (state || "pending").toLowerCase().trim();

    switch (status) {
      case "confirmed":
        return {
          bg: "bg-emerald-500",
          light:
            "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
          border: "border-emerald-200 dark:border-emerald-800/40",
          icon: CheckCircle,
          label: "Confirmed",
          dot: "bg-emerald-500",
        };

      case "completed":
        return {
          bg: "bg-blue-600",
          light:
            "bg-blue-50 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300",
          border: "border-blue-200 dark:border-blue-800/40",
          icon: CheckCheck,
          label: "Completed",
          dot: "bg-blue-600",
        };

      case "pending":
      default:
        return {
          bg: "bg-amber-500",
          light:
            "bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
          border: "border-amber-200 dark:border-amber-800/40",
          icon: Clock,
          label: "Pending",
          dot: "bg-amber-500",
        };
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "—";
    // Check if it's already in a time format like "19:10"
    if (timeStr.includes(":")) {
      const [hours, minutes] = timeStr.split(":");
      const date = new Date();
      date.setHours(parseInt(hours), parseInt(minutes));
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }

    try {
      return new Date(`1970-01-01T${timeStr}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return timeStr;
    }
  };

  const handleConfirm = async (id) => {
    try {
      const res = await updateCaregivers(id, { state: "confirmed" });
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Booking Confirmed!",
          text: "The caregiver has been notified.",
          showConfirmButton: false,
          timer: 2000,
          background: "#ffffff",
          iconColor: "#10b981",
          customClass: {
            popup: "rounded-2xl shadow-xl border border-gray-100",
            title: "text-gray-900 font-bold text-xl",
            htmlContainer: "text-gray-500",
          },
        });
        router.refresh();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to confirm booking",
        confirmButtonColor: "#e11d48",
        customClass: {
          popup: "rounded-2xl",
          confirmButton: "rounded-xl px-6 py-2.5 font-medium",
        },
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Booking?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      iconColor: "#f43f5e",
      customClass: {
        popup: "rounded-2xl shadow-xl border border-gray-100",
        title: "text-gray-900 font-bold text-xl",
        htmlContainer: "text-gray-500",
        confirmButton:
          "rounded-xl px-6 py-2.5 font-medium shadow-sm shadow-rose-500/20",
        cancelButton:
          "rounded-xl px-6 py-2.5 font-medium bg-gray-100 text-gray-700 hover:bg-gray-200",
        actions: "gap-3",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteCaregivers(id);
          if (res) {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Booking has been removed.",
              showConfirmButton: false,
              timer: 1500,
              background: "#ffffff",
              iconColor: "#e11d48",
              customClass: {
                popup: "rounded-2xl shadow-xl border border-gray-100",
                title: "text-gray-900 font-bold text-xl",
              },
            });
            router.refresh();
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete booking",
            confirmButtonColor: "#e11d48",
            customClass: {
              popup: "rounded-2xl",
              confirmButton: "rounded-xl px-6 py-2.5 font-medium",
            },
          });
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 md:p-4 bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-900/40 dark:to-rose-900/20 rounded-2xl border border-rose-200/50 dark:border-rose-700/30 shadow-sm flex-shrink-0">
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  Caregivers Booking
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                  View and manage your caregiver bookings
                  <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-[10px] font-medium border border-rose-100 dark:border-rose-800">
                    {favorites.length} Bookings
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 self-start md:self-center">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-700 text-rose-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-700 text-rose-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by caregiver or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all outline-none"
              />
            </div>
            <button className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-gray-700 dark:text-gray-300 font-medium shadow-sm">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <AnimatePresence mode="wait">
        {viewMode === "list" ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="pl-6 pr-3 py-4 text-left">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Delivery
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Fulfillment
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {currentFavorites.map((item) => {
                    const status = getStatusConfig(item.state);
                    
                    return (
                      <motion.tr
                        key={item._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.01)" }}
                        className="group transition-colors"
                      >
                        <td className="pl-6 pr-3 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          #{item._id.substring(0, 6).toUpperCase()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(item.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-gray-800 flex items-center justify-center border border-rose-100 dark:border-gray-700 text-rose-500 font-medium text-xs overflow-hidden">
                              {item.bookerName?.charAt(0).toUpperCase() || "C"}
                            </div>
                            <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                              {item.bookerName || "Unknown"}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.state === 'confirmed' || item.state === 'completed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                              : 'bg-amber-50 text-amber-700 border border-amber-100'
                          }`}>
                            {item.state === 'confirmed' || item.state === 'completed' ? 'Success' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          ${item.totalCost || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(item.startDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {item.service || "General Care"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${status.light} ${status.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                            {status.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-200" title="View">
                              <FileText className="w-4 h-4" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-200" title="Message">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                            {item.state === "pending" && (
                              <button
                                onClick={() => handleConfirm(item._id)}
                                className="p-1 hover:bg-gray-100 rounded text-emerald-600 hover:text-emerald-700 dark:hover:bg-gray-700"
                                title="Confirm"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="p-1 hover:bg-gray-100 rounded text-rose-600 hover:text-rose-700 dark:hover:bg-gray-700"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentFavorites.map((item) => {
              const status = getStatusConfig(item.state);
              const StatusIcon = status.icon;

              return (
                <motion.div
                  key={item._id}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-white to-rose-50/30 dark:from-gray-800 dark:to-rose-900/10 rounded-2xl p-6 border border-rose-100 dark:border-rose-900/30 hover:shadow-xl hover:shadow-rose-100/50 dark:hover:shadow-none transition-all group relative"
                >
                  <div className="absolute top-4 right-4 z-10">
                    {item.state === "confirmed" ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-emerald-600 bg-emerald-50 border border-emerald-100 font-medium text-xs shadow-sm">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Confirmed
                      </span>
                    ) : (
                      <div className="flex gap-1">
                        {item.state === "pending" && (
                          <button
                            onClick={() => handleConfirm(item._id)}
                            className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-emerald-600 border border-emerald-600 hover:bg-emerald-50 transition-colors bg-white/80 backdrop-blur-sm"
                            title="Confirm Booking"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">Confirm</span>
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-red-600 border border-red-600 hover:bg-red-50 transition-colors bg-white/80 backdrop-blur-sm"
                          title="Delete Booking"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="text-xs font-medium">Delete</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="pt-8">
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="w-20 h-20 rounded-2xl bg-rose-50 dark:bg-gray-800 flex items-center justify-center border-2 border-white dark:border-gray-700 shadow-lg text-rose-500 text-3xl font-bold overflow-hidden mb-3 relative">
                        {item.caregiverImage ? (
                          <img
                            src={cleanImageUrl(item.caregiverImage)}
                            alt={item.caregiverName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          item.caregiverName?.charAt(0).toUpperCase() || "C"
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-rose-600 transition-colors">
                        {item.caregiverName || "Unknown Caregiver"}
                      </h3>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mt-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{item.service || "General Care"}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 mb-4 border border-gray-100 dark:border-gray-700/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-800 flex items-center justify-center border border-blue-100 dark:border-gray-700 text-blue-500 font-medium text-sm overflow-hidden flex-shrink-0">
                          {item.bookerImages ? (
                            <img
                              src={cleanImageUrl(item.bookerImages)}
                              alt={item.bookerName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            item.bookerName?.charAt(0).toUpperCase() || "B"
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                            Booked by
                          </p>
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-200 truncate">
                            {item.bookerName || "Unknown Client"}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {item.bookerEmail || "No Email"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {item.days && (
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-rose-50/50 dark:bg-rose-900/10 rounded-xl p-2 border border-rose-100 dark:border-rose-800/30 flex flex-col items-center justify-center text-center">
                           <span className="text-lg font-bold text-rose-600 dark:text-rose-400">{item.days}</span>
                           <span className="text-xs text-gray-500">Days</span>
                        </div>
                        <div className="bg-rose-50/50 dark:bg-rose-900/10 rounded-xl p-2 border border-rose-100 dark:border-rose-800/30 flex flex-col items-center justify-center text-center">
                           <span className="text-lg font-bold text-rose-600 dark:text-rose-400">{item.hoursPerDay}</span>
                           <span className="text-xs text-gray-500">Hours/Day</span>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-sm">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                          <Calendar className="w-3.5 h-3.5" />
                          <span className="font-medium">
                            {formatDate(item.startDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 text-xs pl-5">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(item.startTime)}</span>
                        </div>
                         <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500 text-xs pl-5 mt-1">
                          <Calendar className="w-3 h-3 text-rose-400" />
                          <span>Booked: {formatDate(item.createdAt)}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-0.5">
                        <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
                          <DollarSign className="w-4 h-4" />
                          <span className="text-lg">{item.totalCost}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg border transition-colors ${
                currentPage === page
                  ? "bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-200"
                  : "border-gray-200 dark:border-gray-700 hover:border-rose-300 dark:hover:border-rose-700 hover:text-rose-600"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoritesContent;
