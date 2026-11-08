"use client";

import * as React from "react";
import {
  Clock,
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Wifi,
  Car,
  Coffee,
  CreditCard,
  ExternalLink,
} from "lucide-react";

export function ContactFormSection() {
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "Order Status & Inquiry",
    preferredMethod: "WhatsApp",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  // Check if cafe is currently open (8:00 AM to 10:00 PM / 11:00 PM on weekends)
  const isCurrentlyOpen = React.useMemo(() => {
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 6 is Saturday
    const hours = now.getHours();
    const isWeekend = day === 0 || day === 6;
    const closingHour = isWeekend ? 23 : 22;
    return hours >= 8 && hours < closingHour;
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-stone-200/70 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (7 cols): Contact / Reservation Form */}
          <div className="lg:col-span-7 bg-[#FFFDFB] rounded-3xl p-6 sm:p-8 border border-orange-100/90 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF5A0A] bg-orange-50 border border-orange-200/80 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                Send Us a Note
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
                Leave a Message or Table Request
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Fill out the form below. Our floor manager will reach out via your preferred method shortly.
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Message Received!</h3>
                <p className="text-xs text-gray-600 mt-1.5 max-w-sm mx-auto">
                  Thank you, <span className="font-semibold text-gray-900">{formData.fullName}</span>. We have dispatched your request to the front desk. We will reach you on {formData.preferredMethod} within 15 minutes!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      fullName: "",
                      email: "",
                      phone: "",
                      subject: "Order Status & Inquiry",
                      preferredMethod: "WhatsApp",
                      message: "",
                    });
                  }}
                  className="mt-4 text-xs font-bold text-[#FF5A0A] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Shrestha"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF5A0A] focus:outline-none transition-all"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+977 98XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF5A0A] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF5A0A] focus:outline-none transition-all"
                    />
                  </div>

                  {/* Inquiry Topic */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Topic / Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-white text-gray-900 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:border-[#FF5A0A] focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="Order Status & Inquiry">Order Status & Inquiry</option>
                      <option value="Table Reservation">Table Reservation (Indoor/Patio)</option>
                      <option value="Birthday & Private Party">Birthday & Private Celebration</option>
                      <option value="Dietary & Allergen Preferences">Dietary & Allergen Preferences</option>
                      <option value="Catering & Large Events">Catering & Corporate Orders</option>
                      <option value="Feedback & Compliments">Feedback & General Message</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Reply Method */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    Preferred Reply Channel
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["WhatsApp", "Direct Call", "Email"].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredMethod: method })}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                          formData.preferredMethod === method
                            ? "bg-[#FF5A0A] text-white border-[#FF5A0A] shadow-xs"
                            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-gray-700">
                      Message / Request Details <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[10px] text-gray-400">
                      {formData.message.length}/500
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    required
                    maxLength={500}
                    placeholder="Tell us what you need (e.g. table for 4 at 7:30 PM, status of order #BB2641, gluten-free pizza request...)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white text-gray-900 placeholder:text-gray-400 text-xs sm:text-sm p-3.5 rounded-xl border border-gray-200 focus:border-[#FF5A0A] focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#FF5A0A] hover:bg-[#E04E07] text-white text-sm font-bold py-3 px-6 rounded-xl shadow-md shadow-orange-950/20 transition-all hover:scale-[1.01] active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Dispatching Message..." : "Send Message to Cafe"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column (5 cols): Cafe Details, Live Hours & Map */}
          <div className="lg:col-span-5 space-y-5">
            {/* 1. Operating Hours Card */}
            <div className="bg-[#FAF7F4] rounded-3xl p-5 sm:p-6 border border-orange-100/90 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#FF5A0A] flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Operating Hours</h3>
                    <p className="text-[11px] text-gray-500">Kitchen & Beverage Bar</p>
                  </div>
                </div>

                {isCurrentlyOpen ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Kitchen Open Now
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] font-bold border border-amber-200">
                    Closed Now • Opens 8 AM
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs text-gray-700 border-t border-orange-200/60 pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Monday – Friday</span>
                  <span className="font-mono text-gray-600">8:00 AM – 10:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Saturday – Sunday</span>
                  <span className="font-mono text-gray-600">8:00 AM – 11:00 PM</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-[11px] text-[#FF5A0A] font-semibold">
                  <span>Dine-In & Takeaway Service:</span>
                  <span>Available All Day</span>
                </div>
              </div>
            </div>

            {/* 2. Direct Address & Quick Info */}
            <div className="bg-[#FAF7F4] rounded-3xl p-5 sm:p-6 border border-orange-100/90 shadow-2xs space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#FF5A0A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Physical Address</h4>
                  <p className="text-xs text-gray-700 mt-0.5 font-medium leading-relaxed">
                    Beans & Bites Cafe, Lakeside Avenue, Kathmandu, Nepal
                  </p>
                  <a
                    href="https://maps.google.com/?q=Lakeside+Kathmandu+Nepal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FF5A0A] hover:underline mt-1.5"
                  >
                    <span>Get Turn-by-Turn Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-orange-200/60 pt-3">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <Phone className="w-4 h-4 text-[#FF5A0A]" />
                  <span className="font-semibold">+977 1-4245678</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("+97714245678", "phone")}
                  className="text-[11px] text-gray-500 hover:text-gray-900 flex items-center gap-1 bg-white border border-gray-200 px-2 py-0.5 rounded-lg cursor-pointer active:scale-95"
                >
                  {copiedField === "phone" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedField === "phone" ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-orange-200/60 pt-3">
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <Mail className="w-4 h-4 text-[#FF5A0A]" />
                  <span className="font-semibold">hello@beansandbites.com</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy("hello@beansandbites.com", "email")}
                  className="text-[11px] text-gray-500 hover:text-gray-900 flex items-center gap-1 bg-white border border-gray-200 px-2 py-0.5 rounded-lg cursor-pointer active:scale-95"
                >
                  {copiedField === "email" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedField === "email" ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            {/* 3. Amenities Badge Strip */}
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200 shadow-2xs">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-3">
                Cafe Amenities & Experience
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-700 font-medium">
                <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-xl border border-stone-100">
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free Fiber Wi-Fi</span>
                </div>
                <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-xl border border-stone-100">
                  <Car className="w-3.5 h-3.5 text-orange-600" />
                  <span>Free Parking Lot</span>
                </div>
                <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-xl border border-stone-100">
                  <Coffee className="w-3.5 h-3.5 text-amber-700" />
                  <span>Pet-Friendly Patio</span>
                </div>
                <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-xl border border-stone-100">
                  <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                  <span>Cards & FonePay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

