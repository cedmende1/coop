import React from 'react';
import { NavigationIcons } from '../components/navigation/NavigationIcons';
export interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  path: string;
}
export interface NavItems {
  main: NavItem[];
  finance?: NavItem[];
}
// Common navigation items used by multiple roles
export const commonNavItems = {
  dashboard: {
    id: 'dashboard',
    icon: NavigationIcons.dashboard,
    label: 'Dashboard',
    path: '/dashboard'
  },
  members: {
    id: 'members',
    icon: NavigationIcons.members,
    label: 'Members',
    path: '/members'
  },
  loans: {
    id: 'loans',
    icon: NavigationIcons.loans,
    label: 'Loans',
    path: '/loans'
  },
  users: {
    id: 'users',
    icon: NavigationIcons.users,
    label: 'Users',
    path: '/users'
  },
  systemConfig: {
    id: 'systemConfig',
    icon: NavigationIcons.systemConfig,
    label: 'System Config',
    path: '/system-config'
  },
  loanCalculator: {
    id: 'loanCalculator',
    icon: NavigationIcons.loanCalculator,
    label: 'Loan Calculator',
    path: '/loan-calculator'
  }
};
// Finance section items used by multiple roles
export const financeNavItems = {
  generalLedger: {
    id: 'generalLedger',
    icon: NavigationIcons.generalLedger,
    label: 'General Ledger',
    path: '/general-ledger'
  },
  revenueAnalysis: {
    id: 'revenueAnalysis',
    icon: NavigationIcons.revenueAnalysis,
    label: 'Revenue Analysis',
    path: '/revenue-analysis'
  },
  capitalShares: {
    id: 'capitalShares',
    icon: NavigationIcons.capitalShares,
    label: 'Capital Shares',
    path: '/capital-shares'
  },
  statements: {
    id: 'statements',
    icon: NavigationIcons.statements,
    label: 'Statements',
    path: '/statements'
  },
  reports: {
    id: 'reports',
    icon: NavigationIcons.reports,
    label: 'Reports',
    path: '/reports'
  },
  fundsManagement: {
    id: 'fundsManagement',
    icon: NavigationIcons.fundsManagement,
    label: 'Funds Management',
    path: '/funds-management'
  }
};
// Transaction items
export const transactionNavItems = {
  withdrawalRequests: {
    id: 'withdrawalRequests',
    icon: NavigationIcons.withdrawalRequests,
    label: 'Withdrawal Requests',
    path: '/withdrawal-requests'
  },
  depositRequests: {
    id: 'depositRequests',
    icon: NavigationIcons.depositRequests,
    label: 'Deposit Requests',
    path: '/deposit-requests'
  }
};
// Role-specific navigation configurations
export const treasuryNavItems: NavItems = {
  main: [commonNavItems.dashboard, commonNavItems.members, commonNavItems.loans, transactionNavItems.withdrawalRequests, transactionNavItems.depositRequests],
  finance: [financeNavItems.generalLedger, financeNavItems.revenueAnalysis, financeNavItems.capitalShares, financeNavItems.statements, financeNavItems.reports, financeNavItems.fundsManagement]
};
export const itNavItems: NavItems = {
  main: [commonNavItems.dashboard, commonNavItems.users, {
    id: 'contentManagement',
    icon: NavigationIcons.contentManagement,
    label: 'Content Management',
    path: '/content-management'
  }]
};
export const hrNavItems: NavItems = {
  main: [commonNavItems.dashboard, commonNavItems.members, {
    id: 'memberRegistration',
    icon: NavigationIcons.memberRegistration,
    label: 'Member Registration',
    path: '/member-registration'
  }, commonNavItems.loans]
};
export const accountingNavItems: NavItems = {
  main: [commonNavItems.dashboard, commonNavItems.members, {
    id: 'memberApprovals',
    icon: NavigationIcons.memberApprovals,
    label: 'Member Approvals',
    path: '/member-approvals'
  }, commonNavItems.loans, transactionNavItems.withdrawalRequests, transactionNavItems.depositRequests],
  finance: [financeNavItems.generalLedger, financeNavItems.revenueAnalysis, financeNavItems.capitalShares, financeNavItems.statements, financeNavItems.reports]
};
export const directorNavItems: NavItems = {
  main: [commonNavItems.dashboard, commonNavItems.members, commonNavItems.loans, {
    id: 'announcements',
    icon: NavigationIcons.announcements,
    label: 'Announcements',
    path: '/announcements'
  }]
};
export const memberNavItems: NavItems = {
  main: [commonNavItems.dashboard, {
    id: 'requestLoan',
    icon: NavigationIcons.requestLoan,
    label: 'Request Loan',
    path: '/request-loan'
  }, {
    id: 'depositShares',
    icon: NavigationIcons.depositShares,
    label: 'Deposit Shares',
    path: '/deposit-shares'
  }, {
    id: 'accountDividend',
    icon: NavigationIcons.accountDividend,
    label: 'Account Dividend',
    path: '/account-dividend'
  }, {
    id: 'documents',
    icon: NavigationIcons.documents,
    label: 'Documents',
    path: '/documents'
  }, {
    id: 'support',
    icon: NavigationIcons.support,
    label: 'Support',
    path: '/support'
  }, commonNavItems.loanCalculator]
};
export const defaultNavItems: NavItems = {
  main: [commonNavItems.dashboard, commonNavItems.members, {
    id: 'memberApprovals',
    icon: NavigationIcons.memberApprovals,
    label: 'Member Approvals',
    path: '/member-approvals'
  }, commonNavItems.loans, {
    id: 'announcements',
    icon: NavigationIcons.announcements,
    label: 'Announcements',
    path: '/announcements'
  }],
  finance: [financeNavItems.generalLedger, financeNavItems.revenueAnalysis, financeNavItems.capitalShares, financeNavItems.statements, financeNavItems.reports]
};