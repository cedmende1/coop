import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminDashboard } from './dashboards/AdminDashboard';
import { MemberDashboard } from './dashboards/MemberDashboard';
import { AccountingDashboard } from './dashboards/AccountingDashboard';
import { ITDashboard } from './dashboards/ITDashboard';
import { HRDashboard } from './dashboards/HRDashboard';
import { TreasuryDashboard } from './dashboards/TreasuryDashboard';
import { DirectorDashboard } from './dashboards/DirectorDashboard';
import { PageHeader } from '../components/PageHeader';
export const Dashboard = () => {
  const {
    user
  } = useAuth();
  // Render different dashboards based on user role
  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'director':
      return <DirectorDashboard />;
    case 'member':
      return <MemberDashboard />;
    case 'accounting':
      return <AccountingDashboard />;
    case 'it':
      return <ITDashboard />;
    case 'hr':
      return <HRDashboard />;
    case 'treasury':
      return <TreasuryDashboard />;
    default:
      // Default dashboard for any other roles
      return <>
          <PageHeader title="Dashboard" description={`Welcome, ${user?.name}`} />
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Welcome to Lendology</h2>
            <p className="text-[rgb(var(--text-secondary))]">
              Access your role-specific features using the navigation menu.
            </p>
          </div>
        </>;
  }
};