"use client";
import React, { useState, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  User,
  Settings,
  Menu,
  X,
  LogOut,
  Heart,
  MessageSquare,
  CreditCard,
  Bell,
  Briefcase,
  DollarSign,
  Home,
  ChevronRight,
  Sparkles,
  Search,
  ArrowRight,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

export const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

const DashboardLayoutContent = ({ children }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { data } = useSession();
  const roleManeze = data?.user?.role;

  const navItems =
    roleManeze === "user"
      ? [
          { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
          {
            name: "Services Bookings",
            href: "/dashboard/bookings",
            icon: Calendar,
          },
          {
            name: "Caregivers Booking",
            href: "/dashboard/favorites",
            icon: Heart,
          },

          { name: "Profile", href: "/dashboard/profile", icon: User },
          // { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
          { name: "Settings", href: "/dashboard/settings", icon: Settings },
        ]
      : [
          { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
          { name: "My Jobs", href: "/dashboard/jobs", icon: Calendar },
          { name: "My Services", href: "/dashboard/services", icon: Briefcase },
          { name: "Earnings", href: "/dashboard/earnings", icon: DollarSign },
          { name: "Profile", href: "/dashboard/profile", icon: User },
          { name: "Settings", href: "/dashboard/settings", icon: Settings },
        ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <DashboardContext.Provider value={{ userRole, setUserRole }}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-rose-50 to-orange-50 dark:from-gray-950 dark:via-rose-950/20 dark:to-gray-950">
        {/* Top Fixed Navbar - Premium Glassmorphism */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800 h-16 flex items-center justify-between px-4 lg:px-6 transition-all duration-300 shadow-sm hover:shadow-md">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden text-gray-600 dark:text-gray-300 transition-colors duration-200 group"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              ) : (
                <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
            </button>

            <div className="flex items-center justify-center  gap-34">
              <div className="flex items-center gap-2 sm:gap-3">
                <Link href="/dashboard">
                  <img src="/logo2.png" className="w-36 h-12"></img>
                </Link>
              </div>
              <Link
                href="/"
                className="group hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 text-rose-600 dark:text-rose-400 hover:from-rose-100 hover:to-orange-100 dark:hover:from-rose-900/40 dark:hover:to-orange-900/40 transition-all duration-300 border border-rose-200/50 dark:border-rose-800/50 hover:shadow-lg hover:shadow-rose-500/10 font-medium"
                title="Back to Home"
              >
                <Home className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span className="text-sm hidden lg:inline">Home</span>
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 transition-all" />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex items-center px-4 py-2 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50 focus-within:border-rose-300 dark:focus-within:border-rose-700 focus-within:bg-white dark:focus-within:bg-gray-800 focus-within:shadow-lg focus-within:shadow-rose-500/10 transition-all duration-200 w-48 lg:w-64">
              <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            {/* Back to Home Button - Premium Style */}

            {/* Notification Bell */}
            <button className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 relative transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 group">
              <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-gradient-to-br from-rose-500 to-orange-500 rounded-full ring-2 ring-white dark:ring-gray-900 animate-pulse"></span>
            </button>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 hidden sm:block"></div>

            {/* Profile Section */}
            <div className="flex items-center gap-2 sm:gap-3 pl-2">
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-2 group hover:opacity-80 transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-orange-500 to-rose-600 p-0.5 shadow-lg shadow-rose-500/30 group-hover:shadow-rose-500/50 transition-all">
                  <div className="w-full h-full rounded-[10px] bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                    {data?.user?.image ? (
                      <img
                        src={data.user.image}
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-600 text-sm">
                        {userRole === "user" ? "U" : "P"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                    {data?.user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {userRole} Account
                  </p>
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-16 right-6 w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {data?.user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">
                        {userRole} • Premium Member
                      </p>
                    </div>
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <User className="w-4 h-4" />
                        View Profile
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <Settings className="w-4 h-4" />
                        Account Settings
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>

        {/* Sidebar - Premium Style */}
        <aside
          className={`
            fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 sm:w-72 transform transition-all duration-300 ease-out 
            bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800
            ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
            lg:translate-x-0 lg:shadow-none overflow-y-auto
          `}
        >
          <div className="h-full flex flex-col justify-between p-5">
            <div className="space-y-6">
              <div className="px-2">
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                  Navigation
                </p>
                <nav className="space-y-1.5">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleSidebarClose}
                        className={`
                          relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group overflow-hidden
                          ${
                            isActive
                              ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg shadow-rose-500/30"
                              : "text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                          }
                        `}
                      >
                        {!isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 to-orange-600/0 group-hover:from-rose-500/5 group-hover:to-orange-600/5 rounded-xl transition-all" />
                        )}
                        <Icon
                          className={`w-5 h-5 flex-shrink-0 relative z-10 ${
                            isActive
                              ? "text-white"
                              : "text-gray-500 dark:text-gray-500 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors"
                          }`}
                        />
                        <span className="font-semibold relative z-10 flex-grow">
                          {item.name}
                        </span>
                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-gradient-to-r from-rose-600/20 to-orange-600/20 rounded-xl -z-10"
                            initial={false}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                            }}
                          />
                        )}
                        {!isActive && (
                          <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-gray-400 relative z-10" />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-200/50 dark:border-gray-800 pt-6 space-y-4">
              {/* Pro Plan Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-rose-500 via-rose-600 to-orange-600 rounded-2xl p-4 text-white shadow-xl shadow-rose-500/30 mx-2 cursor-pointer transition-all hover:shadow-rose-500/50 group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                    <Sparkles size={18} />
                  </div>
                  <span className="font-bold text-sm">Pro Plan</span>
                </div>
                <p className="text-xs text-rose-100 mb-3 font-medium">
                  Unlock premium features and boost your potential
                </p>
                <button className="w-full py-2.5 bg-white text-rose-600 text-xs font-bold rounded-xl hover:bg-rose-50 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-white/20 flex items-center justify-center gap-2">
                  <span>Upgrade Now</span>
                  <ArrowRight size={14} />
                </button>
              </motion.div>

              {/* Sign Out Button */}
              <motion.button
                whileHover={{ x: 4 }}
                className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-gray-600 dark:text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-all duration-200 group mx-2 font-semibold"
              >
                <LogOut className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Sign Out</span>
              </motion.button>
            </div>
          </div>
        </aside>

        {/* Sidebar Overlay - Mobile */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleSidebarClose}
              className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="lg:pl-72 pt-16 min-h-screen transition-all duration-300">
          <main className="p-4 sm:p-6 lg:p-10 max-w-11/12 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default DashboardLayoutContent;
