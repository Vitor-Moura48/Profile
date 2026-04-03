"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PortfolioCard } from "../portfolioCard";
import projects from "../../../data/projects.json";
import { Project } from "../../types/project";
import { useTranslation } from "../../hooks/useTranslation";

// Selecionar os 3 melhores projetos para destaque
const FEATURED_PROJECT_IDS = [5, 4, 6]; // FogueteIA, Emprega Social, Castelo Arcano

export const FeaturedProjectsSection = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { t } = useTranslation();

  const featuredProjects = projects.filter((p) =>
    FEATURED_PROJECT_IDS.includes(p.id)
  );

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
    <div className="my-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-3">
          {t("featured.title")}
        </h2>
        <p className="text-zinc-400">
          {t("featured.subtitle")}
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8"
      >
        {featuredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            className="relative"
          >
            {/* Badge de destaque */}
            <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 z-10">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow-lg">
                #{idx + 1}
              </div>
            </div>

            <PortfolioCard project={project as Project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
