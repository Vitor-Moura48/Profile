"use client";

import React, { useRef, useState } from "react";
import { Navigation } from "../../components/nav";
import { CategoryCard } from "@/components/categoryCard";
import { ProjectCard } from "@/components/projectCard";
import { ScrollButton } from "@/components/scrollButton";
import projects from "../../../data/projects.json";
import { ProjectDetails } from "@/components/projectDetails";

type Category = {
  title: string;
  subcategories: string[];
};

const categories: Category[] = [
  { title: "Programação", subcategories: ["Sites", "IA", "Jogos"] },
  { title: "Artes Visuais", subcategories: ["Pixel Art (64x64)", "Pixel Art (32x32)", "Pixel Art (outras)"] },
];

export default function Projects() {

  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(categories[0].title);
  const [activeSub, setActiveSub] = useState<string | null>(categories[0].subcategories[0]);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const handleSubCategoryClick = (subCategory: string) => {
    setActiveSub(subCategory);
  };

  const handleProjectCardClick = (projectId: number) => {
    setActiveProject(projectId);
  };

  const visibleProjects = projects.filter(
    (p) => p.subcategory === activeSub
  );

  const scrollProjects = (direction: "left" | "right") => {
    if (!projectsContainerRef.current) return;

    const firstCard = projectsContainerRef.current.firstChild as HTMLElement;
    const cardWidth = firstCard ? firstCard.clientWidth + 16 : 0; // 16 = gap

    projectsContainerRef.current.scrollBy({
      left: direction === "right" ? cardWidth : -cardWidth,
      behavior: "smooth",
    });
  };
  
  return (
    <div className="bg-linear-to-tl from-black via-zinc-600/20 to-black bg-fixed flex flex-col items-center justify-center w-screen min-h-screen">
      
      <Navigation />

      {/* Lista de categorias */}
      <div className="flex flex-row justify-center gap-y-4 mb-8 w-full ">

        {categories.map((cat) => (
          
          <CategoryCard 
            title={cat.title} 
            onClick={() => {
              handleCategoryClick(cat.title);
              handleSubCategoryClick(cat.subcategories[0]);  
            }} 
            isActive={activeCategory === cat.title}
          >
          </CategoryCard>

        ))}
      </div>

      {/* Subcards “spawnados” abaixo da categoria ativa */}
      {activeCategory && (
        <div className="flex flex-row justify-center gap-y-4 mt-2 w-full">
          {categories
            .find((category) => category.title === activeCategory)
            ?.subcategories.map((sub) => (

              <CategoryCard 
                title={sub} 
                onClick={() => handleSubCategoryClick(sub)}
                isActive={activeSub === sub} 
                >
              </CategoryCard>
              
            ))}
        </div>
      )}




      {/* Área de conteúdo (mostra a subcategoria selecionada) */}
      {activeCategory && activeSub && (
        <div className="mt-4 p-4 border border-zinc-700 rounded-lg text-zinc-300 max-w-11/12 mx-auto">
          
          <strong>{activeCategory} / {activeSub}</strong>
          
          <p className="mt-2 text-sm text-zinc-400">
            Aqui entraria a lista de projetos dessa subcategoria.
          </p>

          {/* Controles de scroll com ícones */}
          <div className="flex items-center justify-center gap-2 mt-2">

            {visibleProjects.length > 6 && (
              <ScrollButton direction="left" onClick={() => scrollProjects("left")} ></ScrollButton>
            )}

            <div
              ref={projectsContainerRef}
              className="overflow-hidden flex flex-row gap-2"
            >
              {visibleProjects.map((p) => (
                <ProjectCard
                  project={p}
                  isActive={activeProject === p.id}
                  onClick={() => handleProjectCardClick(p.id)}
                />
              ))}
            </div>

            {visibleProjects.length > 6 && (
              <ScrollButton direction="right" onClick={() => scrollProjects("right")} ></ScrollButton>
            )}
            
          </div>

          <div className="w-full h-px bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 m-4" />

          <ProjectDetails project={visibleProjects.find(p => p.id === activeProject)!} ></ProjectDetails>

        </div>
      )}









      <div className="w-screen h-px animate-glow animate-fade-left bg-linear-to-r" />

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

    </div>
  );
}