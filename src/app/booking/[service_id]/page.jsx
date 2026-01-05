"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, MapPin, DollarSign, Clock, CheckCircle } from 'lucide-react';

const BookingPage = () => {
    const params = useParams();
    const router = useRouter();
    const { service_id } = params;
    const [user, setUser] = useState(null);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Mock Service Data
    const services = {
        1: { name: 'Baby Care Service', price: 500 },
        2: { name: 'Elderly Care Service', price: 600 },
        3: { name: 'Sick People Service', price: 700 }
    };

    const service = services[service_id] || { name: 'Unknown Service', price: 0 };

    // Form State
    const [formData, setFormData] = useState({
        duration: 1,
        durationType: 'days', // days or hours
        division: '',
        district: '',
        city: '',
        address: '',
        date: ''
    });

    useEffect(() => {
        // Check authentication
        const storedUser = localStorage.getItem('careUser');
        if (!storedUser) {
            // Redirect to login but store return url
            // For now, simple redirect
            router.push('/login');
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [router]);

    const calculateTotal = () => {
        // Simple calculation logic
        let multiplier = formData.duration;
        if (formData.durationType === 'hours') {
             // Assuming hourly rate is 1/8th of daily rate for simplicity, or just a fixed rate
             // Let's assume price is per day in mock data. Hourly = price / 10
             return (service.price / 8) * formData.duration;
        }
        return service.price * formData.duration;
    };

    const totalCost = calculateTotal();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirmBooking = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            const booking = {
                id: Date.now(),
                serviceId: service_id,
                serviceName: service.name,
                ...formData,
                totalCost,
                status: 'Pending',
                dateCreated: new Date().toISOString()
            };

            // Save to local storage
            const existingBookings = JSON.parse(localStorage.getItem('careBookings') || '[]');
            localStorage.setItem('careBookings', JSON.stringify([booking, ...existingBookings]));

            setLoading(false);
            router.push('/dashboard/bookings');
        }, 1500);
    };

    if (!user) return null; // Or loading spinner

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 transition-colors duration-200">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                    <div className="bg-gray-900 dark:bg-black px-8 py-6 text-white">
                        <h1 className="text-2xl font-bold">Book {service.name}</h1>
                        <p className="text-gray-400 mt-1">Complete the details below to schedule your care service.</p>
                    </div>

                    <div className="p-8">
                        <div className="space-y-8">
                            {/* Section 1: Duration */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <Clock className="w-5 h-5 mr-2 text-rose-600 dark:text-rose-500" />
                                    Duration & Timing
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                                        <input 
                                            type="date" 
                                            name="date"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration</label>
                                            <input 
                                                type="number" 
                                                name="duration"
                                                min="1"
                                                value={formData.duration}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit</label>
                                            <select 
                                                name="durationType"
                                                value={formData.durationType}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                onChange={handleInputChange}
                                            >
                                                <option value="days">Days</option>
                                                <option value="hours">Hours</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100 dark:border-gray-700" />

                            {/* Section 2: Location */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-rose-600 dark:text-rose-500" />
                                    Location Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Division</label>
                                        <select 
                                            name="division" 
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Division</option>
                                            <option value="Dhaka">Dhaka</option>
                                            <option value="Chittagong">Chittagong</option>
                                            <option value="Sylhet">Sylhet</option>
                                            <option value="Khulna">Khulna</option>
                                            {/* Add more */}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">District</label>
                                        <input 
                                            type="text" 
                                            name="district"
                                            placeholder="e.g. Dhaka"
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Address</label>
                                    <textarea 
                                        name="address"
                                        rows="3"
                                        placeholder="House No, Road No, Area..."
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                            </div>

                            <hr className="border-gray-100 dark:border-gray-700" />

                            {/* Section 3: Cost & Confirm */}
                            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-600 dark:text-gray-300">Service Rate</span>
                                    <span className="font-medium text-gray-900 dark:text-white">${service.price} / {formData.durationType === 'hours' ? 'day (approx)' : 'day'}</span>
                                </div>
                                <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total Estimated Cost</span>
                                    <span className="text-2xl font-bold text-rose-600 dark:text-rose-500">${totalCost.toFixed(2)}</span>
                                </div>
                                
                                <button 
                                    onClick={handleConfirmBooking}
                                    disabled={loading}
                                    className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
                                >
                                    {loading ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : (
                                        <>
                                            Confirm Booking <CheckCircle className="ml-2 w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
