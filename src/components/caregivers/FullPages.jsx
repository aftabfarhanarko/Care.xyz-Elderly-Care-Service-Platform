"use client";
import React, { useState } from "react";
import {
  Star,
  ArrowRight,
  MapPin,
  Clock,
  Heart,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  SlidersHorizontal,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FullPages = ({ caregivers }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [searchQuery, setSearchQuery] = useState("");

  // Filter caregivers based on search query
  const filteredCaregivers = caregivers.filter(
    (caregiver) =>
      caregiver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caregiver.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (caregiver.location &&
        caregiver.location.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredCaregivers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCaregivers = filteredCaregivers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden min-h-screen">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden hidden dark:block">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-semibold tracking-wider uppercase">
              <Star className="w-3.5 h-3.5 fill-current" />
              Top Rated Professionals
            </div>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold text-rose-600 dark:text-rose-500 leading-tight">
              Find Your Perfect{" "}
              <span className="text-rose-600 dark:text-rose-500">
                Caregiver
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Trusted by thousands of families. Verified backgrounds, certified
              skills, and loving care.
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
              <input
                type="text"
                placeholder="Search name, role, or location..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
                className="w-full sm:w-80 pl-12 pr-4 py-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all shadow-sm hover:shadow-md text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:border-rose-500 hover:text-rose-500 hover:shadow-lg hover:shadow-rose-500/10 transition-all">
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Showing{" "}
            <span className="text-gray-900 dark:text-white font-bold">
              {filteredCaregivers.length > 0 ? startIndex + 1 : 0}-
              {Math.min(startIndex + itemsPerPage, filteredCaregivers.length)}
            </span>{" "}
            of{" "}
            <span className="text-gray-900 dark:text-white font-bold">
              {filteredCaregivers.length}
            </span>{" "}
            verified caregivers
          </p>
        </div>

        {/* Results Grid or Empty State */}
        {filteredCaregivers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {currentCaregivers.map((caregiver) => (
              <div
                key={caregiver.id}
                className="group relative bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-500/20 border border-gray-100 dark:border-gray-700/50"
              >
                <Link
                  href={`/caregivers/${caregiver.id}`}
                  className="block h-full flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={caregiver.image}
                      alt={caregiver.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Glassmorphism Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                        <div
                          className={`w-2 h-2 rounded-full ${Math.random() > 0.3 ? "bg-green-400 animate-pulse" : "bg-gray-400"}`}
                        ></div>
                        <span className="text-xs font-bold text-white tracking-wide uppercase">
                          {Math.random() > 0.3 ? "Available" : "Offline"}
                        </span>
                      </div>
                    </div>

                    <button className="absolute top-4 right-4 p-2.5 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-rose-500 hover:border-rose-500 transition-all duration-300 shadow-lg translate-x-12 group-hover:translate-x-0">
                      <Heart className="w-5 h-5" />
                    </button>

                    {/* Floating Info Card on Image */}
                    <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-lg">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-0.5 flex items-center gap-2">
                              {caregiver.name}
                              <ShieldCheck className="w-4 h-4 text-blue-400" />
                            </h3>
                            <p className="text-gray-200 text-sm font-medium">
                              {caregiver.role}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 bg-yellow-400/20 px-2 py-1 rounded-lg border border-yellow-400/30">
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                            <span className="text-white text-xs font-bold">
                              {caregiver.rating}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-300 mt-2">
                          <MapPin className="w-3.5 h-3.5 text-rose-400" />
                          <span className="truncate">
                            {caregiver.location || "New York, USA"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 pt-6 pb-6 flex-grow flex flex-col justify-between space-y-4 relative bg-white dark:bg-gray-800">
                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2">
                      {["CPR Certified", "First Aid", "Non-smoker"]
                        .slice(0, 2)
                        .map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      <span className="px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-400 text-xs font-medium border border-gray-100 dark:border-gray-700">
                        +3 more
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />

                    {/* Price & Action */}
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                          Rate per hour
                        </p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            ${caregiver.rate || "15"}
                          </span>
                        </div>
                      </div>
                      <div className="group/btn flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-sm group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                        View Profile
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-rose-50 dark:bg-rose-900/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <Search className="w-10 h-10 text-rose-500/50" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Caregivers Found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
              We couldn't find any caregivers matching{" "}
              <span className="text-rose-600 font-semibold">
                "{searchQuery}"
              </span>
              . Try adjusting your search terms or clearing filters.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="group px-8 py-3 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-full font-bold text-gray-700 dark:text-gray-200 hover:border-rose-500 hover:text-rose-600 transition-all hover:shadow-lg hover:shadow-rose-500/10 flex items-center gap-2"
            >
              Clear Search
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="group p-3 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-rose-500 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-lg hover:shadow-rose-500/10"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-rose-500 transition-colors" />
            </button>

            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all duration-300 ${
                      currentPage === page
                        ? "bg-gradient-to-tr from-rose-600 to-purple-600 text-white shadow-lg shadow-rose-500/30 scale-110"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="group p-3 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-rose-500 hover:bg-white dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-lg hover:shadow-rose-500/10"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-rose-500 transition-colors" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FullPages;
