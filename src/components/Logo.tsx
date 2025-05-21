import React from 'react';
import { useTheme } from '../context/ThemeContext';
export const Logo = () => {
  const {
    theme
  } = useTheme();
  return <div className="flex items-center group">
      <div className={`
        bg-neon-red text-white font-bold p-2 rounded-md mr-2 
        transition-all duration-300 ease-in-out
        group-hover:scale-110 group-hover:rotate-3
        ${theme === 'dark' ? 'bg-neon-red/90' : 'bg-neon-red'}
      `}>
        <span>LMS</span>
      </div>
      <span className="text-xl font-medium transition-all duration-300 group-hover:tracking-wide text-neon-red">
        Lendology
      </span>
    </div>;
};