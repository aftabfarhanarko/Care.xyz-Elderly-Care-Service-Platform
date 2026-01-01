"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Baby, Users, Stethoscope, ArrowRight, CheckCircle } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      name: 'Baby Care',
      icon: Baby,
      description: 'Professional babysitting for your little ones. Safe, fun, and educational activities included.',
      color: 'bg-blue-100 text-blue-600',
      price: '$15/hr',
      features: ['Certified Babysitters', 'Educational Activities', 'Meal Preparation', 'Bedtime Routines']
    },
    {
      id: 2,
      name: 'Elderly Care',
      icon: Users,
      description: 'Compassionate companionship and assistance with daily activities for your seniors.',
      color: 'bg-purple-100 text-purple-600',
      price: '$20/hr',
      features: ['Medication Reminders', 'Mobility Assistance', 'Companionship', 'Light Housekeeping']
    },
    {
      id: 3,
      name: 'Sick Care',
      icon: Stethoscope,
      description: 'Dedicated support for recovery and health monitoring by certified nurses.',
      color: 'bg-rose-100 text-rose-600',
      price: '$25/hr',
      features: ['Certified Nurses', 'Vitals Monitoring', 'Medication Administration', 'Post-Op Care']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect care plan for your family. All our services come with verified professionals and 24/7 support.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id} 
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
            >
              <div className="p-8 flex-grow">
                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 bg-gray-50 border-t border-gray-100 mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Starting from</span>
                  <span className="text-2xl font-bold text-gray-900">{service.price}</span>
                </div>
                <Link 
                  href={`/services/${service.id}`}
                  className="block w-full py-3 px-6 bg-gray-900 text-white text-center rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesPage;