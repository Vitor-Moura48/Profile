"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ScrollButton = (
    { direction, onClick, disabled = false,}:
    { direction: "left" | "right"; onClick?: () => void; disabled?: boolean; }
  ) => {

  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (

    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        p-2 rounded-full shadow-md
        focus:outline-none focus:ring-2 focus:ring-blue-500
        transition-all duration-200 ease-in-out
        ${
          disabled
            ? "bg-zinc-700/50 cursor-not-allowed opacity-50"
            : "bg-zinc-800 hover:bg-zinc-700 active:scale-95"
        }
      `}
    >
      <Icon className="w-5 h-5 text-white" />
    </button>

  );
};
