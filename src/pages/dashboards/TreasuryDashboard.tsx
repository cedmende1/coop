import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { TrendingUpIcon, WalletIcon, ArrowUpCircleIcon, ArrowDownCircleIcon, AlertCircleIcon, BanknoteIcon, ArrowRightIcon, CalendarIcon, CheckCircleIcon, ClockIcon, XCircleIcon, DollarSignIcon, CoinsIcon, BarChart4Icon, UserIcon } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
// Mock data for treasury metrics
const treasuryMetrics = {
  totalLiquidity: 12450000,
  availableFunds: 8320000,
  totalWithdrawals: 1250000,
  totalDeposits: 2350000
};
// Mock data for fund allocation
const fundAllocationData = [{
  name: 'Loans',
  value: 65
}, {
  name: 'Reserves',
  value: 15
}, {
  name: 'Investments',
  value: 12
}, {
  name: 'Operations',
  value: 8
}];
// Mock data for cash flow
const cashFlowData = [{
  month: 'Jan',
  inflow: 1850000,
  outflow: 1450000
}, {
  month: 'Feb',
  inflow: 2100000,
  outflow: 1600000
}, {
  month: 'Mar',
  inflow: 2300000,
  outflow: 1780000
}, {
  month: 'Apr',
  inflow: 2150000,
  outflow: 1900000
}, {
  month: 'May',
  inflow: 2600000,
  outflow: 2100000
}, {
  month: 'Jun',
  inflow: 2400000,
  outflow: 1950000
}];
// Mock data for capital growth
const capitalGrowthData = [{
  month: 'Jan',
  amount: 9500000
}, {
  month: 'Feb',
  amount: 10100000
}, {
  month: 'Mar',
  amount: 10650000
}, {
  month: 'Apr',
  amount: 11200000
}, {
  month: 'May',
  amount: 11800000
}, {
  month: 'Jun',
  amount: 12450000
}];
// Mock data for pending transactions
const pendingTransactions = [{
  id: 'TRX-2023-0123',
  memberName: 'Juan Dela Cruz',
  memberNumber: 'MEM-0045',
  type: 'withdrawal',
  amount: 25000,
  requestDate: '2023-10-28',
  status: 'pending'
}, {
  id: 'TRX-2023-0124',
  memberName: 'Maria Santos',
  memberNumber: 'MEM-0089',
  type: 'deposit',
  amount: 15000,
  requestDate: '2023-10-29',
  status: 'processing'
}, {
  id: 'TRX-2023-0125',
  memberName: 'Pedro Reyes',
  memberNumber: 'MEM-0032',
  type: 'deposit',
  amount: 35000,
  requestDate: '2023-10-30',
  status: 'processing'
}, {
  id: 'TRX-2023-0126',
  memberName: 'Ana Gonzales',
  memberNumber: 'MEM-0076',
  type: 'withdrawal',
  amount: 20000,
  requestDate: '2023-10-27',
  status: 'pending'
}, {
  id: 'TRX-2023-0127',
  memberName: 'Luis Torres',
  memberNumber: 'MEM-0054',
  type: 'withdrawal',
  amount: 30000,
  requestDate: '2023-11-02',
  status: 'pending'
}];
// Colors for charts
const COLORS = ['rgb(var(--neon-red))', '#3182CE', '#38A169', '#805AD5'];
// Format currency as Philippine Peso
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
    case 'verified':
      return {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-400',
        icon: <CheckCircleIcon className="w-3 h-3 mr-1" />,
        label: status === 'completed' ? 'Completed' : 'Verified'
      };
    case 'processing':
      return {
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-700 dark:text-blue-400',
        icon: <ClockIcon className="w-3 h-3 mr-1" />,
        label: 'Processing'
      };
    case 'rejected':
      return {
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-700 dark:text-red-400',
        icon: <XCircleIcon className="w-3 h-3 mr-1" />,
        label: 'Rejected'
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
export const TreasuryDashboard = () => {
  // State for transaction filter
  const [transactionFilter, setTransactionFilter] = useState<string>('all');
  // Filter transactions based on selected filter
  const filteredTransactions = transactionFilter === 'all' ? pendingTransactions : pendingTransactions.filter(t => t.type === transactionFilter);
  return <>
      <PageHeader title="Treasury Dashboard" description="Financial Operations Center" />
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Total Liquidity
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">
                {formatCurrency(treasuryMetrics.totalLiquidity)}
              </h3>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>+5.5% from last month</span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <WalletIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Available Funds
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">
                {formatCurrency(treasuryMetrics.availableFunds)}
              </h3>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>+3.2% from last month</span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <CoinsIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Monthly Deposits
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">
                {formatCurrency(treasuryMetrics.totalDeposits)}
              </h3>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>+12.8% from last month</span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <ArrowUpCircleIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Monthly Withdrawals
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">
                {formatCurrency(treasuryMetrics.totalWithdrawals)}
              </h3>
              <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>+4.3% from last month</span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <ArrowDownCircleIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Cash Flow Chart - Area Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)]">
          <h3 className="text-lg font-semibold mb-4">Cash Flow</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowData} margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 25
            }}>
                <defs>
                  <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(var(--neon-red))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="rgb(var(--neon-red))" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
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
                <Area type="monotone" dataKey="inflow" name="Inflow" stroke="rgb(var(--neon-red))" fillOpacity={1} fill="url(#colorInflow)" strokeWidth={2} activeDot={{
                r: 6,
                strokeWidth: 2
              }} />
                <Area type="monotone" dataKey="outflow" name="Outflow" stroke="#3182CE" fillOpacity={1} fill="url(#colorOutflow)" strokeWidth={2} activeDot={{
                r: 6,
                strokeWidth: 2
              }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Fund Allocation Chart - Donut Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)]">
          <h3 className="text-lg font-semibold mb-4">Fund Allocation</h3>
          <div className="h-80 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie data={fundAllocationData} cx="50%" cy="50%" labelLine={false} outerRadius={90} innerRadius={60} fill="#8884d8" dataKey="value" label={({
                name,
                percent
              }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {fundAllocationData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={value => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Capital Growth Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] mb-6">
        <h3 className="text-lg font-semibold mb-4">Capital Growth</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={capitalGrowthData} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 25
          }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--border-color),0.3)" />
              <XAxis dataKey="month" tick={{
              fontSize: 12
            }} />
              <YAxis tickFormatter={value => `₱${value / 1000000}M`} tick={{
              fontSize: 12
            }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="amount" name="Capital" fill="rgb(var(--neon-red))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Pending Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Pending Transactions</h3>
          <div className="flex gap-2">
            <button onClick={() => setTransactionFilter('all')} className={`px-3 py-1 rounded-md text-sm ${transactionFilter === 'all' ? 'bg-neon-red text-white' : 'bg-gray-100 dark:bg-gray-700 text-[rgb(var(--text-secondary))]'}`}>
              All
            </button>
            <button onClick={() => setTransactionFilter('deposit')} className={`px-3 py-1 rounded-md text-sm ${transactionFilter === 'deposit' ? 'bg-neon-red text-white' : 'bg-gray-100 dark:bg-gray-700 text-[rgb(var(--text-secondary))]'}`}>
              Deposits
            </button>
            <button onClick={() => setTransactionFilter('withdrawal')} className={`px-3 py-1 rounded-md text-sm ${transactionFilter === 'withdrawal' ? 'bg-neon-red text-white' : 'bg-gray-100 dark:bg-gray-700 text-[rgb(var(--text-secondary))]'}`}>
              Withdrawals
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Member
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  <div className="flex items-center">
                    <CalendarIcon className="w-3 h-3 mr-1" />
                    Request Date
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Amount
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
              {filteredTransactions.map(transaction => {
              // Get status indicator
              const statusInfo = getStatusIndicator(transaction.status);
              return <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      {transaction.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
                          <UserIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {transaction.memberName}
                          </div>
                          <div className="text-xs text-[rgb(var(--text-secondary))]">
                            {transaction.memberNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.type === 'deposit' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'}`}>
                        {transaction.type === 'deposit' ? <ArrowUpCircleIcon className="w-3 h-3 mr-1" /> : <ArrowDownCircleIcon className="w-3 h-3 mr-1" />}
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {formatDate(transaction.requestDate)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.text}`}>
                        {statusInfo.icon}
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                      <button className="text-neon-red hover:text-neon-red/80 font-medium">
                        Review
                      </button>
                    </td>
                  </tr>;
            })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <button className="text-sm text-neon-red flex items-center ml-auto hover:underline">
            <span>View all transactions</span>
            <ArrowRightIcon className="ml-1 w-4 h-4" />
          </button>
        </div>
      </div>
    </>;
};