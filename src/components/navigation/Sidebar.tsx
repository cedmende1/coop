import React, { memo } from 'react';
import { XIcon } from 'lucide-react';
import { NavigationSection } from './NavigationSection';
interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  path: string;
}
type NavigationSectionType = 'main' | 'finance' | null;
interface SidebarProps {
  navItems: {
    main: NavItem[];
    finance?: NavItem[];
  };
  activeSection: NavigationSectionType;
  toggleSection: (section: NavigationSectionType) => void;
  sidebarCollapsed: boolean;
  isMobile: boolean;
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  isActive: (path: string) => boolean;
  isSectionActive: (sectionItems: Array<{
    path: string;
  }>) => boolean;
  handleMouseEnter: (id: string, e: React.MouseEvent) => void;
  handleMouseLeave: () => void;
  handleMobileNavClick: () => void;
  activeTooltip: string | null;
  tooltipPosition: {
    top: number;
  };
}
export const Sidebar: React.FC<SidebarProps> = memo(({
  navItems,
  activeSection,
  toggleSection,
  sidebarCollapsed,
  isMobile,
  mobileMenuOpen,
  toggleMobileMenu,
  isActive,
  isSectionActive,
  handleMouseEnter,
  handleMouseLeave,
  handleMobileNavClick,
  activeTooltip,
  tooltipPosition
}) => {
  return <>
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMobileMenu}></div>}
        {/* Sidebar - Responsive for both desktop and mobile */}
        <aside className={`${isMobile ? `fixed inset-0 top-[4rem] z-50 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-64` : `${sidebarCollapsed ? 'w-20' : 'w-64'} sticky top-16`} h-[calc(100vh-4rem)] bg-[rgb(var(--bg-card))] flex flex-col transition-all duration-300 ease-in-out border-r border-[rgba(var(--border-color),0.2)]`}>
          {/* Mobile Menu Close Button - Only visible on mobile */}
          {isMobile && mobileMenuOpen && <div className="absolute top-2 right-2 md:hidden">
              <button onClick={toggleMobileMenu} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[rgb(var(--text-secondary))]">
                <XIcon size={20} />
              </button>
            </div>}
          {/* Navigation items */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto custom-scrollbar">
            {/* Main Category */}
            <NavigationSection title="MAIN" items={navItems.main} isActive={isActive} isOpen={activeSection === 'main'} isSectionActive={isSectionActive(navItems.main)} toggleOpen={() => toggleSection('main')} sidebarCollapsed={sidebarCollapsed} isMobile={isMobile} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} handleMobileNavClick={handleMobileNavClick} activeTooltip={activeTooltip} tooltipPosition={tooltipPosition} />
            {/* Finance Category - Only show if it exists */}
            {navItems.finance && <NavigationSection title="FINANCE" items={navItems.finance} isActive={isActive} isOpen={activeSection === 'finance'} isSectionActive={isSectionActive(navItems.finance)} toggleOpen={() => toggleSection('finance')} sidebarCollapsed={sidebarCollapsed} isMobile={isMobile} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} handleMobileNavClick={handleMobileNavClick} activeTooltip={activeTooltip} tooltipPosition={tooltipPosition} />}
          </nav>
          {/* Bottom copyright section */}
          <div className="p-4 text-center text-xs text-[rgb(var(--text-secondary))]">
            {!sidebarCollapsed || isMobile ? <span>2025© TechPro 360° Solutions</span> : <span>2025©</span>}
          </div>
        </aside>
      </>;
});
Sidebar.displayName = 'Sidebar';