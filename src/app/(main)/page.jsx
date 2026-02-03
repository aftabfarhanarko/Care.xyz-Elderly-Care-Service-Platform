"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import AllFile from "@/components/home/AllFile";
import Diffrent from "@/components/home/Diffrent";
import Services from "@/components/home/Services";

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerSlides = [
    {
      id: 1,
      title: "Trusted Care for Your Family",
      subtitle:
        "Find reliable caregivers for your loved ones with just a few clicks",
      image: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=2000",
      cta: "Book Now",
    },
    {
      id: 2,
      title: "Professional Elderly Care",
      subtitle:
        "Expert caregivers trained to provide compassionate elderly care",
      image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=2000",
      cta: "Learn More",
    },
    {
      id: 3,
      title: "Safe & Secure Services",
      subtitle: "All caregivers are verified and background checked",
      image: "https://images.unsplash.com/photo-1576091160550-2187d80a1a44?auto=format&fit=crop&q=80&w=2000",
      cta: "Get Started",
    },
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length,
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden">
      {/* BANNER SLIDER */}
      <section className="relative mt-16 h-96 md:h-screen overflow-hidden">
        <div className="relative w-full h-full">
          {bannerSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="w-full h-full flex items-center justify-center relative"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40"></div>
                
                <div className="text-center text-white px-4 relative z-10">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-2xl mb-8 opacity-90 drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  <Link
                    href="/services"
                    className="inline-block bg-rose-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-rose-700 transition shadow-lg"
                  >
                    {slide.cta} <ArrowRight className="inline ml-2" size={20} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg z-10 hover:scale-110 transition"
        >
          <ChevronLeft size={24} className="text-blue-600" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg z-10 hover:scale-110 transition"
        >
          <ChevronRight size={24} className="text-blue-600" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50 w-3"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Diffrent */}
      <Diffrent />
      {/* Services */}

      <Services />

      {/* All */}
      <AllFile />
    </div>
  );
};

export default HomePage;
// {/* Banner */}
// <Banner></Banner>
