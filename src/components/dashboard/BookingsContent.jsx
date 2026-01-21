"use client";
import { Calendar, Clock, MapPin } from "lucide-react";
import React, { useState } from "react";

const BookingsContent = ({ allBookig = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const bookings =
    allBookig && allBookig.length > 0 ? allBookig : sampleBookings;

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Delete Booking
  const handelDelete = (id) => {
    console.log("Delete Book id ", id);
  };

  const hadelConfrie = (id) => {
    console.log("penndinng to updeat Conferam", id);
    
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Bookings
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your upcoming and past bookings
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 dark:hover:bg-rose-900/20 dark:hover:text-rose-400 dark:hover:border-rose-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                <th className="p-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Service Details
                </th>
                <th className="p-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Provider
                </th>
                <th className="p-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="p-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="p-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredBookings && filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-100 to-purple-100 dark:from-rose-900/20 dark:to-purple-900/20 flex items-center justify-center text-rose-600 dark:text-rose-400 font-bold text-lg">
                          {booking.serviceName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {booking.serviceName}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ${booking.servicePricePerHour}/hr
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        {booking.user.image && (
                          <img
                            src={booking.user.image}
                            alt={booking.user.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white text-sm">
                            {booking.user.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {booking.user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-500 shrink-0">
                            <Clock className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            {booking.bookingDetails?.dutyTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 shrink-0">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            {booking.bookingDetails?.duration} Hours
                          </span>
                        </div>
                        {(booking.bookingDetails?.location?.address ||
                          booking.bookingDetails?.address) && (
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-500 shrink-0">
                              <MapPin className="w-4 h-4" />
                            </div>
                            <span
                              className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate max-w-[150px]"
                              title={
                                booking.bookingDetails?.location?.address ||
                                booking.bookingDetails?.address
                              }
                            >
                              {booking.bookingDetails?.location?.address ||
                                booking.bookingDetails?.address}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="font-bold text-gray-900 dark:text-white">
                        {booking.financials?.currency}{" "}
                        {booking.financials?.totalCost}
                      </div>
                    </td>
                    <td className="p-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm ${
                          booking.status === "pending"
                            ? "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border-amber-200 dark:from-amber-900/20 dark:to-orange-900/20 dark:text-amber-400 dark:border-amber-800"
                            : booking.status === "confirmed"
                              ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200 dark:from-emerald-900/20 dark:to-teal-900/20 dark:text-emerald-400 dark:border-emerald-800"
                              : "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            booking.status === "pending"
                              ? "bg-amber-500"
                              : booking.status === "confirmed"
                                ? "bg-emerald-500"
                                : "bg-gray-500"
                          }`}
                        />
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handelDelete(booking._id)}
                          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 font-medium text-sm hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20 dark:hover:text-rose-400 transition-colors"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => hadelConfrie(booking._id)}
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-purple-600 text-white font-medium text-sm shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 hover:-translate-y-0.5 transition-all"
                        >
                          Confirm
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                      <div className="text-4xl mb-4 opacity-20">📅</div>
                      <p className="text-lg font-medium">No bookings found</p>
                      <p className="text-sm">
                        {searchTerm || filterStatus !== "all"
                          ? "Try adjusting your filters"
                          : "You haven't made any bookings yet."}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingsContent;
