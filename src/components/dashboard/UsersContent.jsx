"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  LayoutGrid,
  List,
  Filter,
  Mail,
  Shield,
  Calendar,
  ChevronLeft,
  ChevronRight,
  User as UserIcon,
  Phone,
  MoreVertical,
  Trash2,
  CheckCircle,
  FileText,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";
import { updateUserRole, deleteUser } from "@/actions/serverData/dashbordApi";

const UsersContent = ({ initialUsers = [] }) => {
  const [users, setUsers] = useState(initialUsers);
  const [viewMode, setViewMode] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter users
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "caregiver":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const handleRoleUpdate = async (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    try {
      const result = await Swal.fire({
        title: `Make ${newRole}?`,
        text: `Are you sure you want to change this user's role to ${newRole}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#e11d48",
        cancelButtonColor: "#6b7280",
        confirmButtonText: `Yes, make ${newRole}`,
      });

      if (result.isConfirmed) {
        const response = await updateUserRole(userId, newRole);

        if (response.success) {
          setUsers(
            users.map((u) => (u._id === userId ? { ...u, role: newRole } : u)),
          );
          Swal.fire("Updated!", response.message, "success");
        } else {
          Swal.fire("Error!", response.message, "error");
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e11d48",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await deleteUser(userId);

        if (response.success) {
          setUsers(users.filter((u) => u._id !== userId));
          Swal.fire("Deleted!", response.message, "success");
        } else {
          Swal.fire("Error!", response.message, "error");
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };

  const cleanImageUrl = (url) => {
    if (!url) return null;
    // Remove backticks and quotes if present
    return url.replace(/[`'"]/g, "").trim();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 md:p-4 bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-900/40 dark:to-rose-900/20 rounded-2xl border border-rose-200/50 dark:border-rose-700/30 shadow-sm flex-shrink-0">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  All Users
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                  Manage and view all registered users
                  <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-xs font-medium border border-rose-100 dark:border-rose-800">
                    {users.length} Users
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
                placeholder="Search users by name or email..."
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
                      User ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Joined Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      User Info
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {currentUsers.map((user) => (
                    <motion.tr
                      key={user._id}
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
                        #{user._id.substring(0, 6).toUpperCase()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-gray-800 flex items-center justify-center border border-rose-100 dark:border-gray-700 text-rose-500 font-medium text-xs overflow-hidden">
                            {user.profileImage || user.image ? (
                              <img
                                src={cleanImageUrl(
                                  user.profileImage || user.image,
                                )}
                                alt={user.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              user.name?.charAt(0).toUpperCase() || "U"
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                              {user.name || "Unknown"}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {user.email || "No Email"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {user.contact || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            user.role === "admin"
                              ? "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
                              : "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
                          }`}
                        >
                          {user.role === "admin" ? (
                            <Shield className="w-3 h-3" />
                          ) : (
                            <UserIcon className="w-3 h-3" />
                          )}
                          <span className="capitalize">{user.role || "user"}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleRoleUpdate(user._id, user.role)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                              user.role === "admin"
                                ? "bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40"
                                : "bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:hover:bg-purple-900/40"
                            }`}
                            title={
                              user.role === "admin"
                                ? "Demote to User"
                                : "Promote to Admin"
                            }
                          >
                            {user.role === "admin" ? (
                              <>
                                <UserIcon className="w-3.5 h-3.5" />
                                Make User
                              </>
                            ) : (
                              <>
                                <Shield className="w-3.5 h-3.5" />
                                Make Admin
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="p-1.5 hover:bg-gray-100 rounded text-rose-600 hover:text-rose-700 dark:hover:bg-gray-700 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
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
            {currentUsers.map((user) => (
              <motion.div
                key={user._id}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white to-rose-50/30 dark:from-gray-800 dark:to-rose-900/10 rounded-2xl p-6 border border-rose-100 dark:border-rose-900/30 hover:shadow-xl hover:shadow-rose-100/50 dark:hover:shadow-none transition-all group relative"
              >
                <div className="absolute top-4 right-4 flex gap-1">
                  <button
                    onClick={() => handleRoleUpdate(user._id, user.role)}
                    className={`flex items-center gap-1 px-2 py-1.5 rounded-lg border transition-colors bg-white/80 backdrop-blur-sm ${
                      user.role === "admin"
                        ? "text-blue-600 border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/30"
                        : "text-purple-600 border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-900/30"
                    }`}
                    title={user.role === "admin" ? "Make User" : "Make Admin"}
                  >
                    {user.role === "admin" ? (
                      <>
                        <UserIcon className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">Make User</span>
                      </>
                    ) : (
                      <>
                        <Shield className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">Make Admin</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-red-600 border border-red-600 hover:bg-red-50 transition-colors bg-white/80 backdrop-blur-sm"
                    title="Delete User"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">Delete</span>
                  </button>
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-700 shadow-sm p-1 border border-gray-100 dark:border-gray-600">
                    <div className="w-full h-full rounded-xl overflow-hidden bg-rose-50 flex items-center justify-center text-rose-500 text-2xl font-bold relative">
                      {user.profileImage || user.image ? (
                        <img
                          src={cleanImageUrl(user.profileImage || user.image)}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        user.name?.charAt(0).toUpperCase() || "U"
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-rose-600 transition-colors">
                      {user.name || "Unknown User"}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                      <Phone className="w-3.5 h-3.5" />
                      <span className="truncate">{user.contact || "N/A"}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-sm">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                        user.role === "admin"
                          ? "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
                          : "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
                      }`}
                    >
                      {user.role === "admin" ? (
                        <Shield className="w-3 h-3" />
                      ) : (
                        <UserIcon className="w-3 h-3" />
                      )}
                      <span className="capitalize">{user.role || "user"}</span>
                    </span>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Joined{" "}
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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

export default UsersContent;
