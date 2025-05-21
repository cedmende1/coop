import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { TrendingUpIcon, TrendingDownIcon, DownloadIcon, UsersIcon, BarChart4Icon, PieChartIcon, BellIcon, AlertTriangleIcon, FileTextIcon, DollarSignIcon, UserCheckIcon, ClipboardCheckIcon, CheckCircleIcon, XCircleIcon, ClockIcon, ArrowRightIcon, ChevronRightIcon, CalendarIcon, ShieldIcon, ActivityIcon, InfoIcon, FileBarChartIcon, AlertCircleIcon } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line } from 'recharts';
// Time period options for filter
type TimePeriod = 'day' | 'week' | 'month' | 'quarter' | 'year' | 'all';
// Tab types
type DashboardTabType = 'loan-analytics' | 'staff-performance' | 'risk-analysis' | 'compliance';
// Mock data for key metrics
const keyMetrics = {
  loanPortfolio: 12750000,
  interestRevenue: 1250000,
  defaultRate: 2.8,
  activeMembers: 785,
  defaultRateTrend: 0.3,
  interestRevenueTrend: 4.2,
  membersTrend: 2.5,
  loanPortfolioTrend: 3.8 // positive means increasing (good)
};
// Mock data for loan status distribution
const loanStatusData = [{
  name: 'Active',
  value: 34,
  color: '#4F46E5'
}, {
  name: 'Paid',
  value: 63,
  color: '#10B981'
}, {
  name: 'Defaulted',
  value: 3,
  color: '#EF4444'
}];
// Mock data for loan type distribution
const loanTypeData = [{
  name: 'Personal',
  value: 40,
  color: '#4F46E5'
}, {
  name: 'Business',
  value: 30,
  color: '#F59E0B'
}, {
  name: 'Educational',
  value: 20,
  color: '#10B981'
}, {
  name: 'Emergency',
  value: 10,
  color: '#EF4444'
}];
// Mock data for risk exposure
const riskExposureData = [{
  name: 'Low Risk',
  value: 45,
  color: '#10B981'
}, {
  name: 'Medium Risk',
  value: 35,
  color: '#F59E0B'
}, {
  name: 'High Risk',
  value: 20,
  color: '#EF4444'
}];
// Mock data for monthly interest revenue
const monthlyInterestData = [{
  month: 'Jan',
  interest: 12500
}, {
  month: 'Feb',
  interest: 13200
}, {
  month: 'Mar',
  interest: 12800
}, {
  month: 'Apr',
  interest: 13500
}, {
  month: 'May',
  interest: 14200
}, {
  month: 'Jun',
  interest: 14800
}, {
  month: 'Jul',
  interest: 15300
}, {
  month: 'Aug',
  interest: 15500
}];
// Mock data for default rate trend
const defaultRateTrendData = [{
  month: 'Jan',
  rate: 2.2
}, {
  month: 'Feb',
  rate: 2.3
}, {
  month: 'Mar',
  rate: 2.4
}, {
  month: 'Apr',
  rate: 2.6
}, {
  month: 'May',
  rate: 2.7
}, {
  month: 'Jun',
  rate: 2.8
}, {
  month: 'Jul',
  rate: 2.8
}, {
  month: 'Aug',
  rate: 2.7
}];
// Mock data for staff performance
const staffPerformanceData = [{
  name: 'Maria G.',
  loansProcessed: 32,
  collectionRate: 97
}, {
  name: 'James K.',
  loansProcessed: 28,
  collectionRate: 94
}, {
  name: 'Sarah L.',
  loansProcessed: 24,
  collectionRate: 91
}, {
  name: 'David M.',
  loansProcessed: 20,
  collectionRate: 89
}, {
  name: 'Robert N.',
  loansProcessed: 18,
  collectionRate: 85
}];
// Mock data for recent staff activity
const recentStaffActivity = [{
  id: 1,
  name: 'Maria G.',
  action: 'processed 5 loans',
  time: 'Today at 10:24 AM'
}, {
  id: 2,
  name: 'James K.',
  action: 'approved 3 applications',
  time: 'Today at 9:15 AM'
}, {
  id: 3,
  name: 'Sarah L.',
  action: 'updated compliance records',
  time: 'Yesterday at 4:30 PM'
}, {
  id: 4,
  name: 'David M.',
  action: 'contacted 8 late borrowers',
  time: 'Yesterday at 2:45 PM'
}];
// Mock data for staff account status
const staffAccountStatus = {
  active: 24,
  inactive: 3,
  suspended: 1
};
// Mock data for compliance status
const complianceData = [{
  name: 'KYC Compliance',
  percentage: 98.5,
  status: 'compliant'
}, {
  name: 'Loan Documentation',
  percentage: 94.2,
  status: 'attention'
}, {
  name: 'Regulatory Reporting',
  percentage: 100,
  status: 'compliant'
}, {
  name: 'Interest Rate Disclosure',
  percentage: 89.7,
  status: 'action'
}];
// Mock data for recent policy changes
const policyChanges = [{
  id: 1,
  title: 'Updated KYC Requirements',
  date: 'Implemented 14 days ago',
  severity: 'major'
}, {
  id: 2,
  title: 'Revised Loan Approval Process',
  date: 'Implemented 30 days ago',
  severity: 'minor'
}, {
  id: 3,
  title: 'New Interest Rate Disclosure Format',
  date: 'Implemented 45 days ago',
  severity: 'major'
}];
// Mock data for audit schedule
const auditSchedule = [{
  id: 1,
  title: 'Internal Loan Portfolio Audit',
  date: 'Scheduled for June 15, 2023',
  status: 'upcoming'
}, {
  id: 2,
  title: 'Regulatory Compliance Audit',
  date: 'Scheduled for August 3, 2023',
  status: 'upcoming'
}, {
  id: 3,
  title: 'Annual Financial Audit',
  date: 'Scheduled for December 10, 2023',
  status: 'upcoming'
}];
// Mock data for system announcements
const systemAnnouncements = [{
  id: 1,
  title: 'System Maintenance Scheduled',
  message: 'System will be down for maintenance on Saturday, July 15 from 10 PM to 2 AM.',
  date: '2023-07-10',
  priority: 'high'
}, {
  id: 2,
  title: 'New Loan Products Launching',
  message: 'Three new loan products will be available starting August 1, 2023.',
  date: '2023-07-05',
  priority: 'medium'
}, {
  id: 3,
  title: 'Updated Privacy Policy',
  message: 'Our privacy policy has been updated in accordance with new regulations.',
  date: '2023-06-28',
  priority: 'low'
}];
// Mock data for pending loan approvals
const pendingLoanApprovals = [{
  id: 'APP-2023-0001',
  applicantName: 'Eduardo Tan',
  amount: 60000,
  purpose: 'Home renovation',
  date: '2023-06-28',
  status: 'pending'
}, {
  id: 'APP-2023-0002',
  applicantName: 'Isabella Reyes',
  amount: 150000,
  purpose: 'Business expansion',
  date: '2023-06-25',
  status: 'pending'
}, {
  id: 'APP-2023-0004',
  applicantName: 'Camila Ramos',
  amount: 25000,
  purpose: 'Emergency medical expenses',
  date: '2023-06-29',
  status: 'pending'
}];
// Format currency as Philippine Peso
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};
// Format percentage
const formatPercentage = (value: number) => {
  return `${value.toFixed(1)}%`;
};
// Format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
// Custom tooltip for charts
const CustomTooltip = ({
  active,
  payload,
  label
}: any) => {
  if (active && payload && payload.length) {
    return <div className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-md border border-[rgba(var(--border-color),0.2)]">
        <p className="font-medium">{label}</p>
        {payload.map((entry: any, index: number) => <p key={`item-${index}`} style={{
        color: entry.color
      }}>
            {entry.name}:{' '}
            {entry.name === 'rate' ? formatPercentage(entry.value) : formatCurrency(entry.value)}
          </p>)}
      </div>;
  }
  return null;
};
export const DirectorDashboard = () => {
  // State for time period filter
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('month');
  // State for active tab
  const [activeTab, setActiveTab] = useState<DashboardTabType>('loan-analytics');
  // Get time period label
  const getTimePeriodLabel = (period: TimePeriod): string => {
    switch (period) {
      case 'day':
        return 'Today';
      case 'week':
        return 'This Week';
      case 'month':
        return 'This Month';
      case 'quarter':
        return 'This Quarter';
      case 'year':
        return 'This Year';
      case 'all':
        return 'All Time';
      default:
        return 'This Month';
    }
  };
  // Handle export report
  const handleExportReport = () => {
    console.log('Exporting report for period:', timePeriod);
    // In a real app, this would trigger a report generation and download
    alert(`Exporting ${getTimePeriodLabel(timePeriod)} report...`);
  };
  return <>
      <PageHeader title="Director Dashboard" description="Executive Management Overview" />
      {/* Time Period Filter and Export Report Button */}
      <div className="flex flex-col sm:flex-row justify-between mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <label htmlFor="timePeriod" className="mr-2 text-[rgb(var(--text-secondary))]">
            Time Period:
          </label>
          <select id="timePeriod" value={timePeriod} onChange={e => setTimePeriod(e.target.value as TimePeriod)} className="py-2 px-3 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30">
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="quarter">Quarter</option>
            <option value="year">Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
        <button onClick={handleExportReport} className="flex items-center gap-2 py-2 px-4 bg-neon-red text-white rounded-lg hover:bg-neon-red/90 transition-colors">
          <DownloadIcon size={16} />
          <span>Export Report</span>
        </button>
      </div>
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Loan Portfolio
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">
                {formatCurrency(keyMetrics.loanPortfolio)}
              </h3>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>+{keyMetrics.loanPortfolioTrend}% from last month</span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <FileTextIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Interest Revenue
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">
                {formatCurrency(keyMetrics.interestRevenue)}
              </h3>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>+{keyMetrics.interestRevenueTrend}% from last month</span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <DollarSignIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Default Rate
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">
                {formatPercentage(keyMetrics.defaultRate)}
              </h3>
              <p className="text-xs text-red-600 dark:text-red-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>+{keyMetrics.defaultRateTrend}% from last month</span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <AlertTriangleIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Active Members
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">
                {keyMetrics.activeMembers}
              </h3>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>+{keyMetrics.membersTrend}% from last month</span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <UsersIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
      </div>
      {/* Dashboard Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="flex overflow-x-auto">
          <button className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'loan-analytics' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('loan-analytics')}>
            <div className="flex items-center gap-2">
              <BarChart4Icon size={16} />
              <span>Loan Analytics</span>
            </div>
          </button>
          <button className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'staff-performance' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('staff-performance')}>
            <div className="flex items-center gap-2">
              <UserCheckIcon size={16} />
              <span>Staff Performance</span>
            </div>
          </button>
          <button className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'risk-analysis' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('risk-analysis')}>
            <div className="flex items-center gap-2">
              <ActivityIcon size={16} />
              <span>Risk Analysis</span>
            </div>
          </button>
          <button className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'compliance' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('compliance')}>
            <div className="flex items-center gap-2">
              <ShieldIcon size={16} />
              <span>Compliance</span>
            </div>
          </button>
        </div>
        {/* Tab Content */}
        <div className="p-6">
          {/* Loan Analytics Tab */}
          {activeTab === 'loan-analytics' && <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Loan Status Distribution */}
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Loan Status Distribution
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={loanStatusData} cx="50%" cy="50%" labelLine={true} outerRadius={100} fill="#8884d8" dataKey="value" label={({
                      name,
                      percent
                    }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                          {loanStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {/* Monthly Interest Revenue */}
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Monthly Interest Revenue
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyInterestData} margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}>
                        <defs>
                          <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="interest" stroke="#4F46E5" fillOpacity={1} fill="url(#colorInterest)" name="interest" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              {/* Default Rate Trend */}
              <div>
                <h3 className="text-lg font-medium mb-4">Default Rate Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={defaultRateTrendData} margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 'dataMax + 1']} />
                      <Tooltip formatter={value => formatPercentage(value as number)} />
                      <Legend />
                      <Line type="monotone" dataKey="rate" stroke="#EF4444" activeDot={{
                    r: 8
                  }} name="rate" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>}
          {/* Staff Performance Tab */}
          {activeTab === 'staff-performance' && <div className="space-y-6">
              {/* Staff Performance Metrics */}
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Staff Performance Metrics
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={staffPerformanceData} margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="loansProcessed" name="Loans Processed" fill="#4F46E5" />
                      <Bar yAxisId="right" dataKey="collectionRate" name="Collection Rate (%)" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Staff Activity */}
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">
                    Recent Staff Activity
                  </h3>
                  <div className="space-y-4">
                    {recentStaffActivity.map(activity => <div key={activity.id} className="flex items-start gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                          <ActivityIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {activity.name} {activity.action}
                          </p>
                          <p className="text-sm text-[rgb(var(--text-secondary))]">
                            {activity.time}
                          </p>
                        </div>
                      </div>)}
                  </div>
                  <button className="mt-4 flex items-center text-neon-red hover:underline">
                    <span>View Complete Activity Log</span>
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </button>
                </div>
                {/* Staff Account Status */}
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">
                    Staff Account Status
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Active Accounts</span>
                      </div>
                      <span className="font-medium">
                        {staffAccountStatus.active}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span>Recently Inactive</span>
                      </div>
                      <span className="font-medium">
                        {staffAccountStatus.inactive}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Suspended</span>
                      </div>
                      <span className="font-medium">
                        {staffAccountStatus.suspended}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 flex items-center text-neon-red hover:underline">
                    <span>Manage Staff Accounts</span>
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>}
          {/* Risk Analysis Tab */}
          {activeTab === 'risk-analysis' && <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Loan Type Distribution */}
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Loan Type Distribution
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={loanTypeData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" dataKey="value" label={({
                      name,
                      percent
                    }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                          {loanTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                {/* Risk Exposure */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Risk Exposure</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart layout="vertical" data={riskExposureData} margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 60]} />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip formatter={value => `${value}%`} />
                        <Legend />
                        <Bar dataKey="value" name="% of Portfolio">
                          {riskExposureData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              {/* Risk Simulation Tools */}
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Risk Simulation Tools
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Interest Rate Impact</h4>
                    <p className="text-sm text-[rgb(var(--text-secondary))] mb-4">
                      Simulate portfolio impact with interest rate changes
                    </p>
                    <button className="w-full py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90 transition-colors">
                      Run Simulation
                    </button>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Default Stress Test</h4>
                    <p className="text-sm text-[rgb(var(--text-secondary))] mb-4">
                      Test portfolio resilience under various scenarios
                    </p>
                    <button className="w-full py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90 transition-colors">
                      Run Test
                    </button>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Growth Forecasting</h4>
                    <p className="text-sm text-[rgb(var(--text-secondary))] mb-4">
                      Project portfolio growth with different strategies
                    </p>
                    <button className="w-full py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90 transition-colors">
                      Generate Forecast
                    </button>
                  </div>
                </div>
              </div>
            </div>}
          {/* Compliance Tab */}
          {activeTab === 'compliance' && <div className="space-y-6">
              {/* Compliance Status */}
              <div>
                <h3 className="text-lg font-medium mb-4">Compliance Status</h3>
                <div className="space-y-4">
                  {complianceData.map((item, index) => <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${item.status === 'compliant' ? 'bg-green-500' : item.status === 'attention' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                          <span>{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {item.percentage.toFixed(1)}%
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${item.status === 'compliant' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : item.status === 'attention' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'}`}>
                            {item.status === 'compliant' ? 'Compliant' : item.status === 'attention' ? 'Attention' : 'Action Required'}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className={`h-2 rounded-full ${item.status === 'compliant' ? 'bg-green-500' : item.status === 'attention' ? 'bg-amber-500' : 'bg-red-500'}`} style={{
                    width: `${item.percentage}%`
                  }}></div>
                      </div>
                    </div>)}
                </div>
                <button className="mt-4 flex items-center text-neon-red hover:underline">
                  <span>View Detailed Compliance Report</span>
                  <ChevronRightIcon className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Policy Changes */}
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">
                    Recent Policy Changes
                  </h3>
                  <div className="space-y-4">
                    {policyChanges.map(policy => <div key={policy.id} className="flex items-start gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                          <FileTextIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <p className="font-medium">{policy.title}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${policy.severity === 'major' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400'}`}>
                              {policy.severity === 'major' ? 'Major' : 'Minor'}
                            </span>
                          </div>
                          <p className="text-sm text-[rgb(var(--text-secondary))]">
                            {policy.date}
                          </p>
                        </div>
                      </div>)}
                  </div>
                  <button className="mt-4 flex items-center text-neon-red hover:underline">
                    <span>View All Policy Changes</span>
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </button>
                </div>
                {/* Audit Schedule */}
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Audit Schedule</h3>
                  <div className="space-y-4">
                    {auditSchedule.map(audit => <div key={audit.id} className="flex items-start gap-3">
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                          <CalendarIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <p className="font-medium">{audit.title}</p>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                              Upcoming
                            </span>
                          </div>
                          <p className="text-sm text-[rgb(var(--text-secondary))]">
                            {audit.date}
                          </p>
                        </div>
                      </div>)}
                  </div>
                  <button className="mt-4 flex items-center text-neon-red hover:underline">
                    <span>View Complete Audit Schedule</span>
                    <ChevronRightIcon className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>}
        </div>
      </div>
      {/* System Announcements */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">System Announcements</h3>
          <button className="text-neon-red hover:underline text-sm flex items-center">
            <span>View All</span>
            <ChevronRightIcon className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="space-y-4">
          {systemAnnouncements.map(announcement => <div key={announcement.id} className={`p-4 rounded-lg border ${announcement.priority === 'high' ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/10' : announcement.priority === 'medium' ? 'border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/10' : 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/10'}`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${announcement.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30' : announcement.priority === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
                  <BellIcon className={`w-5 h-5 ${announcement.priority === 'high' ? 'text-red-600 dark:text-red-400' : announcement.priority === 'medium' ? 'text-amber-600 dark:text-amber-400' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{announcement.title}</h4>
                    <span className="text-sm text-[rgb(var(--text-secondary))]">
                      {formatDate(announcement.date)}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{announcement.message}</p>
                </div>
              </div>
            </div>)}
        </div>
      </div>
      {/* Pending Loan Approvals */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Pending Loan Approvals</h3>
          <button className="text-neon-red hover:underline text-sm flex items-center">
            <span>View All</span>
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Application ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Purpose
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(var(--border-color),0.1)]">
              {pendingLoanApprovals.map(application => <tr key={application.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {application.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    {application.applicantName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {formatCurrency(application.amount)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {application.purpose}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {formatDate(application.date)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      Pending
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                    <button className="text-neon-red hover:text-neon-red/80 font-medium">
                      Review
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </>;
};