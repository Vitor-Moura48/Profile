"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

export const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Estado do mouse
    let mouse = {
      x: -1000,
      y: -1000,
      radius: 120, // Distância para conectar/repelir
    };

    // Ajusta o canvas ao tamanho da tela e recalcula
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Quantidade baseada no tamanho da tela
      const particleCount = Math.floor((canvas.width * canvas.height) / 8000);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5, // Velocidade X 
          vy: (Math.random() - 0.5) * 0.5, // Velocidade Y 
          size: Math.random() * 1.5 + 0.5, // Tamanho
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Atualiza e desenha partículas
      particles.forEach((p, index) => {
        // Movimento
        p.x += p.vx;
        p.y += p.vy;

        // Borda: se sair da tela, volta suavemente pelo lado oposto ou rebote
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Conexão com o mouse e cálculo de brilho
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        let pointOpacity = 0.15; // Pontos fracos por padrão
        let currentSize = p.size;

        if (distanceMouse < mouse.radius) {
          const intensity = 1 - distanceMouse / mouse.radius; // 0 a 1 (1 = colado no mouse)
          pointOpacity = 0.15 + intensity * 0.8; // Vai até 1.0 de opacidade
          currentSize = p.size + intensity * 3; // Fica maior e brilha

          // Repulsão suave
          const force = (mouse.radius - distanceMouse) / mouse.radius;
          p.x -= (dxMouse / distanceMouse) * force * 1.5;
          p.y -= (dyMouse / distanceMouse) * force * 1.5;
        }

        // Desenha ponto
        ctx.beginPath();
        ctx.fillStyle = `rgba(96, 165, 250, ${pointOpacity})`;
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fill();

      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    // Listeners do Mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);

    // Inicializa
    resize();
    drawParticles();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
