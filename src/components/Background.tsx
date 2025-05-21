import React from 'react';
import { useTheme } from '../context/ThemeContext';
export const Background = () => {
  const {
    theme
  } = useTheme();
  return <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      {/* Gradient background - updated to neutral colors */}
      <div className={`absolute inset-0 transition-colors duration-500 ${theme === 'light' ? 'bg-gradient-to-br from-gray-50 to-gray-100' : 'bg-gradient-to-br from-gray-900 to-gray-800'}`}></div>
      {/* Animated shapes - updated to neutral colors */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {Array.from({
        length: 6
      }).map((_, i) => <div key={i} className={`
              absolute rounded-full mix-blend-multiply filter blur-xl animate-float
              ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-600'}
            `} style={{
        width: `${Math.random() * 300 + 100}px`,
        height: `${Math.random() * 300 + 100}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${i * 2}s`,
        animationDuration: `${Math.random() * 20 + 15}s`
      }}></div>)}
      </div>
      {/* Grid pattern overlay */}
      <div className={`
          absolute inset-0 opacity-[0.015] bg-grid-pattern
          ${theme === 'light' ? 'bg-black' : 'bg-white'}
        `}></div>
    </div>;
};