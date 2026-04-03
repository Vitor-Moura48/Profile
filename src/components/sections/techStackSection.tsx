"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../../hooks/useTranslation";

const technologies = [
  { name: "Python", category: "Backend", color: "from-blue-500 to-blue-600" },
  { name: "C#", category: "Backend", color: "from-purple-500 to-purple-600" },
  { name: "SQL Server", category: "Database", color: "from-orange-500 to-orange-600" },
  { name: "PostgreSQL", category: "Database", color: "from-blue-600 to-blue-700" },
  { name: "Supabase", category: "Backend", color: "from-green-500 to-green-600" },
  { name: "Terraform", category: "DevOps", color: "from-purple-600 to-purple-700" },
  { name: "Docker", category: "DevOps", color: "from-blue-400 to-blue-500" },
  { name: "Azure", category: "Cloud", color: "from-blue-500 to-cyan-500" },
  { name: "TypeScript", category: "Frontend", color: "from-blue-600 to-blue-700" },
  { name: "React", category: "Frontend", color: "from-cyan-500 to-cyan-600" },
  { name: "Next.js", category: "Frontend", color: "from-gray-700 to-gray-900" },
  { name: "Git", category: "Tools", color: "from-orange-600 to-orange-700" },
  { name: "PyTorch", category: "AI/ML", color: "from-red-600 to-red-700" },
  { name: "Pandas", category: "AI/ML", color: "from-blue-600 to-indigo-600" },
  { name: "Scikit-Learn", category: "AI/ML", color: "from-orange-500 to-orange-600" },
  { name: "Godot", category: "GameDev", color: "from-blue-400 to-blue-500" },
];

export const TechStackSection = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  const categories = [...new Set(technologies.map(t => t.category))];

  return (
    <div className="my-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-white mb-12 text-center"
      >
        {t('techStack.title')}
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-3"
      >
        {technologies.map((tech, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            className={`px-4 py-2 rounded-lg border border-opacity-30 border-white/10 hover:border-opacity-100 transition-all cursor-pointer backdrop-blur-sm bg-gradient-to-r ${tech.color} text-white font-semibold text-sm shadow-lg hover:shadow-xl`}
          >
            {tech.name}
          </motion.div>
        ))}
      </motion.div>

      {/* Legenda de categorias */}
      <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-zinc-400">
        {categories.map((cat) => (
          <div key={cat} className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};
