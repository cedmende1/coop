import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { TrendingUpIcon, UsersIcon, BriefcaseIcon, AlertCircleIcon, ArrowRightIcon, CalendarIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// Mock data for loan performance
const loanPerformanceData = [{
  month: 'Jan',
  disbursed: 1250000,
  repaid: 980000
}, {
  month: 'Feb',
  disbursed: 1400000,
  repaid: 1100000
}, {
  month: 'Mar',
  disbursed: 1800000,
  repaid: 1300000
}, {
  month: 'Apr',
  disbursed: 1600000,
  repaid: 1450000
}, {
  month: 'May',
  disbursed: 2100000,
  repaid: 1700000
}, {
  month: 'Jun',
  disbursed: 1900000,
  repaid: 1600000
}];
// Mock data for loan type distribution
const loanTypeData = [{
  name: 'Personal',
  value: 45
}, {
  name: 'Business',
  value: 30
}, {
  name: 'Education',
  value: 15
}, {
  name: 'Mortgage',
  value: 10
}];
// Colors for charts - using neon-red theme with complementary colors
const COLORS = ['rgb(var(--neon-red))', '#3182CE', '#38A169', '#805AD5'];
// Mock data for upcoming repayments with varied statuses
const upcomingRepayments = [{
  id: 'LN-2023-0123',
  borrower: 'Juan Dela Cruz',
  dueDate: '2023-10-28',
  amount: 25000,
  status: 'pending'
}, {
  id: 'LN-2023-0124',
  borrower: 'Maria Santos',
  dueDate: '2023-10-29',
  amount: 15000,
  status: 'processing'
}, {
  id: 'LN-2023-0125',
  borrower: 'Pedro Reyes',
  dueDate: '2023-10-30',
  amount: 35000,
  status: 'completed'
}, {
  id: 'LN-2023-0126',
  borrower: 'Ana Gonzales',
  dueDate: '2023-10-27',
  amount: 20000,
  status: 'overdue'
}, {
  id: 'LN-2023-0127',
  borrower: 'Luis Torres',
  dueDate: '2023-11-02',
  amount: 30000,
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
            {entry.name}: {formatCurrency(entry.value)}
          </p>)}
      </div>;
  }
  return null;
};
// Status indicator styling and icons
const getStatusIndicator = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-400',
        icon: <CheckCircleIcon className="w-3 h-3 mr-1" />,
        label: 'Completed'
      };
    case 'processing':
      return {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-700 dark:text-blue-400',
        icon: <ClockIcon className="w-3 h-3 mr-1" />,
        label: 'Processing'
      };
    case 'overdue':
      return {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-400',
        icon: <XCircleIcon className="w-3 h-3 mr-1" />,
        label: 'Overdue'
      };
    case 'pending':
    default:
      return {
        bg: 'bg-amber-100 dark:bg-amber-900/30',
        text: 'text-amber-700 dark:text-amber-400',
        icon: <ClockIcon className="w-3 h-3 mr-1" />,
        label: 'Pending'
      };
  }
};
// Due date indicator based on status and date
const getDueDateIndicator = (dueDate: string, status: string) => {
  const today = new Date();
  const dueDateObj = new Date(dueDate);
  const diffTime = dueDateObj.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // For completed payments, show completion indicator
  if (status === 'completed') {
    return <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs px-2 py-0.5 rounded-full flex items-center">
        <CheckCircleIcon className="w-3 h-3 mr-1" />
        Paid
      </span>;
  }
  // For overdue payments
  if (status === 'overdue' || diffDays < 0) {
    return <span className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 text-xs px-2 py-0.5 rounded-full flex items-center">
        <XCircleIcon className="w-3 h-3 mr-1" />
        {Math.abs(diffDays)} day{Math.abs(diffDays) !== 1 ? 's' : ''} late
      </span>;
  }
  // For processing payments
  if (status === 'processing') {
    return <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full flex items-center">
        <ClockIcon className="w-3 h-3 mr-1" />
        Processing
      </span>;
  }
  // For pending payments with upcoming due dates
  if (diffDays <= 3) {
    return <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 text-xs px-2 py-0.5 rounded-full flex items-center">
        <ClockIcon className="w-3 h-3 mr-1" />
        {diffDays === 0 ? 'Today' : `${diffDays} day${diffDays !== 1 ? 's' : ''}`}
      </span>;
  }
  return null;
};
export const AdminDashboard = () => {
  return <>
      <PageHeader title="Admin Dashboard" description="Welcome to the Admin Control Panel" />
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Total Borrowers
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">1,248</h3>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>+8.2% from last month</span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <BriefcaseIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Active Borrowers
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">952</h3>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>+12% from last month</span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <UsersIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Total Portfolio
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">₱86.2M</h3>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>+5.4% from last month</span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <TrendingUpIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Overdue Borrowers
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">43</h3>
              <p className="text-xs text-red-600 dark:text-red-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>+2.1% from last month</span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <AlertCircleIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Loan Performance Chart - Area Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)]">
          <h3 className="text-lg font-semibold mb-4">Loan Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={loanPerformanceData} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 25
            }}>
                <defs>
                  <linearGradient id="colorDisbursed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(var(--neon-red))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="rgb(var(--neon-red))" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorRepaid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3182CE" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3182CE" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--border-color),0.3)" />
                <XAxis dataKey="month" tick={{
                fontSize: 12
              }} />
                <YAxis tickFormatter={value => `₱${value / 1000000}M`} tick={{
                fontSize: 12
              }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="disbursed" name="Disbursed" stroke="rgb(var(--neon-red))" fillOpacity={1} fill="url(#colorDisbursed)" strokeWidth={2} activeDot={{
                r: 6,
                strokeWidth: 2
              }} />
                <Area type="monotone" dataKey="repaid" name="Repaid" stroke="#3182CE" fillOpacity={1} fill="url(#colorRepaid)" strokeWidth={2} activeDot={{
                r: 6,
                strokeWidth: 2
              }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Loan Type Distribution Chart - Donut Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)]">
          <h3 className="text-lg font-semibold mb-4">Loan Type Distribution</h3>
          <div className="h-80 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie data={loanTypeData} cx="50%" cy="50%" labelLine={false} outerRadius={90} innerRadius={60} fill="#8884d8" dataKey="value" label={({
                name,
                percent
              }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {loanTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={value => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Upcoming Repayments */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Upcoming Repayments</h3>
          <button className="text-sm text-neon-red flex items-center hover:underline">
            <span>View all</span>
            <ArrowRightIcon className="ml-1 w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Loan ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Borrower
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  <div className="flex items-center">
                    <CalendarIcon className="w-3 h-3 mr-1" />
                    Due Date
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(var(--border-color),0.1)]">
              {upcomingRepayments.map(repayment => {
              // Get status indicator
              const statusInfo = getStatusIndicator(repayment.status);
              return <tr key={repayment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      {repayment.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {repayment.borrower}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        <span className="mr-2">
                          {new Date(repayment.dueDate).toLocaleDateString()}
                        </span>
                        {getDueDateIndicator(repayment.dueDate, repayment.status)}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {formatCurrency(repayment.amount)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.text}`}>
                        {statusInfo.icon}
                        {statusInfo.label}
                      </span>
                    </td>
                  </tr>;
            })}
            </tbody>
          </table>
        </div>
      </div>
    </>;
};