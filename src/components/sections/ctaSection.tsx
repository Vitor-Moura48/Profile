"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Mail } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "../../hooks/useTranslation";

export const CTASection = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="my-20 flex flex-row gap-3 justify-center items-center"
    >
      {/* Botão Primário - Projetos */}
      <Link href="/projects" className="min-w-0 shrink">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-3 py-2 sm:px-5 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-xs sm:text-sm md:text-base rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 shadow-lg hover:shadow-xl"
        >
          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          {t('cta.projects')}
        </motion.button>
      </Link>

      {/* Botão Secundário - Contato */}
      <Link href="/contact" className="min-w-0 shrink">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-3 py-2 sm:px-5 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-zinc-700 to-zinc-600 hover:from-zinc-600 hover:to-zinc-500 text-white font-bold text-xs sm:text-sm md:text-base rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 border border-zinc-600 hover:border-zinc-500 shadow-lg hover:shadow-xl"
        >
          <Mail className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          {t('cta.contact')}
        </motion.button>
      </Link>
    </motion.div>
  );
};
