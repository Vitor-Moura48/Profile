"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink } from "lucide-react";
import certifications from "../../../data/certifications.json";
import { useTranslation } from "../../hooks/useTranslation";

interface TechItem {
  label: string;
  icon_src: string;
}

interface Certification {
  id: number;
  title: string;
  description: string;
  image: string;
  issuer: string;
  date: string;
  techStack: TechItem[];
}

export const CertificationsSection = () => {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const { t } = useTranslation();

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
          {t("certifications.title")}
        </h2>
      </motion.div>

      {/* Modal de imagem expandida */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImage(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full"
            >
              <button
                onClick={() => setExpandedImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-blue-400 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="relative w-full bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-zinc-700/50 rounded-2xl overflow-hidden">
                <Image
                  src={expandedImage}
                  alt="Certificação expandida"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de detalhes do certificado (mobile) */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:hidden"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-3 right-3 z-10 text-white hover:text-blue-400 transition-colors bg-zinc-800 rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image */}
              <div
                onClick={() => setExpandedImage(selectedCert.image)}
                className="relative w-full aspect-[4/3] bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-b border-zinc-700/50 cursor-pointer group/img"
              >
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  className="object-contain p-4 group-hover/img:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23374151' width='200' height='200'/%3E%3Ctext x='50%' y='50%' font-size='24' fill='%239CA3AF' text-anchor='middle' dominant-baseline='middle'%3ECertificado%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white text-xs font-semibold opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-1">
                    <ExternalLink className="w-4 h-4" /> {t("certifications.expand")}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-bold text-white leading-tight flex-1 pr-2">
                    {selectedCert.title}
                  </h3>
                  <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-800/50 px-2 py-1 rounded-full whitespace-nowrap">
                    {selectedCert.date}
                  </span>
                </div>
                <p className="text-xs text-blue-400 mb-3">{selectedCert.issuer}</p>
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                  {t(`certificationsData.${selectedCert.id}`)}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {selectedCert.techStack.map((tech, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30"
                    >
                      <Image
                        src={tech.icon_src}
                        alt={tech.label}
                        width={16}
                        height={16}
                        className="w-4 h-4"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                      <span className="text-xs font-medium text-blue-300">{tech.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-2 md:gap-8"
      >
        {(certifications as Certification[]).map((cert) => (
          <motion.div
            key={cert.id}
            variants={itemVariants}
            className="group border border-zinc-800 hover:border-blue-500/50 rounded-2xl overflow-hidden transition-all duration-300 bg-gradient-to-br from-zinc-900/50 to-zinc-900/20 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10"
          >
            {/* ── MOBILE: thumbnail left | title+date right, click to open modal ── */}
            <button
              onClick={() => setSelectedCert(cert)}
              className="md:hidden w-full text-left p-2.5 block"
            >
              <div className="flex flex-row items-center gap-2.5">
                {/* Miniatura */}
                <div className="relative w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-zinc-700/50">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-contain p-1"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23374151' width='200' height='200'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
                {/* Título + Data empilhados */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                    {cert.title}
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{cert.date}</p>
                </div>
              </div>
            </button>

            {/* ── DESKTOP: full card ── */}
            <div className="hidden md:flex flex-col lg:flex-row h-full gap-6 p-8 w-full">
              {/* Image */}
              <div className="w-full lg:w-44 aspect-[4/3] lg:aspect-square lg:h-44 flex-shrink-0">
                <div
                  onClick={() => setExpandedImage(cert.image)}
                  className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-zinc-700/50 flex items-center justify-center cursor-pointer group/img"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-contain group-hover/img:scale-105 transition-transform duration-300 p-2"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='%23374151' width='200' height='200'/%3E%3Ctext x='50%' y='50%' font-size='24' fill='%239CA3AF' text-anchor='middle' dominant-baseline='middle'%3ECertificado%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors flex items-center justify-center">
                    <span className="text-white text-sm font-semibold opacity-0 group-hover/img:opacity-100 transition-opacity">
                      {t("certifications.expand")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-blue-400 mt-1">{cert.issuer}</p>
                    </div>
                    <span className="text-xs font-semibold text-zinc-400 bg-zinc-800/50 px-3 py-1 rounded-full whitespace-nowrap">
                      {cert.date}
                    </span>
                  </div>

                  <p className="text-zinc-300 text-base leading-relaxed">
                    {t(`certificationsData.${cert.id}`)}
                  </p>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {t("projects.stack")}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {cert.techStack.map((tech, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 hover:border-blue-500/60 transition-all"
                      >
                        <Image
                          src={tech.icon_src}
                          alt={tech.label}
                          width={20}
                          height={20}
                          className="w-5 h-5"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                          }}
                        />
                        <span className="text-sm font-medium text-blue-300">
                          {tech.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
