"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "@/actions/serverData/getData";
import {
  Baby,
  Users,
  Stethoscope,
  ArrowRight,
  CheckCircle,
  HeartHandshake,
  Activity,
  Brain,
  Heart,
  Utensils,
  Accessibility,
  Pill,
  Pause,
  Puzzle,
  Bandage,
  Infinity,
  Car,
  Home,
  Moon,
  BrainCircuit,
  Mic,
  Book,
  Droplet,
  Armchair,
  HeartPulse,
  Bus,
  Building,
  Waves,
  Ambulance,
  PawPrint,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Star,
  X,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  Zap,
  MapPin,
} from "lucide-react";

const iconMap = {
  Baby,
  Users,
  Stethoscope,
  HeartHandshake,
  Activity,
  Brain,
  Heart,
  Utensils,
  Accessibility,
  Pill,
  Pause,
  Puzzle,
  Bandage,
  Infinity,
  Car,
  Home,
  Moon,
  BrainCircuit,
  Mic,
  Book,
  Droplet,
  Armchair,
  HeartPulse,
  Bus,
  Building,
  Waves,
  Ambulance,
  PawPrint,
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ServicesPageContent() {
  // Fetch All Data
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services-all"],
    queryFn: getAllServices,
  });

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Adjusted to match grid layout (3x3)
  const [scrollY, setScrollY] = useState(0);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Extract unique categories (using icon or explicit category if available)
  const categories = useMemo(() => {
    if (!Array.isArray(services)) return ["All"];
    // Fallback: Use 'category' field if exists, else 'General' or map from Name
    const cats = new Set(
      services.map((item) => item.category || "General").filter(Boolean),
    );
    return ["All", ...Array.from(cats)];
  }, [services]);

  // Max price for slider
  const maxPrice = useMemo(() => {
    if (!Array.isArray(services) || services.length === 0) return 1000;
    return Math.max(...services.map((item) => item.priceVal || 0), 1000);
  }, [services]);

  // Update price range when maxPrice changes
  useEffect(() => {
    if (maxPrice > 0 && priceRange[1] === 1000 && maxPrice !== 1000) {
      setPriceRange([0, maxPrice]);
    }
  }, [maxPrice, priceRange]);

  // Filter and Sort Logic
  const filteredData = useMemo(() => {
    if (!Array.isArray(services)) return [];
    let result = [...services];

    // Search
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.name?.toLowerCase().includes(lowerTerm) ||
          item.description?.toLowerCase().includes(lowerTerm),
      );
    }

    // Category
    if (selectedCategory !== "All") {
      result = result.filter(
        (item) => (item.category || "General") === selectedCategory,
      );
    }

    // Price
    result = result.filter(
      (item) =>
        (item.priceVal || 0) >= priceRange[0] &&
        (item.priceVal || 0) <= priceRange[1],
    );

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => (a.priceVal || 0) - (b.priceVal || 0));
        break;
      case "price-high":
        result.sort((a, b) => (b.priceVal || 0) - (a.priceVal || 0));
        break;
      case "rating":
        // Assuming customerReviews exists and has rating
        result.sort((a, b) => {
          const getRating = (item) => {
            if (!item.customerReviews?.length) return 0;
            return (
              item.customerReviews.reduce((acc, r) => acc + r.rating, 0) /
              item.customerReviews.length
            );
          };
          return getRating(b) - getRating(a);
        });
        break;
      default: // featured or default
        break;
    }

    return result;
  }, [services, searchTerm, selectedCategory, priceRange, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Premium Header / Hero */}
      <div className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700/50 pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -right-[10%] w-[800px] h-[800px] bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-sm font-semibold tracking-wide uppercase mb-6 border border-rose-100 dark:border-rose-500/20 shadow-sm">
              <Sparkles className="w-4 h-4 fill-current" />
              Premium Care Services
            </div>
            <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold text-rose-600 dark:text-rose-500 mb-6 tracking-tight leading-tight">
              Professional Care <br />
              <span className="text-rose-600 dark:text-rose-500">
                Tailored For You
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Discover our comprehensive range of care services designed to
              provide comfort, safety, and peace of mind for your family.
            </p>

            {/* Header Search Bar */}
            <div className="max-w-2xl mx-auto relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center p-2 transition-all group-hover:scale-[1.01]">
                <Search className="w-6 h-6 text-gray-400 ml-4" />
                <input
                  type="text"
                  placeholder="Search services (e.g., 'Nanny', 'Senior Care')..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400 px-4 py-3 text-lg outline-none"
                />
                <button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40">
                  Search
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden w-full mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-medium"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Sidebar Filters */}
          <aside
            className={`lg:w-1/4 space-y-8 ${
              isFilterOpen ? "block" : "hidden"
            } lg:block bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 h-fit md:sticky top-24 transition-all duration-300`}
          >
            <div className="flex justify-between items-center lg:hidden mb-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                Filters
              </h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 text-lg">
                <Filter className="w-5 h-5 text-rose-500" /> Categories
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group ${
                      selectedCategory === cat
                        ? "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-bold shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    {cat}
                    {selectedCategory === cat && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-lg">
                Price Range
              </h3>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
                <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400 mt-3">
                  <span>$0</span>
                  <span className="text-rose-600 dark:text-rose-400">
                    ${priceRange[1]}
                  </span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:w-3/4 w-full">
            {/* Sort Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Showing{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  {filteredData.length}
                </span>{" "}
                results
              </p>

              <div className="flex items-center gap-3">
                <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Sort by:
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-900 dark:text-white text-sm font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                  <ChevronRight className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Content Grid */}
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm h-96 animate-pulse border border-gray-100 dark:border-gray-700"
                  >
                    <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-6"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : paginatedData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm">
                <div className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-full mb-6 animate-pulse">
                  <Search className="w-10 h-10 text-rose-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  No services found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
                  We couldn't find any services matching your current filters.
                  Try adjusting your search terms.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setPriceRange([0, maxPrice]);
                    setSortBy("featured");
                  }}
                  className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <AnimatePresence mode="popLayout">
                  {paginatedData.map((service) => {
                    const IconComponent = iconMap[service.icon] || Baby;
                    return (
                      <motion.div
                        key={service._id || service.id}
                        layout
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="group relative bg-white dark:bg-gray-800 rounded-[2rem] p-2 hover:-translate-y-2 transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-rose-100 dark:hover:border-rose-900/50 hover:shadow-2xl hover:shadow-rose-500/10 flex flex-col h-full"
                      >
                        {/* Card Content Container */}
                        <div className="p-6 flex flex-col h-full">
                          {/* Header: Icon & Price */}
                          <div className="flex justify-between items-start mb-6">
                            <div
                              className={`relative w-16 h-16 rounded-2xl flex items-center justify-center ${service.color || "bg-blue-50 text-blue-600"} group-hover:scale-110 transition-transform duration-500`}
                            >
                              <div className="absolute inset-0 bg-current opacity-10 rounded-2xl"></div>
                              <IconComponent className="w-8 h-8 relative z-10" />
                              {/* Decorative spark */}
                              <Zap className="w-4 h-4 absolute -top-2 -right-2 text-yellow-400 fill-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity delay-100" />
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 justify-end mb-1">
                                <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-700 dark:text-green-400 text-xs font-bold flex items-center gap-1">
                                  <ShieldCheck className="w-3 h-3" />
                                  Verified
                                </div>
                              </div>
                              <span className="block text-2xl font-extrabold text-gray-900 dark:text-white">
                                ${service.priceVal}
                              </span>
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                per hour
                              </span>
                            </div>
                          </div>

                          {/* Title & Desc */}
                          <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-rose-600 transition-colors">
                              {service.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                              {service.description}
                            </p>
                          </div>

                          {/* Features */}
                          <div className="space-y-3 mb-8 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">
                            {service.features
                              ?.slice(0, 3)
                              .map((feature, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300"
                                >
                                  <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mr-3 flex-shrink-0">
                                    <CheckCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                                  </div>
                                  <span className="truncate">{feature}</span>
                                </div>
                              ))}
                          </div>

                          {/* Actions */}
                          <div className="mt-auto grid grid-cols-2 gap-3">
                            <Link
                              href={`/services/${service._id}`}
                              className="py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold text-sm text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              Details
                            </Link>
                            {/* <Link
                              href={`/booking/${service._id || service.id}`}
                              className="py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold text-sm text-center shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group/btn"
                            >
                              Book Now
                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link> */}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:border-rose-500 hover:text-rose-500 transition-all shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                          currentPage === page
                            ? "bg-gradient-to-tr from-rose-600 to-purple-600 text-white shadow-md scale-105"
                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:border-rose-500 hover:text-rose-500 transition-all shadow-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
