"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Heart, 
  Menu, 
  X, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Calendar, 
  Settings,
  ChevronDown 
} from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    
    const pathname = usePathname();
    const router = useRouter();
    const dropdownRef = useRef(null);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        
        // Check for logged in user
        // We check localStorage to see if user exists (simulating auth persistence)
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
        
        // Listen for storage changes (in case login happens in another tab)
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

    // Mock Login for demonstration if needed, or rely on other pages to set it
    // For this component, we primarily read the state.

    const handleLogout = () => {
        localStorage.removeItem('careUser');
        setUser(null);
        setProfileDropdownOpen(false);
        setMobileMenuOpen(false);
        router.push('/');
    };

    const isActive = (path) => pathname === path;

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Services', href: '/services' },
    ];

    if (user) {
        navLinks.push({ name: 'My Bookings', href: '/dashboard/bookings' });
    }

    return (
        <nav 
            className={`fixed w-full top-0 z-50 transition-all duration-300 border-b border-transparent ${
                isScrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-sm border-gray-100 py-3' 
                : 'bg-white/50 backdrop-blur-sm py-4'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-12">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="bg-gradient-to-br from-rose-500 to-purple-600 p-2 rounded-lg text-white transform group-hover:scale-110 transition-transform duration-200 shadow-md">
                            <Heart className="w-5 h-5 fill-current" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 group-hover:from-rose-600 group-hover:to-purple-600 transition-all duration-300">
                            Care.xyz
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                className={`text-sm font-medium transition-colors duration-200 hover:text-rose-600 ${
                                    isActive(link.href) ? 'text-rose-600' : 'text-gray-600'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button 
                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-rose-600 transition-colors focus:outline-none"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-100 to-purple-100 flex items-center justify-center border border-rose-200">
                                        <User className="w-4 h-4 text-rose-600" />
                                    </div>
                                    <span>{user.name || 'User'}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                {profileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 border border-gray-100 ring-1 ring-black ring-opacity-5 transform origin-top-right transition-all duration-200">
                                        <div className="px-4 py-2 border-b border-gray-50">
                                            <p className="text-xs text-gray-500">Signed in as</p>
                                            <p className="text-sm font-semibold text-gray-900 truncate">{user.email || user.name}</p>
                                        </div>
                                        <Link 
                                            href="/dashboard" 
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                            onClick={() => setProfileDropdownOpen(false)}
                                        >
                                            <LayoutDashboard className="w-4 h-4 mr-2" />
                                            Dashboard
                                        </Link>
                                        <Link 
                                            href="/dashboard/bookings" 
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                            onClick={() => setProfileDropdownOpen(false)}
                                        >
                                            <Calendar className="w-4 h-4 mr-2" />
                                            My Bookings
                                        </Link>
                                        <button 
                                            onClick={handleLogout}
                                            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link 
                                    href="/login" 
                                    className="text-gray-600 hover:text-rose-600 font-medium text-sm transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link 
                                    href="/register" 
                                    className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors"
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
                className={`md:hidden fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transition-transform duration-300 ease-in-out ${
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
                                ? 'bg-rose-50 text-rose-600' 
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    
                    <div className="border-t border-gray-100 my-2 pt-2"></div>

                    {user ? (
                        <>
                            <div className="px-4 py-2">
                                <p className="text-sm text-gray-500">Signed in as</p>
                                <p className="font-semibold text-gray-900">{user.name}</p>
                            </div>
                            <Link 
                                href="/dashboard"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center px-4 py-3 text-lg font-medium text-gray-600 hover:bg-gray-50 rounded-xl"
                            >
                                <LayoutDashboard className="w-5 h-5 mr-3" />
                                Dashboard
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="flex items-center w-full px-4 py-3 text-lg font-medium text-red-600 hover:bg-red-50 rounded-xl"
                            >
                                <LogOut className="w-5 h-5 mr-3" />
                                Sign out
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col space-y-3 px-4">
                            <Link 
                                href="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full text-center py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Log in
                            </Link>
                            <Link 
                                href="/register"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full text-center py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors shadow-lg"
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
