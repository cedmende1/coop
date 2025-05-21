import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { PlusIcon, ArrowRightIcon, DollarSignIcon, PercentIcon, TrendingUpIcon, BarChart3Icon, ArrowUpIcon, ArrowDownIcon, AlertCircleIcon, CheckCircleIcon, ClockIcon, SearchIcon, FilterIcon, ChevronDownIcon } from 'lucide-react';
// Define types for funds management data
interface FundAccount {
  id: string;
  name: string;
  type: 'Operating' | 'Reserve' | 'Investment' | 'Special' | 'Emergency';
  balance: number;
  allocatedPercentage: number;
  minimumBalance?: number;
  lastUpdated: string;
  status: 'Active' | 'Inactive' | 'Pending';
  performance?: {
    ytd: number;
    month: number;
  };
}
interface FundTransaction {
  id: string;
  date: string;
  fromAccount?: string;
  toAccount?: string;
  amount: number;
  type: 'Allocation' | 'Transfer' | 'Withdrawal' | 'Deposit';
  status: 'Completed' | 'Pending' | 'Failed';
  initiatedBy: string;
  notes?: string;
}
// Mock data for fund accounts
const mockFundAccounts: FundAccount[] = [{
  id: 'FUND-001',
  name: 'Main Operating Fund',
  type: 'Operating',
  balance: 1250000,
  allocatedPercentage: 50,
  minimumBalance: 500000,
  lastUpdated: '2023-11-01',
  status: 'Active'
}, {
  id: 'FUND-002',
  name: 'Statutory Reserve',
  type: 'Reserve',
  balance: 750000,
  allocatedPercentage: 30,
  minimumBalance: 500000,
  lastUpdated: '2023-11-01',
  status: 'Active'
}, {
  id: 'FUND-003',
  name: 'Investment Portfolio',
  type: 'Investment',
  balance: 350000,
  allocatedPercentage: 14,
  lastUpdated: '2023-10-25',
  status: 'Active',
  performance: {
    ytd: 7.5,
    month: 0.6
  }
}, {
  id: 'FUND-004',
  name: 'Emergency Liquidity Fund',
  type: 'Emergency',
  balance: 100000,
  allocatedPercentage: 4,
  minimumBalance: 50000,
  lastUpdated: '2023-10-20',
  status: 'Active'
}, {
  id: 'FUND-005',
  name: 'Technology Development Fund',
  type: 'Special',
  balance: 50000,
  allocatedPercentage: 2,
  lastUpdated: '2023-09-15',
  status: 'Active'
}];
// Mock data for fund transactions
const mockFundTransactions: FundTransaction[] = [{
  id: 'TRX-2023-0001',
  date: '2023-11-01',
  fromAccount: 'Main Operating Fund',
  toAccount: 'Investment Portfolio',
  amount: 50000,
  type: 'Transfer',
  status: 'Completed',
  initiatedBy: 'Maria Santos',
  notes: 'Quarterly rebalancing of investment portfolio'
}, {
  id: 'TRX-2023-0002',
  date: '2023-10-28',
  toAccount: 'Main Operating Fund',
  amount: 200000,
  type: 'Deposit',
  status: 'Completed',
  initiatedBy: 'Luis Torres',
  notes: 'Loan repayments collected'
}, {
  id: 'TRX-2023-0003',
  date: '2023-10-25',
  fromAccount: 'Main Operating Fund',
  amount: 75000,
  type: 'Withdrawal',
  status: 'Completed',
  initiatedBy: 'Pedro Reyes',
  notes: 'Operational expenses payment'
}, {
  id: 'TRX-2023-0004',
  date: '2023-10-20',
  fromAccount: 'Main Operating Fund',
  toAccount: 'Emergency Liquidity Fund',
  amount: 25000,
  type: 'Transfer',
  status: 'Completed',
  initiatedBy: 'Maria Santos',
  notes: 'Increasing emergency reserves'
}, {
  id: 'TRX-2023-0005',
  date: '2023-10-15',
  amount: 150000,
  type: 'Allocation',
  status: 'Completed',
  initiatedBy: 'Ana Gonzales',
  notes: 'Monthly fund allocation across accounts'
}, {
  id: 'TRX-2023-0006',
  date: '2023-11-02',
  fromAccount: 'Investment Portfolio',
  toAccount: 'Main Operating Fund',
  amount: 15000,
  type: 'Transfer',
  status: 'Pending',
  initiatedBy: 'Maria Santos',
  notes: 'Investment returns transfer'
}, {
  id: 'TRX-2023-0007',
  date: '2023-10-18',
  fromAccount: 'Technology Development Fund',
  amount: 12000,
  type: 'Withdrawal',
  status: 'Completed',
  initiatedBy: 'Pedro Reyes',
  notes: 'Payment for new accounting software'
}, {
  id: 'TRX-2023-0008',
  date: '2023-10-05',
  toAccount: 'Statutory Reserve',
  amount: 50000,
  type: 'Allocation',
  status: 'Completed',
  initiatedBy: 'Ana Gonzales',
  notes: 'Quarterly statutory reserve allocation'
}, {
  id: 'TRX-2023-0009',
  date: '2023-10-12',
  fromAccount: 'Main Operating Fund',
  toAccount: 'Technology Development Fund',
  amount: 20000,
  type: 'Transfer',
  status: 'Failed',
  initiatedBy: 'Luis Torres',
  notes: 'Transfer failed due to approval requirements'
}, {
  id: 'TRX-2023-0010',
  date: '2023-09-30',
  toAccount: 'Main Operating Fund',
  amount: 180000,
  type: 'Deposit',
  status: 'Completed',
  initiatedBy: 'Luis Torres',
  notes: 'Member capital contributions'
}];
export const FundsManagement = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'allocations'>('overview');
  // State for modals
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isAllocationModalOpen, setIsAllocationModalOpen] = useState(false);
  const [isEditFundModalOpen, setIsEditFundModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  // Calculate total funds
  const totalFunds = mockFundAccounts.reduce((sum, account) => sum + account.balance, 0);
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(amount);
  };
  // Format percentage
  const formatPercentage = (percentage: number) => {
    return `${percentage}%`;
  };
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // Get fund type color
  const getFundTypeColor = (type: string) => {
    switch (type) {
      case 'Operating':
        return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400';
      case 'Reserve':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      case 'Investment':
        return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400';
      case 'Emergency':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
      case 'Special':
        return 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };
  // Get transaction type badge
  const getTransactionTypeBadge = (type: string) => {
    switch (type) {
      case 'Transfer':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">
            Transfer
          </span>;
      case 'Deposit':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
            Deposit
          </span>;
      case 'Withdrawal':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400">
            Withdrawal
          </span>;
      case 'Allocation':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400">
            Allocation
          </span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
            {type}
          </span>;
    }
  };
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
      case 'Active':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400">
            <CheckCircleIcon size={12} />
            {status}
          </span>;
      case 'Pending':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400">
            <ClockIcon size={12} />
            {status}
          </span>;
      case 'Failed':
      case 'Inactive':
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400">
            <AlertCircleIcon size={12} />
            {status}
          </span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
            {status}
          </span>;
    }
  };
  // Filter transactions based on search term and filters
  const filteredTransactions = mockFundTransactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) || transaction.fromAccount && transaction.fromAccount.toLowerCase().includes(searchTerm.toLowerCase()) || transaction.toAccount && transaction.toAccount.toLowerCase().includes(searchTerm.toLowerCase()) || transaction.initiatedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = transactionTypeFilter === 'all' || transaction.type === transactionTypeFilter;
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });
  return <>
      <PageHeader title="Funds Management" description="Manage and allocate organizational funds" />
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-wrap gap-3">
          <button onClick={() => setIsTransferModalOpen(true)} className="px-4 py-2 bg-neon-red text-white rounded-lg flex items-center gap-2 hover:bg-neon-red/90 transition-colors">
            <ArrowRightIcon size={16} />
            Transfer Funds
          </button>
          <button onClick={() => setIsAllocationModalOpen(true)} className="px-4 py-2 bg-white dark:bg-gray-800 border border-[rgba(var(--border-color),0.2)] rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <PercentIcon size={16} />
            Adjust Allocations
          </button>
          <div className="flex-grow"></div>
          <div className="flex rounded-lg border border-[rgba(var(--border-color),0.2)] overflow-hidden">
            <button onClick={() => setActiveTab('overview')} className={`px-3 py-1.5 text-sm ${activeTab === 'overview' ? 'bg-neon-red text-white' : 'bg-[rgba(var(--input-bg),0.8)] text-[rgb(var(--text-primary))]'}`}>
              Overview
            </button>
            <button onClick={() => setActiveTab('transactions')} className={`px-3 py-1.5 text-sm ${activeTab === 'transactions' ? 'bg-neon-red text-white' : 'bg-[rgba(var(--input-bg),0.8)] text-[rgb(var(--text-primary))]'}`}>
              Transactions
            </button>
            <button onClick={() => setActiveTab('allocations')} className={`px-3 py-1.5 text-sm ${activeTab === 'allocations' ? 'bg-neon-red text-white' : 'bg-[rgba(var(--input-bg),0.8)] text-[rgb(var(--text-primary))]'}`}>
              Allocations
            </button>
          </div>
        </div>
        {/* Overview Tab */}
        {activeTab === 'overview' && <>
            {/* Total Funds Card */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Total Funds
                  </p>
                  <h3 className="text-2xl font-bold mt-1">
                    {formatCurrency(totalFunds)}
                  </h3>
                </div>
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <DollarSignIcon className="w-5 h-5 text-[rgb(var(--text-primary))]" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-[rgb(var(--text-secondary))]">
                  Last updated: {formatDate(mockFundAccounts[0].lastUpdated)}
                </span>
              </div>
            </div>
            {/* Fund Accounts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockFundAccounts.map(account => <div key={account.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{account.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getFundTypeColor(account.type)}`}>
                          {account.type}
                        </span>
                      </div>
                      <p className="text-xs text-[rgb(var(--text-secondary))] mt-1">
                        {account.id}
                      </p>
                    </div>
                    {getStatusBadge(account.status)}
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-[rgb(var(--text-secondary))]">
                        Current Balance
                      </span>
                      <span className="font-bold">
                        {formatCurrency(account.balance)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-[rgb(var(--text-secondary))]">
                        Allocation
                      </span>
                      <span className="font-medium">
                        {formatPercentage(account.allocatedPercentage)}
                      </span>
                    </div>
                    {account.minimumBalance && <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-[rgb(var(--text-secondary))]">
                          Minimum Balance
                        </span>
                        <span className="font-medium">
                          {formatCurrency(account.minimumBalance)}
                        </span>
                      </div>}
                    {account.performance && <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-[rgb(var(--text-secondary))]">
                          Performance (YTD)
                        </span>
                        <span className={`font-medium flex items-center ${account.performance.ytd >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {account.performance.ytd >= 0 ? <ArrowUpIcon size={14} className="mr-1" /> : <ArrowDownIcon size={14} className="mr-1" />}
                          {formatPercentage(Math.abs(account.performance.ytd))}
                        </span>
                      </div>}
                    <div className="flex justify-between items-center text-xs text-[rgb(var(--text-secondary))] mt-3">
                      <span>
                        Last updated: {formatDate(account.lastUpdated)}
                      </span>
                      <button onClick={() => setIsEditFundModalOpen(true)} className="text-neon-red hover:underline">
                        Edit
                      </button>
                    </div>
                  </div>
                </div>)}
            </div>
            {/* Fund Allocation Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
              <h3 className="font-semibold mb-4">Fund Allocation</h3>
              <div className="space-y-4">
                {mockFundAccounts.map(account => <div key={account.id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{account.name}</span>
                      <span className="text-sm font-medium">
                        {formatPercentage(account.allocatedPercentage)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full ${account.type === 'Operating' ? 'bg-blue-500' : account.type === 'Reserve' ? 'bg-green-500' : account.type === 'Investment' ? 'bg-purple-500' : account.type === 'Emergency' ? 'bg-red-500' : 'bg-orange-500'}`} style={{
                  width: `${account.allocatedPercentage}%`
                }}></div>
                    </div>
                  </div>)}
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-[rgb(var(--text-secondary))]">
                    Operating
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-[rgb(var(--text-secondary))]">
                    Reserve
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-xs text-[rgb(var(--text-secondary))]">
                    Investment
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-[rgb(var(--text-secondary))]">
                    Emergency
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-xs text-[rgb(var(--text-secondary))]">
                    Special
                  </span>
                </div>
              </div>
            </div>
            {/* Recent Transactions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-[rgba(var(--border-color),0.2)]">
                <h3 className="font-semibold">Recent Transactions</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Transaction
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(var(--border-color),0.2)]">
                    {mockFundTransactions.slice(0, 5).map(transaction => <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div>
                            <div className="font-medium">
                              {transaction.type === 'Transfer' ? <span>
                                  {transaction.fromAccount} →{' '}
                                  {transaction.toAccount}
                                </span> : transaction.type === 'Deposit' ? <span>Deposit to {transaction.toAccount}</span> : transaction.type === 'Withdrawal' ? <span>
                                  Withdrawal from {transaction.fromAccount}
                                </span> : <span>Fund Allocation</span>}
                            </div>
                            <div className="text-xs text-[rgb(var(--text-secondary))]">
                              {transaction.id}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {getTransactionTypeBadge(transaction.type)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {formatDate(transaction.date)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right font-medium">
                          {formatCurrency(transaction.amount)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          {getStatusBadge(transaction.status)}
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 border-t border-[rgba(var(--border-color),0.2)] text-right">
                <button onClick={() => setActiveTab('transactions')} className="text-sm text-neon-red hover:underline">
                  View All Transactions
                </button>
              </div>
            </div>
          </>}
        {/* Transactions Tab */}
        {activeTab === 'transactions' && <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[rgba(var(--border-color),0.2)]">
              <div className="flex flex-col sm:flex-row gap-3 justify-between">
                <div className="relative flex-grow max-w-md">
                  <input type="text" placeholder="Search transactions..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" size={18} />
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="px-3 py-2 rounded-lg border border-[rgba(var(--border-color),0.2)] flex items-center gap-2 bg-[rgba(var(--input-bg),0.8)] hover:bg-[rgba(var(--input-bg),1)]">
                      <FilterIcon size={16} />
                      <span>Filter</span>
                      <ChevronDownIcon size={14} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isFilterOpen && <div className="absolute z-10 mt-1 right-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-[rgba(var(--border-color),0.2)] p-3">
                        <div className="mb-3">
                          <div className="text-sm font-medium mb-2">
                            Transaction Type
                          </div>
                          <div className="space-y-1">
                            {['all', 'Transfer', 'Deposit', 'Withdrawal', 'Allocation'].map(type => <label key={type} className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                <input type="radio" name="transactionType" checked={transactionTypeFilter === type} onChange={() => setTransactionTypeFilter(type)} className="form-radio text-neon-red" />
                                <span className="capitalize">
                                  {type === 'all' ? 'All Types' : type}
                                </span>
                              </label>)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2">Status</div>
                          <div className="space-y-1">
                            {['all', 'Completed', 'Pending', 'Failed'].map(status => <label key={status} className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                  <input type="radio" name="status" checked={statusFilter === status} onChange={() => setStatusFilter(status)} className="form-radio text-neon-red" />
                                  <span className="capitalize">
                                    {status === 'all' ? 'All Statuses' : status}
                                  </span>
                                </label>)}
                          </div>
                        </div>
                      </div>}
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                      Initiated By
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(var(--border-color),0.2)]">
                  {filteredTransactions.map(transaction => <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div>
                          <div className="font-medium">
                            {transaction.type === 'Transfer' ? <span>
                                {transaction.fromAccount} →{' '}
                                {transaction.toAccount}
                              </span> : transaction.type === 'Deposit' ? <span>Deposit to {transaction.toAccount}</span> : transaction.type === 'Withdrawal' ? <span>
                                Withdrawal from {transaction.fromAccount}
                              </span> : <span>Fund Allocation</span>}
                          </div>
                          <div className="text-xs text-[rgb(var(--text-secondary))]">
                            {transaction.id}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {getTransactionTypeBadge(transaction.type)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right font-medium">
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {transaction.initiatedBy}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        {getStatusBadge(transaction.status)}
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            {filteredTransactions.length === 0 && <div className="p-8 text-center text-[rgb(var(--text-secondary))]">
                No transactions found matching your filters
              </div>}
          </div>}
        {/* Allocations Tab */}
        {activeTab === 'allocations' && <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
              <h3 className="font-semibold mb-4">Current Fund Allocations</h3>
              <div className="space-y-6">
                {mockFundAccounts.map(account => <div key={account.id}>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="font-medium">{account.name}</h4>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                          {account.type} Fund
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatCurrency(account.balance)}
                        </p>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                          {formatPercentage(account.allocatedPercentage)} of
                          total
                        </p>
                      </div>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                            Current
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-blue-600">
                            {formatPercentage(account.allocatedPercentage)}
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                        <div className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${account.type === 'Operating' ? 'bg-blue-500' : account.type === 'Reserve' ? 'bg-green-500' : account.type === 'Investment' ? 'bg-purple-500' : account.type === 'Emergency' ? 'bg-red-500' : 'bg-orange-500'}`} style={{
                    width: `${account.allocatedPercentage}%`
                  }}></div>
                      </div>
                    </div>
                    {account.minimumBalance && <div className="flex justify-between text-xs text-[rgb(var(--text-secondary))]">
                        <span>
                          Minimum Balance:{' '}
                          {formatCurrency(account.minimumBalance)}
                        </span>
                        <span>Current: {formatCurrency(account.balance)}</span>
                      </div>}
                  </div>)}
              </div>
              <div className="flex justify-center mt-6">
                <button onClick={() => setIsAllocationModalOpen(true)} className="px-4 py-2 bg-neon-red text-white rounded-lg flex items-center gap-2 hover:bg-neon-red/90 transition-colors">
                  <PercentIcon size={16} />
                  Adjust Allocations
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUpIcon size={18} />
                  Performance Analysis
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Investment Portfolio Performance
                    </h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                          Year to Date
                        </p>
                        <p className="font-medium text-green-600 dark:text-green-400">
                          +7.5%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                          Monthly
                        </p>
                        <p className="font-medium text-green-600 dark:text-green-400">
                          +0.6%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                          Annual Target
                        </p>
                        <p className="font-medium">8.0%</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">
                      Allocation Efficiency
                    </h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                          Current Score
                        </p>
                        <p className="font-medium">92/100</p>
                      </div>
                      <div>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                          Previous
                        </p>
                        <p className="font-medium">88/100</p>
                      </div>
                      <div>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                          Target
                        </p>
                        <p className="font-medium">95/100</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">
                      Liquidity Ratio
                    </h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                          Current
                        </p>
                        <p className="font-medium">2.5</p>
                      </div>
                      <div>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                          Previous
                        </p>
                        <p className="font-medium">2.3</p>
                      </div>
                      <div>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                          Target
                        </p>
                        <p className="font-medium">2.0+</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <BarChart3Icon size={18} />
                  Allocation History
                </h3>
                <div className="space-y-4">
                  <div className="border-b border-[rgba(var(--border-color),0.2)] pb-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium">Q4 2023 Allocation</p>
                      <p className="text-xs text-[rgb(var(--text-secondary))]">
                        October 1, 2023
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-[rgb(var(--text-secondary))]">
                          Operating: 50%
                        </p>
                        <p className="text-[rgb(var(--text-secondary))]">
                          Reserve: 30%
                        </p>
                      </div>
                      <div>
                        <p className="text-[rgb(var(--text-secondary))]">
                          Investment: 14%
                        </p>
                        <p className="text-[rgb(var(--text-secondary))]">
                          Emergency: 4%
                        </p>
                        <p className="text-[rgb(var(--text-secondary))]">
                          Special: 2%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-[rgba(var(--border-color),0.2)] pb-3">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium">Q3 2023 Allocation</p>
                      <p className="text-xs text-[rgb(var(--text-secondary))]">
                        July 1, 2023
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-[rgb(var(--text-secondary))]">
                          Operating: 55%
                        </p>
                        <p className="text-[rgb(var(--text-secondary))]">
                          Reserve: 25%
                        </p>
                      </div>
                      <div>
                        <p className="text-[rgb(var(--text-secondary))]">
                          Investment: 15%
                        </p>
                        <p className="text-[rgb(var(--text-secondary))]">
                          Emergency: 3%
                        </p>
                        <p className="text-[rgb(var(--text-secondary))]">
                          Special: 2%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium">Q2 2023 Allocation</p>
                      <p className="text-xs text-[rgb(var(--text-secondary))]">
                        April 1, 2023
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-[rgb(var(--text-secondary))]">
                          Operating: 60%
                        </p>
                        <p className="text-[rgb(var(--text-secondary))]">
                          Reserve: 20%
                        </p>
                      </div>
                      <div>
                        <p className="text-[rgb(var(--text-secondary))]">
                          Investment: 15%
                        </p>
                        <p className="text-[rgb(var(--text-secondary))]">
                          Emergency: 3%
                        </p>
                        <p className="text-[rgb(var(--text-secondary))]">
                          Special: 2%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>
      {/* Transfer Funds Modal */}
      {isTransferModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Transfer Funds</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  From Account
                </label>
                <select className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30">
                  <option value="">Select Source Account</option>
                  {mockFundAccounts.map(account => <option key={account.id} value={account.id}>
                      {account.name} - {formatCurrency(account.balance)}
                    </option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  To Account
                </label>
                <select className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30">
                  <option value="">Select Destination Account</option>
                  {mockFundAccounts.map(account => <option key={account.id} value={account.id}>
                      {account.name} - {formatCurrency(account.balance)}
                    </option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Amount (₱)
                </label>
                <input type="number" min="0" step="0.01" className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" placeholder="Enter amount" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Transaction Date
                </label>
                <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Notes (Optional)
                </label>
                <textarea className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" rows={3} placeholder="Enter additional notes"></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsTransferModalOpen(false)} className="px-4 py-2 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                Cancel
              </button>
              <button onClick={() => setIsTransferModalOpen(false)} className="px-4 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90">
                Transfer Funds
              </button>
            </div>
          </div>
        </div>}
      {/* Adjust Allocations Modal */}
      {isAllocationModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">
              Adjust Fund Allocations
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Adjust the percentage allocation for each fund. Total must equal
                100%.
              </p>
              {mockFundAccounts.map(account => <div key={account.id} className="flex items-center gap-3">
                  <div className="flex-grow">
                    <label className="block text-sm font-medium mb-1">
                      {account.name}
                    </label>
                    <div className="flex items-center">
                      <input type="number" min="0" max="100" defaultValue={account.allocatedPercentage} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
                      <span className="ml-2">%</span>
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    <p className="text-xs text-[rgb(var(--text-secondary))]">
                      Current
                    </p>
                    <p className="font-medium">
                      {formatPercentage(account.allocatedPercentage)}
                    </p>
                  </div>
                </div>)}
              <div className="pt-3 border-t border-[rgba(var(--border-color),0.2)]">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">100%</span>
                </div>
              </div>
              <div className="pt-2">
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" rows={2} placeholder="Reason for allocation changes"></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsAllocationModalOpen(false)} className="px-4 py-2 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                Cancel
              </button>
              <button onClick={() => setIsAllocationModalOpen(false)} className="px-4 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90">
                Save Allocations
              </button>
            </div>
          </div>
        </div>}
      {/* Edit Fund Modal */}
      {isEditFundModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Edit Fund Account</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Fund Name
                </label>
                <input type="text" defaultValue="Main Operating Fund" className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Fund Type
                </label>
                <select className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30">
                  <option value="Operating">Operating</option>
                  <option value="Reserve">Reserve</option>
                  <option value="Investment">Investment</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Special">Special</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Minimum Balance (₱)
                </label>
                <input type="number" min="0" step="0.01" defaultValue="500000" className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" rows={3} defaultValue="Main operating fund for day-to-day expenses and operations."></textarea>
              </div>
            </div>
            <div className="flex justify-between gap-3 mt-6">
              <button onClick={() => setIsEditFundModalOpen(false)} className="px-4 py-2 text-red-600 dark:text-red-400 hover:underline">
                Delete Fund
              </button>
              <div className="flex gap-3">
                <button onClick={() => setIsEditFundModalOpen(false)} className="px-4 py-2 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  Cancel
                </button>
                <button onClick={() => setIsEditFundModalOpen(false)} className="px-4 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>}
    </>;
};