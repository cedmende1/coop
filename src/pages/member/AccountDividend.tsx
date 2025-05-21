import React, { useState, Component } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { TrendingUpIcon, DollarSignIcon, CalendarIcon, ArrowUpIcon, ArrowDownIcon, PlusIcon, WalletIcon, CreditCardIcon, CheckCircleIcon, AlertCircleIcon, ArrowRightIcon, ClockIcon, InfoIcon, MoreHorizontalIcon, FilterIcon, FileTextIcon, ChevronRightIcon, ChevronDownIcon, PercentIcon } from 'lucide-react';
// Define modal types
type ModalType = 'deposit' | 'withdraw' | null;
// Mock data for account balance
const accountData = {
  totalShares: 85000,
  lastDividend: 4250,
  availableBalance: 12750,
  pendingTransactions: 0,
  dividendRate: 5.0,
  lastDividendDate: '2023-09-30',
  nextDividendDate: '2023-12-31',
  memberSince: '2019-05-15'
};
// Mock data for transactions
const transactions = [{
  id: 'TRX-2023-0012',
  date: '2023-10-15',
  type: 'dividend',
  amount: 4250,
  status: 'completed',
  description: 'Quarterly Dividend Payment'
}, {
  id: 'TRX-2023-0008',
  date: '2023-10-01',
  type: 'deposit',
  amount: 5000,
  status: 'completed',
  description: 'Capital Share Deposit'
}, {
  id: 'TRX-2023-0005',
  date: '2023-08-15',
  type: 'withdrawal',
  amount: 2000,
  status: 'completed',
  description: 'Withdrawal to Bank Account'
}, {
  id: 'TRX-2023-0002',
  date: '2023-07-01',
  type: 'deposit',
  amount: 10000,
  status: 'completed',
  description: 'Capital Share Deposit'
}];
// Mock data for dividend history
const dividendHistory = [{
  period: 'Q3 2023',
  date: '2023-09-30',
  rate: 5.0,
  amount: 4250
}, {
  period: 'Q2 2023',
  date: '2023-06-30',
  rate: 4.8,
  amount: 3840
}, {
  period: 'Q1 2023',
  date: '2023-03-31',
  rate: 4.5,
  amount: 3375
}, {
  period: 'Q4 2022',
  date: '2022-12-31',
  rate: 4.7,
  amount: 3290
}];
// Payment methods
const paymentMethods = [{
  id: 'bank_transfer',
  name: 'Bank Transfer',
  icon: <div className="w-5 h-5" />
}, {
  id: 'credit_card',
  name: 'Credit/Debit Card',
  icon: <CreditCardIcon className="w-5 h-5" />
}, {
  id: 'gcash',
  name: 'GCash',
  icon: <WalletIcon className="w-5 h-5" />
}, {
  id: 'cash',
  name: 'Cash Payment',
  icon: <DollarSignIcon className="w-5 h-5" />
}];
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
// Modal Component
const Modal = ({
  isOpen,
  onClose,
  title,
  children
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-[rgba(var(--border-color),0.2)]">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto p-4 max-h-[calc(90vh-4rem)]">
          {children}
        </div>
      </div>
    </div>;
};
export const AccountDividend = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'dividends'>('overview');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('dividendInfo');
  // Toggle section expansion
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  // Handle deposit submission
  const handleDepositSubmit = () => {
    if (!depositAmount || !paymentMethod) return;
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Reset after success
      setTimeout(() => {
        setActiveModal(null);
        setDepositAmount('');
        setPaymentMethod('');
        setIsSuccess(false);
      }, 2000);
    }, 1500);
  };
  // Handle withdrawal submission
  const handleWithdrawSubmit = () => {
    if (!withdrawAmount || !withdrawMethod) return;
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Reset after success
      setTimeout(() => {
        setActiveModal(null);
        setWithdrawAmount('');
        setWithdrawMethod('');
        setIsSuccess(false);
      }, 2000);
    }, 1500);
  };
  // Get transaction icon
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowUpIcon className="w-4 h-4 text-green-500" />;
      case 'withdrawal':
        return <ArrowDownIcon className="w-4 h-4 text-red-500" />;
      case 'dividend':
        return <TrendingUpIcon className="w-4 h-4 text-blue-500" />;
      default:
        return <DollarSignIcon className="w-4 h-4" />;
    }
  };
  // Get transaction color
  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'text-green-600 dark:text-green-400';
      case 'withdrawal':
        return 'text-red-600 dark:text-red-400';
      case 'dividend':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return '';
    }
  };
  return <>
      <PageHeader title="Capital Shares & Dividends" description="Manage your capital shares and view dividend earnings" />
      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Total Shares
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">
                {formatCurrency(accountData.totalShares)}
              </h3>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="w-3 h-3 mr-1" />
                <span>Member since {formatDate(accountData.memberSince)}</span>
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
                Last Dividend
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">
                {formatCurrency(accountData.lastDividend)}
              </h3>
              <p className="text-xs text-[rgb(var(--text-secondary))] flex items-center">
                <CalendarIcon className="w-3 h-3 mr-1" />
                <span>
                  {formatDate(accountData.lastDividendDate)} at{' '}
                  {accountData.dividendRate}%
                </span>
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
                Available Balance
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">
                {formatCurrency(accountData.availableBalance)}
              </h3>
              <p className="text-xs text-[rgb(var(--text-secondary))] flex items-center">
                <ClockIcon className="w-3 h-3 mr-1" />
                <span>
                  Next dividend on {formatDate(accountData.nextDividendDate)}
                </span>
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <WalletIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button onClick={() => setActiveModal('deposit')} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-[rgba(var(--border-color),0.2)] hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
          <PlusIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="font-medium">Deposit to Savings</span>
        </button>
        <button onClick={() => setActiveModal('withdraw')} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-[rgba(var(--border-color),0.2)] hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
          <ArrowDownIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="font-medium">Request Withdrawal</span>
        </button>
      </div>
      {/* Tab Navigation */}
      <div className="flex mb-6 border-b border-[rgba(var(--border-color),0.2)]">
        <button className={`px-4 py-3 text-sm font-medium relative ${activeTab === 'overview' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('overview')}>
          Overview
        </button>
        <button className={`px-4 py-3 text-sm font-medium relative ${activeTab === 'transactions' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('transactions')}>
          Transactions
        </button>
        <button className={`px-4 py-3 text-sm font-medium relative ${activeTab === 'dividends' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('dividends')}>
          Dividend History
        </button>
      </div>
      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {/* Overview Tab */}
        {activeTab === 'overview' && <div className="p-6">
            {/* Dividend Information Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('dividendInfo')}>
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <TrendingUpIcon className="w-5 h-5 text-neon-red" />
                  Dividend Information
                </h3>
                {expandedSection === 'dividendInfo' ? <ChevronDownIcon className="w-5 h-5 text-[rgb(var(--text-secondary))]" /> : <ChevronRightIcon className="w-5 h-5 text-[rgb(var(--text-secondary))]" />}
              </div>
              {expandedSection === 'dividendInfo' && <div className="mt-4 space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">How Dividends Work</h4>
                    <p className="text-sm text-[rgb(var(--text-secondary))] mb-2">
                      Dividends are calculated based on your average daily
                      balance of capital shares for each quarter. The current
                      dividend rate is {accountData.dividendRate}% per annum,
                      calculated and paid quarterly.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      <div className="border border-[rgba(var(--border-color),0.2)] rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <CalendarIcon className="w-4 h-4 text-neon-red" />
                          <span className="font-medium">
                            Next Dividend Date
                          </span>
                        </div>
                        <p className="text-sm">
                          {formatDate(accountData.nextDividendDate)}
                        </p>
                      </div>
                      <div className="border border-[rgba(var(--border-color),0.2)] rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <PercentIcon className="w-4 h-4 text-neon-red" />
                          <span className="font-medium">Current Rate</span>
                        </div>
                        <p className="text-sm">
                          {accountData.dividendRate}% per annum
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">
                      Dividend Calculation Example
                    </h4>
                    <p className="text-sm text-[rgb(var(--text-secondary))] mb-4">
                      If you have ₱100,000 in capital shares for an entire
                      quarter, your dividend would be calculated as:
                    </p>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-[rgba(var(--border-color),0.2)]">
                      <p className="text-sm mb-2">
                        <span className="font-medium">Capital Shares:</span>{' '}
                        ₱100,000
                      </p>
                      <p className="text-sm mb-2">
                        <span className="font-medium">Annual Rate:</span>{' '}
                        {accountData.dividendRate}%
                      </p>
                      <p className="text-sm mb-2">
                        <span className="font-medium">Quarterly Rate:</span>{' '}
                        {accountData.dividendRate / 4}%
                      </p>
                      <p className="text-sm mb-2">
                        <span className="font-medium">Quarterly Dividend:</span>{' '}
                        ₱100,000 × {accountData.dividendRate / 4}% = ₱
                        {(100000 * (accountData.dividendRate / 400)).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>}
            </div>
            {/* Recent Transactions Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('recentTransactions')}>
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <FileTextIcon className="w-5 h-5 text-neon-red" />
                  Recent Transactions
                </h3>
                {expandedSection === 'recentTransactions' ? <ChevronDownIcon className="w-5 h-5 text-[rgb(var(--text-secondary))]" /> : <ChevronRightIcon className="w-5 h-5 text-[rgb(var(--text-secondary))]" />}
              </div>
              {expandedSection === 'recentTransactions' && <div className="mt-4">
                  <div className="border border-[rgba(var(--border-color),0.2)] rounded-lg overflow-hidden">
                    {transactions.slice(0, 3).map((transaction, index) => <div key={transaction.id} className={`p-4 flex items-center justify-between ${index !== transactions.slice(0, 3).length - 1 ? 'border-b border-[rgba(var(--border-color),0.1)]' : ''}`}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${transaction.type === 'deposit' ? 'bg-green-100 dark:bg-green-900/30' : transaction.type === 'withdrawal' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div>
                            <p className="font-medium text-sm">
                              {transaction.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-[rgb(var(--text-secondary))]">
                                {formatDate(transaction.date)}
                              </p>
                              <span className="text-xs text-[rgb(var(--text-secondary))]">
                                •
                              </span>
                              <p className="text-xs text-[rgb(var(--text-secondary))]">
                                {transaction.id}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className={`font-medium text-right ${getTransactionColor(transaction.type)}`}>
                            {transaction.type === 'withdrawal' ? '-' : '+'}
                            {formatCurrency(transaction.amount)}
                          </div>
                          <div className="text-xs text-right text-[rgb(var(--text-secondary))]">
                            {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                          </div>
                        </div>
                      </div>)}
                  </div>
                  <div className="mt-3 text-right">
                    <button onClick={() => setActiveTab('transactions')} className="text-sm text-neon-red hover:underline flex items-center justify-end ml-auto">
                      <span>View All Transactions</span>
                      <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>}
            </div>
            {/* Capital Share Information */}
            <div>
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('capitalShareInfo')}>
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <InfoIcon className="w-5 h-5 text-neon-red" />
                  Capital Share Information
                </h3>
                {expandedSection === 'capitalShareInfo' ? <ChevronDownIcon className="w-5 h-5 text-[rgb(var(--text-secondary))]" /> : <ChevronRightIcon className="w-5 h-5 text-[rgb(var(--text-secondary))]" />}
              </div>
              {expandedSection === 'capitalShareInfo' && <div className="mt-4 space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">About Capital Shares</h4>
                    <p className="text-sm text-[rgb(var(--text-secondary))] mb-3">
                      Capital shares represent your ownership stake in the
                      cooperative. As a member, you earn dividends based on your
                      capital share contributions.
                    </p>
                    <p className="text-sm text-[rgb(var(--text-secondary))]">
                      You can increase your capital shares at any time to
                      increase your potential dividend earnings. Withdrawals
                      from capital shares are subject to the cooperative's
                      policies and may require approval.
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">
                      Benefits of Increasing Capital Shares
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>
                          Higher dividend earnings based on your increased share
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Increased borrowing capacity for loans</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>
                          Greater voting power in cooperative decisions
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>
                          Support the growth and sustainability of the
                          cooperative
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => setActiveModal('deposit')} className="flex-1 bg-neon-red text-white py-2 rounded-lg hover:bg-neon-red/90 transition-colors flex items-center justify-center gap-2">
                      <PlusIcon className="w-4 h-4" />
                      Deposit to Savings
                    </button>
                    <button onClick={() => setActiveModal('withdraw')} className="flex-1 border border-neon-red text-neon-red py-2 rounded-lg hover:bg-neon-red/10 transition-colors flex items-center justify-center gap-2">
                      <ArrowDownIcon className="w-4 h-4" />
                      Request Withdrawal
                    </button>
                  </div>
                </div>}
            </div>
          </div>}
        {/* Transactions Tab */}
        {activeTab === 'transactions' && <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Transaction History</h3>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))]">
                <FilterIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="border border-[rgba(var(--border-color),0.2)] rounded-lg overflow-hidden">
              {transactions.map((transaction, index) => <div key={transaction.id} className={`p-4 flex items-center justify-between ${index !== transactions.length - 1 ? 'border-b border-[rgba(var(--border-color),0.1)]' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${transaction.type === 'deposit' ? 'bg-green-100 dark:bg-green-900/30' : transaction.type === 'withdrawal' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {transaction.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                          {formatDate(transaction.date)}
                        </p>
                        <span className="text-xs text-[rgb(var(--text-secondary))]">
                          •
                        </span>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                          {transaction.id}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={`font-medium text-right ${getTransactionColor(transaction.type)}`}>
                      {transaction.type === 'withdrawal' ? '-' : '+'}
                      {formatCurrency(transaction.amount)}
                    </div>
                    <div className="text-xs text-right text-[rgb(var(--text-secondary))]">
                      {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                    </div>
                  </div>
                </div>)}
            </div>
            <div className="text-center mt-6 text-sm text-[rgb(var(--text-secondary))]">
              Showing recent transactions. For older transactions, please
              contact member services.
            </div>
          </div>}
        {/* Dividends Tab */}
        {activeTab === 'dividends' && <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Dividend History</h3>
              <div className="text-sm text-[rgb(var(--text-secondary))]">
                Current Rate: {accountData.dividendRate}%
              </div>
            </div>
            <div className="border border-[rgba(var(--border-color),0.2)] rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
                <thead className="bg-gray-50 dark:bg-gray-700/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                      Date Paid
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                      Rate
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(var(--border-color),0.1)]">
                  {dividendHistory.map(dividend => <tr key={dividend.period} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        {dividend.period}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {formatDate(dividend.date)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {dividend.rate}%
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-right">
                        {formatCurrency(dividend.amount)}
                      </td>
                    </tr>)}
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
              <h4 className="font-medium mb-3">Dividend Projection</h4>
              <p className="text-sm text-[rgb(var(--text-secondary))] mb-3">
                Based on your current capital shares of{' '}
                {formatCurrency(accountData.totalShares)} and the current
                dividend rate of {accountData.dividendRate}%, your projected
                dividend for the next quarter is:
              </p>
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-[rgba(var(--border-color),0.2)]">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Projected Next Dividend:</span>
                  <span className="font-bold text-neon-red">
                    {formatCurrency(accountData.totalShares * (accountData.dividendRate / 400))}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[rgb(var(--text-secondary))] mt-3">
                * Projection is an estimate based on current shares and rate.
                Actual dividend may vary.
              </p>
            </div>
          </div>}
      </div>
      {/* Deposit Modal */}
      <Modal isOpen={activeModal === 'deposit'} onClose={() => {
      if (!isProcessing) setActiveModal(null);
    }} title="Deposit to Savings">
        {isSuccess ? <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 mb-4">
              <CheckCircleIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Deposit Successful!</h3>
            <p className="text-[rgb(var(--text-secondary))] mb-6">
              Your deposit of {formatCurrency(Number(depositAmount))} has been
              processed successfully.
            </p>
            <p className="text-sm text-[rgb(var(--text-secondary))] mb-6">
              Transaction ID: TRX-
              {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
          </div> : <div className="space-y-6">
            <div className="mb-4">
              <label htmlFor="depositAmount" className="block text-sm font-medium mb-1">
                Deposit Amount (₱)
              </label>
              <input type="number" id="depositAmount" value={depositAmount} onChange={e => setDepositAmount(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" placeholder="Enter amount" min="100" />
              <p className="mt-1 text-xs text-[rgb(var(--text-secondary))]">
                Minimum deposit amount is ₱100
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Payment Method
              </label>
              <div className="grid grid-cols-1 gap-3">
                {paymentMethods.map(method => <div key={method.id} onClick={() => setPaymentMethod(method.id)} className={`p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === method.id ? 'border-neon-red bg-[rgba(var(--neon-red),0.05)]' : 'border-[rgba(var(--border-color),0.2)] hover:border-neon-red/50'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${paymentMethod === method.id ? 'bg-[rgba(var(--neon-red),0.1)]' : 'bg-gray-100 dark:bg-gray-700/30'}`}>
                        {method.icon}
                      </div>
                      <span className="font-medium">{method.name}</span>
                    </div>
                  </div>)}
              </div>
            </div>
            {paymentMethod && <div className="pt-4 border-t border-[rgba(var(--border-color),0.2)]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm">Deposit Amount:</span>
                  <span className="font-bold">
                    {depositAmount ? formatCurrency(Number(depositAmount)) : '₱0'}
                  </span>
                </div>
                <button onClick={handleDepositSubmit} disabled={!depositAmount || !paymentMethod || isProcessing} className={`w-full py-3 rounded-lg font-medium transition-colors ${!depositAmount || !paymentMethod || isProcessing ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-neon-red text-white hover:bg-neon-red/90'}`}>
                  {isProcessing ? <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Deposit...
                    </div> : 'Confirm Deposit'}
                </button>
              </div>}
          </div>}
      </Modal>
      {/* Withdraw Modal */}
      <Modal isOpen={activeModal === 'withdraw'} onClose={() => {
      if (!isProcessing) setActiveModal(null);
    }} title="Request Withdrawal">
        {isSuccess ? <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 mb-4">
              <CheckCircleIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Withdrawal Requested!</h3>
            <p className="text-[rgb(var(--text-secondary))] mb-6">
              Your withdrawal request for{' '}
              {formatCurrency(Number(withdrawAmount))} has been submitted
              successfully.
            </p>
            <p className="text-sm text-[rgb(var(--text-secondary))] mb-6">
              Request ID: WDR-
              {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
          </div> : <div className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
              <div className="flex items-start gap-2">
                <InfoIcon className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-400 font-medium">
                    Available for Withdrawal
                  </p>
                  <p className="text-sm">
                    {formatCurrency(accountData.availableBalance)}
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="withdrawAmount" className="block text-sm font-medium mb-1">
                Withdrawal Amount (₱)
              </label>
              <input type="number" id="withdrawAmount" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" placeholder="Enter amount" min="100" max={accountData.availableBalance} />
              {Number(withdrawAmount) > accountData.availableBalance && <p className="mt-1 text-xs text-red-500">
                  Amount exceeds available balance
                </p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Withdrawal Method
              </label>
              <div className="grid grid-cols-1 gap-3">
                {paymentMethods.slice(0, 2).map(method => <div key={method.id} onClick={() => setWithdrawMethod(method.id)} className={`p-4 border rounded-lg cursor-pointer transition-all ${withdrawMethod === method.id ? 'border-neon-red bg-[rgba(var(--neon-red),0.05)]' : 'border-[rgba(var(--border-color),0.2)] hover:border-neon-red/50'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${withdrawMethod === method.id ? 'bg-[rgba(var(--neon-red),0.1)]' : 'bg-gray-100 dark:bg-gray-700/30'}`}>
                        {method.icon}
                      </div>
                      <span className="font-medium">{method.name}</span>
                    </div>
                  </div>)}
              </div>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircleIcon className="w-5 h-5 text-yellow-500 mt-0.5" />
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  Withdrawal requests are typically processed within 1-3
                  business days. Large withdrawals may require additional
                  verification.
                </p>
              </div>
            </div>
            {withdrawMethod && <div className="pt-4 border-t border-[rgba(var(--border-color),0.2)]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm">Withdrawal Amount:</span>
                  <span className="font-bold">
                    {withdrawAmount ? formatCurrency(Number(withdrawAmount)) : '₱0'}
                  </span>
                </div>
                <button onClick={handleWithdrawSubmit} disabled={!withdrawAmount || !withdrawMethod || isProcessing || Number(withdrawAmount) > accountData.availableBalance} className={`w-full py-3 rounded-lg font-medium transition-colors ${!withdrawAmount || !withdrawMethod || isProcessing || Number(withdrawAmount) > accountData.availableBalance ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-neon-red text-white hover:bg-neon-red/90'}`}>
                  {isProcessing ? <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Request...
                    </div> : 'Submit Withdrawal Request'}
                </button>
              </div>}
          </div>}
      </Modal>
    </>;
};