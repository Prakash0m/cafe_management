"use client";

import * as React from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "How do I check the real-time status of my order?",
    answer:
      "You can track your order live right inside the app! Go to the 'Orders' tab in the bottom navigation (or top menu). You'll see real-time updates as your food moves from 'Order Placed' to 'In Kitchen / Preparing', 'Ready for Serving', and 'Delivered'.",
  },
  {
    id: "faq-2",
    question: "Can I reserve a table in advance for dinner or birthday celebrations?",
    answer:
      "Yes! We accept advance table reservations for groups of all sizes. For intimate dinners, family gatherings, or birthdays, you can reach us via our In-System Live Chat, message our WhatsApp (+977 9801234567), or submit the reservation form above.",
  },
  {
    id: "faq-3",
    question: "Do you have vegan, vegetarian, or gluten-free options?",
    answer:
      "Absolutely. We offer oat and almond milk substitutes for all coffees, plant-based and vegetarian pizzas (including Margherita, Veg Supreme, and Paneer Special), and fresh garden salads. Please specify your dietary restrictions when placing your order.",
  },
  {
    id: "faq-4",
    question: "What areas in Kathmandu do you deliver to?",
    answer:
      "We deliver fresh hot food across Lakeside, Baluwatar, Jhamsikhel, Thamel, Lazimpat, and surrounding Kathmandu areas within a 6 km radius. Delivery is complimentary on orders above NPR 1,200.",
  },
  {
    id: "faq-5",
    question: "Do you provide parking and Wi-Fi for remote work or study?",
    answer:
      "Yes, we offer complimentary customer parking for both two-wheelers and four-wheelers. We also provide high-speed fiber Wi-Fi and power outlets near our indoor booths, making Beans & Bites an ideal cafe workspace.",
  },
  {
    id: "faq-6",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment methods including Cash on Delivery/Dine-In, FonePay QR, eSewa, Khalti, and Visa/Mastercard debit and credit cards.",
  },
];

interface ContactFAQProps {
  onOpenLiveChat: () => void;
}

export function ContactFAQ({ onOpenLiveChat }: ContactFAQProps) {
  const [openId, setOpenId] = React.useState<string | null>("faq-1");

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-12 sm:py-16 bg-[#FAF7F4] select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[#FF5A0A] text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-md mx-auto">
            Quick answers to the most common questions our guests ask about dining, orders, and reservations.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-orange-100/90 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-orange-50/40 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#FF5A0A] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-gray-600 leading-relaxed border-t border-orange-50 bg-[#FFFDFB] animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Banner */}
        <div className="mt-8 bg-gradient-to-r from-[#180B06] to-[#2B1309] text-white rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-orange-950/40 text-center sm:text-left">
          <div>
            <h3 className="text-base sm:text-lg font-bold">Still have a question?</h3>
            <p className="text-xs text-gray-300 mt-0.5">
              Our front desk and admin team are standing by to assist you in real time.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenLiveChat}
            className="inline-flex items-center gap-2 bg-[#FF5A0A] hover:bg-[#E04E07] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat Live Now</span>
          </button>
        </div>
      </div>
    </section>
  );
}

