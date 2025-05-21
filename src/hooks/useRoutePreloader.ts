import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// This hook preloads related routes based on the current route
export const useRoutePreloader = () => {
  const location = useLocation();
  useEffect(() => {
    const currentPath = location.pathname;
    // Preload related routes based on current path
    const preloadRelatedRoutes = () => {
      // For dashboard, preload the most common next destinations
      if (currentPath === '/dashboard') {
        import('../pages/Members');
        import('../pages/Loans');
        import('../pages/finance/RevenueAnalysis');
      }
      // For members section, preload related pages
      else if (currentPath === '/members') {
        import('../pages/MemberApprovals');
        import('../pages/Borrowers');
      }
      // For loans section, preload related pages
      else if (currentPath === '/loans') {
        import('../pages/Repayments');
        import('../pages/LoanCalculator');
      }
      // For finance section, preload related pages
      else if (currentPath.includes('/finance/') || currentPath === '/general-ledger' || currentPath === '/revenue-analysis') {
        import('../pages/finance/Statements');
        import('../pages/finance/Reports');
      }
    };
    // Use requestIdleCallback if available, otherwise use setTimeout
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => preloadRelatedRoutes());
    } else {
      setTimeout(preloadRelatedRoutes, 1000);
    }
  }, [location.pathname]);
};