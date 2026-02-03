"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getAdminDataOverview } from "@/actions/serverData/dashbordApi";
import {
  Calendar,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  DollarSign,
  Briefcase,
  Plus,
  Download,
  CalendarDays,
  FileText,
  MessageSquare,
  User,
  Phone,
  CreditCard,
} from "lucide-react";
import { useDashboard } from "./DashboardLayoutContent";

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 18,
      stiffness: 120,
      delay: i * 0.08,
    },
  }),
  hover: {
    scale: 1.03,
    y: -4,
    boxShadow: "0 20px 35px -10px rgba(0,0,0,0.15)",
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

const tableRowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07 + 0.3, duration: 0.5 },
  }),
};

const OverviewContent = () => {
  const { userRole } = useDashboard();
  const { data: session } = useSession();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["adminOverviewData"],
    queryFn: getAdminDataOverview,
  });

  const dynamicStats = [
    {
      title: "Total Earnings",
      value: `$${dashboardData?.stats?.totalEarnings || 0}`,
      icon: DollarSign,
      color: "from-rose-500 to-pink-600",
      iconColor: "text-white",
      trend: "+18%",
      trendUp: true,
    },
    {
      title: "Active Jobs",
      value: dashboardData?.stats?.activeJobs || 0,
      icon: Briefcase,
      color: "from-blue-500 to-indigo-600",
      iconColor: "text-white",
      trend: "0%",
      trendUp: true,
    },
    {
      title: "Pending Requests",
      value: dashboardData?.stats?.pendingRequests || 0,
      icon: Clock,
      color: "from-orange-500 to-amber-600",
      iconColor: "text-white",
      trend: "+2",
      trendUp: true,
    },
    {
      title: "Rating",
      value: dashboardData?.stats?.rating || 0,
      icon: Star,
      color: "from-yellow-500 to-amber-500",
      iconColor: "text-white",
      trend: "+0.2",
      trendUp: true,
    },
  ];

  const stats = dynamicStats;

  const serviceListData = (dashboardData?.recentServiceBookings || []).map(
    (item) => ({
      id: item._id,
      client: item.user?.name || "Unknown",
      service: item.serviceName || "Service",
      date: item.createdAt
        ? new Date(item.createdAt).toLocaleDateString()
        : "N/A",
      time: item.bookingDetails?.duration
        ? `${item.bookingDetails.duration} days`
        : "N/A",
      status: item.status,
      price: `$${item.financials?.totalCost || 0}`,
      user: item.user,
    }),
  );

  const caregiverListData = (dashboardData?.recentCaregiverBookings || []).map(
    (item) => ({
      id: item._id,
      client: item.user?.name || "Unknown",
      service: item.caregiverName || "Caregiver", // Using service field for caregiver name to reuse table logic if possible
      date: item.createdAt
        ? new Date(item.createdAt).toLocaleDateString()
        : "N/A",
      time: item.days ? `${item.days} days` : "N/A",
      status: item.status,
      price: `$${item.totalCost || 0}`, // Assuming totalCost is directly available
      user: item.user,
    }),
  );

  // ── Chart Data ───────────────────────────────────────────
  const chartData = (dashboardData?.chartData || []).map((d) => ({
    name: d.name,
    amount: d.revenue,
  }));
  const pieData = dashboardData?.pieData || [];

  // ── Recent Activity ──────────────────────────────────────
  const recentActivity = (dashboardData?.recentActivity || []).map((item) => ({
    id: item.id,
    action: item.action,
    desc: item.desc,
    time: item.time
      ? new Date(item.time).toLocaleDateString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      : "Just now",
  }));

  // ── Recent Users ─────────────────────────────────────────
  const recentUsers = (dashboardData?.recentUsers || []).map((user) => ({
    id: user._id,
    name: user.name || "Unknown",
    email: user.email || "No Email",
    contact: user.contact || "N/A",
    nidNumber: user.nidNumber || "N/A",
    role: user.role || "user",
    image: user.profileImage || user.image || null,
    joined: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString()
      : "N/A",
  }));

  return (
    <div className="space-y-10 pb-12">
      {/* Premium Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 rounded-3xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/60 dark:border-gray-700/60 shadow-xl shadow-rose-500/5"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-wave origin-bottom-right inline-block">
              👋
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                {session?.user?.name || "Guest"}!
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium">
            <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-700/50">
              <CalendarDays className="w-4 h-4 text-rose-500" />
            </div>
            <p>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              <span className="mx-2">•</span>
              Here's what's happening today.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid – Premium glass + gradient cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="group relative overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-700/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-2xl shadow-xl shadow-rose-500/5 p-6 transition-all"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              <div className="relative flex flex-col justify-between h-full gap-4">
                <div className="flex items-start justify-between">
                  <div
                    className={`rounded-2xl bg-gradient-to-br ${stat.color} p-3.5 shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                  {stat.trend && (
                    <div
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        stat.trendUp
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {stat.trendUp ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingUp className="w-3 h-3 rotate-180" />
                      )}
                      {stat.trend}
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {stat.title}
                  </p>
                  <h3 className="mt-1 text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                    {stat.value}
                  </h3>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="lg:col-span-2 rounded-3xl border border-gray-100 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl shadow-xl shadow-rose-500/5 p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {userRole === "user" ? "Spending Overview" : "Earnings Overview"}
            </h3>
            <select className="text-sm font-medium bg-transparent border-none text-gray-500 focus:ring-0 cursor-pointer hover:text-rose-500 transition-colors">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 500 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "16px",
                    border: "1px solid rgba(244, 63, 94, 0.1)",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    padding: "12px",
                  }}
                  itemStyle={{ color: "#f43f5e", fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#f43f5e"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="rounded-3xl border border-gray-100 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl shadow-xl shadow-rose-500/5 p-8"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
            {userRole === "user" ? "Service Distribution" : "Job Types"}
          </h3>
          <div className="h-[300px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={6}
                  dataKey="value"
                  cornerRadius={6}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300 ml-2">
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text for Donut Chart */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-10">
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Total
                </p>
                <p className="text-2xl font-black text-gray-900 dark:text-white">
                  100%
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Service Bookings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Recent Service Bookings
            </h2>
            <button className="text-sm font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition-colors flex items-center gap-1 group">
              View All
              <span className="group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </button>
          </div>

          <div className="overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 backdrop-blur-xl shadow-xl shadow-rose-500/5">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {serviceListData.map((item, i) => {
                    const statusLower = (item.status || "").toLowerCase();
                    const isPaymentSuccess =
                      statusLower === "confirmed" ||
                      statusLower === "completed";
                    const paymentLabel = isPaymentSuccess
                      ? "Success"
                      : "Pending";
                    const paymentColor = isPaymentSuccess
                      ? "text-emerald-500 border-emerald-200 bg-emerald-50"
                      : "text-amber-500 border-amber-200 bg-amber-50";
                    const paymentDot = isPaymentSuccess
                      ? "bg-emerald-500"
                      : "bg-amber-500";

                    return (
                      <motion.tr
                        key={item.id}
                        custom={i}
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        className="group transition-colors hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.service}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${paymentColor}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${paymentDot}`}
                            ></span>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.price}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Recent Caregiver Bookings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Recent Caregiver Bookings
            </h2>
            <button className="text-sm font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition-colors flex items-center gap-1 group">
              View All
              <span className="group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </button>
          </div>

          <div className="overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/50 backdrop-blur-xl shadow-xl shadow-rose-500/5">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Caregiver
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {caregiverListData.map((item, i) => {
                    const statusLower = (item.status || "").toLowerCase();
                    const isPaymentSuccess =
                      statusLower === "confirmed" ||
                      statusLower === "completed";
                    const paymentLabel = isPaymentSuccess
                      ? "Success"
                      : "Pending";
                    const paymentColor = isPaymentSuccess
                      ? "text-emerald-500 border-emerald-200 bg-emerald-50"
                      : "text-amber-500 border-amber-200 bg-amber-50";
                    const paymentDot = isPaymentSuccess
                      ? "bg-emerald-500"
                      : "bg-amber-500";

                    return (
                      <motion.tr
                        key={item.id}
                        custom={i}
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        className="group transition-colors hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.service}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${paymentColor}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${paymentDot}`}
                            ></span>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.price}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Activity – clean timeline style */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <Clock className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="relative rounded-3xl border border-gray-100 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl p-8 shadow-xl shadow-rose-500/5 overflow-hidden">
            {/* Timeline Line */}
            <div className="absolute left-[2.25rem] top-8 bottom-8 w-px bg-gradient-to-b from-gray-200 via-gray-200 to-transparent dark:from-gray-700 dark:via-gray-700" />

            <div className="space-y-8 relative">
              {recentActivity.map((act, i) => (
                <motion.div
                  key={act.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className="flex gap-4 group"
                >
                  <div className="relative z-10 flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-rose-500 ring-4 ring-white dark:ring-gray-800 shadow-sm group-hover:scale-125 transition-transform duration-300" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-rose-500 transition-colors">
                      {act.action}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                      {act.desc}
                    </p>
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-2 block">
                      {act.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

        
          </div>
        </motion.div>

        {/* Recent Registered Users */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              New Users
            </h2>
            <button className="text-sm font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition-colors flex items-center gap-1 group">
              View All
              <span className="group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </button>
          </div>

          <div className="rounded-3xl border border-gray-100 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl p-6 shadow-xl shadow-rose-500/5">
            <div className="space-y-4">
              {recentUsers.map((user, i) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-white dark:hover:bg-gray-700/50 transition-all duration-300 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-gray-800 shadow-sm"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-orange-100 dark:from-rose-900/30 dark:to-orange-900/30 flex items-center justify-center ring-2 ring-white dark:ring-gray-800 shadow-sm text-rose-600 dark:text-rose-400 font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-rose-500 transition-colors">
                        {user.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[10px] text-gray-400">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{user.contact}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CreditCard className="w-3 h-3" />
                          <span>NID: {user.nidNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 capitalize">
                      {user.role}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium">
                      {user.joined}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OverviewContent;
