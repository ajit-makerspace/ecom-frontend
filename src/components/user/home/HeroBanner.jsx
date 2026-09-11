'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    eyebrow: 'SHOP TO GET WHAT YOU LOVE',
    title: 'TIMEPIECES THAT MAKE A STATEMENT',
    discount: 'UP TO 40% OFF',
    subtitle: 'Discover high-performance maker tools, electronics, and craft supplies with rapid global delivery.',
    ctaText: 'Start Buying',
    ctaLink: '/user/products',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=1000&auto=format&fit=crop&q=80',
    accentColor: '#33B3ED',
  },
  {
    id: 2,
    eyebrow: 'NEXT-GEN DIGITAL FABRICATION',
    title: 'HIGH-SPEED FDM & 12K SLA RESIN PRINTERS',
    discount: 'UP TO 35% OFF',
    subtitle: 'Precision auto-leveling 3D printers, SLA resin rigs, and high-performance maker tools.',
    ctaText: 'Shop 3D Printing',
    ctaLink: '/user/category/3d-print',
    image: 'https://images.unsplash.com/photo-1631556097152-c39479bbf9f3?w=1000&auto=format&fit=crop&q=80',
    accentColor: '#10B981',
  },
  {
    id: 3,
    eyebrow: 'MECHTRONICS & EMBEDDED AI',
    title: 'ROBOTICS KITS, ESP32 & RASPBERRY PI 5',
    discount: 'UP TO 50% OFF',
    subtitle: 'Build autonomous AI bots, IoT sensor networks, and smart electronic controllers.',
    ctaText: 'Explore Mechtronics',
    ctaLink: '/user/category/mechtronics',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1000&auto=format&fit=crop&q=80',
    accentColor: '#F59E0B',
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Auto carousel slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNextSlide = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      setIsFading(false);
    }, 250);
  };

  const handlePrevSlide = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
      setIsFading(false);
    }, 250);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative w-full group font-sans">
      {/* Floating CSS Keyframes */}
      <style jsx global>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(1deg); }
        }
        .animate-hero-float {
          animation: heroFloat 5s ease-in-out infinite;
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(254, 215, 0, 0.4); }
          50% { box-shadow: 0 0 30px rgba(254, 215, 0, 0.8); }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2.5s infinite;
        }
      `}</style>

      {/* Main Container */}
      <div className="w-full rounded-3xl bg-[#EBECEE] min-h-[400px] sm:min-h-[460px] p-8 sm:p-14 relative flex items-center overflow-hidden border border-slate-200/80 shadow-sm transition-all">
        {/* Banner Text Content with Fade Animation */}
        <div
          className={`relative z-10 space-y-5 max-w-xl transition-all duration-300 transform ${
            isFading ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
          }`}
        >
          <span
            className="text-xs font-black uppercase tracking-widest block transition-colors"
            style={{ color: slide.accentColor }}
          >
            {slide.eyebrow}
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight uppercase">
            {slide.title}{' '}
            <span className="block text-2xl sm:text-4xl mt-2 font-black text-slate-800">
              {slide.discount}
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md font-medium leading-relaxed">
            {slide.subtitle}
          </p>

          <div className="pt-2 flex items-center gap-4">
            <Link
              href={slide.ctaLink}
              className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-[#FED700] hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wide transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer animate-pulse-glow group/btn"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Hero Product Image with Floating Animation & Fade */}
        <div
          className={`absolute right-4 sm:right-12 bottom-0 top-0 w-1/2 hidden md:flex items-center justify-center p-6 transition-all duration-500 transform ${
            isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <div className="relative animate-hero-float">
            <img
              src={slide.image}
              alt={slide.title}
              className="max-h-[380px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Previous / Next Arrow Controls (Visible on Hover) */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer"
          title="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 cursor-pointer"
          title="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsFading(true);
                setTimeout(() => {
                  setCurrentSlide(idx);
                  setIsFading(false);
                }, 200);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx
                  ? 'w-8 bg-[#FED700] shadow-xs'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
