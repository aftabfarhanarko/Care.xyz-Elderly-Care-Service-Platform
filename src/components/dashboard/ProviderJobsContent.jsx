"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { imageUpload } from "../../utils/imagesUpDB";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateMyCaregiver,
  deleteMyCaregiver,
  createMyCaregiver,
  getMyAddcaregivers,
} from "@/actions/serverData/dashbordApi";
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
  X,
  Check,
  Save,
  Upload,
  Camera,
  User,
  Mail,
} from "lucide-react";

const ProviderJobsContent = ({ caregivers }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: realtimeCaregivers } = useQuery({
    queryKey: ["myCaregivers", session?.user?.email],
    queryFn: () => getMyAddcaregivers(session?.user?.email),
    enabled: !!session?.user?.email,
    initialData: caregivers,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    about: "",
    experience: "",
    location: "",
    rate: "",
    services: "",
    publishEmail: "",
    file: null,
  });

  // Edit & View State
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);

  const handleAddNewClick = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      name: "",
      role: "",
      about: "",
      experience: "",
      location: "",
      rate: "",
      services: "",
      publishEmail: session?.user?.email || "",
      file: null,
    });
    setPreviewImage("");
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      setFormData({ ...formData, file: file });
    }
  };

  const handleEditClick = (caregiver) => {
    setIsEditing(true);
    setEditingId(caregiver._id);
    setFormData({
      name: caregiver.name,
      role: caregiver.role,
      about: caregiver.about,
      experience: caregiver.experience,
      location: caregiver.location,
      rate: caregiver.rate,
      services: Array.isArray(caregiver.services)
        ? caregiver.services.join(", ")
        : caregiver.services,
      publishEmail: caregiver.publishEmail,
      file: null, // Keep existing image unless changed
    });
    setPreviewImage(caregiver.image);
    setIsModalOpen(true);
  };

  const handleViewClick = (caregiver) => {
    setSelectedCaregiver(caregiver);
    setIsViewModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteMyCaregiver(id);
        if (response.success) {
          Swal.fire("Deleted!", "Caregiver has been deleted.", "success");
          // Optionally refresh data here if not using realtime/optimistic UI
          // For now we assume parent component or router refresh handles it,
          // or we rely on re-render if data prop updates.
          // Since this is a client component receiving props, ideally we should
          // trigger a refresh. But let's stick to the current scope.
          // In a real app, we'd call router.refresh() here.
          window.location.reload();
        } else {
          Swal.fire("Error!", response.message, "error");
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to delete caregiver.", "error");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      // Default or Placeholder

      if (formData.file) {
        imageUrl = await imageUpload(formData.file);
      }

      const caregiverData = {
        name: formData.name,
        role: formData.role,
        about: formData.about,
        experience: formData.experience,
        image: imageUrl || previewImage,
        location: formData.location,
        rate: Number(formData.rate),
        services: formData.services.split(",").map((s) => s.trim()),
        publishEmail: formData.publishEmail,
      };

      let response;
      if (isEditing) {
        response = await updateMyCaregiver(editingId, caregiverData);
      } else {
        response = await createMyCaregiver(caregiverData);
      }

      if (response.success) {
        setIsModalOpen(false);
        Swal.fire({
          icon: "success",
          title: isEditing ? "Caregiver Updated" : "Caregiver Added",
          text: response.message,
          confirmButtonColor: "#f43f5e",
        });
        queryClient.invalidateQueries(["myCaregivers", session?.user?.email]);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error saving caregiver:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to upload image or save data.",
      });
    }
  };

  // Mock data if no props provided (using user's format)
  const jobsData =
    realtimeCaregivers && realtimeCaregivers.length > 0
      ? realtimeCaregivers
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
    <div>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-[2rem] p-8 overflow-hidden shadow-2xl shadow-gray-900/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -ml-32 -mb-32"></div>

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                My Caregiver
              </h1>
              <p className="text-gray-300">
                Manage your active job listings and services
              </p>
            </div>
            <button
              onClick={handleAddNewClick}
              className="flex items-center gap-2 px-6 py-3.5 bg-white text-gray-900 hover:bg-gray-50 rounded-2xl font-bold transition-all shadow-xl shadow-black/10 hover:scale-[1.02] active:scale-[0.98]"
            >
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
                            onClick={() => handleViewClick(job)}
                            className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all hover:scale-110"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditClick(job)}
                            className="p-2.5 text-amber-500 bg-amber-50 dark:bg-amber-900/10 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-xl transition-all hover:scale-110 shadow-sm"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(job._id)}
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
                        <p className="text-lg font-medium">
                          No positions found
                        </p>
                        <p className="text-sm">
                          Try adjusting your search terms
                        </p>
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

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden my-auto"
            >
              <div className="relative p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-rose-100 dark:bg-rose-900/20 rounded-2xl text-rose-600 dark:text-rose-400">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Add New Caregiver
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Create a new caregiver profile
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 md:p-8 space-y-6">
                {/* Image Upload */}
                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="w-28 h-28 rounded-2xl border-4 border-white dark:border-gray-700 shadow-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <img
                        src={
                          previewImage ||
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=NewUser"
                        }
                        alt="Profile Preview"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <label
                      htmlFor="caregiver-upload"
                      className="absolute -bottom-2 -right-2 p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow-lg cursor-pointer transition-transform hover:scale-110 active:scale-95 border-2 border-white dark:border-gray-800"
                    >
                      <Camera className="w-4 h-4" />
                      <input
                        id="caregiver-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Sarah Wilson"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      Role / Title
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="role"
                        required
                        value={formData.role}
                        onChange={handleInputChange}
                        placeholder="e.g. Senior Nanny"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      Experience
                    </label>
                    <div className="relative">
                      <Star className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="experience"
                        required
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="e.g. 5 Years"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="e.g. Brooklyn, NY"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Rate */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      Hourly Rate ($)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        name="rate"
                        required
                        value={formData.rate}
                        onChange={handleInputChange}
                        placeholder="25"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                      Contact Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="publishEmail"
                        readOnly
                        value={formData.publishEmail}
                        className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 outline-none cursor-not-allowed font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Services (comma separated)
                  </label>
                  <div className="relative">
                    <Check className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="services"
                      value={formData.services}
                      onChange={handleInputChange}
                      placeholder="Math, Science, Homework Help"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                {/* About */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    About Caregiver
                  </label>
                  <textarea
                    name="about"
                    required
                    value={formData.about}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Brief description about the caregiver..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all font-medium resize-none"
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-xl font-bold shadow-lg shadow-rose-500/30 hover:shadow-rose-500/40 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {isEditing ? "Update Caregiver" : "Save Caregiver"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {isViewModalOpen && selectedCaregiver && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden my-auto"
            >
              <div className="relative p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-100 dark:bg-blue-900/20 rounded-2xl text-blue-600 dark:text-blue-400">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Caregiver Details
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      View full profile information
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-32 h-32 rounded-2xl border-4 border-white dark:border-gray-700 shadow-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                    <img
                      src={selectedCaregiver.image}
                      alt={selectedCaregiver.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedCaregiver.name}
                      </h3>
                      <p className="text-rose-600 dark:text-rose-400 font-medium">
                        {selectedCaregiver.role}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        {selectedCaregiver.rating} ({selectedCaregiver.reviews}{" "}
                        reviews)
                      </div>
                      <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {selectedCaregiver.location}
                      </div>
                      <div className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-gray-400" />
                        {selectedCaregiver.experience} Exp
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Hourly Rate
                    </label>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      ${selectedCaregiver.rate}/hr
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Contact Email
                    </label>
                    <p className="text-lg font-medium text-gray-900 dark:text-white break-all">
                      {selectedCaregiver.publishEmail}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Services
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(selectedCaregiver.services) ? (
                      selectedCaregiver.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-lg text-sm font-medium"
                        >
                          {service}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-900 dark:text-white">
                        {selectedCaregiver.services}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    About
                  </label>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">
                    {selectedCaregiver.about}
                  </p>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setIsViewModalOpen(false)}
                    className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProviderJobsContent;
