import { lazy } from 'react';
// Main pages
export const Landing = lazy(() => import('../pages/Landing').then(module => ({
  default: module.default
})));
export const Dashboard = lazy(() => import('../pages/Dashboard').then(module => ({
  default: module.Dashboard
})));
export const DashboardContainer = lazy(() => import('../components/DashboardContainer').then(module => ({
  default: module.DashboardContainer
})));
// User management pages
export const Members = lazy(() => import('../pages/Members').then(module => ({
  default: module.Members
})));
export const MemberApprovals = lazy(() => import('../pages/MemberApprovals').then(module => ({
  default: module.MemberApprovals
})));
export const MemberRegistration = lazy(() => import('../pages/MemberRegistration').then(module => ({
  default: module.MemberRegistration
})));
export const Borrowers = lazy(() => import('../pages/Borrowers').then(module => ({
  default: module.Borrowers
})));
export const Users = lazy(() => import('../pages/Users').then(module => ({
  default: module.Users
})));
// Transaction pages
export const WithdrawalRequests = lazy(() => import('../pages/WithdrawalRequests').then(module => ({
  default: module.WithdrawalRequests
})));
export const DepositRequests = lazy(() => import('../pages/DepositRequests').then(module => ({
  default: module.DepositRequests
})));
// System pages
export const SystemLogs = lazy(() => import('../pages/SystemLogs').then(module => ({
  default: module.SystemLogs
})));
export const SystemConfig = lazy(() => import('../pages/SystemConfig').then(module => ({
  default: module.SystemConfig
})));
export const ContentManagement = lazy(() => import('../pages/ContentManagement').then(module => ({
  default: module.ContentManagement
})));
export const Announcements = lazy(() => import('../pages/Announcements').then(module => ({
  default: module.Announcements
})));
// Loan pages
export const Loans = lazy(() => import('../pages/Loans').then(module => ({
  default: module.Loans
})));
export const Repayments = lazy(() => import('../pages/Repayments').then(module => ({
  default: module.Repayments
})));
export const LoanCalculator = lazy(() => import('../pages/LoanCalculator').then(module => ({
  default: module.LoanCalculator
})));
// Finance pages
export const GeneralLedger = lazy(() => import('../pages/finance/GeneralLedger').then(module => ({
  default: module.GeneralLedger
})));
export const RevenueAnalysis = lazy(() => import('../pages/finance/RevenueAnalysis').then(module => ({
  default: module.RevenueAnalysis
})));
export const CapitalShares = lazy(() => import('../pages/finance/CapitalShares').then(module => ({
  default: module.CapitalShares
})));
export const Statements = lazy(() => import('../pages/finance/Statements').then(module => ({
  default: module.Statements
})));
export const Reports = lazy(() => import('../pages/finance/Reports').then(module => ({
  default: module.Reports
})));
export const FundsManagement = lazy(() => import('../pages/finance/FundsManagement').then(module => ({
  default: module.FundsManagement
})));
// System management pages
export const LoanPortfolio = lazy(() => import('../pages/system/LoanPortfolio').then(module => ({
  default: module.LoanPortfolio
})));
export const StaffActivities = lazy(() => import('../pages/system/StaffActivities').then(module => ({
  default: module.StaffActivities
})));
export const Compliance = lazy(() => import('../pages/system/Compliance').then(module => ({
  default: module.Compliance
})));
export const SystemSettings = lazy(() => import('../pages/system/SystemSettings').then(module => ({
  default: module.SystemSettings
})));
// User profile pages
export const Profile = lazy(() => import('../pages/Profile').then(module => ({
  default: module.Profile
})));
export const Settings = lazy(() => import('../pages/Settings').then(module => ({
  default: module.Settings
})));
export const Notifications = lazy(() => import('../pages/Notifications').then(module => ({
  default: module.Notifications
})));
// Member specific pages
export const RequestLoan = lazy(() => import('../pages/member/RequestLoan').then(module => ({
  default: module.RequestLoan
})));
export const DepositShares = lazy(() => import('../pages/member/DepositShares').then(module => ({
  default: module.DepositShares
})));
export const AccountDividend = lazy(() => import('../pages/member/AccountDividend').then(module => ({
  default: module.AccountDividend
})));
export const Documents = lazy(() => import('../pages/member/Documents').then(module => ({
  default: module.Documents
})));
export const Support = lazy(() => import('../pages/member/Support').then(module => ({
  default: module.Support
})));
// Dashboard variants
export const DirectorDashboard = lazy(() => import('../pages/dashboards/DirectorDashboard').then(module => ({
  default: module.DirectorDashboard
})));
export const MemberDashboard = lazy(() => import('../pages/dashboards/MemberDashboard').then(module => ({
  default: module.MemberDashboard
})));
export const TreasuryDashboard = lazy(() => import('../pages/dashboards/TreasuryDashboard').then(module => ({
  default: module.TreasuryDashboard
})));