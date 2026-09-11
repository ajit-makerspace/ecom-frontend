'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    tag: 'MECHATRONICS & EMBEDDED AI',
    title: 'ROBOTICS KITS, ESP32 & RASPBERRY PI 5',
    highlight: 'UP TO 50% OFF',
    subtitle: 'Build autonomous AI bots, IoT sensor networks, and smart electronic controllers.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    ctaText: 'EXPLORE MECHATRONICS',
    ctaLink: '/user/category/mechtronics',
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const [isPaused, setIsPaused] = useState(false);

  // Preload slide images for 60fps crossfade performance
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  const goToSlide = useCallback(
    (newIndex, newDirection = 'next') => {
      if (isAnimating || newIndex === currentSlide) return;
      setDirection(newDirection);
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentSlide(newIndex);
        requestAnimationFrame(() => {
          setTimeout(() => {
            setIsAnimating(false);
          }, 50);
        });
      }, 350);
    },
    [isAnimating, currentSlide]
  );

  const handleNextSlide = useCallback(() => {
    const nextIdx = (currentSlide + 1) % HERO_SLIDES.length;
    goToSlide(nextIdx, 'next');
  }, [currentSlide, goToSlide]);

  const handlePrevSlide = useCallback(() => {
    const prevIdx = (currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
    goToSlide(prevIdx, 'prev');
  }, [currentSlide, goToSlide]);

  // Autoplay with Hover Pause & Reset on Manual Change
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [handleNextSlide, isPaused]);

  const slide = HERO_SLIDES[currentSlide];
  const titleWords = slide.title.split(' ');

  // Easing curve: cubic-bezier(0.22, 1, 0.36, 1)
  const transitionEasingStyle = {
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
  };

  return (
    <div className="w-full font-sans">
      {/* Full-Width Hero Carousel Slider with Hover Pause */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="w-full bg-[#EDEDED] rounded-3xl p-6 sm:p-10 md:p-12 min-h-[420px] sm:min-h-[460px] flex items-center relative overflow-hidden group shadow-2xs border border-slate-200/80 select-none"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
          {/* Left Slide Content (7 Cols) */}
          <div className="md:col-span-7 space-y-4">
            {/* Tag Badge */}
            <div
              style={{
                ...transitionEasingStyle,
                transitionDelay: isAnimating ? '0ms' : '50ms',
              }}
              className={`transition-all duration-700 transform will-change-transform ${
                isAnimating
                  ? `opacity-0 ${direction === 'next' ? '-translate-x-4' : 'translate-x-4'} scale-95`
                  : 'opacity-100 translate-x-0 scale-100'
              }`}
            >
              <span className="text-xs font-black tracking-widest text-[#002740] uppercase bg-[#002740]/10 px-3.5 py-1.5 rounded-full inline-block shadow-2xs">
                {slide.tag}
              </span>
            </div>

            {/* Heading Title (Word-by-Word Staggered Entry) */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase font-sans flex flex-wrap items-center gap-x-3 gap-y-1">
              {titleWords.map((word, index) => (
                <span
                  key={`${slide.id}-${index}`}
                  style={{
                    ...transitionEasingStyle,
                    transitionDelay: isAnimating ? '0ms' : `${index * 60 + 100}ms`,
                  }}
                  className={`inline-block transition-all duration-700 transform will-change-transform ${
                    isAnimating
                      ? `opacity-0 translate-y-4 ${direction === 'next' ? 'translate-x-3' : '-translate-x-3'} scale-95 blur-xs`
                      : 'opacity-100 translate-y-0 translate-x-0 scale-100 blur-none'
                  }`}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Subtitle / Description */}
            <p
              style={{
                ...transitionEasingStyle,
                transitionDelay: isAnimating ? '0ms' : `${titleWords.length * 60 + 140}ms`,
              }}
              className={`text-xs sm:text-sm text-slate-600 max-w-lg font-medium leading-relaxed transition-all duration-700 transform will-change-transform ${
                isAnimating
                  ? `opacity-0 translate-y-4 ${direction === 'next' ? 'translate-x-3' : '-translate-x-3'}`
                  : 'opacity-100 translate-y-0 translate-x-0'
              }`}
            >
              {slide.subtitle}
            </p>

            {/* CTA Button */}
            <div
              style={{
                ...transitionEasingStyle,
                transitionDelay: isAnimating ? '0ms' : `${titleWords.length * 60 + 220}ms`,
              }}
              className={`pt-2 flex items-center gap-4 transition-all duration-700 transform will-change-transform ${
                isAnimating
                  ? 'opacity-0 translate-y-4 scale-95'
                  : 'opacity-100 translate-y-0 scale-100'
              }`}
            >
              <Link
                href={slide.ctaLink}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#002740] hover:bg-[#0C3554] text-white font-extrabold text-xs uppercase tracking-wide transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer group/btn"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Product Hero Image (5 Cols) */}
          <div
            style={{
              ...transitionEasingStyle,
              transitionDelay: isAnimating ? '0ms' : '120ms',
            }}
            className={`md:col-span-5 hidden md:flex items-center justify-center transition-all duration-800 transform will-change-transform ${
              isAnimating
                ? `opacity-0 ${direction === 'next' ? 'translate-x-8 scale-[1.04]' : '-translate-x-8 scale-[1.04]'} blur-xs`
                : 'opacity-100 translate-x-0 scale-100 blur-none'
            }`}
          >
            <div className="animate-float w-full max-w-sm">
              <div className="relative w-full h-[240px] sm:h-[280px] lg:h-[310px] rounded-2xl overflow-hidden shadow-xl border border-slate-300/80 bg-slate-900 group-hover:shadow-2xl transition-all duration-500 group/card">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 ease-out opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />

                {/* Translucent Floating Glass Tag Badge */}
                <div className="absolute top-4 right-4 bg-[#002740]/90 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md border border-white/10">
                  {slide.highlight}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Previous / Next Controls */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-slate-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border border-slate-200/50"
          title="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 text-[#002740]" />
        </button>

        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-slate-800 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border border-slate-200/50"
          title="Next Slide"
        >
          <ChevronRight className="w-5 h-5 text-[#002740]" />
        </button>

        {/* Carousel Pagination Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2.5">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx, idx > currentSlide ? 'next' : 'prev')}
              className={`h-2.5 rounded-full transition-all duration-500 ease-out cursor-pointer ${
                currentSlide === idx
                  ? 'w-8 bg-[#002740] shadow-xs scale-100'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400 scale-90'
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
