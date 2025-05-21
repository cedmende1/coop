import React, { memo } from 'react';
import { Link } from 'react-router-dom';
interface NavigationItemProps {
  id: string;
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  sidebarCollapsed: boolean;
  isMobile: boolean;
  handleMouseEnter: (id: string, e: React.MouseEvent) => void;
  handleMouseLeave: () => void;
  handleMobileNavClick: () => void;
  activeTooltip: string | null;
  tooltipPosition: {
    top: number;
  };
}
export const NavigationItem: React.FC<NavigationItemProps> = memo(({
  id,
  icon,
  label,
  path,
  isActive,
  sidebarCollapsed,
  isMobile,
  handleMouseEnter,
  handleMouseLeave,
  handleMobileNavClick,
  activeTooltip,
  tooltipPosition
}) => {
  return <li className="relative group">
        <Link to={path} onClick={handleMobileNavClick} className={`relative flex items-center gap-3 px-3 py-3 rounded-md 
          ${isActive ? 'bg-gray-100 dark:bg-gray-800 text-neon-red active-nav-item before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-neon-red before:rounded-r' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]'} 
          ${sidebarCollapsed && !isMobile ? 'justify-center' : ''}`} onMouseEnter={e => handleMouseEnter(id, e)} onMouseLeave={handleMouseLeave}>
          <span className={sidebarCollapsed && !isMobile ? 'flex justify-center items-center w-full' : ''}>
            {icon}
          </span>
          {(!sidebarCollapsed || isMobile) && <span>{label}</span>}
        </Link>
        {/* Tooltip when sidebar is collapsed */}
        {sidebarCollapsed && !isMobile && activeTooltip === id && <div className="fixed z-50 ml-[4.5rem] bg-gray-800 text-white text-sm px-3 py-1.5 rounded shadow-lg whitespace-nowrap" style={{
      top: `${tooltipPosition.top}px`,
      transform: 'translateY(-50%)'
    }}>
            {label}
            <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 border-t-[5px] border-r-[5px] border-b-[5px] border-transparent border-r-gray-800"></div>
          </div>}
      </li>;
});
NavigationItem.displayName = 'NavigationItem';