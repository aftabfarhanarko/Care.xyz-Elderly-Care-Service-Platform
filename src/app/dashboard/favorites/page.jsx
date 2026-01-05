"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FavoritesPage = () => {
  // Mock Data
  const favorites = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Professional Nanny',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      rating: 4.9,
      reviews: 124,
      hourlyRate: '$25',
      location: 'Brooklyn, NY',
      experience: '5 years',
      verified: true
    },
    {
      id: 2,
      name: 'Emily Davis',
      role: 'Babysitter',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      rating: 4.8,
      reviews: 89,
      hourlyRate: '$20',
      location: 'Manhattan, NY',
      experience: '3 years',
      verified: true
    },
    {
      id: 3,
      name: 'Michael Brown',
      role: 'Pet Sitter',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      rating: 4.7,
      reviews: 56,
      hourlyRate: '$18',
      location: 'Queens, NY',
      experience: '2 years',
      verified: true
    },
    {
      id: 4,
      name: 'Jessica Wilson',
      role: 'Elder Care',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      rating: 5.0,
      reviews: 42,
      hourlyRate: '$30',
      location: 'Staten Island, NY',
      experience: '7 years',
      verified: true
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Favorite Caregivers</h1>
          <p className="text-gray-500 dark:text-gray-400">Your saved list of trusted professionals</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((caregiver, index) => (
          <motion.div
            key={caregiver.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="relative">
                    <img 
                      src={caregiver.image} 
                      alt={caregiver.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                    />
                    {caregiver.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full border-2 border-white dark:border-gray-800">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {caregiver.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{caregiver.role}</p>
                    <div className="flex items-center gap-1 text-xs text-yellow-500 mt-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="font-medium text-gray-900 dark:text-white">{caregiver.rating}</span>
                      <span className="text-gray-400">({caregiver.reviews})</span>
                    </div>
                  </div>
                </div>
                <button className="text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 p-2 rounded-full transition-colors">
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gray-50 dark:border-gray-700/50">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Rate</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{caregiver.hourlyRate}/hr</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">Experience</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{caregiver.experience}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-4 mb-6">
                <MapPin className="w-4 h-4" />
                {caregiver.location}
              </div>

              <button className="w-full py-2.5 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors flex items-center justify-center group/btn">
                Book Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
