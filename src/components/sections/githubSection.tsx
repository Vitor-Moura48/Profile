"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

const STATIC_STATS = {
  totalContributions: "1.2k",
  totalStars: "33",
  topLanguage: "Python",
};

export const GitHubSection = () => {
  const githubUsername = "Vitor-Moura48";
  const githubProfile = `https://github.com/${githubUsername}`;
  const { t } = useTranslation();

  const displayStats = [
    {
      label: t("github.contributions"),
      value: STATIC_STATS.totalContributions,
      icon: "📊",
    },
    {
      label: t("github.stars"),
      value: STATIC_STATS.totalStars,
      icon: "⭐",
    },
    {
      label: t("github.topLanguage"),
      value: STATIC_STATS.topLanguage,
      icon: "💻",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="my-10 md:my-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-3">GitHub</h2>
        <p className="text-zinc-400">
          {t("github.subtitle")}
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-2 md:gap-4 mb-8"
      >
        {displayStats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 rounded-lg p-3 md:p-6 text-center hover:border-blue-500/50 transition-all"
          >
            <div className="text-xl md:text-3xl mb-1 md:mb-2">{stat.icon}</div>
            <div className="text-sm md:text-2xl font-bold text-blue-400 mb-1 leading-tight">
              {stat.value}
            </div>
            <p className="text-zinc-400 text-[10px] md:text-sm leading-tight">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <a
          href={githubProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 text-white rounded-lg transition-all transform hover:scale-105"
        >
          <Github className="w-5 h-5" />
          {t("github.visit")}
          <ExternalLink className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  );
};
