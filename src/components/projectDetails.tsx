// components/ProjectDetails.tsx
"use client"; // Marca como um Client Component se você estiver usando App Router do Next.js 13+

import React from 'react';
import Image from 'next/image'; // Para otimização de imagens do Next.js
import { Github, Link as LinkIcon, ExternalLink } from 'lucide-react'; // Ícones para links
import { Project } from '../types/project';
import { useState } from 'react';

// --- Subcomponentes (simplificados para o exemplo, você pode expandi-los) ---

// ProjectHeader: Título, Categoria, Data, Descrição, Links
const ProjectHeader = (
    { project }:
    { project: Project }
  ) => {

  return (

    <header className="mb-8">

      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 py-2 text-transparent duration-1000 cursor-default bg-clip-text bg-linear-to-r from-blue-400 to-pink-600">{project.title}</h1>

      <p className="text-lg text-gray-400 mb-4">
        <span className="font-semibold">{project.category}</span> / {project.subcategory}
        {project.dateCompleted && (
          <span className="ml-3 text-sm text-gray-500">| Concluído em: {project.dateCompleted}</span>
        )}
      </p>

      <p className="text-xl text-gray-300 leading-relaxed mb-6 text-justify">
        {project.description}
      </p>

      {project.links && project.links.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-6">

          {project.links.map((link, index) => {

            let IconComponent;
            switch (link.type) {
              case 'github': IconComponent = Github; break;
              case 'live': IconComponent = ExternalLink; break; // Usar ExternalLink para demos ao vivo
              case 'behance': IconComponent = LinkIcon; break; // Ou um ícone Behance se tiver
              default: IconComponent = LinkIcon;
            }

            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-colors duration-200 flex items-center gap-2 text-lg"
              >
                {IconComponent && <IconComponent className="w-5 h-5" />}
                {link.label}
              </a>
            );

          })}

        </div>
      )}

    </header>
  );
};

// MediaGallery: Lista de imagens, GIFs, vídeos
const MediaGallery = (
    { media }:
    { media: Project['media'] }
  ) => {

  const [selectedMedia, setSelectedMedia] = useState<{ src: string; isGif: boolean; } | null>(null);
    
  if (!media || media.length === 0) return null;

  return (

    <section className="my-8">

      <h2 className="text-3xl font-semibold text-white mb-6">Galeria de Mídia</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {media.map((item, index) => (
          <div key={index} className="bg-zinc-800 rounded-lg overflow-hidden shadow-xl border border-zinc-700">

            {item.type === 'image' || item.type === 'gif' ? (
              <div className="relative w-full aspect-video"> {/* Ajusta a proporção para 16:9 */}
   
                <Image
                  src={item.src}
                  alt=""
                  layout="fill"
                  objectFit="cover" // Use cover para preencher, ou contain para mostrar tudo
                  className="rounded-t-lg"
                  unoptimized={item.type === 'gif'} // GIFs geralmente não são otimizados pelo Next/image
                />

              </div>

            ) : item.type === 'video' ? (
              <div className="relative w-full aspect-video">

                <iframe
                  src={item.src.includes("youtube.com") ? item.src.replace("watch?v=", "embed/") : item.src}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-t-lg"
                ></iframe>

              </div>

            ) : null}
            {item.caption && (
              <p className="text-sm text-gray-400 p-3 bg-zinc-800 rounded-b-lg">{item.caption}</p>
            )}
          </div>

        ))}
      </div>

    </section>
  );
};

// TechStack: Tecnologias utilizadas
const TechStack = (
    { techStack }:
    { techStack: Project['techStack'] }
  ) => {

  if (!techStack || techStack.length === 0) return null;

  return (

    <section className="my-8">

      <h2 className="text-3xl font-semibold text-white mb-6">Tecnologias Utilizadas</h2>

      <div className="flex flex-wrap gap-4">

        {techStack.map((tech, index) => (

          <div key={index} className="flex items-center bg-zinc-700 px-4 py-2 rounded-full text-lg text-gray-200 shadow-md">
            
            {tech.icon_src && (
              <Image src={tech.icon_src} alt={tech.label} width={24} height={24} className="mr-2" />
            )}
           
            <span>{tech.label}</span>

          </div>

        ))}

      </div>

    </section>

  );
};

// ConclusionSection: Conclusão do projeto
const ConclusionSection = (
    { conclusion }:
    { conclusion: Project['conclusion'] }
  ) => {

  if (!conclusion) return null;

  return (

    <section className="my-8">

      <h2 className="text-3xl font-semibold text-white mb-6">Conclusão</h2>

      <p className="text-xl text-gray-300 leading-relaxed bg-zinc-800 p-6 rounded-lg shadow-inner border border-zinc-700">
        {conclusion}
      </p>

    </section>

  );
};

export const ProjectDetails = (
    { project }:
    { project: Project }
  ) => {

  if (!project) {

    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-400">
        Projeto não encontrado.
      </div>
    );

  }

  return (

    <div className="container mx-auto px-4 py-12 bg-zinc-900 min-h-screen rounded-lg ">
      <div className="max-w-6xl mx-auto">

        <ProjectHeader project={project} />

        <div className="w-full h-px bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 m-4" />

        <MediaGallery media={project.media} />

        <div className="w-full h-px bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 m-4" />

        <TechStack techStack={project.techStack} />

        {project.conclusion && ( // Renderiza a conclusão apenas se houver conteúdo
          <>
            
            <div className="w-full h-px bg-linear-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 m-4" />

            <ConclusionSection conclusion={project.conclusion} />

          </>
        )}

      </div>
    </div>

  );
};

export default ProjectDetails;