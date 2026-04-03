"use client";

import React from "react";
import { motion } from "framer-motion";

export const TestimonialSection = () => {
  const testimonial = {
    quote: "Em breve...",
    author: "Gabriel",
    title: "Desenvolvedor Full Stack",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="my-20 relative"
    >
      <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 border border-blue-500/20 rounded-2xl p-12 text-center backdrop-blur-sm">
        {/* Aspas decorativas */}
        <div className="text-6xl text-blue-500/30 mb-4">"</div>

        <p className="text-2xl md:text-3xl font-light text-white mb-6 italic leading-relaxed">
          {testimonial.quote}
        </p>

        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold text-blue-400">
            {testimonial.author}
          </p>
          <p className="text-sm text-zinc-400">{testimonial.title}</p>
        </div>

        {/* Aspas decorativas fechamento */}
        <div className="text-6xl text-blue-500/30 mt-4 text-right">"</div>
      </div>

      {/* Dica para o usuário */}
      <p className="text-center text-xs text-zinc-500 mt-4">
        💡 Edite src/components/sections/testimonialSection.tsx para adicionar um testimonial pessoal
      </p>
    </motion.div>
  );
};
