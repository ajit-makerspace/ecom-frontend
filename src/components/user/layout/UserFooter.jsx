'use client';

import React from 'react';
import Link from 'next/link';
import { Send, Headphones, Rss, ChevronUp } from 'lucide-react';

export function UserFooter() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full font-sans bg-[#F5F5F5] text-slate-700">
      {/* 1. Yellow Top Newsletter Bar (100% Matching Electro Screenshot) */}
      <div className="bg-[#FED700] py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Title & Coupon Text */}
          <div className="flex items-center gap-3 text-slate-900">
            <Send className="w-5 h-5 text-slate-900 shrink-0 transform -rotate-12" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm sm:text-base">
              <span className="font-black text-slate-900">
                Sign up to Newsletter
              </span>
              <span className="text-xs sm:text-sm text-slate-900 font-medium">
                ...and receive <strong className="font-extrabold text-slate-950">$20 coupon for first shopping</strong>
              </span>
            </div>
          </div>

          {/* Right Email Input & SignUp Button */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full md:w-auto flex items-center max-w-md bg-white rounded-full p-1 shadow-2xs"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-4 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none flex-1 rounded-l-full bg-transparent"
            />
            <button
              type="submit"
              className="px-7 py-2.5 bg-[#333E48] hover:bg-slate-900 text-white font-extrabold text-xs rounded-full transition-colors shrink-0 cursor-pointer"
            >
              SignUp
            </button>
          </form>
        </div>
      </div>

      {/* 2. Main Footer Body (Off-White Background) */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Column 1 & 2: Brand Logo, Headphones Support & Contact Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Logo */}
          <Link href="/user" className="inline-flex items-center gap-0.5">
            <span className="text-3xl sm:text-4xl font-black tracking-tighter text-slate-900 font-sans">
              makerspace<span className="text-amber-500">shop</span>
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FED700] inline-block self-end mb-1.5" />
          </Link>

          {/* Headphones Support Block */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-[#FED700] text-amber-500 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6 text-amber-500" />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-500 font-medium block">
                Got Questions ? Call us 24/7!
              </span>
              <p className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                (800) 8001-8588, (0600) 874 548
              </p>
            </div>
          </div>

          {/* Contact Info Address */}
          <div className="space-y-1 text-xs text-slate-600">
            <h4 className="font-extrabold text-slate-900 text-xs">
              Contact Info
            </h4>
            <p>17 Princess Road, London, Greater London NW1 8JR, UK</p>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center gap-3 pt-2 text-slate-600">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-200 hover:bg-[#FED700] hover:text-slate-900 flex items-center justify-center transition-colors font-bold text-xs">
              f
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-200 hover:bg-[#FED700] hover:text-slate-900 flex items-center justify-center transition-colors font-bold text-xs">
              ig
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-200 hover:bg-[#FED700] hover:text-slate-900 flex items-center justify-center transition-colors font-bold text-xs">
              in
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-200 hover:bg-[#FED700] hover:text-slate-900 flex items-center justify-center transition-colors font-bold text-xs">
              yt
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-200 hover:bg-[#FED700] hover:text-slate-900 flex items-center justify-center transition-colors">
              <Rss className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Column 3: Find It Fast Links */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
            Find It Fast
          </h4>
          <ul className="space-y-2 text-xs text-slate-600 font-medium">
            <li><Link href="/user/products" className="hover:text-slate-950 hover:underline">Puppetry & Origami</Link></li>
            <li><Link href="/user/products" className="hover:text-slate-950 hover:underline">Resin Art & Clay</Link></li>
            <li><Link href="/user/products" className="hover:text-slate-950 hover:underline">Wood Working & Metal</Link></li>
            <li><Link href="/user/products" className="hover:text-slate-950 hover:underline">3D Print & CNC</Link></li>
            <li><Link href="/user/products" className="hover:text-slate-950 hover:underline">Mechtronics & Robotics</Link></li>
            <li><Link href="/user/products" className="hover:text-slate-950 hover:underline">Space Tech & Aero</Link></li>
            <li><Link href="/user/products" className="hover:text-slate-950 hover:underline">AR/VR & Sublimation</Link></li>
          </ul>
        </div>

        {/* Column 4: Quick Page Links */}
        <div className="space-y-3 pt-6 sm:pt-0">
          <ul className="space-y-2 text-xs text-slate-600 font-medium pt-4">
            <li><Link href="/user" className="hover:text-slate-950 hover:underline">About</Link></li>
            <li><Link href="/user/products" className="hover:text-slate-950 hover:underline">Contact</Link></li>
            <li><Link href="/user/wishlist" className="hover:text-slate-950 hover:underline">Wishlist</Link></li>
            <li><Link href="/user/products" className="hover:text-slate-950 hover:underline">Compare</Link></li>
            <li><Link href="/user/products" className="hover:text-slate-950 hover:underline">FAQ</Link></li>
            <li><Link href="/user/products" className="hover:text-slate-950 hover:underline">Store Directory</Link></li>
          </ul>
        </div>

        {/* Column 5: Customer Care */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
            Customer Care
          </h4>
          <ul className="space-y-2 text-xs text-slate-600 font-medium">
            <li><Link href="/admin/login" className="hover:text-slate-950 hover:underline">My Account</Link></li>
            <li><Link href="/user/products" className="hover:text-slate-950 hover:underline">Track your Order</Link></li>
            <li><Link href="/user/products" className="hover:text-slate-950 hover:underline">Customer Service</Link></li>
            <li><Link href="/user/products" className="hover:text-slate-950 hover:underline">Returns/Exchange</Link></li>
            <li><Link href="/user/products" className="hover:text-slate-950 hover:underline">FAQs</Link></li>
            <li><Link href="/user/products" className="hover:text-slate-950 hover:underline">Product Support</Link></li>
          </ul>
        </div>
      </div>

      {/* 3. Bottom Copyright Bar & Payment Gateways */}
      <div className="bg-[#EAEAEA] py-4 px-4 sm:px-6 border-t border-slate-300/80 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© <strong className="font-extrabold text-slate-900">MakerSpace Shop</strong> - All Rights Reserved</p>

          {/* Payment Gateway Badges */}
          <div className="flex items-center gap-3 font-mono text-[10px] font-bold text-slate-700">
            <span className="px-2 py-1 bg-white rounded border border-slate-300">DISCOVER</span>
            <span className="px-2 py-1 bg-white rounded border border-slate-300">MasterCard</span>
            <span className="px-2 py-1 bg-white rounded border border-slate-300">PayPal</span>
            <span className="px-2 py-1 bg-white rounded border border-slate-300">Skrill</span>
            <span className="px-2 py-1 bg-white rounded border border-slate-300 font-black text-blue-700">VISA</span>
          </div>
        </div>
      </div>

      {/* Floating Scroll-to-Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-slate-400/80 hover:bg-slate-700 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer"
        title="Scroll to Top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
