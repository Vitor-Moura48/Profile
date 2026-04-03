"use client";

import React, { useMemo, useState } from "react";
import { Navigation } from "../../components/nav";
import { PortfolioCard } from "@/components/portfolioCard";
import { SearchFilter } from "@/components/searchFilter";
import projects from "../../../data/projects.json";
import { Project } from "@/types/project";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { t } = useTranslation();

  // Extrair todas as tecnologias únicas
  const allTechs = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((p) => {
      p.techStack.forEach((tech) => {
        techSet.add(tech.label);
      });
    });
    return Array.from(techSet).sort();
  }, []);

  // Extrair subcategorias únicas (macro-filtros mobile)
  const allCategories = useMemo(() => {
    const catSet = new Set<string>();
    projects.forEach((p) => { if (p.subcategory) catSet.add(p.subcategory); });
    return Array.from(catSet).sort();
  }, []);

  // Filtrar projetos
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const transDesc = t(`projectsData.${project.id}.description`) !== `projectsData.${project.id}.description`
        ? t(`projectsData.${project.id}.description`)
        : project.description;

      const subcatKey = `tags.${project.subcategory}`;
      const transSubcat = t(subcatKey) !== subcatKey ? t(subcatKey) : project.subcategory;

      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        project.title.toLowerCase().includes(searchLower) ||
        transDesc.toLowerCase().includes(searchLower) ||
        transSubcat.toLowerCase().includes(searchLower);

      const matchesTech =
        selectedTechs.length === 0 ||
        selectedTechs.some((tech) =>
          project.techStack.some((t) => t.label === tech)
        );

      const matchesCategory =
        selectedCategory === null || project.subcategory === selectedCategory;

      return matchesSearch && matchesTech && matchesCategory;
    });
  }, [searchTerm, selectedTechs, selectedCategory]);

  const handleTechToggle = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  return (
    <div className="bg-linear-to-tl from-black via-zinc-600/20 to-black bg-fixed min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 py-16">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {t("projects.title")}
          </h1>
          <p className="text-xl text-zinc-400">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {/* Barra de Busca e Filtros */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            technologies={selectedTechs}
            selectedTechs={selectedTechs}
            onTechToggle={handleTechToggle}
            allTechs={allTechs}
            allCategories={allCategories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </motion.div>

        {/* Grid de Projetos */}
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-3 lg:grid-cols-3 gap-2 md:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: -8 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                >
                  <PortfolioCard project={project as Project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl text-zinc-400 mb-4">
              {t("projects.notFound")}
            </p>
            <p className="text-zinc-500">
              {t("projects.tryAdjust")}
            </p>
          </motion.div>
        )}

        {/* Info de Resultados */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12 text-zinc-400"
        >
          {filteredProjects.length > 0 && (
            <p>
              {t("projects.showing")} {filteredProjects.length} {t("projects.of")} {projects.length} {t("projects.projectsWord")}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}