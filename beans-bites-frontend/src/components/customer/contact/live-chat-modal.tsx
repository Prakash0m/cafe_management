"use client";

import * as React from "react";
import Image from "next/image";
import {
  X,
  SendHorizontal,
  BotMessageSquare,
  Sparkles,
  Phone,
  RotateCcw,
  CheckCheck,
} from "lucide-react";
import { ASSETS } from "@/lib/assets";

interface Message {
  id: string;
  sender: "user" | "admin";
  text: string;
  time: string;
}

interface LiveChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m-1",
    sender: "admin",
    text: "Namaste! Welcome to Beans & Bites Cafe & Restaurant. I'm Rojina from Guest Relations & Admin. How can I help you today?",
    time: "Just now",
  },
  {
    id: "m-2",
    sender: "admin",
    text: "Feel free to ask about your active order status, table reservations, dietary preferences, or party bookings!",
    time: "Just now",
  },
];

const QUICK_CHIPS = [
  { id: "q1", label: "📦 Where is my active order?", text: "Hi, could you please give me an update on my active order status?" },
  { id: "q2", label: "🍽️ Reserve a table for tonight", text: "Hello! I'd like to reserve a table for 4 people tonight around 7:30 PM." },
  { id: "q3", label: "🌿 Vegan / Gluten-free choices?", text: "Do you have vegan and gluten-free pizza or pasta options?" },
  { id: "q4", label: "🎉 Birthday / Party reservation", text: "Hi, I am planning a birthday celebration for 12 guests. Do you offer party setups?" },
  { id: "q5", label: "🛵 Delivery coverage area", text: "What areas in Kathmandu do you deliver to, and what are the delivery charges?" },
];

export function LiveChatModal({ isOpen, onClose }: LiveChatModalProps) {
  const [messages, setMessages] = React.useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // Auto scroll to latest message
  React.useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isTyping]);

  if (!isOpen) return null;

  const getSmartReply = (userText: string): string => {
    const lower = userText.toLowerCase();
    if (lower.includes("order") || lower.includes("track") || lower.includes("status")) {
      return "Got it! You can check real-time live order progress anytime on the 'Orders' tab in the bottom bar. If you have an Order ID (like #BB2641) or phone number, share it here and I'll confirm the kitchen status for you!";
    }
    if (lower.includes("table") || lower.includes("reserve") || lower.includes("booking") || lower.includes("seat")) {
      return "We would love to host you! We have both cozy indoor stone-oven booths and breezy garden patio tables. Please leave your Name, Phone Number, and Preferred Time here, or call us directly at +977 1-4245678 to lock it in immediately!";
    }
    if (lower.includes("vegan") || lower.includes("gluten") || lower.includes("allergy") || lower.includes("dairy")) {
      return "Yes! Our culinary team prepares dairy-free plant milks (oat, almond), fresh Margherita pizzas with vegan cheese on request, and gluten-conscious garden salads & smoothie bowls. Let your server know and our chef will customize your meal!";
    }
    if (lower.includes("birthday") || lower.includes("party") || lower.includes("event") || lower.includes("group")) {
      return "Happy early celebration! 🎉 We have a dedicated mezzanine lounge area that comfortably hosts up to 30 guests. We also provide customized artisan cakes, balloon decorations, and customized set menus. Would you like our manager to call you with package details?";
    }
    if (lower.includes("delivery") || lower.includes("area") || lower.includes("location") || lower.includes("charge")) {
      return "We deliver fresh hot food across Lakeside, Baluwatar, Jhamsikhel, Thamel, and nearby Kathmandu areas (within 6km radius). Delivery is free on orders above NPR 1,200!";
    }
    return "Thank you for reaching out! I've noted your message and alerted our floor manager. We'll assist you immediately. You can also call our direct hotline at +977 1-4245678 for instant telephone service!";
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const newMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate realistic typing and response from Admin
    setTimeout(() => {
      setIsTyping(false);
      const replyMsg: Message = {
        id: `a-${Date.now()}`,
        sender: "admin",
        text: getSmartReply(text),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 1100);
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg h-[90vh] sm:h-[620px] max-h-[720px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-orange-100">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-[#180B06] to-[#2B1309] text-white px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between border-b border-orange-950/40">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#FF5A0A] flex items-center justify-center text-white font-bold text-sm shadow-md border-2 border-white/20">
                <Image
                  src={ASSETS.brand.favicon}
                  alt="Admin"
                  width={22}
                  height={22}
                  className="brightness-125 object-contain"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#180B06] animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white tracking-tight">Rojina Gurung</span>
                <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-1.5 py-0.2 rounded-md">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-gray-300 flex items-center gap-1">
                <span>Guest Relations & Floor Desk</span>
                <span className="text-white/40">•</span>
                <span className="text-emerald-400 font-medium">Online</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleClearChat}
              className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <a
              href="tel:+97714245678"
              className="p-2 text-orange-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
              title="Call phone hotline"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
              title="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Help Prompt Chips Bar */}
        <div className="bg-[#FAF7F4] border-b border-orange-100/80 px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 flex-nowrap">
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 pl-1 pr-1 flex-shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#FF5A0A]" /> Quick:
          </span>
          {QUICK_CHIPS.map((chip) => (
            <button
              key={chip.id}
              type="button"
              onClick={() => handleSendMessage(chip.text)}
              className="flex-shrink-0 bg-white hover:bg-orange-50 text-gray-700 hover:text-[#FF5A0A] text-[11px] font-medium px-2.5 py-1 rounded-full border border-orange-100 hover:border-orange-200 transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Message Thread Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FCFAF8]">
          {messages.map((msg) => {
            const isAdmin = msg.sender === "admin";
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isAdmin ? "items-start" : "items-end"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-2.5 text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                    isAdmin
                      ? "bg-white text-gray-800 border border-stone-200/80 rounded-tl-xs"
                      : "bg-[#FF5A0A] text-white rounded-tr-xs shadow-orange-950/10"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-gray-400">
                  <span>{msg.time}</span>
                  {!isAdmin && <CheckCheck className="w-3 h-3 text-emerald-500" />}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-gray-500 bg-white border border-stone-200/80 rounded-2xl rounded-tl-xs px-3.5 py-2 max-w-[140px] shadow-2xs">
              <span className="text-[11px] font-medium text-orange-600">Rojina typing</span>
              <span className="flex items-center gap-1 pt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce [animation-delay:300ms]" />
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-3.5 bg-white border-t border-stone-200/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message to Cafe Admin..."
              className="flex-1 bg-stone-50 hover:bg-stone-100/70 focus:bg-white text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-[#FF5A0A] focus:outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-xl bg-[#FF5A0A] hover:bg-[#E04E07] disabled:opacity-40 disabled:hover:bg-[#FF5A0A] text-white transition-all shadow-xs active:scale-95 cursor-pointer disabled:cursor-not-allowed"
              title="Send message"
            >
              <SendHorizontal className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-2 flex items-center justify-between text-[10.5px] text-gray-400 px-1">
            <span className="flex items-center gap-1">
              <BotMessageSquare className="w-3 h-3 text-orange-500" />
              <span>Beans & Bites Live Desk</span>
            </span>
            <span className="text-emerald-600 font-medium">● Floor staff standing by</span>
          </div>
        </div>
      </div>
    </div>
  );
}
