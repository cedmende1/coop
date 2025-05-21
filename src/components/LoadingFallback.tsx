import React from 'react';
import { useTheme } from '../context/ThemeContext';
export const LoadingFallback: React.FC = () => {
  const {
    theme
  } = useTheme();
  return <div className="fixed inset-0 flex items-center justify-center bg-[rgb(var(--bg-page))] z-50">
      <div className="text-center">
        <div className="inline-block relative w-16 h-16 mb-4">
          <div className={`absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-neon-red ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} animate-spin`}></div>
        </div>
        <p className="text-[rgb(var(--text-primary))] font-medium">
          Loading...
        </p>
      </div>
    </div>;
};