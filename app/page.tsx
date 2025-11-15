"use client"

import React from 'react';
import Header from '@/components/Header';
import AIAdvisor from '@/components/AIAdvisor';
import DynamicContent from '@/components/DynamicContent';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Sticky */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Desktop Layout: 60/40 Split | Mobile: Stack */}
        <div className="lg:grid lg:grid-cols-[60%_40%] lg:h-[calc(100vh-80px)]">

          {/* Left Column: AI Advisor (60% en desktop, sticky) */}
          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] h-[70vh] lg:overflow-hidden">
            <AIAdvisor />
          </div>

          {/* Right Column: Dynamic Content (40% en desktop, scrollable) */}
          <div className="lg:overflow-y-auto lg:h-[calc(100vh-80px)] bg-gray-50">
            <DynamicContent />
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
