"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
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
  Moon
} from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const router = useRouter();
    const dropdownRef = useRef(null);

    // Handle hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        
        // Check for logged in user
        const checkUser = () => {
            try {
                const storedUser = localStorage.getItem('careUser');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        };

        checkUser();
        
        // Listen for storage changes
        window.addEventListener('storage', checkUser);

        // Click outside to close dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('storage', checkUser);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('careUser');
        setUser(null);
        setProfileDropdownOpen(false);
        setMobileMenuOpen(false);
        router.push('/');
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const isActive = (path) => pathname === path;

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
    ];

    if (user) {
        navLinks.push({ name: 'My Bookings', href: '/dashboard/bookings' });
    }

    if (!mounted) return null;

    return (
        <nav 
            className={`fixed w-full top-0 z-50 transition-all duration-300 border-b ${
                isScrolled 
                ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-gray-200 dark:border-gray-800 py-3' 
                : 'bg-transparent border-transparent py-4'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-12">
                    {/* Logo */}
                    <Link href="/" className="">
                      <img src='/logo2.png' className=' h-32 w-42'></img>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                    isActive(link.href) 
                                    ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400' 
                                    : 'text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </button>

                        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>

                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button 
                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors focus:outline-none bg-white dark:bg-gray-800 py-1.5 px-3 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm"
                                >
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-rose-100 to-purple-100 dark:from-rose-900 dark:to-purple-900 flex items-center justify-center border border-rose-200 dark:border-rose-800">
                                        <User className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                                    </div>
                                    <span>{user.name || 'User'}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {profileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-xl py-2 border border-gray-100 dark:border-gray-800 ring-1 ring-black ring-opacity-5 transform origin-top-right transition-all duration-200 z-50">
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Signed in as</p>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white truncate mt-0.5">{user.email || user.name}</p>
                                        </div>
                                        <div className="p-2">
                                            <Link 
                                                href="/dashboard" 
                                                className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 dark:hover:text-rose-400 transition-colors rounded-xl"
                                                onClick={() => setProfileDropdownOpen(false)}
                                            >
                                                <LayoutDashboard className="w-4 h-4 mr-3" />
                                                Dashboard
                                            </Link>
                                            <Link 
                                                href="/dashboard/bookings" 
                                                className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 hover:text-rose-600 dark:hover:text-rose-400 transition-colors rounded-xl"
                                                onClick={() => setProfileDropdownOpen(false)}
                                            >
                                                <Calendar className="w-4 h-4 mr-3" />
                                                My Bookings
                                            </Link>
                                        </div>
                                        <div className="border-t border-gray-100 dark:border-gray-800 mt-1 p-2">
                                            <button 
                                                onClick={handleLogout}
                                                className="flex w-full items-center px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                                            >
                                                <LogOut className="w-4 h-4 mr-3" />
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link 
                                    href="/login" 
                                    className="text-gray-600 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 font-medium text-sm transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link 
                                    href="/register" 
                                    className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
                        >
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </button>
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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

            {/* Mobile Menu Overlay */}
            <div 
                className={`md:hidden fixed inset-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl transition-transform duration-300 ease-in-out ${
                    mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                style={{ top: '60px', height: 'calc(100vh - 60px)' }}
            >
                <div className="flex flex-col p-4 space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`text-lg font-medium px-4 py-3 rounded-xl transition-colors ${
                                isActive(link.href) 
                                ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400' 
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    
                    <div className="border-t border-gray-100 dark:border-gray-800 my-2 pt-2"></div>

                    {user ? (
                        <>
                            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-xl mb-2">
                                <p className="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
                                <p className="font-bold text-gray-900 dark:text-white">{user.name}</p>
                            </div>
                            <Link 
                                href="/dashboard"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center px-4 py-3 text-lg font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
                            >
                                <LayoutDashboard className="w-5 h-5 mr-3" />
                                Dashboard
                            </Link>
                            <Link 
                                href="/dashboard/bookings"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center px-4 py-3 text-lg font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
                            >
                                <Calendar className="w-5 h-5 mr-3" />
                                My Bookings
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="flex items-center w-full px-4 py-3 text-lg font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl"
                            >
                                <LogOut className="w-5 h-5 mr-3" />
                                Sign out
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col space-y-3 px-4 pt-2">
                            <Link 
                                href="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full text-center py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                Log in
                            </Link>
                            <Link 
                                href="/register"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full text-center py-3.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg"
                            >
                                Sign up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;