'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    tag: 'MECHTRONICS & EMBEDDED AI',
    title: 'ROBOTICS KITS, ESP32 & RASPBERRY PI 5',
    highlight: 'UP TO 50% OFF',
    subtitle: 'Build autonomous AI bots, IoT sensor networks, and smart electronic controllers.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    ctaText: 'EXPLORE MECHTRONICS',
    ctaLink: '/user/category/mechtronics-robotic-ai-iot-electronics',
  },
  {
    id: 2,
    tag: 'DIGITAL FABRICATION',
    title: 'HIGH SPEED 3D PRINTERS & CNC LASERS',
    highlight: 'PRECISION CREATION',
    subtitle: 'Industrial grade SLA resin & FDM 3D printers with high speed direct extruders.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    ctaText: 'EXPLORE 3D PRINTING',
    ctaLink: '/user/category/3d-print',
  },
  {
    id: 3,
    tag: 'RESIN & CLAY ART',
    title: 'EPOXY RESIN & POTTERY CLAY KITS',
    highlight: 'CREATE ARTWORK',
    subtitle: 'Non-yellowing crystal clear epoxy resin, silicone molds, and sculpting clays.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&auto=format&fit=crop&q=80',
    ctaText: 'EXPLORE RESIN ART',
    ctaLink: '/user/category/resin-art',
  },
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFading, setIsFading] = useState(false);

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
    }, 200);
  };

  const handlePrevSlide = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
      setIsFading(false);
    }, 200);
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="w-full font-sans">
      {/* Full-Width Hero Carousel Slider */}
      <div className="w-full bg-[#EDEDED] rounded-3xl p-8 sm:p-12 md:p-14 min-h-[420px] sm:min-h-[460px] flex items-center relative overflow-hidden group shadow-2xs border border-slate-200/80">
        {/* Animated Slide Content */}
        <div
          className={`max-w-2xl space-y-4 transition-all duration-500 transform ${
            isFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          <span className="text-xs font-black tracking-widest text-[#002740] uppercase bg-[#002740]/10 px-3.5 py-1.5 rounded-full inline-block">
            {slide.tag}
          </span>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase font-sans">
            {slide.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg font-medium leading-relaxed">
            {slide.subtitle}
          </p>

          <div className="pt-2 flex items-center gap-4">
            <Link
              href={slide.ctaLink}
              className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-[#002740] hover:bg-[#0C3554] text-white font-extrabold text-xs uppercase tracking-wide transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer group/btn"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Hero Product Image */}
        <div
          className={`absolute right-6 sm:right-16 bottom-0 top-0 w-1/2 hidden md:flex items-center justify-center p-6 transition-all duration-500 transform ${
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

        {/* Previous / Next Arrow Controls */}
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
                  ? 'w-8 bg-[#002740] shadow-xs'
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
