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
        <div className="min-h-screen bg-gray-50 pt-20 pb-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gray-900 px-8 py-6 text-white">
                        <h1 className="text-2xl font-bold">Book {service.name}</h1>
                        <p className="text-gray-400 mt-1">Complete the details below to schedule your care service.</p>
                    </div>

                    <div className="p-8">
                        <div className="space-y-8">
                            {/* Section 1: Duration */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <Clock className="w-5 h-5 mr-2 text-rose-600" />
                                    Duration & Timing
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                        <input 
                                            type="date" 
                                            name="date"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                            <input 
                                                type="number" 
                                                name="duration"
                                                min="1"
                                                value={formData.duration}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                                            <select 
                                                name="durationType"
                                                value={formData.durationType}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
                                                onChange={handleInputChange}
                                            >
                                                <option value="days">Days</option>
                                                <option value="hours">Hours</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Section 2: Location */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-rose-600" />
                                    Location Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
                                        <select 
                                            name="division" 
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                        <input 
                                            type="text" 
                                            name="district"
                                            placeholder="e.g. Dhaka"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                                    <textarea 
                                        name="address"
                                        rows="3"
                                        placeholder="House No, Road No, Area..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition"
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Section 3: Cost & Confirm */}
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-600">Service Rate</span>
                                    <span className="font-medium">${service.price} / {formData.durationType === 'hours' ? 'day (approx)' : 'day'}</span>
                                </div>
                                <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-200">
                                    <span className="text-lg font-bold text-gray-900">Total Estimated Cost</span>
                                    <span className="text-2xl font-bold text-rose-600">${totalCost.toFixed(2)}</span>
                                </div>
                                
                                <button 
                                    onClick={handleConfirmBooking}
                                    disabled={loading || !formData.date || !formData.address}
                                    className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform hover:-translate-y-0.5 ${
                                        loading || !formData.date || !formData.address 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700'
                                    }`}
                                >
                                    {loading ? 'Processing...' : 'Confirm Booking'}
                                </button>
                                <p className="text-center text-xs text-gray-500 mt-4">
                                    By clicking confirm, you agree to our terms of service.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
