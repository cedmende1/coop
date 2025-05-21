import React from 'react';
import { PageHeader } from '../../components/PageHeader';
import { TrendingUpIcon, UsersIcon, FileTextIcon, ClipboardCheckIcon, ArrowRightIcon, CalendarIcon, CheckCircleIcon, ClockIcon, XCircleIcon, DollarSignIcon, BarChart4Icon, PieChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// Mock data for Income vs Expenses
const incomeExpensesData = [{
  month: 'Jan',
  income: 156000,
  expenses: 98000
}, {
  month: 'Feb',
  income: 142000,
  expenses: 103000
}, {
  month: 'Mar',
  income: 175000,
  expenses: 110000
}, {
  month: 'Apr',
  income: 182000,
  expenses: 107000
}, {
  month: 'May',
  income: 168000,
  expenses: 112000
}, {
  month: 'Jun',
  income: 193000,
  expenses: 118000
}];
// Mock data for Loan Distribution
const loanDistributionData = [{
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
// Mock data for recent transactions
const recentTransactions = [{
  id: 'TRX-2023-0001',
  date: '2023-11-01',
  type: 'Loan Disbursement',
  amount: 50000,
  status: 'completed'
}, {
  id: 'TRX-2023-0002',
  date: '2023-11-02',
  type: 'Loan Repayment',
  amount: 12500,
  status: 'completed'
}, {
  id: 'TRX-2023-0003',
  date: '2023-11-03',
  type: 'Membership Fee',
  amount: 1500,
  status: 'completed'
}, {
  id: 'TRX-2023-0004',
  date: '2023-11-03',
  type: 'Capital Share',
  amount: 25000,
  status: 'processing'
}, {
  id: 'TRX-2023-0005',
  date: '2023-11-04',
  type: 'Withdrawal',
  amount: 15000,
  status: 'pending'
}];
// Mock data for pending loan approvals
const pendingLoanApprovals = [{
  id: 'APP-2023-0001',
  member: 'Eduardo Tan',
  type: 'Personal',
  amount: 60000,
  applicationDate: '2023-10-28'
}, {
  id: 'APP-2023-0002',
  member: 'Isabella Reyes',
  type: 'Business',
  amount: 150000,
  applicationDate: '2023-10-25'
}, {
  id: 'APP-2023-0003',
  member: 'Miguel Santos',
  type: 'Education',
  amount: 80000,
  applicationDate: '2023-10-20'
}, {
  id: 'APP-2023-0004',
  member: 'Camila Ramos',
  type: 'Emergency',
  amount: 25000,
  applicationDate: '2023-10-29'
}];
// Colors for charts
const COLORS = ['rgb(var(--neon-red))', '#3182CE', '#38A169', '#805AD5'];
// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
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
export const AccountingDashboard = () => {
  return <>
      <PageHeader title="Accounting Dashboard" description="Financial Management Center" />
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Total Capital
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">₱42.8M</h3>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>+3.2% from last month</span>
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
                Active Members
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">1,248</h3>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>+5.7% from last month</span>
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
                Active Loans
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">856</h3>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>+2.8% from last month</span>
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
                Pending Approvals
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">24</h3>
              <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center">
                <ClockIcon className="w-3 h-3 mr-1" />
                <span>Needs review</span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <ClipboardCheckIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Income vs Expenses Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <BarChart4Icon className="w-5 h-5 text-neon-red" />
              Income vs Expenses
            </h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeExpensesData} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 25
            }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={value => `₱${value / 1000}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="income" name="Income" fill="rgb(var(--neon-red))" />
                <Bar dataKey="expenses" name="Expenses" fill="#3182CE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Loan Distribution Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-neon-red" />
              Loan Distribution
            </h3>
          </div>
          <div className="h-80 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie data={loanDistributionData} cx="50%" cy="50%" labelLine={false} outerRadius={90} fill="#8884d8" dataKey="value" label={({
                name,
                percent
              }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {loanDistributionData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={value => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
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
                  <div className="flex items-center">
                    <CalendarIcon className="w-3 h-3 mr-1" />
                    Date
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Type
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
              {recentTransactions.map(transaction => {
              const statusInfo = getStatusIndicator(transaction.status);
              return <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      {transaction.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {transaction.type}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
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
      {/* Pending Loan Approvals */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Pending Loan Approvals</h3>
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
                  Member
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Applied On
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(var(--border-color),0.1)]">
              {pendingLoanApprovals.map(approval => <tr key={approval.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    {approval.member}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {approval.type}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    {formatCurrency(approval.amount)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {formatDate(approval.applicationDate)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="flex justify-end space-x-2">
                      <button className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 rounded text-xs font-medium hover:bg-green-200 dark:hover:bg-green-900/40 transition-colors">
                        Approve
                      </button>
                      <button className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded text-xs font-medium hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors">
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </>;
};