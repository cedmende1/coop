import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CacheProvider } from './context/CacheContext';
import { AuthProvider } from './context/AuthContext';
import { LoadingFallback } from './components/LoadingFallback';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProtectedRoute } from './components/ProtectedRoute';
import { RoleProtectedRoute } from './components/RoleProtectedRoute';
// Eagerly loaded components (critical for initial render)
import { LoginForm } from './components/LoginForm';
import { Logo } from './components/Logo';
import { ThemeToggle } from './components/ThemeToggle';
import { Background } from './components/Background';
// Import all lazy-loaded components from the centralized file
import { Landing, Dashboard, DashboardContainer,
// User management
Members, MemberApprovals, MemberRegistration, Borrowers, Users,
// Transaction pages
WithdrawalRequests, DepositRequests,
// System pages
SystemLogs, SystemConfig, ContentManagement, Announcements,
// Loan pages
Loans, Repayments, LoanCalculator,
// Finance pages
GeneralLedger, RevenueAnalysis, CapitalShares, Statements, Reports, FundsManagement,
// System management pages
LoanPortfolio, StaffActivities, Compliance, SystemSettings,
// User profile pages
Profile, Settings, Notifications,
// Member specific pages
RequestLoan, DepositShares, AccountDividend, Documents, Support } from './utils/lazyImports';
export function App() {
  return <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <CacheProvider>
            <Router>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<div className="flex flex-col items-center justify-center min-h-screen transition-colors duration-300 p-4 relative">
                        <ThemeToggle />
                        <Background />
                        <div className="w-full max-w-md bg-[rgb(var(--bg-card))] text-[rgb(var(--text-primary))] rounded-lg shadow-xl p-6 sm:p-8 transition-all duration-300 card-enter">
                          <div className="flex justify-center mb-8">
                            <Logo />
                          </div>
                          <LoginForm />
                        </div>
                      </div>} />
                  {/* Protected Dashboard Routes */}
                  <Route path="/" element={<ProtectedRoute>
                        <DashboardContainer />
                      </ProtectedRoute>}>
                    {/* Dashboard - accessible to all authenticated users */}
                    <Route path="dashboard" element={<Dashboard />} />
                    {/* Member specific routes */}
                    <Route path="request-loan" element={<RoleProtectedRoute path="/request-loan">
                          <RequestLoan />
                        </RoleProtectedRoute>} />
                    <Route path="deposit-shares" element={<RoleProtectedRoute path="/deposit-shares">
                          <DepositShares />
                        </RoleProtectedRoute>} />
                    <Route path="account-dividend" element={<RoleProtectedRoute path="/account-dividend">
                          <AccountDividend />
                        </RoleProtectedRoute>} />
                    <Route path="documents" element={<RoleProtectedRoute path="/documents">
                          <Documents />
                        </RoleProtectedRoute>} />
                    <Route path="support" element={<RoleProtectedRoute path="/support">
                          <Support />
                        </RoleProtectedRoute>} />
                    {/* Existing routes remain the same */}
                    <Route path="members" element={<RoleProtectedRoute path="/members">
                          <Members />
                        </RoleProtectedRoute>} />
                    <Route path="member-approvals" element={<RoleProtectedRoute path="/member-approvals">
                          <MemberApprovals />
                        </RoleProtectedRoute>} />
                    <Route path="borrowers" element={<RoleProtectedRoute path="/borrowers">
                          <Borrowers />
                        </RoleProtectedRoute>} />
                    <Route path="withdrawal-requests" element={<RoleProtectedRoute path="/withdrawal-requests">
                          <WithdrawalRequests />
                        </RoleProtectedRoute>} />
                    <Route path="deposit-requests" element={<RoleProtectedRoute path="/deposit-requests">
                          <DepositRequests />
                        </RoleProtectedRoute>} />
                    <Route path="system-logs" element={<RoleProtectedRoute path="/system-logs">
                          <SystemLogs />
                        </RoleProtectedRoute>} />
                    <Route path="loans" element={<RoleProtectedRoute path="/loans">
                          <Loans />
                        </RoleProtectedRoute>} />
                    <Route path="repayments" element={<RoleProtectedRoute path="/repayments">
                          <Repayments />
                        </RoleProtectedRoute>} />
                    <Route path="loan-calculator" element={<RoleProtectedRoute path="/loan-calculator">
                          <LoanCalculator />
                        </RoleProtectedRoute>} />
                    <Route path="general-ledger" element={<RoleProtectedRoute path="/general-ledger">
                          <GeneralLedger />
                        </RoleProtectedRoute>} />
                    <Route path="revenue-analysis" element={<RoleProtectedRoute path="/revenue-analysis">
                          <RevenueAnalysis />
                        </RoleProtectedRoute>} />
                    <Route path="capital-shares" element={<RoleProtectedRoute path="/capital-shares">
                          <CapitalShares />
                        </RoleProtectedRoute>} />
                    <Route path="statements" element={<RoleProtectedRoute path="/statements">
                          <Statements />
                        </RoleProtectedRoute>} />
                    <Route path="reports" element={<RoleProtectedRoute path="/reports">
                          <Reports />
                        </RoleProtectedRoute>} />
                    <Route path="funds-management" element={<RoleProtectedRoute path="/funds-management">
                          <FundsManagement />
                        </RoleProtectedRoute>} />
                    <Route path="loan-portfolio" element={<RoleProtectedRoute path="/loan-portfolio">
                          <LoanPortfolio />
                        </RoleProtectedRoute>} />
                    <Route path="staff-activities" element={<RoleProtectedRoute path="/staff-activities">
                          <StaffActivities />
                        </RoleProtectedRoute>} />
                    <Route path="compliance" element={<RoleProtectedRoute path="/compliance">
                          <Compliance />
                        </RoleProtectedRoute>} />
                    <Route path="system-settings" element={<RoleProtectedRoute path="/system-settings">
                          <SystemSettings />
                        </RoleProtectedRoute>} />
                    <Route path="profile" element={<RoleProtectedRoute path="/profile">
                          <Profile />
                        </RoleProtectedRoute>} />
                    <Route path="settings" element={<RoleProtectedRoute path="/settings">
                          <Settings />
                        </RoleProtectedRoute>} />
                    <Route path="notifications" element={<RoleProtectedRoute path="/notifications">
                          <Notifications />
                        </RoleProtectedRoute>} />
                    {/* New routes for Director role */}
                    <Route path="users" element={<RoleProtectedRoute path="/users">
                          <Users />
                        </RoleProtectedRoute>} />
                    <Route path="announcements" element={<RoleProtectedRoute path="/announcements">
                          <Announcements />
                        </RoleProtectedRoute>} />
                    <Route path="system-config" element={<RoleProtectedRoute path="/system-config">
                          <SystemConfig />
                        </RoleProtectedRoute>} />
                    {/* New routes for IT and HR roles */}
                    <Route path="content-management" element={<RoleProtectedRoute path="/content-management">
                          <ContentManagement />
                        </RoleProtectedRoute>} />
                    <Route path="member-registration" element={<RoleProtectedRoute path="/member-registration">
                          <MemberRegistration />
                        </RoleProtectedRoute>} />
                  </Route>
                </Routes>
              </Suspense>
            </Router>
          </CacheProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>;
}