"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { imageUpload } from "../../utils/imagesUpDB";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMyServices,
  createMyService,
  updateMyService,
  deleteMyService,
} from "@/actions/serverData/dashbordApi";
import {
  Search,
  Edit,
  Trash2,
  Eye,
  Plus,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  X,
  Save,
  Upload,
  Camera,
  Mail,
  FileText,
  Clock,
  Calendar,
  CheckCircle,
  List,
  Palette,
  Baby,
  Phone,
  Briefcase,
  LayoutGrid,
  Filter,
} from "lucide-react";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DynamicListInput = ({ label, items, onChange, placeholder }) => {
  const [newItem, setNewItem] = useState("");

  const handleAdd = () => {
    if (newItem.trim()) {
      onChange([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  const handleRemove = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-3 py-1 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-lg text-sm"
          >
            {item}
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="hover:text-rose-800 dark:hover:text-rose-200"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

const MyServicesContent = ({ services }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: realtimeServices } = useQuery({
    queryKey: ["myServices", session?.user?.email],
    queryFn: () => getMyServices(session?.user?.email),
    enabled: !!session?.user?.email,
    initialData: services,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [viewMode, setViewMode] = useState("list"); // "list" or "grid"

  // Expanded Form Data State
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    priceVal: "",
    description: "",
    detailedDescription: "",
    contactInfoEmail: "",
    contactInfoPhone: "",
    icon: "Baby", // Default icon
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
    features: [],
    additionalServices: [],
    caregiverRequirements: [],
    serviceAvailability: {
      days: [],
      hours: "",
    },
    images: [],
    file: null,
  });

  // Edit & View State
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleAddNewClick = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      name: "",
      price: "",
      priceVal: "",
      description: "",
      detailedDescription: "",
      contactInfoEmail: session?.user?.email || "",
      contactInfoPhone: "",
      icon: "Baby",
      color: "bg-rose-100 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
      features: [],
      additionalServices: [],
      caregiverRequirements: [],
      serviceAvailability: {
        days: [],
        hours: "",
      },
      images: [],
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

  const handleGalleryImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        Swal.fire({
          title: "Uploading...",
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const url = await imageUpload(file);
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, url],
        }));
        Swal.close();
      } catch (error) {
        Swal.fire("Error", "Failed to upload image", "error");
      }
    }
  };

  const handleEditClick = (service) => {
    setIsEditing(true);
    setEditingId(service._id);
    setFormData({
      name: service.name || "",
      price: service.price || "",
      priceVal: service.priceVal || "",
      description: service.description || "",
      detailedDescription: service.detailedDescription || "",
      contactInfoEmail: service.contactInfo?.email || session?.user?.email,
      contactInfoPhone: service.contactInfo?.phone || "",
      icon: service.icon || "Baby",
      color:
        service.color ||
        "bg-rose-100 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
      features: service.features || [],
      additionalServices: service.additionalServices || [],
      caregiverRequirements: service.caregiverRequirements || [],
      serviceAvailability: {
        days: service.serviceAvailability?.days || [],
        hours: service.serviceAvailability?.hours || "",
      },
      images: service.images || [],
      file: null,
    });
    setPreviewImage(service.image || "");
    setIsModalOpen(true);
  };

  const handleViewClick = (service) => {
    setSelectedService(service);
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
        const response = await deleteMyService(id);
        if (response.success) {
          Swal.fire("Deleted!", "Service has been deleted.", "success");
          queryClient.invalidateQueries(["myServices", session?.user?.email]);
        } else {
          Swal.fire("Error!", response.message, "error");
        }
      } catch (error) {
        Swal.fire("Error!", "Failed to delete service.", "error");
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "hours") {
      setFormData({
        ...formData,
        serviceAvailability: {
          ...formData.serviceAvailability,
          hours: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDayToggle = (day) => {
    const currentDays = formData.serviceAvailability.days;
    const newDays = currentDays.includes(day)
      ? currentDays.filter((d) => d !== day)
      : [...currentDays, day];

    // Sort days according to DAYS_OF_WEEK order
    newDays.sort((a, b) => DAYS_OF_WEEK.indexOf(a) - DAYS_OF_WEEK.indexOf(b));

    setFormData({
      ...formData,
      serviceAvailability: {
        ...formData.serviceAvailability,
        days: newDays,
      },
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";

      if (formData.file) {
        imageUrl = await imageUpload(formData.file);
      }

      const serviceData = {
        name: formData.name,
        description: formData.description,
        detailedDescription: formData.detailedDescription,
        price: formData.price,
        priceVal: Number(formData.priceVal) || 0,
        image: imageUrl || previewImage,
        images: formData.images,
        contactInfo: {
          email: formData.contactInfoEmail,
          phone: formData.contactInfoPhone,
        },
        icon: formData.icon,
        color: formData.color,
        features: formData.features,
        additionalServices: formData.additionalServices,
        caregiverRequirements: formData.caregiverRequirements,
        serviceAvailability: formData.serviceAvailability,
      };

      let response;
      if (isEditing) {
        response = await updateMyService(editingId, serviceData);
      } else {
        response = await createMyService(serviceData);
      }

      if (response.success) {
        setIsModalOpen(false);
        Swal.fire({
          icon: "success",
          title: isEditing ? "Service Updated" : "Service Added",
          text: response.message,
          confirmButtonColor: "#f43f5e",
        });
        queryClient.invalidateQueries(["myServices", session?.user?.email]);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error saving service:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to upload image or save data.",
      });
    }
  };

  const servicesData =
    realtimeServices && realtimeServices.length > 0 ? realtimeServices : [];

  const filteredServices = servicesData.filter(
    (service) =>
      service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = filteredServices.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className=" ">
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Premium Header Card */}
        <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-100/50 dark:shadow-none">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 dark:bg-rose-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
              <div className="p-3 md:p-4 bg-gradient-to-br from-rose-100 to-rose-50 dark:from-rose-900/40 dark:to-rose-900/20 rounded-2xl border border-rose-200/50 dark:border-rose-700/30 shadow-sm flex-shrink-0">
                <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                  My Services
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-gray-500 dark:text-gray-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700/50 text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    {servicesData.length} Services
                  </span>
                  <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                  <p className="text-sm">Manage your offerings</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex p-1 bg-gray-100/80 dark:bg-gray-700/50 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-600 flex-shrink-0">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2.5 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-white dark:bg-gray-600 text-rose-600 shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2.5 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-600 text-rose-600 shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleAddNewClick}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-xl transition-all shadow-lg shadow-rose-600/25 hover:shadow-rose-600/40 font-medium transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Service</span>
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-6 md:mt-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
              <input
                type="text"
                placeholder="Search by name, description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all shadow-sm"
              />
            </div>
            {/* Optional Filter Button - for visual premium feel */}
            <button className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-gray-700 dark:text-gray-300 font-medium shadow-sm">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content View */}
      {viewMode === "list" ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 dark:bg-gray-800/50 dark:border-gray-700">
                <th className="pl-6 pr-3 py-4 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-rose-600 focus:ring-rose-500 bg-white dark:bg-gray-800 dark:border-gray-600"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Hours
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Days
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {currentServices.map((service, i) => (
                <motion.tr
                  key={service._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors bg-white dark:bg-gray-800"
                >
                  <td className="pl-6 pr-3 py-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-rose-600 focus:ring-rose-500 bg-white dark:bg-gray-800 dark:border-gray-600"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    #{2000 + i}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date().toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                        {service.image ? (
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <FileText className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {service.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 max-w-[150px]">
                          {service.contactInfo?.email || "No email"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-600 border border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900/30">
                      {service.icon || "Service"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 font-medium">
                    {service.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {service.serviceAvailability?.hours || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {service.serviceAvailability?.days?.length || 0} days
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewClick(service)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditClick(service)}
                        className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                        title="Edit Service"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(service._id)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
                        title="Delete Service"
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {currentServices.map((service) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-white to-rose-50/30 dark:from-gray-800 dark:to-rose-900/10 rounded-2xl p-4 border border-rose-100 dark:border-rose-900/30 hover:shadow-xl hover:shadow-rose-100/50 dark:hover:shadow-none transition-all group flex flex-col"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 mb-4">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <FileText className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-900 dark:text-white shadow-sm">
                  {service.price}
                </div>
              </div>

              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">
                  {service.name}
                </h3>
                {service.icon && (
                  <span className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs font-medium">
                    {service.icon}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-1">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {service.features?.slice(0, 3).map((f, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-lg"
                  >
                    {f}
                  </span>
                ))}
                {service.features?.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-lg">
                    +{service.features.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{service.serviceAvailability?.hours || "N/A"}</span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleViewClick(service)}
                    className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEditClick(service)}
                    className="p-2 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-amber-600 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(service._id)}
                    className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-600 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredServices.length)} of{" "}
          {filteredServices.length} results
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border border-rose-100 dark:border-rose-900/30 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-600 dark:text-rose-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                currentPage === i + 1
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20"
                  : "hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-transparent hover:border-rose-100 dark:hover:border-rose-900/30"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border border-rose-100 dark:border-rose-900/30 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-600 dark:text-rose-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 z-10">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {isEditing ? "Edit Service" : "Add New Service"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-6">
                {/* Image Upload */}
                <div className="flex justify-center">
                  <div className="relative group cursor-pointer">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 border-4 border-white dark:border-gray-900 shadow-lg">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                          <Camera className="w-8 h-8 mb-2" />
                          <span className="text-xs">Upload Photo</span>
                        </div>
                      )}
                    </div>
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer">
                      <Upload className="w-6 h-6" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Service Name
                    </label>
                    <div className="relative">
                      <Baby className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                        placeholder="e.g. Baby Care"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Service Icon
                    </label>
                    <div className="relative">
                      <Baby className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="icon"
                        value={formData.icon}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                        placeholder="e.g. Baby"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Price Display
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                        placeholder="e.g. $25/hr"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Numeric Price (for sorting)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        name="priceVal"
                        value={formData.priceVal}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                        placeholder="e.g. 25"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Color Theme (Tailwind classes)
                    </label>
                    <div className="relative">
                      <Palette className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                        placeholder="e.g. bg-rose-100 text-rose-600..."
                      />
                    </div>
                    {formData.color && (
                      <div
                        className={`mt-2 px-4 py-2 rounded-lg text-sm font-medium ${formData.color}`}
                      >
                        Theme Preview
                      </div>
                    )}
                  </div>

                  {/* Availability */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Available Days
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {DAYS_OF_WEEK.map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handleDayToggle(day)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            formData.serviceAvailability.days.includes(day)
                              ? "bg-rose-600 text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Working Hours
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        name="hours"
                        value={formData.serviceAvailability.hours}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                        placeholder="e.g. 8am - 8pm"
                      />
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Short Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="2"
                      className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 resize-none"
                      placeholder="Brief overview..."
                    ></textarea>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Detailed Description
                    </label>
                    <textarea
                      name="detailedDescription"
                      value={formData.detailedDescription}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 resize-none"
                      placeholder="Full service details..."
                    ></textarea>
                  </div>

                  {/* Dynamic Lists */}
                  <div className="md:col-span-2">
                    <DynamicListInput
                      label="Key Features"
                      items={formData.features}
                      onChange={(newItems) =>
                        setFormData({ ...formData, features: newItems })
                      }
                      placeholder="Add a feature (e.g. Feeding Assistance)"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <DynamicListInput
                      label="Additional Services"
                      items={formData.additionalServices}
                      onChange={(newItems) =>
                        setFormData({
                          ...formData,
                          additionalServices: newItems,
                        })
                      }
                      placeholder="Add service (e.g. Nutrition Advice)"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <DynamicListInput
                      label="Caregiver Requirements"
                      items={formData.caregiverRequirements}
                      onChange={(newItems) =>
                        setFormData({
                          ...formData,
                          caregiverRequirements: newItems,
                        })
                      }
                      placeholder="Add requirement (e.g. Certified in CPR)"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Gallery Images
                        </label>
                        <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm transition-colors">
                          <Upload className="w-4 h-4" />
                          <span>Upload Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleGalleryImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <DynamicListInput
                        label=""
                        items={formData.images}
                        onChange={(newItems) =>
                          setFormData({ ...formData, images: newItems })
                        }
                        placeholder="Add image URL"
                      />
                      <div className="grid grid-cols-4 gap-4 mt-4">
                        {formData.images.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 group"
                          >
                            <img
                              src={img}
                              alt={`Gallery ${idx}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newImages = formData.images.filter(
                                  (_, i) => i !== idx,
                                );
                                setFormData({ ...formData, images: newImages });
                              }}
                              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Contact Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        name="contactInfoEmail"
                        value={formData.contactInfoEmail}
                        readOnly
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Contact Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        name="contactInfoPhone"
                        value={formData.contactInfoPhone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                        placeholder="e.g. +123-456-7890"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl shadow-lg shadow-rose-600/20 transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {isEditing ? "Save Changes" : "Create Service"}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsViewModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl z-50 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-64 bg-gray-100 dark:bg-gray-800">
                {selectedService.image ? (
                  <img
                    src={selectedService.image}
                    alt={selectedService.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <FileText className="w-16 h-16" />
                  </div>
                )}
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h2 className="text-2xl font-bold text-white">
                    {selectedService.name}
                  </h2>
                  <p className="text-white/80 mt-1">{selectedService.price}</p>
                </div>
              </div>

              <div className="p-6 space-y-8">
                {/* Description */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-rose-500" />
                    Description
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedService.detailedDescription ||
                      selectedService.description}
                  </p>
                </div>

                {/* Availability */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-rose-500" />
                    Availability
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedService.serviceAvailability?.days?.map((day) => (
                      <span
                        key={day}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Hours: {selectedService.serviceAvailability?.hours}
                  </p>
                </div>

                {/* Features */}
                {selectedService.features?.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-rose-500" />
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedService.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {selectedService.caregiverRequirements?.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <List className="w-4 h-4 text-rose-500" />
                      Requirements
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedService.caregiverRequirements.map((req, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Additional Services */}
                {selectedService.additionalServices?.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-rose-500" />
                      Additional Services
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.additionalServices.map(
                        (service, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-full text-sm"
                          >
                            {service}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* Gallery */}
                {selectedService.images?.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Camera className="w-4 h-4 text-rose-500" />
                      Gallery
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {selectedService.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800"
                        >
                          <img
                            src={img}
                            alt={`Gallery ${idx}`}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact & Icon */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Contact Email
                    </h3>
                    <p className="text-gray-900 dark:text-white font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4 text-rose-500" />
                      {selectedService.contactInfo?.email}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Contact Phone
                    </h3>
                    <p className="text-gray-900 dark:text-white font-medium flex items-center gap-2">
                      <Phone className="w-4 h-4 text-rose-500" />
                      {selectedService.contactInfo?.phone || "N/A"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Icon Key
                    </h3>
                    <p className="text-gray-900 dark:text-white font-medium flex items-center gap-2">
                      <Baby className="w-4 h-4 text-rose-500" />
                      {selectedService.icon || "Default"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Theme
                    </h3>
                    <div
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium inline-block ${selectedService.color}`}
                    >
                      Preview
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                  <button
                    onClick={() => {
                      setIsViewModalOpen(false);
                      handleEditClick(selectedService);
                    }}
                    className="flex items-center gap-2 px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-all shadow-lg shadow-rose-600/20"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Service</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyServicesContent;
