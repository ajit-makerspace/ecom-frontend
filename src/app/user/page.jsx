'use client';

import React from 'react';
import { UserLayout } from '@/components/user/layout/UserLayout';
import { HeroBanner } from '@/components/user/home/HeroBanner';
import { PromoBannerRow } from '@/components/user/home/PromoBannerRow';
import { SpecialOfferAndTabs } from '@/components/user/home/SpecialOfferAndTabs';
import { FeaturedDealShowcase } from '@/components/user/home/FeaturedDealShowcase';
import { BestSellersSection } from '@/components/user/home/BestSellersSection';
import { FullWidthMiddleBanner } from '@/components/user/home/FullWidthMiddleBanner';
import { RecentlyAddedSection } from '@/components/user/home/RecentlyAddedSection';
import { BrandLogosBar } from '@/components/user/home/BrandLogosBar';
import { FooterProductsGrid } from '@/components/user/home/FooterProductsGrid';
import { FeatureGuaranteeBar } from '@/components/user/home/FeatureGuaranteeBar';

export default function UserHomePage() {
  return (
    <UserLayout>
      <div className="space-y-10 sm:space-y-12">
        {/* 1. Hero Section: Left Vertical Category Menu + Right Slider */}
        <HeroBanner />

        {/* 2. 3-Card Promo Banner Trio (Cameras, Tablets/Phones, Hottest Products) */}
        <PromoBannerRow />

        {/* 3. Special Offer (Yellow Box + Countdown Timer) + Product Tabs (3x2 Grid) */}
        <SpecialOfferAndTabs />

        {/* 4. Featured Deal Showcase Grid */}
        <FeaturedDealShowcase />

        {/* 5. Best Sellers Section (Top 20 Badge + 2x3 Horizontal Cards Grid) */}
        <BestSellersSection />

        {/* 6. Full-Width Middle Tablet Promo Banner */}
        <FullWidthMiddleBanner />

        {/* 7. Recently Added Carousel (Header Arrows + 6 Product Cards + Wishlist/Compare Hover) */}
        <RecentlyAddedSection />

        {/* 8. Brand Logos Carousel Bar */}
        <BrandLogosBar />

        {/* 9. 4-Column Footer Widgets & Side Banner Grid */}
        <FooterProductsGrid />

        {/* 10. Trust Guarantee Bar */}
        <FeatureGuaranteeBar />
      </div>
    </UserLayout>
  );
}
