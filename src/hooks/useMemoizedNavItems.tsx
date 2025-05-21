import React, { useMemo } from 'react';
import { NavItems, treasuryNavItems, itNavItems, hrNavItems, accountingNavItems, directorNavItems, memberNavItems, defaultNavItems } from '../utils/navigationItems';
type UserRole = 'admin' | 'it' | 'member' | 'accounting' | 'hr' | 'treasury' | 'director';
export const useMemoizedNavItems = (role?: string): NavItems => {
  return useMemo(() => {
    // Return navigation items based on user role
    switch (role) {
      case 'treasury':
        return treasuryNavItems;
      case 'it':
        return itNavItems;
      case 'hr':
        return hrNavItems;
      case 'accounting':
        return accountingNavItems;
      case 'director':
        return directorNavItems;
      case 'member':
        return memberNavItems;
      default:
        return defaultNavItems;
    }
  }, [role]);
};