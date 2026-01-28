"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import {
  Heart,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Calendar,
  Settings,
  ChevronDown,
  Sun,
  Moon,
  Bell,
  Zap,
  Shield,
} from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data: session } = useSession();
  const user = session?.user || null;
  // console.log("User Session", session?.user.image);

  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    await signOut({ callbackUrl: "/" });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isActive = (path) => pathname === path;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Caregivers", href: "/caregivers" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  if (user) {
    navLinks.push({ name: "Dashboard", href: "/dashboard" });
  }

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "U"
    );
  };

  if (!mounted) return null;

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-950/90 backdrop-blur-2xl border-b border-gray-200/50 dark:border-gray-800/50 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4  lg:px-0">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="">
            <img src="/logo2.png" className=" h-13 w-38"></img>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive(link.href)
                    ? "bg-gradient-to-r from-rose-500/20 to-purple-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                    : "text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle */}
            {/* <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-300 focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button> */}

            {/* Divider */}
            <div className="h-6 w-px bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-700"></div>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* User Profile Button */}
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 px-3.5 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:border-rose-500/50 dark:hover:border-rose-500/50 transition-all duration-300 shadow-md hover:shadow-lg group"
                >
                  {/* User Avatar */}
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center border-2 border-white dark:border-gray-800 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                      {user?.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-sm">
                          {getInitials(user?.name)}
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-md"></div>
                  </div>

                  {/* User Name */}
                  <div className="flex flex-col items-start max-w-xs">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {user?.name?.split(" ")[0] || "User"}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {user?.role || "Member"}
                    </span>
                  </div>

                  {/* Chevron */}
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform duration-300 ${
                      profileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Premium Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl py-3 border border-gray-100/50 dark:border-gray-800/50 ring-1 ring-black ring-opacity-5 backdrop-blur-xl transform origin-top-right animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    {/* Header Section */}
                    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800/50 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-800/30 dark:to-transparent">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center border-3 border-white dark:border-gray-800 shadow-lg">
                          {user?.image ? (
                            <img
                              src={user.image}
                              alt={user.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold">
                              {getInitials(user?.name)}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user?.email}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Zap className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400">
                              Premium
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 space-y-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-rose-50 hover:to-purple-50 dark:hover:from-rose-950/30 dark:hover:to-purple-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-all duration-200 rounded-xl group"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <LayoutDashboard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Dashboard</span>
                        <span className="ml-auto text-xs bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 px-2 py-1 rounded-full font-semibold">
                          New
                        </span>
                      </Link>
                      <Link
                        href="/dashboard/bookings"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-rose-50 hover:to-purple-50 dark:hover:from-rose-950/30 dark:hover:to-purple-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-all duration-200 rounded-xl group"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>My Bookings</span>
                        <span className="ml-auto text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full font-semibold">
                          5
                        </span>
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-rose-50 hover:to-purple-50 dark:hover:from-rose-950/30 dark:hover:to-purple-950/30 hover:text-rose-600 dark:hover:text-rose-400 transition-all duration-200 rounded-xl group"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Settings</span>
                      </Link>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100/50 dark:border-gray-800/50 my-2"></div>

                    {/* Logout Button */}
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all duration-200 group"
                      >
                        <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-gray-700 dark:text-gray-300 font-bold text-sm hover:text-rose-600 dark:hover:text-rose-400 transition-colors px-4 py-2"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl animate-in fade-in slide-in-from-right duration-300"
          style={{ top: "70px", height: "calc(100vh - 70px)" }}
        >
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Mobile User Section */}
            {user && (
              <div className="px-4 pt-6 pb-4 border-b border-gray-200/50 dark:border-gray-800/50 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-gray-800/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center border-3 border-white dark:border-gray-800 shadow-lg">
                    {user?.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold">
                        {getInitials(user?.name)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Nav Links */}
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-semibold text-base transition-all duration-300 ${
                    isActive(link.href)
                      ? "bg-gradient-to-r from-rose-500/20 to-purple-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200/50 dark:border-gray-800/50 my-2"></div>

            {user ? (
              <div className="px-4 py-4 space-y-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-all duration-300"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/bookings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-all duration-300"
                >
                  <Calendar className="w-5 h-5" />
                  My Bookings
                </Link>
                <Link
                  href="/dashboard/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-semibold text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-xl transition-all duration-300"
                >
                  <Settings className="w-5 h-5" />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-base font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="px-4 py-4 space-y-3 mt-auto mb-4">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
