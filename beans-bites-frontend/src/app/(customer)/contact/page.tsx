"use client";

import * as React from "react";
import { MessageSquare, Sparkles } from "lucide-react";
import { ContactHero } from "@/components/customer/contact/contact-hero";
import { ContactChannels } from "@/components/customer/contact/contact-channels";
import { ContactFormSection } from "@/components/customer/contact/contact-form-section";
import { ContactFAQ } from "@/components/customer/contact/contact-faq";
import { LiveChatModal } from "@/components/customer/contact/live-chat-modal";

export default function ContactPage() {
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col pb-20 sm:pb-0">
      {/* 1. Hero Section with Breadcrumb & Quick Actions */}
      <ContactHero onOpenLiveChat={() => setIsChatOpen(true)} />

      {/* 2. Direct Channels: In-System Live Chat, WhatsApp, Phone, Location */}
      <ContactChannels onOpenLiveChat={() => setIsChatOpen(true)} />

      {/* 3. Inquiry & Table Reservation Form + Live Cafe Hours & Details */}
      <ContactFormSection />

      {/* 4. Frequently Asked Questions Accordion */}
      <ContactFAQ onOpenLiveChat={() => setIsChatOpen(true)} />

      {/* 5. In-System Interactive Live Chat Modal with Admin */}
      <LiveChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* 6. Floating In-System Live Chat Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          className="group flex items-center gap-2 bg-[#FF5A0A] hover:bg-[#E04E07] text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-xl shadow-orange-950/25 hover:shadow-orange-950/35 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/20 select-none"
          title="Open In-System Live Chat with Cafe Admin"
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white animate-pulse" />
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-tight">Chat with Admin</span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white/60" />
          <span className="hidden sm:inline-block text-[11px] font-medium text-orange-100">Online</span>
        </button>
      </div>
    </div>
  );
}
