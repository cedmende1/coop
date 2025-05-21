import React from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
export const ThemeToggle = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <button onClick={toggleTheme} className="p-2 rounded-full transition-all duration-300 ease-in-out hover:bg-opacity-20 hover:scale-110 absolute top-4 right-4 z-10" aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
      {theme === 'light' ? <SunIcon className="w-6 h-6 text-yellow-500 transition-transform duration-300 hover:rotate-45" /> : <MoonIcon className="w-6 h-6 text-blue-300 transition-transform duration-300 hover:rotate-12" />}
    </button>;
};