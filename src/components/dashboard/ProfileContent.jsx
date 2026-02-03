"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Shield,
  Calendar,
  Camera,
  Edit2,
  X,
  Check,
  Globe,
  Fingerprint,
  Save,
  ImageIcon,
  Upload,
} from "lucide-react";
import Swal from "sweetalert2";
import { imageUpload } from "../../utils/imagesUpDB";
import { updateCurrentUser } from "@/actions/serverData/dashbordApi";

const ProfileContent = ({ realUser }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: realUser?.name || "",
    image: realUser?.profileImage || "",
    file: null,
  });
  const [previewImage, setPreviewImage] = useState(
    realUser?.profileImage || "",
  );

  // Reset form when modal opens
  const handleEditClick = () => {
    setFormData({
      name: realUser?.name || "",
      image: realUser?.profileImage || "",
      file: null,
    });
    setPreviewImage(realUser?.profileImage || "");
    setIsEditModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      setFormData({ ...formData, file: file });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image;

      // 1. Upload image if a new file is selected
      if (formData.file) {
        // Show loading indication if needed
        imageUrl = await imageUpload(formData.file);
      }

      // 2. Prepare final data
      const updatedData = {
        ...realUser,
        name: formData.name,
        profileImage: imageUrl,
      };

      const result = await updateCurrentUser(realUser?._id, updatedData);
      if (result.success) {
        setIsEditModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been updated successfully.",
          confirmButtonColor: "#f43f5e", // rose-500
        });
      }
      // In a real app, you would call your API here
      console.log("Updated User Data:", updatedData);
      // console.log("New Image URL:", result);

      // Ideally, you would trigger a re-fetch of user data here
    } catch (error) {
      console.error("Profile update error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong during the update!",
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Profile
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your personal information and account settings
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-xl shadow-rose-500/5 overflow-hidden"
      >
        {/* Premium Cover Area */}
        <div className="h-48 bg-gradient-to-r from-rose-500 via-orange-400 to-rose-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        <div className="px-8 pb-10">
          <div className="relative flex flex-col md:flex-row justify-between items-end -mt-20 mb-8 gap-6">
            {/* Profile Image & Main Info */}
            <div className="flex flex-col md:flex-row items-end md:items-end gap-6 w-full">
              <div className="relative group">
                <div className="w-40 h-40 rounded-[2rem] border-4 border-white dark:border-gray-800 shadow-2xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    src={
                      realUser?.profileImage ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl border-4 border-white dark:border-gray-800 shadow-lg">
                  <Shield className="w-5 h-5" />
                </div>
              </div>

              <div className="flex-1 pb-2 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {realUser?.name || "User Name"}
                </h2>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm">
                  <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-bold uppercase tracking-wider text-xs">
                    {realUser?.role || "User"}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 font-medium bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                    <Calendar className="w-3.5 h-3.5" />
                    Member since {formatDate(realUser?.createdAt)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleEditClick}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl hover:scale-105 active:scale-95 transition-all font-bold shadow-lg shadow-gray-900/20 dark:shadow-white/10"
              >
                <Edit2 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-gray-700">
                <User className="w-5 h-5 text-rose-500" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Personal Information
                </h3>
              </div>

              <div className="space-y-5">
                <div className="group bg-gray-50 dark:bg-gray-700/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-rose-200 dark:hover:border-rose-900/50 transition-colors">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                    Full Name
                  </label>
                  <div className="flex items-center gap-3 text-gray-900 dark:text-white font-medium">
                    <User className="w-5 h-5 text-gray-400 group-hover:text-rose-500 transition-colors" />
                    {realUser?.name || "N/A"}
                  </div>
                </div>

                <div className="group bg-gray-50 dark:bg-gray-700/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-rose-200 dark:hover:border-rose-900/50 transition-colors">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 text-gray-900 dark:text-white font-medium">
                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-rose-500 transition-colors" />
                    {realUser?.email || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-gray-700">
                <Shield className="w-5 h-5 text-purple-500" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Account Details
                </h3>
              </div>

              <div className="space-y-5">
                <div className="group bg-gray-50 dark:bg-gray-700/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-900/50 transition-colors">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                    Provider
                  </label>
                  <div className="flex items-center gap-3 text-gray-900 dark:text-white font-medium capitalize">
                    <Globe className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                    {realUser?.provider || "Email"}
                  </div>
                </div>

                <div className="group bg-gray-50 dark:bg-gray-700/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-900/50 transition-colors">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                    Account ID
                  </label>
                  <div className="flex items-center gap-3 text-gray-900 dark:text-white font-medium font-mono text-sm">
                    <Fingerprint className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
                    <span className="truncate">{realUser?._id || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden my-auto"
            >
              <div className="relative p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-rose-100 dark:bg-rose-900/20 rounded-2xl text-rose-600 dark:text-rose-400">
                    <Edit2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Edit Profile
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Update your personal details
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 md:p-8 space-y-8">
                {/* Image Upload Section */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-700 shadow-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <img
                        src={
                          previewImage ||
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        }
                        alt="Profile Preview"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <label
                      htmlFor="profile-upload"
                      className="absolute bottom-1 right-1 p-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-lg cursor-pointer transition-transform hover:scale-110 active:scale-95 border-2 border-white dark:border-gray-800"
                    >
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        id="profile-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Profile Photo
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Click the camera icon to upload
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  {/* Read-only Fields Preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                        Email
                      </label>
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 truncate">
                        <Mail className="w-3.5 h-3.5" />
                        <span className="truncate">{realUser?.email}</span>
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
                        Role
                      </label>
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                        <Shield className="w-3.5 h-3.5" />
                        <span className="capitalize">{realUser?.role}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 px-6 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-gray-900/10"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileContent;
