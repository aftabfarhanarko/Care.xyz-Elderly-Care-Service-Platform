"use client";
import React from "react";
import { Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { caregivers } from "@/data/caregivers";

const FullPages = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h4 className="text-rose-500 font-bold tracking-wider uppercase text-sm mb-2">
              Top Rated
            </h4>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Meet Our Caregivers
            </h2>
          </div>
          <Link
            href="/caregivers"
            className="group flex items-center text-rose-500 font-semibold hover:text-rose-600 transition-colors"
          >
            View All Caregivers
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {caregivers.map((caregiver) => (
            <Link href={`/caregivers/${caregiver.id}`} key={caregiver.id} className="group cursor-pointer block">
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/5]">
                <Image
                  src={caregiver.image}
                  alt={caregiver.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-rose-500 transition-colors">
                  {caregiver.name}
                </h3>
                <p className="text-rose-500 font-medium text-sm">
                  {caregiver.role}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    {caregiver.rating}
                  </span>
                  <span className="text-gray-500 text-sm">
                    ({caregiver.reviews} reviews)
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FullPages;