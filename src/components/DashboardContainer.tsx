import React, { useCallback, useEffect, useMemo, useState, memo } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { PlusCircleIcon } from 'lucide-react';
import { TopNavigation } from './navigation/TopNavigation';
import { Sidebar } from './navigation/Sidebar';
import { useMemoizedNavItems } from '../hooks/useMemoizedNavItems';
// Define navigation section types for accordion functionality
type NavigationSection = 'main' | 'finance' | null;
export const DashboardContainer = memo(() => {
  const {
    theme
  } = useTheme();
  const {
    user
  } = useAuth();
  const location = useLocation();
  const navItems = useMemoizedNavItems(user?.role);
  // State for active navigation section (accordion style)
  const [activeSection, setActiveSection] = useState<NavigationSection>('main');
  // State for sidebar and mobile menu
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // State for tooltips
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({
    top: 0
  });
  // Effect to handle window resize and set mobile state
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-collapse sidebar on small screens
      if (window.innerWidth < 768 && !sidebarCollapsed && !mobileMenuOpen) {
        setSidebarCollapsed(true);
      }
    };
    // Initial check
    checkIfMobile();
    // Add event listener with debounce
    let timeoutId: number;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(checkIfMobile, 100);
    };
    window.addEventListener('resize', handleResize);
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [sidebarCollapsed, mobileMenuOpen]);
  // Auto-determine active section based on current path
  useEffect(() => {
    const path = location.pathname;
    // Check if current path is in the finance section and finance section exists
    if (navItems.finance && (path.includes('general-ledger') || path.includes('revenue-analysis') || path.includes('capital-shares') || path.includes('statements') || path.includes('reports') || path.includes('funds-management'))) {
      setActiveSection('finance');
    }
    // Default to main section
    else {
      setActiveSection('main');
    }
  }, [location, navItems]);
  // Function to check if a nav item is active
  const isActive = useCallback((path: string) => {
    return location.pathname === path;
  }, [location.pathname]);
  // Function to check if any child in a section is active
  const isSectionActive = useCallback((sectionItems: Array<{
    path: string;
  }>) => {
    return sectionItems.some(item => location.pathname === item.path);
  }, [location.pathname]);
  // Toggle section (accordion style)
  const toggleSection = useCallback((section: NavigationSection) => {
    setActiveSection(prev => prev === section ? null : section);
  }, []);
  // Handler for tooltip display
  const handleMouseEnter = useCallback((id: string, e: React.MouseEvent) => {
    if (sidebarCollapsed && !isMobile) {
      setActiveTooltip(id);
      // Get the position directly from the event target
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top + rect.height / 2
      });
    }
  }, [sidebarCollapsed, isMobile]);
  const handleMouseLeave = useCallback(() => {
    setActiveTooltip(null);
  }, []);
  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);
  // Toggle sidebar collapse state
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev);
  }, []);
  // Close mobile menu when clicking a link (for mobile)
  const handleMobileNavClick = useCallback(() => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);
  return <div className="min-h-screen bg-[rgb(var(--bg-card))] text-[rgb(var(--text-primary))]">
      {/* Top Navigation Bar */}
      <TopNavigation isMobile={isMobile} toggleMobileMenu={toggleMobileMenu} toggleSidebar={toggleSidebar} />
      <div className="flex relative">
        {/* Sidebar Navigation */}
        <Sidebar navItems={navItems} activeSection={activeSection} toggleSection={toggleSection} sidebarCollapsed={sidebarCollapsed} isMobile={isMobile} mobileMenuOpen={mobileMenuOpen} toggleMobileMenu={toggleMobileMenu} isActive={isActive} isSectionActive={isSectionActive} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} handleMobileNavClick={handleMobileNavClick} activeTooltip={activeTooltip} tooltipPosition={tooltipPosition} />
        {/* Main content area - scrollable with smooth scrolling */}
        <main className="flex-1 p-3 sm:p-6 overflow-auto custom-scrollbar">
          {/* Outlet renders the child routes */}
          <Outlet />
          {/* Mobile action button - Only visible on small screens */}
          <div className="fixed right-4 bottom-4 md:hidden">
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-neon-red text-white shadow-lg">
              <PlusCircleIcon size={24} />
            </button>
          </div>
        </main>
      </div>
    </div>;
});
DashboardContainer.displayName = 'DashboardContainer';