import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div 
        className={`theme-toggle ${theme === 'light' ? 'theme-toggle-active' : ''}`}
        onClick={toggleTheme}
      >
        <div className="theme-toggle-slider"></div>
        <div className="absolute inset-0 flex justify-between items-center px-1.5">
          <Sun className="h-3.5 w-3.5 text-white/90" />
          <Moon className="h-3.5 w-3.5 text-white/90" />
        </div>
      </div>
    </div>
  );
}