"use client";
import React from "react";
import { Plus, Edit, Trash2, MoreVertical } from "lucide-react";

const MyServicesContent = () => {
  const services = [
    {
      id: 1,
      title: "Professional Nanny",
      rate: "$25/hr",
      status: "Active",
      description: "Experienced nanny for children of all ages.",
    },
    {
      id: 2,
      title: "Pet Sitting",
      rate: "$15/hr",
      status: "Inactive",
      description: "Dog walking and pet care services.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Services
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage the services you offer to clients.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-rose-600 font-medium">{service.rate}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {service.description}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  service.status === "Active"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {service.status}
              </span>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyServicesContent;
