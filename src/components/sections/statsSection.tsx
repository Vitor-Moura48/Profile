"use client";

import React from "react";
import { motion } from "framer-motion";
import projects from "../../../data/projects.json";
import { useTranslation } from "../../hooks/useTranslation";

export const StatsSection = () => {
  const { t } = useTranslation();

  const stats = [
    {
      number: projects.filter(p => p.title && p.description).length,
      label: t("stats.projects"),
      icon: "🚀",
    },
    {
      number: 3,
      label: t("stats.experience"),
      icon: "⚡",
    },
    {
      number: 6,
      label: t("stats.technologies"),
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-3 gap-3 md:gap-6 my-10 md:my-16"
    >
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          variants={itemVariants}
          className="relative group bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border border-zinc-700/50 hover:border-blue-500/50 rounded-xl p-3 md:p-8 text-center transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10">
            <div className="text-2xl md:text-5xl mb-1 md:mb-2">{stat.icon}</div>
            <div className="text-xl md:text-4xl font-bold text-blue-400 mb-1 md:mb-2">
              {stat.number}+
            </div>
            <p className="text-zinc-300 text-xs md:text-base leading-tight">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
