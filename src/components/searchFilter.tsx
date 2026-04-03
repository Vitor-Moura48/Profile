"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  technologies: string[];
  selectedTechs: string[];
  onTechToggle: (tech: string) => void;
  allTechs: string[];
  // Macro-filtros (subcategorias)
  allCategories: string[];
  selectedCategory: string | null;
  onCategorySelect: (cat: string | null) => void;
}

// Ícones/emojis para cada categoria
const CATEGORY_ICONS: Record<string, string> = {
  Sites: "🌐",
  IA: "🤖",
  Infraestrutura: "☁️",
  Jogos: "🎮",
};

export const SearchFilter = ({
  searchTerm,
  onSearchChange,
  selectedTechs,
  onTechToggle,
  allTechs,
  allCategories,
  selectedCategory,
  onCategorySelect,
}: SearchFilterProps) => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3 mb-8">
      {/* Barra de Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-zinc-500" />
        <input
          type="text"
          placeholder={t("projects.search")}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-3 p-1 hover:bg-zinc-700 rounded"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        )}
      </div>

      {/* ── MOBILE: filtro por categoria (macro) ── */}
      {allCategories.length > 0 && (
        <div className="md:hidden">
          <div className="flex flex-wrap gap-2">
            {allCategories.map((cat) => {
              const transCat =
                t(`tags.${cat}`) !== `tags.${cat}` ? t(`tags.${cat}`) : cat;
              return (
                <button
                  key={cat}
                  onClick={() =>
                    onCategorySelect(selectedCategory === cat ? null : cat)
                  }
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-blue-600 border border-blue-500 text-white"
                      : "bg-zinc-800 border border-zinc-700 text-zinc-300 hover:border-zinc-500"
                  }`}
                >
                  {CATEGORY_ICONS[cat] ?? "📁"} {transCat}
                  {selectedCategory === cat && <span className="ml-0.5">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── DESKTOP: filtro por tecnologia (granular) ── */}
      {allTechs.length > 0 && (
        <div className="hidden md:block">
          <p className="text-sm text-zinc-400 mb-2">{t("projects.filterBy")}</p>
          <div className="flex flex-wrap gap-2">
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => onTechToggle(tech)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedTechs.includes(tech)
                    ? "bg-blue-600 border border-blue-500 text-white"
                    : "bg-zinc-800 border border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-700"
                }`}
              >
                {tech}
                {selectedTechs.includes(tech) && (
                  <span className="ml-1">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
