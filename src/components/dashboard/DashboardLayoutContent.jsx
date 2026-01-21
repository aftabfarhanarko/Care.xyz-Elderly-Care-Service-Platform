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
} from "lucide-react";
import { useSession } from "next-auth/react";

export const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

const DashboardLayoutContent = ({ children }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState("user"); 
  const { data } = useSession();
  console.log("session data", data?.user?.role);
  const roleManeze = data?.user?.role;

  const navItems =
    roleManeze === "user"
      ? [
          { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
          { name: "Services Bookings", href: "/dashboard/bookings", icon: Calendar },
          {
            name: "Messages",
            href: "/dashboard/messages",
            icon: MessageSquare,
          },
          { name: "Favorites", href: "/dashboard/favorites", icon: Heart },
          { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
          { name: "Profile", href: "/dashboard/profile", icon: User },
          { name: "Settings", href: "/dashboard/settings", icon: Settings },
        ]
      : [
          { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
          { name: "My Jobs", href: "/dashboard/jobs", icon: Calendar },
          { name: "My Services", href: "/dashboard/services", icon: Briefcase },
          { name: "Earnings", href: "/dashboard/earnings", icon: DollarSign },
          {
            name: "Messages",
            href: "/dashboard/messages",
            icon: MessageSquare,
          },
          { name: "Profile", href: "/dashboard/profile", icon: User },
          { name: "Settings", href: "/dashboard/settings", icon: Settings },
        ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <DashboardContext.Provider value={{ userRole, setUserRole }}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Top Fixed Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <Link href="/dashboard" className="text-xl font-bold text-rose-600">
              Care.xyz Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
              title="Back to Home"
            >
              <Home className="w-5 h-5" />
            </Link>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center text-rose-600 dark:text-rose-400 font-bold">
              {userRole === "user" ? "U" : "P"}
            </div>
          </div>
        </nav>

        {/* Sidebar */}
        <aside
          className={`
                        fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 transform transition-transform duration-200 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
                        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                        lg:translate-x-0
                    `}
        >
          <div className="h-full flex flex-col justify-between p-4">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`
                                            flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                                            ${
                                              isActive
                                                ? "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            }
                                        `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:pl-64 pt-16 min-h-screen transition-all duration-200">
          <main className="p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </DashboardContext.Provider>
  );
};

export default DashboardLayoutContent;
