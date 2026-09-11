'use client';

import React from 'react';
import Link from 'next/link';
import { Send, Headphones, ArrowUp } from 'lucide-react';

export function UserFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full font-sans bg-[#F5F5F5] border-t border-slate-200 mt-12">
      {/* Newsletter Signup Bar using Admin Sidebar Blue (#002740) */}
      <div className="bg-[#002740] py-4 px-4 sm:px-6 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Send className="w-6 h-6 text-white shrink-0" />
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-white block sm:inline mr-2">
                Sign up to Newsletter
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-200">
                ...and receive <strong className="font-extrabold text-white">$20 coupon</strong> for first shopping
              </span>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to MakerSpace Shop newsletter!');
            }}
            className="flex items-center w-full md:w-auto max-w-md bg-white rounded-full p-1 shadow-sm border border-slate-200"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-2 text-xs text-slate-900 placeholder-slate-400 outline-none bg-transparent"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0C3554] hover:bg-slate-900 text-white font-extrabold text-xs rounded-full transition-colors cursor-pointer shrink-0"
            >
              SignUp
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/user" className="flex items-center gap-0.5">
              <span className="text-3xl font-black tracking-tighter text-slate-900">
                makerspace<span className="text-[#002740]">shop</span>
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#002740] inline-block self-end mb-1" />
            </Link>

            <div className="flex items-center gap-4 pt-2">
              <div className="w-12 h-12 rounded-full border-2 border-[#002740] text-[#002740] flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-medium text-slate-500 block">Got Questions ? Call us 24/7!</span>
                <span className="text-base sm:text-lg font-extrabold text-slate-900 block leading-tight">
                  (800) 8001-8588, (0600) 874 548
                </span>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">Contact Info</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                17 Princess Road, London, Greater London NW1 8JR, UK
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-200 hover:bg-[#002740] hover:text-white flex items-center justify-center transition-colors font-bold text-xs">
                f
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-200 hover:bg-[#002740] hover:text-white flex items-center justify-center transition-colors font-bold text-xs">
                t
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-200 hover:bg-[#002740] hover:text-white flex items-center justify-center transition-colors font-bold text-xs">
                y
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-200 hover:bg-[#002740] hover:text-white flex items-center justify-center transition-colors font-bold text-xs">
                in
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-200 hover:bg-[#002740] hover:text-white flex items-center justify-center transition-colors">
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Find It Fast</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li><Link href="/user/category/3d-print" className="hover:text-[#002740] transition-colors">3D Print & Laser</Link></li>
              <li><Link href="/user/category/mechtronics-robotic-ai-iot-electronics" className="hover:text-[#002740] transition-colors">Mechatronics & AI</Link></li>
              <li><Link href="/user/category/resin-art" className="hover:text-[#002740] transition-colors">Resin & Clay Art</Link></li>
              <li><Link href="/user/category/wood-working" className="hover:text-[#002740] transition-colors">Wood Working & Metal</Link></li>
              <li><Link href="/user/category/ar-vr" className="hover:text-[#002740] transition-colors">AR/VR & Space Tech</Link></li>
              <li><Link href="/user/category/puppetry" className="hover:text-[#002740] transition-colors">Puppetry & Origami</Link></li>
              <li><Link href="/user/category/sublimation" className="hover:text-[#002740] transition-colors">Print & Packaging</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li><Link href="/user/products" className="hover:text-[#002740] transition-colors">My Account</Link></li>
              <li><Link href="/user/products" className="hover:text-[#002740] transition-colors">Track your Order</Link></li>
              <li><Link href="/user/wishlist" className="hover:text-[#002740] transition-colors">Wishlist</Link></li>
              <li><Link href="/user/products" className="hover:text-[#002740] transition-colors">Customer Service</Link></li>
              <li><Link href="/user/deals" className="hover:text-[#002740] transition-colors">Returns / Exchange</Link></li>
              <li><Link href="/user/products" className="hover:text-[#002740] transition-colors">FAQs</Link></li>
              <li><Link href="/user/products" className="hover:text-[#002740] transition-colors">Product Support</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">About Us</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li><Link href="/user/products" className="hover:text-[#002740] transition-colors">About MakerSpace</Link></li>
              <li><Link href="/user/products" className="hover:text-[#002740] transition-colors">Careers</Link></li>
              <li><Link href="/user/products" className="hover:text-[#002740] transition-colors">Our Stores</Link></li>
              <li><Link href="/user/products" className="hover:text-[#002740] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/user/products" className="hover:text-[#002740] transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#EAEAEA] py-4 px-4 sm:px-6 text-slate-600 text-xs border-t border-slate-300/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © <strong className="text-slate-900">MakerSpace Shop</strong> - All Rights Reserved
          </div>

          <div className="flex items-center gap-2 text-[10px] font-bold">
            <span className="px-2 py-1 bg-white rounded border border-slate-300 font-black text-[#002740]">VISA</span>
            <span className="px-2 py-1 bg-white rounded border border-slate-300 font-black text-rose-600">MasterCard</span>
            <span className="px-2 py-1 bg-white rounded border border-slate-300 font-black text-blue-500">PayPal</span>
            <span className="px-2 py-1 bg-white rounded border border-slate-300 font-black text-emerald-600">ApplePay</span>
          </div>

          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-slate-300 hover:bg-[#002740] text-slate-700 hover:text-white flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
