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

  const userStats = [
    {
      title: "Total Bookings",
      value: "12",
      icon: Calendar,
      color: "from-rose-500 to-rose-600",
      iconColor: "text-white",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Upcoming",
      value: "3",
      icon: Clock,
      color: "from-orange-500 to-amber-600",
      iconColor: "text-white",
      trend: "-2%",
      trendUp: false,
    },
    {
      title: "Completed",
      value: "8",
      icon: CheckCircle,
      color: "from-emerald-500 to-teal-600",
      iconColor: "text-white",
      trend: "+5%",
      trendUp: true,
    },
    {
      title: "Reviews Given",
      value: "5",
      icon: Star,
      color: "from-yellow-500 to-amber-500",
      iconColor: "text-white",
      trend: "+1",
      trendUp: true,
    },
  ];

  const providerStats = [
    {
      title: "Total Earnings",
      value: "$2,450",
      icon: DollarSign,
      color: "from-rose-500 to-pink-600",
      iconColor: "text-white",
      trend: "+18%",
      trendUp: true,
    },
    {
      title: "Active Jobs",
      value: "4",
      icon: Briefcase,
      color: "from-blue-500 to-indigo-600",
      iconColor: "text-white",
      trend: "0%",
      trendUp: true,
    },
    {
      title: "Pending Requests",
      value: "2",
      icon: Clock,
      color: "from-orange-500 to-amber-600",
      iconColor: "text-white",
      trend: "+2",
      trendUp: true,
    },
    {
      title: "Rating",
      value: "4.9",
      icon: Star,
      color: "from-yellow-500 to-amber-500",
      iconColor: "text-white",
      trend: "+0.2",
      trendUp: true,
    },
  ];

  const stats = userRole === "user" ? userStats : providerStats;

  const upcomingBookings = [
    {
      id: 1,
      sitter: "Sarah Johnson",
      service: "Babysitting",
      date: "2024-03-20",
      time: "18:00 – 22:00",
      status: "Confirmed",
      price: "$60",
    },
    {
      id: 2,
      sitter: "Emily Davis",
      service: "Nanny Service",
      date: "2024-03-22",
      time: "09:00 – 17:00",
      status: "Pending",
      price: "$120",
    },
    {
      id: 3,
      sitter: "Michael Brown",
      service: "Pet Sitting",
      date: "2024-03-25",
      time: "10:00 – 14:00",
      status: "Confirmed",
      price: "$45",
    },
  ];

  const upcomingJobs = [
    {
      id: 1,
      client: "John Doe",
      service: "Babysitting",
      date: "2024-03-21",
      time: "19:00 – 23:00",
      status: "Confirmed",
      price: "$80",
    },
    {
      id: 2,
      client: "Jane Smith",
      service: "Pet Sitting",
      date: "2024-03-23",
      time: "10:00 – 12:00",
      status: "Pending",
      price: "$30",
    },
  ];

  const listData = userRole === "user" ? upcomingBookings : upcomingJobs;

  // ── Chart Data ───────────────────────────────────────────
  const userMonthlyData = [
    { name: "Jan", amount: 120 },
    { name: "Feb", amount: 200 },
    { name: "Mar", amount: 150 },
    { name: "Apr", amount: 280 },
    { name: "May", amount: 190 },
    { name: "Jun", amount: 350 },
  ];

  const providerMonthlyData = [
    { name: "Jan", amount: 800 },
    { name: "Feb", amount: 1200 },
    { name: "Mar", amount: 950 },
    { name: "Apr", amount: 1600 },
    { name: "May", amount: 1400 },
    { name: "Jun", amount: 2100 },
  ];

  const userServiceData = [
    { name: "Babysitting", value: 45, color: "#f43f5e" }, // rose-500
    { name: "Nanny", value: 30, color: "#f97316" }, // orange-500
    { name: "Pet Sitting", value: 25, color: "#eab308" }, // yellow-500
  ];

  const providerJobData = [
    { name: "Babysitting", value: 55, color: "#f43f5e" },
    { name: "Nanny", value: 35, color: "#f97316" },
    { name: "Housekeeping", value: 10, color: "#10b981" }, // emerald-500
  ];

  const chartData = userRole === "user" ? userMonthlyData : providerMonthlyData;
  const pieData = userRole === "user" ? userServiceData : providerJobData;

  // ── Recent Activity ──────────────────────────────────────
  const recentActivity = [
    {
      id: 1,
      action: "Booking confirmed",
      desc: "Your booking with Sarah Johnson was confirmed",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "New message",
      desc: "You received a message from Emily Davis",
      time: "5 hours ago",
    },
    {
      id: 3,
      action: "Payment successful",
      desc: "Payment for booking #1234 was successful",
      time: "1 day ago",
    },
  ];

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

        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700/80 transition-all duration-200 group">
            <Download className="w-4 h-4 text-gray-500 group-hover:text-rose-500 transition-colors" />
            <span>Export Report</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
            <Plus className="w-5 h-5" />
            <span>New {userRole === "user" ? "Booking" : "Job"}</span>
          </button>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Bookings / Jobs – elegant table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {userRole === "user" ? "Upcoming Bookings" : "Upcoming Jobs"}
            </h2>
            <button className="text-sm font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition-colors flex items-center gap-1 group">
              View All
              <span className="group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </button>
          </div>

          <div className="overflow-hidden rounded-3xl border border-gray-100 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl shadow-xl shadow-rose-500/5">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700/50">
                    <th className="px-8 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      {userRole === "user" ? "Sitter" : "Client"}
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Service
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Date & Time
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Status
                    </th>
                    <th className="px-8 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
                  {listData.map((item, i) => (
                    <motion.tr
                      key={item.id}
                      custom={i}
                      variants={tableRowVariants}
                      initial="hidden"
                      animate="visible"
                      className="group hover:bg-rose-50/50 dark:hover:bg-rose-900/10 transition-colors duration-200"
                    >
                      <td className="whitespace-nowrap px-8 py-5">
                        <span className="font-bold text-gray-900 dark:text-white block">
                          {userRole === "user" ? item.sitter : item.client}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-8 py-5 text-sm font-medium text-gray-600 dark:text-gray-300">
                        {item.service}
                      </td>
                      <td className="whitespace-nowrap px-8 py-5">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {item.date}
                          </span>
                          <span className="text-xs font-medium text-gray-400 mt-0.5">
                            {item.time}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-8 py-5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                            item.status === "Confirmed"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                          }`}
                        >
                          {item.status === "Confirmed" && (
                            <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5" />
                          )}
                          {item.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-8 py-5 font-bold text-gray-900 dark:text-white">
                        {item.price}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

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

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              <button className="w-full py-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-rose-500 transition-colors">
                View All Activity
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OverviewContent;
