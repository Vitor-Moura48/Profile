"use client";

import React, { useRef, useState } from "react";
import { Navigation } from "../../components/nav";
import { CategoryCard } from "@/components/categoryCard";
import { ProjectCard } from "@/components/projectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Category = {
  title: string;
  subcategories: string[];
};

type Project = {
  id: number;
  title: string;
  image: string;
  description: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Projeto A",
    image: "/img/rune.png",
    description: "Pixel art 32x32 com animação de carro.",
  },
  {
    id: 2,
    title: "Projeto B",
    image: "/img/rune.png",
    description: "Cenário montanhoso em pixel art.",
  },
  {
    id: 3,
    title: "Projeto C",
    image: "/img/rune.png",
    description: "Personagem animado estilo 16-bit.",
  },
  {
    id: 4,
    title: "Projeto D",
    image: "/img/rune.png",
    description: "Personagem animado estilo 32-bit.",
  },
  {
    id: 5,
    title: "Projeto E",
    image: "/img/rune.png",
    description: "Personagem animado estilo 8-bit.",
  },
  {
    id: 6,
    title: "Projeto F",
    image: "/img/rune.png",
    description: "Personagem animado estilo 4-bit.",
  },
  {
    id: 7,
    title: "Projeto G",
    image: "/img/rune.png",
    description: "Personagem animado estilo 2-bit.",
  },
  {
    id: 8,
    title: "Projeto H",
    image: "/img/rune.png",
    description: "Personagem animado estilo 1-bit.",
  },
  {
    id: 9,
    title: "Projeto I",
    image: "/img/rune.png",
    description: "Personagem animado estilo 0.5-bit.",
  },
];

const categories: Category[] = [
  { title: "Programação", subcategories: ["Sites", "IA", "Jogos"] },
  { title: "Artes Visuais", subcategories: ["Pixel Art (64x64)", "Pixel Art (64x64)", "Pixel Art (outras)"] },
];

export default function Projects() {

  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(categories[0].title);
  const [activeSub, setActiveSub] = useState<string | null>(null);
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
      <div className="flex flex-row gap-4 mb-8">
        {categories.map((cat) => (
          
          <CategoryCard 
            title={cat.title} 
            onClick={() => {
              handleCategoryClick(cat.title);
              handleSubCategoryClick(cat.subcategories[0]);  
            }} 
          >
            a
          </CategoryCard>

        ))}
      </div>





      {/* Subcards “spawnados” abaixo da categoria ativa */}
      {activeCategory && (
        <div className="flex flex-wrap gap-3 mt-2">
          {categories
            .find((category) => category.title === activeCategory)
            ?.subcategories.map((sub) => (

              <CategoryCard title={sub} onClick={() => handleSubCategoryClick(sub)} >
                a
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
          <div className="flex items-center gap-2 mt-2">

            <button
              onClick={() => scrollProjects("left")}
              className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <div
              ref={projectsContainerRef}
              className="overflow-hidden flex flex-row gap-2"
            >
              {projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  isActive={activeProject === p.id}
                  onClick={() => handleProjectCardClick(p.id)}
                />
              ))}
            </div>

            <button
              onClick={() => scrollProjects("right")}
              className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
            
          </div>






        </div>
      )}









      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-linear-to-r" />
 
      <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        projetos
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

    </div>
  );
}