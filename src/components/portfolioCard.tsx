"use client";

import React, { useState } from "react";
import { ChevronDown, Github, ExternalLink, X } from "lucide-react";
import { Project } from "../types/project";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "../hooks/useTranslation";

interface PortfolioCardProps {
  project: Project;
}

export const PortfolioCard = ({ project }: PortfolioCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const { t } = useTranslation();

  const transDesc = t(`projectsData.${project.id}.description`) !== `projectsData.${project.id}.description` 
    ? t(`projectsData.${project.id}.description`) 
    : project.description;
    
  const transConcl = t(`projectsData.${project.id}.conclusion`) !== `projectsData.${project.id}.conclusion`
    ? t(`projectsData.${project.id}.conclusion`)
    : project.conclusion;

  const tTag = (tag?: string) => {
    if (!tag) return "";
    const key = `tags.${tag}`;
    const translated = t(key);
    return translated !== key ? translated : tag;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsExpanded(false);
    }
  };

  return (
    <>
      {/* Card + título como bloco único com conexão visual */}
      <div className="flex flex-col group/card cursor-pointer" onClick={() => setIsExpanded(true)}>
        {/* Card Compacto */}
        <motion.div
          className="relative w-full aspect-[4/3] rounded-t-xl overflow-hidden border border-b-0 border-zinc-700/50"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {/* Imagem de fundo */}
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover/card:brightness-75 transition-all duration-300"
          />

          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

          {/* Conteúdo hover */}
          <div className="absolute inset-0 p-4 flex flex-col justify-end">
            <p className="text-zinc-300 text-[10px] sm:text-sm group-hover/card:opacity-100 opacity-0 transition-opacity duration-300 line-clamp-1 mb-1 sm:mb-2">
              {tTag(project.subcategory)}
            </p>

            {/* Tech Stack Preview */}
            <div className="flex flex-wrap gap-1 group-hover/card:opacity-100 opacity-0 transition-opacity duration-300">
              {project.techStack.slice(0, 3).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-1 sm:px-2 py-0.5 sm:py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-[8px] sm:text-xs rounded border border-blue-500/30 whitespace-nowrap"
                >
                  {tech.label}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="px-1 sm:px-2 py-0.5 sm:py-1 bg-zinc-500/20 text-zinc-300 text-[8px] sm:text-xs rounded">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Indicador de expansão */}
          <div className="absolute top-3 right-3 bg-blue-500/80 p-2 rounded-lg group-hover/card:opacity-100 opacity-0 transition-opacity duration-300">
            <ChevronDown className="w-5 h-5 text-white" />
          </div>
        </motion.div>

        {/* Título — aba conectada ao card */}
        <div className="border border-t-0 border-zinc-700/50 rounded-b-xl bg-zinc-900/80 px-4 py-3 group-hover/card:border-blue-500/40 group-hover/card:bg-zinc-800/60 transition-all duration-300">
          <h3 className="text-white font-semibold text-xs sm:text-base text-center truncate group-hover/card:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Modal expandido */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onKeyDown={handleKeyDown}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div
                className="bg-zinc-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-4 md:p-6 flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {project.title}
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base">
                      {tTag(project.category)} / {tTag(project.subcategory)}
                      {project.dateCompleted && (
                        <span className="ml-2 md:ml-3 text-zinc-500">
                          | {tTag(project.dateCompleted)}
                        </span>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-zinc-400" />
                  </button>
                </div>

                {/* Conteúdo */}
                <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                  {/* Descrição */}
                  <div>
                    <p className="text-zinc-300 text-base md:text-lg leading-relaxed text-justify">
                      {transDesc}
                    </p>
                  </div>

                  {/* Galeria de Imagens */}
                  {project.media && project.media.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">
                        {t("projects.gallery")}
                      </h3>

                      {/* Imagem Principal */}
                      <div className="w-full rounded-lg overflow-hidden bg-zinc-800">
                        <img
                          src={project.media[selectedImage]?.src}
                          alt={`${project.title} - ${selectedImage + 1}`}
                          className="w-full h-48 md:h-96 object-cover"
                        />
                      </div>

                      {/* Miniaturas */}
                      {project.media.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2">
                          {project.media.map((media, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedImage(idx)}
                              className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx
                                  ? "border-blue-500 scale-105"
                                  : "border-zinc-700 hover:border-zinc-600"
                                }`}
                            >
                              <img
                                src={media.src}
                                alt={`Thumbnail ${idx + 1}`}
                                className="w-20 h-20 object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Legenda */}
                      {project.media[selectedImage]?.caption && (
                        <p className="text-sm text-zinc-400">
                          {project.media[selectedImage].caption}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {t("projects.stack")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-colors"
                        >
                          {tech.icon_src && (
                            <img
                              src={tech.icon_src}
                              alt={tech.label}
                              className="w-5 h-5"
                            />
                          )}
                          <span className="text-blue-300 font-medium">
                            {tech.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  {project.links && project.links.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        Links
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {project.links.map((link, idx) => {
                          const Icon =
                            link.type === "github" ? Github : ExternalLink;
                          return (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
                            >
                              <Icon className="w-5 h-5" />
                              {link.label}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Conclusão */}
                  {transConcl && (
                    <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {t("projects.conclusion")}
                      </h3>
                      <p className="text-zinc-300 text-justify">
                        {transConcl}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
