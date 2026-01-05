"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
    Calendar, 
    CheckCircle, 
    Clock, 
    Star, 
    TrendingUp 
} from 'lucide-react';

const DashboardPage = () => {
    // Mock Data
    const stats = [
        { title: 'Total Bookings', value: '12', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/20' },
        { title: 'Upcoming', value: '3', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/20' },
        { title: 'Completed', value: '8', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' },
        { title: 'Reviews', value: '4.8', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/20' },
    ];

    const upcomingBookings = [
        { id: 1, sitter: 'Sarah Johnson', service: 'Babysitting', date: '2024-03-20', time: '18:00 - 22:00', status: 'Confirmed', price: '$60' },
        { id: 2, sitter: 'Emily Davis', service: 'Nanny Service', date: '2024-03-22', time: '09:00 - 17:00', status: 'Pending', price: '$120' },
        { id: 3, sitter: 'Michael Brown', service: 'Pet Sitting', date: '2024-03-25', time: '10:00 - 14:00', status: 'Confirmed', price: '$45' },
    ];

    const recentActivity = [
        { id: 1, action: 'Booking confirmed', description: 'Your booking with Sarah Johnson was confirmed', time: '2 hours ago' },
        { id: 2, action: 'New message', description: 'You received a message from Emily Davis', time: '5 hours ago' },
        { id: 3, action: 'Payment successful', description: 'Payment for booking #1234 was successful', time: '1 day ago' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-gray-500 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-lg ${stat.bg}`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Upcoming Bookings */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Bookings</h2>
                        <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium">View All</button>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-gray-50 dark:bg-gray-700/50">
                                    <tr>
                                        <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Sitter</th>
                                        <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Service</th>
                                        <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Date & Time</th>
                                        <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                                        <th className="px-6 py-4 font-medium text-gray-500 dark:text-gray-400">Price</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {upcomingBookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{booking.sitter}</td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{booking.service}</td>
                                            <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                                <div className="flex flex-col">
                                                    <span>{booking.date}</span>
                                                    <span className="text-xs text-gray-400">{booking.time}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                    booking.status === 'Confirmed' 
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{booking.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <div className="space-y-6">
                            {recentActivity.map((activity, index) => (
                                <div key={activity.id} className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-2 h-2 mt-2 rounded-full bg-primary-500 ring-4 ring-primary-50 dark:ring-primary-900/20" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activity.description}</p>
                                        <p className="text-xs text-gray-400 mt-2">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
