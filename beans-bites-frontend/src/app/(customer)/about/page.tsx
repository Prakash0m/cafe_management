"use client";

import * as React from "react";
import { AboutHero } from "@/components/customer/about/about-hero";
import { AboutPillars } from "@/components/customer/about/about-pillars";
import { AboutStats } from "@/components/customer/about/about-stats";
import { AboutGallery } from "@/components/customer/about/about-gallery";
import { AboutVisitCard } from "@/components/customer/about/about-visit-card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 1. Hero Introduction */}
      <AboutHero />

      {/* 2. Four Pillars of Quality & Philosophy */}
      <AboutPillars />

      {/* 3. Milestone Stats Strip */}
      <AboutStats />

      {/* 4. Kitchen & Ambience Photo Gallery */}
      <AboutGallery />

      {/* 5. Visit Us & Hospitality Information */}
      <AboutVisitCard />
    </div>
  );
}
