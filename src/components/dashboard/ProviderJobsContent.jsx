"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Plus,
  MapPin,
  Star,
  DollarSign,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const ProviderJobsContent = ({ caregivers }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data if no props provided (using user's format)
  const jobsData =
    caregivers && caregivers.length > 0
      ? caregivers
      : [
          {
            _id: "69735a6a31abce0f67a737a8",
            name: "Emily R.",
            role: "Math Tutor",
            about:
              "Patient math tutor specializing in middle and high school students.",
            experience: "5 Years",
            image:
              "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
            location: "Brooklyn, NY",
            rate: 28,
            rating: 4.8,
            reviews: 62,
            services: ["Algebra", "Geometry", "Homework Help", "Exam Prep"],
            publishEmail: "aftabfarhan324@gmail.com",
          },
          // Add a few more mock items for demonstration
          {
            _id: "69735a6a31abce0f67a737a9",
            name: "Michael B.",
            role: "Nanny",
            about:
              "Experienced nanny with a focus on early childhood development.",
            experience: "7 Years",
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
            location: "Manhattan, NY",
            rate: 35,
            rating: 4.9,
            reviews: 45,
            services: ["Infant Care", "Meal Prep", "Light Housekeeping"],
            publishEmail: "michael.b@example.com",
          },
          {
            _id: "69735a6a31abce0f67a737b0",
            name: "Sarah K.",
            role: "Elderly Care",
            about: "Compassionate caregiver for seniors.",
            experience: "10 Years",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
            location: "Queens, NY",
            rate: 30,
            rating: 5.0,
            reviews: 28,
            services: [
              "Medication Reminders",
              "Companionship",
              "Mobility Assistance",
            ],
            publishEmail: "sarah.k@example.com",
          },
        ];

  // Filter logic
  const filteredJobs = jobsData.filter(
    (job) =>
      job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-[2rem] p-8 overflow-hidden shadow-2xl shadow-gray-900/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Caregiver</h1>
            <p className="text-gray-300">
              Manage your active job listings and services
            </p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3.5 bg-white text-gray-900 hover:bg-gray-50 rounded-2xl font-bold transition-all shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98]">
            <Plus className="w-5 h-5 text-rose-600" />
            Add New Caregiver
          </button>
        </div>
      </div>

      {/* Controls Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search positions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all outline-none font-medium"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-black/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Profile
                </th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role & Experience
                </th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rate
                </th>
                <th className="px-8 py-5 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-8 py-5 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {currentJobs.length > 0 ? (
                currentJobs.map((job) => (
                  <tr
                    key={job._id}
                    className="group hover:bg-rose-50/50 dark:hover:bg-rose-900/10 transition-colors"
                  >
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white dark:border-gray-600 shadow-md group-hover:scale-105 transition-transform duration-300">
                          <img
                            src={job.image}
                            alt={job.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 dark:text-white text-base">
                            {job.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">
                            {job.publishEmail}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400">
                            <Briefcase className="w-3.5 h-3.5" />
                          </div>
                          {job.role}
                        </span>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 pl-8">
                          {job.experience} Exp
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 rounded-full w-fit">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-sm font-medium">
                          {job.location}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-gray-900 dark:text-white font-bold text-base">
                        <DollarSign className="w-4 h-4 text-emerald-500" />
                        {job.rate}
                        <span className="text-xs text-gray-400 font-normal">
                          /hr
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span className="text-sm font-bold text-amber-700 dark:text-amber-400">
                            {job.rating}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">
                          ({job.reviews} reviews)
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all hover:scale-110"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2.5 text-amber-500 bg-amber-50 dark:bg-amber-900/10 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-xl transition-all hover:scale-110 shadow-sm"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2.5 text-rose-500 bg-rose-50 dark:bg-rose-900/10 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded-xl transition-all hover:scale-110 shadow-sm"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Search className="w-12 h-12 mb-3 opacity-20" />
                      <p className="text-lg font-medium">No positions found</p>
                      <p className="text-sm">Try adjusting your search terms</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50 dark:bg-gray-800/50">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {startIndex + 1}
              </span>
              -
              <span className="font-medium text-gray-900 dark:text-white">
                {Math.min(startIndex + itemsPerPage, filteredJobs.length)}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                {filteredJobs.length}
              </span>
            </p>

            <div className="flex items-center gap-2">
              {/* First Page */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20 dark:hover:text-rose-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
                title="First Page"
              >
                <ChevronsLeft className="w-5 h-5" />
              </button>

              {/* Previous */}
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20 dark:hover:text-rose-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 font-medium"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {/* Page Indicator */}
              <div className="px-4 py-2 rounded-lg bg-rose-600 text-white font-medium text-sm shadow-lg shadow-rose-600/20 min-w-[80px] text-center">
                {currentPage} of {totalPages}
              </div>

              {/* Next */}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20 dark:hover:text-rose-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 font-medium"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Last Page */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20 dark:hover:text-rose-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
                title="Last Page"
              >
                <ChevronsRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderJobsContent;
