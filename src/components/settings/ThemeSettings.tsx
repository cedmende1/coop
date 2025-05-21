import React from 'react';
import { SunIcon, MoonIcon, CheckIcon } from 'lucide-react';
interface ThemeSettingsProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  displaySettings: {
    compactMode: boolean;
    showWelcomeScreen: boolean;
    enableAnimations: boolean;
  };
  onToggle: (category: string, setting: string) => void;
}
export const ThemeSettings: React.FC<ThemeSettingsProps> = ({
  theme,
  toggleTheme,
  displaySettings,
  onToggle
}) => {
  return <div className="space-y-6">
      <div className="mb-6">
        <h3 className="font-medium mb-3">Theme</h3>
        <div className="flex gap-4">
          <button onClick={() => theme === 'dark' && toggleTheme()} className={`flex flex-col items-center gap-2 p-4 rounded-lg border ${theme === 'light' ? 'border-neon-red' : 'border-[rgba(var(--border-color),0.3)]'}`}>
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
              <SunIcon size={24} className="text-yellow-500" />
            </div>
            <span>Light</span>
            {theme === 'light' && <CheckIcon size={16} className="text-neon-red" />}
          </button>
          <button onClick={() => theme === 'light' && toggleTheme()} className={`flex flex-col items-center gap-2 p-4 rounded-lg border ${theme === 'dark' ? 'border-neon-red' : 'border-[rgba(var(--border-color),0.3)]'}`}>
            <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center">
              <MoonIcon size={24} className="text-blue-300" />
            </div>
            <span>Dark</span>
            {theme === 'dark' && <CheckIcon size={16} className="text-neon-red" />}
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Compact Mode</h3>
            <p className="text-sm text-[rgb(var(--text-secondary))]">
              Use reduced spacing for a denser interface
            </p>
          </div>
          <button onClick={() => onToggle('display', 'compactMode')} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${displaySettings.compactMode ? 'bg-neon-red' : 'bg-gray-300 dark:bg-gray-600'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${displaySettings.compactMode ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Welcome Screen</h3>
            <p className="text-sm text-[rgb(var(--text-secondary))]">
              Show welcome screen on login
            </p>
          </div>
          <button onClick={() => onToggle('display', 'showWelcomeScreen')} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${displaySettings.showWelcomeScreen ? 'bg-neon-red' : 'bg-gray-300 dark:bg-gray-600'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${displaySettings.showWelcomeScreen ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Interface Animations</h3>
            <p className="text-sm text-[rgb(var(--text-secondary))]">
              Enable animations throughout the interface
            </p>
          </div>
          <button onClick={() => onToggle('display', 'enableAnimations')} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${displaySettings.enableAnimations ? 'bg-neon-red' : 'bg-gray-300 dark:bg-gray-600'}`}>
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${displaySettings.enableAnimations ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>
    </div>;
};