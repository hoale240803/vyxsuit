"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-4 text-xl font-semibold text-cyan-900 bg-amber-400 cursor-pointer border-none ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
