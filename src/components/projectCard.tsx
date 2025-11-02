"use client";

import { Project } from '../types/project';

export const ProjectCard = (
    { project, isActive = false, onClick,}: 
    { project: Project; isActive?: boolean; onClick?: () => void; }
  ) => {

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button

      onClick={handleClick}
      className={`flex flex-col items-center rounded-lg border transition h-48 w-48 shrink-0 m-4
        ${isActive
          ? "border-blue-500 ring-2 ring-blue-400/40 scale-[1.03]"
          : "border-zinc-700 hover:border-zinc-500"
        }`}
    >
      <img
        src={project.thumbnail}
        alt={project.title}
        className="w-full h-32 object-contain bg-zinc-800"
      />

      <div className="p-2 text-sm font-medium text-zinc-300">
        {project.title}
      </div>

    </button>
  );
}