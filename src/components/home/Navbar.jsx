"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  X,
  LayoutDashboard,
  Calendar,
  Settings,
  ChevronDown,
  Sun,
  Moon,
  Zap,
  LogOut,
  LogIn,
  UserPlus,
  Home,
  Info,
  Users,
  Briefcase,
  Mail,
  Star,
} from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data: session } = useSession();
  const user = session?.user || null;

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
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Caregivers", href: "/caregivers", icon: Users },
    { name: "Services", href: "/services", icon: Briefcase },
    { name: "Reviews", href: "/reviews", icon: Star },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

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
    <nav className="fixed w-full top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-gray-200/40 dark:border-slate-800/40 py-2 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <img src="/logo2.png" alt="Logo" className=" h-8 md:h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 group ${
                    isActive(link.href)
                      ? "text-rose-600 dark:text-rose-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400"
                  }`}
                >
                  <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300/40 dark:bg-slate-700/40"></div>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* User Profile Button */}
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 border border-gray-200/50 dark:border-slate-700/50 hover:border-rose-400/50 dark:hover:border-rose-500/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-rose-500/10 group"
                >
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {user?.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-xs">
                          {getInitials(user?.name)}
                        </span>
                      )}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 shadow-md"></div>
                  </div>

                  {/* Name & Role */}
                  <div className="hidden sm:flex flex-col items-start text-left">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                      {user?.name?.split(" ")[0] || "User"}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {user?.role || "Member"}
                    </span>
                  </div>

                  {/* Chevron */}
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 group-hover:text-rose-500 dark:group-hover:text-rose-400 transition-all duration-300 ${
                      profileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Desktop Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/40 border border-gray-200/50 dark:border-slate-700/50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-rose-500/10 to-purple-500/10 dark:from-rose-500/20 dark:to-purple-500/20 px-5 py-4 border-b border-gray-200/50 dark:border-slate-700/50">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center border-3 border-white dark:border-slate-800 shadow-lg">
                          {user?.image ? (
                            <img
                              src={user.image}
                              alt={user.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold text-lg">
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
                          <div className="flex items-center gap-1.5 mt-2">
                            <Zap className="w-3.5 h-3.5 text-yellow-500" />
                            <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400">
                              Premium
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2 px-2 space-y-1">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 transition-all duration-200 group"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <LayoutDashboard className="w-5 h-5 transition-transform group-hover:scale-110" />
                        <span className="flex-1">Dashboard</span>
                        <span className="text-xs bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 px-2 py-1 rounded-full font-bold">
                          New
                        </span>
                      </Link>
                      <Link
                        href="/dashboard/bookings"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 group"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <Calendar className="w-5 h-5 transition-transform group-hover:scale-110" />
                        <span className="flex-1">My Bookings</span>
                        <span className="text-xs bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full font-bold">
                          5
                        </span>
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 group"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <Settings className="w-5 h-5 transition-transform group-hover:scale-110" />
                        <span>Settings</span>
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-200/50 dark:border-slate-700/50 p-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200 group"
                      >
                        <LogOut className="w-5 h-5 transition-transform group-hover:scale-110" />
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
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-700 hover:border-rose-400 hover:text-rose-600 dark:hover:border-rose-500 dark:hover:text-rose-400 transition-all duration-300"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Log in</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-purple-500 hover:shadow-lg hover:shadow-rose-500/50 transition-all duration-300"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none transition-all duration-300"
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
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-gray-200/40 dark:border-slate-800/40 shadow-lg animate-in fade-in slide-in-from-top duration-300">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
            {/* Mobile User Section */}
            {user && (
              <div className="pb-4 mb-4 border-b border-gray-200/40 dark:border-slate-800/40">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-lg">
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
                  <div className="flex-1">
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
            <div className="space-y-1 mb-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive(link.href)
                        ? "bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {user ? (
              <>
                <div className="border-t border-gray-200/40 dark:border-slate-800/40 py-4 space-y-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 transition-all duration-300"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/bookings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                  >
                    <Calendar className="w-5 h-5" />
                    My Bookings
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
                  >
                    <Settings className="w-5 h-5" />
                    Settings
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  Sign out
                </button>
              </>
            ) : (
              <div className="border-t border-gray-200/40 dark:border-slate-800/40 pt-4 space-y-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border-2 border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-semibold hover:border-rose-400 hover:text-rose-600 dark:hover:border-rose-500 dark:hover:text-rose-400 transition-all duration-300"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Log in</span>
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-gradient-to-r from-rose-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-rose-500/50 transition-all duration-300"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Sign up</span>
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