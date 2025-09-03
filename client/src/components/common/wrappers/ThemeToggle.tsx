import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/store/theme";
import Button from "./Button";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = "", 
  size = "md" 
}) => {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2.5", 
    lg: "p-3"
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <Button
      onClick={toggleTheme}
      className={`${sizeClasses[size]} bg-white/90 dark:bg-black/90 hover:bg-white/70 dark:hover:bg-black/70 rounded-xl transition-all duration-200 text-black dark:text-white ${className}`}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className={iconSizes[size]} />
      ) : (
        <Moon className={iconSizes[size]} />
      )}
    </Button>
  );
};

export default ThemeToggle;
