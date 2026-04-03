"use client";

import React from "react";
import { Navigation } from "../components/nav";
import { useTranslation } from "../hooks/useTranslation";
import { motion } from "framer-motion";
import { StatsSection } from "../components/sections/statsSection";
import { TechStackSection } from "../components/sections/techStackSection";
import { FeaturedProjectsSection } from "../components/sections/featuredProjectsSection";
import { GitHubSection } from "../components/sections/githubSection";
import { CertificationsSection } from "../components/sections/certificationsSection";
import { CTASection } from "../components/sections/ctaSection";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="bg-linear-to-tl from-black via-zinc-600/20 to-black bg-fixed min-h-screen">
      <Navigation showback={false} />

      <main className="container mx-auto px-4 py-10 md:py-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h1 className="py-3.5 px-0.5 z-10 text-4xl sm:text-5xl md:text-7xl text-transparent duration-1000 bg-white cursor-default animate-title font-display whitespace-normal break-words md:whitespace-nowrap bg-clip-text">
            {t('home.title')}
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-zinc-400 mb-8">
            {t('home.description')}
          </p>

          <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-purple-600 mx-auto mb-12 rounded-full" />

          <p className="max-w-2xl mx-auto text-zinc-300 text-lg">
            {t('home.bio')}
          </p>
        </motion.section>

        {/* CTA Section */}
        <CTASection />

        {/* Stats Section */}
        <StatsSection />

        {/* Tech Stack Section */}
        <TechStackSection />

        {/* Featured Projects Section */}
        <FeaturedProjectsSection />

        {/* GitHub Section */}
        <GitHubSection />

        {/* Certifications Section */}
        <CertificationsSection />
      </main>
    </div>
  );
}