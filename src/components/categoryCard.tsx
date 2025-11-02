"use client";

export const CategoryCard = (
    { title, isActive = false, onClick, } : 
    { title: string, isActive?: boolean, onClick?: () => void } 
  ) => {

  // Combina as funções de toggle e onClick do usuário
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // Classes Tailwind para o estado ativo e hover
  const activeClasses = isActive
    ? "bg-zinc-800 ring-2 ring-blue-500/50 shadow-xl" // Fundo mais escuro, anel de destaque e sombra
    : "bg-zinc-900/80 hover:bg-zinc-800/90 hover:ring-1 hover:ring-zinc-700/50"; // Efeito hover sutil

  // Classes Tailwind para a transição
  const transitionClasses = "transition-all duration-300 ease-in-out";

  return (
    <div className="flex w-full max-w-[300px] min-w-[200px] mx-4">

      {/* Botão Principal da Categoria */}
      <button

        onClick={handleClick}
        className={`
        flex items-center justify-center p-4 rounded-lg text-white font-semibold text-lg w-full
          ${activeClasses}
          ${transitionClasses}
          focus:outline-none focus:ring-4 focus:ring-blue-500/50 
          transform hover:scale-[1.01] active:scale-[0.99] // Animação de clique (leve)
        `}
      >
      
        <span>{title}</span>

      </button>

    </div>
  );
};