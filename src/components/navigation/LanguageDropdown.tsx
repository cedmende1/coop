import React, { useEffect, useRef } from 'react';
import { ChevronDownIcon } from 'lucide-react';
interface Language {
  code: 'english' | 'filipino';
  name: string;
  localName?: string;
}
interface LanguageDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onSelectLanguage: (code: 'english' | 'filipino') => void;
}
const languages: Language[] = [{
  code: 'english',
  name: 'English'
}, {
  code: 'filipino',
  name: 'Filipino',
  localName: 'Wikang Filipino'
}];
export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-[rgb(var(--bg-card))] border border-[rgba(var(--border-color),0.4)] rounded-lg shadow-lg p-1 z-50 transform origin-top-right transition-all duration-200 ease-in-out animate-fadeIn">
      {languages.map(language => <button key={language.code} onClick={() => {
      onSelectLanguage(language.code);
      onClose();
    }} className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-150
            ${currentLanguage.code === language.code ? 'bg-gray-100 dark:bg-gray-800 text-neon-red' : 'text-[rgb(var(--text-primary))] hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
          <div className="text-left">
            <p className="text-sm font-medium">{language.name}</p>
            {language.localName && <p className="text-xs text-[rgb(var(--text-secondary))]">
                {language.localName}
              </p>}
          </div>
          {currentLanguage.code === language.code && <div className="h-2 w-2 rounded-full bg-neon-red"></div>}
        </button>)}
    </div>;
};