"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, Clock, MapPin, DollarSign, Calendar } from 'lucide-react';

const ServiceDetailPage = () => {
    const params = useParams();
    const { service_id } = params;

    // Mock Data (In a real app, fetch from API)
    const services = [
        {
            id: 1,
            name: 'Baby Care Service',
            description: 'Professional baby sitting and care services for your little ones.',
            longDescription: 'Our trained babysitters provide comprehensive care including feeding, playing, changing diapers, and ensuring your baby\'s safety and happiness. We understand that every child is unique, and our caregivers are adaptable to your specific routine.',
            price: 500,
            features: ['Experienced Caretakers', 'Safety Certified', '24/7 Available', 'Activity Planning', 'Emergency First Aid'],
            image: 'bg-blue-100'
        },
        {
            id: 2,
            name: 'Elderly Care Service',
            description: 'Compassionate care for senior citizens with dignity and respect.',
            longDescription: 'We provide personalized elderly care services including medication management, mobility assistance, companionship, and daily living support. Our goal is to improve quality of life while ensuring safety and comfort.',
            price: 600,
            features: ['Medical Assistance', 'Companion Care', 'Mobility Support', 'Meal Preparation', 'Health Monitoring'],
            image: 'bg-purple-100'
        },
        {
            id: 3,
            name: 'Sick People Service',
            description: 'Dedicated nursing and care for patients recovering at home.',
            longDescription: 'Professional nursing care for patients needing medical attention at home, including medication, wound care, and health monitoring. Our nurses are certified and experienced in handling various medical conditions.',
            price: 700,
            features: ['Nursing Care', 'Health Monitoring', 'Medication Management', 'Emergency Support', 'Post-Op Care'],
            image: 'bg-rose-100'
        }
    ];

    const service = services.find(s => s.id === parseInt(service_id));

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Service Not Found</h2>
                    <Link href="/services" className="text-rose-600 hover:underline mt-4 block">
                        Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link href="/services" className="inline-flex items-center text-gray-600 hover:text-rose-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Services
                </Link>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className={`h-64 md:h-80 w-full ${service.image} flex items-center justify-center`}>
                         <span className="text-4xl font-bold text-gray-400 opacity-50">{service.name} Image</span>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{service.name}</h1>
                                <p className="text-xl text-gray-600 max-w-2xl">{service.description}</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 min-w-[250px]">
                                <p className="text-sm text-gray-500 mb-1">Starting from</p>
                                <p className="text-3xl font-bold text-rose-600 mb-4">
                                    ${service.price} <span className="text-base font-normal text-gray-500">/ day</span>
                                </p>
                                <Link 
                                    href={`/booking/${service.id}`}
                                    className="block w-full text-center bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                                >
                                    Book Now
                                </Link>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">About This Service</h3>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    {service.longDescription}
                                </p>

                                <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                                <ul className="space-y-3">
                                    {service.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-gray-700">
                                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="bg-white p-2 rounded-lg shadow-sm mr-4">
                                            <Clock className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Flexible Scheduling</h4>
                                            <p className="text-sm text-gray-600 mt-1">Book for a few hours or entire days.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-white p-2 rounded-lg shadow-sm mr-4">
                                            <MapPin className="w-6 h-6 text-rose-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Local Caregivers</h4>
                                            <p className="text-sm text-gray-600 mt-1">Professionals from your neighborhood.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-white p-2 rounded-lg shadow-sm mr-4">
                                            <DollarSign className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">Transparent Pricing</h4>
                                            <p className="text-sm text-gray-600 mt-1">No hidden fees or surprises.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailPage;
