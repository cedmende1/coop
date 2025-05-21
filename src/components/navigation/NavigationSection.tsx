import React, { memo } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { NavigationItem } from './NavigationItem';
interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  path: string;
}
interface NavigationSectionProps {
  title: string;
  items: NavItem[];
  isOpen: boolean;
  isSectionActive: boolean;
  toggleOpen: () => void;
  sidebarCollapsed: boolean;
  isMobile: boolean;
  isActive: (path: string) => boolean;
  handleMouseEnter: (id: string, e: React.MouseEvent) => void;
  handleMouseLeave: () => void;
  handleMobileNavClick: () => void;
  activeTooltip: string | null;
  tooltipPosition: {
    top: number;
  };
}
export const NavigationSection: React.FC<NavigationSectionProps> = memo(({
  title,
  items,
  isOpen,
  isSectionActive,
  toggleOpen,
  sidebarCollapsed,
  isMobile,
  isActive,
  handleMouseEnter,
  handleMouseLeave,
  handleMobileNavClick,
  activeTooltip,
  tooltipPosition
}) => {
  return <div className="mb-6">
        <button onClick={toggleOpen} className={`w-full flex items-center justify-between gap-3 px-3 py-2 mb-1 text-sm font-semibold transition-colors duration-200 ease-in-out rounded-md
            ${isSectionActive ? 'text-neon-red bg-gray-100/50 dark:bg-gray-800/50' : 'text-[rgb(var(--text-secondary))]'} 
            ${sidebarCollapsed && !isMobile ? 'justify-center' : ''}
            hover:bg-gray-100 dark:hover:bg-gray-800/70`}>
          {(!sidebarCollapsed || isMobile) && <span>{title}</span>}
          {(!sidebarCollapsed || isMobile) && (isOpen ? <ChevronDownIcon size={16} className="transition-transform duration-300" /> : <ChevronRightIcon size={16} className="transition-transform duration-300" />)}
        </button>
        {/* Content container with smooth height animation */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out
            ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
            ${sidebarCollapsed && !isMobile ? 'max-h-[1000px] opacity-100' : ''}
          `}>
          <ul className="space-y-1">
            {items.map(item => <NavigationItem key={item.id} id={item.id} icon={item.icon} label={item.label} path={item.path} isActive={isActive(item.path)} sidebarCollapsed={sidebarCollapsed} isMobile={isMobile} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} handleMobileNavClick={handleMobileNavClick} activeTooltip={activeTooltip} tooltipPosition={tooltipPosition} />)}
          </ul>
        </div>
      </div>;
});
NavigationSection.displayName = 'NavigationSection';