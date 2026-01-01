"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Clock, AlertCircle } from 'lucide-react';

const MyBookingsPage = () => {
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check Auth
        const user = localStorage.getItem('careUser');
        if (!user) {
            router.push('/login');
            return;
        }

        // Fetch Bookings
        const storedBookings = JSON.parse(localStorage.getItem('careBookings') || '[]');
        // Sort by date created desc
        storedBookings.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
        setBookings(storedBookings);
        setLoading(false);
    }, [router]);

    const handleCancel = (id) => {
        if (confirm('Are you sure you want to cancel this booking?')) {
            const updatedBookings = bookings.map(b => 
                b.id === id ? { ...b, status: 'Cancelled' } : b
            );
            setBookings(updatedBookings);
            localStorage.setItem('careBookings', JSON.stringify(updatedBookings));
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            case 'Completed': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) return <div className="min-h-screen pt-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div></div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

                {bookings.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No bookings found</h3>
                        <p className="text-gray-500 mb-6">You haven't booked any services yet.</p>
                        <Link 
                            href="/services" 
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700"
                        >
                            Browse Services
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{booking.serviceName}</h3>
                                            <p className="text-sm text-gray-500">Booking ID: #{booking.id}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-6 text-gray-600">
                                        <div className="flex items-center">
                                            <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Start Date</p>
                                                <p className="text-sm">{booking.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="w-5 h-5 mr-3 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Duration</p>
                                                <p className="text-sm">{booking.duration} {booking.durationType}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Location</p>
                                                <p className="text-sm truncate">{booking.district}, {booking.division}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-100">
                                        <p className="text-lg font-bold text-gray-900 mb-4 sm:mb-0">
                                            Total: <span className="text-rose-600">${booking.totalCost}</span>
                                        </p>
                                        <div className="flex gap-3">
                                            <button className="text-gray-600 hover:text-gray-900 font-medium text-sm px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                                View Details
                                            </button>
                                            {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                                                <button 
                                                    onClick={() => handleCancel(booking.id)}
                                                    className="text-red-600 hover:text-red-700 font-medium text-sm px-4 py-2 border border-red-100 rounded-lg hover:bg-red-50 transition-colors"
                                                >
                                                    Cancel Booking
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookingsPage;
