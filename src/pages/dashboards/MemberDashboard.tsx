import React, { useState, Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader';
import { FileTextIcon, CreditCardIcon, CalculatorIcon, CalendarIcon, BanknoteIcon, CheckCircleIcon, ClockIcon, XCircleIcon, FileIcon, DownloadIcon, UploadIcon, ArrowRightIcon, FolderIcon, AlertCircleIcon, CreditCard, DollarSignIcon, ChevronRightIcon, BadgeCheckIcon, WalletIcon, UserIcon } from 'lucide-react';
// Define tab types
type DashboardTabType = 'my-loans' | 'payment-history' | 'documents';
// Define modal types
type ModalType = 'loan-details' | 'make-payment' | null;
// Mock data for loans
const myLoans = [{
  id: 'LN-2023-0001',
  type: 'Personal Loan',
  amount: 50000,
  remaining: 25000,
  nextPayment: '2023-11-15',
  nextAmount: 4500,
  status: 'active',
  startDate: '2023-05-15',
  endDate: '2024-05-15',
  interestRate: 12,
  paymentFrequency: 'Monthly',
  totalPaid: 25000,
  latePayments: 0,
  loanOfficer: 'Maria Santos',
  paymentHistory: [{
    date: '2023-10-15',
    amount: 4500,
    status: 'paid'
  }, {
    date: '2023-09-15',
    amount: 4500,
    status: 'paid'
  }, {
    date: '2023-08-15',
    amount: 4500,
    status: 'paid'
  }, {
    date: '2023-07-15',
    amount: 4500,
    status: 'paid'
  }, {
    date: '2023-06-15',
    amount: 4500,
    status: 'paid'
  }, {
    date: '2023-05-15',
    amount: 2500,
    status: 'paid'
  }]
}, {
  id: 'LN-2023-0008',
  type: 'Business Loan',
  amount: 120000,
  remaining: 92000,
  nextPayment: '2023-11-20',
  nextAmount: 4200,
  status: 'active',
  startDate: '2023-04-20',
  endDate: '2025-10-20',
  interestRate: 10.5,
  paymentFrequency: 'Monthly',
  totalPaid: 28000,
  latePayments: 0,
  loanOfficer: 'Pedro Reyes',
  paymentHistory: [{
    date: '2023-10-20',
    amount: 4200,
    status: 'paid'
  }, {
    date: '2023-09-20',
    amount: 4200,
    status: 'paid'
  }, {
    date: '2023-08-20',
    amount: 4200,
    status: 'paid'
  }, {
    date: '2023-07-20',
    amount: 4200,
    status: 'paid'
  }, {
    date: '2023-06-20',
    amount: 4200,
    status: 'paid'
  }, {
    date: '2023-05-20',
    amount: 4200,
    status: 'paid'
  }, {
    date: '2023-04-20',
    amount: 2800,
    status: 'paid'
  }]
}];
// Mock data for payment history
const paymentHistory = [{
  id: 'PMT-2023-0001',
  loanId: 'LN-2023-0001',
  amount: 4500,
  date: '2023-10-15',
  status: 'paid',
  method: 'Bank Transfer',
  reference: 'BNKT-12345'
}, {
  id: 'PMT-2023-0002',
  loanId: 'LN-2023-0001',
  amount: 4500,
  date: '2023-09-15',
  status: 'paid',
  method: 'Online',
  reference: 'ONL-67890'
}, {
  id: 'PMT-2023-0003',
  loanId: 'LN-2023-0001',
  amount: 4500,
  date: '2023-08-15',
  status: 'paid',
  method: 'Cash',
  reference: '-'
}, {
  id: 'PMT-2023-0004',
  loanId: 'LN-2023-0008',
  amount: 4200,
  date: '2023-10-20',
  status: 'paid',
  method: 'Bank Transfer',
  reference: 'BNKT-54321'
}, {
  id: 'PMT-2023-0005',
  loanId: 'LN-2023-0008',
  amount: 4200,
  date: '2023-09-20',
  status: 'paid',
  method: 'Online',
  reference: 'ONL-09876'
}];
// Mock data for documents
const documents = [{
  id: 'DOC-2023-0001',
  name: 'Loan Agreement - Personal Loan',
  type: 'PDF',
  size: '1.2 MB',
  uploadDate: '2023-05-15',
  category: 'Loan Documents'
}, {
  id: 'DOC-2023-0002',
  name: 'ID Verification',
  type: 'JPG',
  size: '800 KB',
  uploadDate: '2023-05-10',
  category: 'Personal Documents'
}, {
  id: 'DOC-2023-0003',
  name: 'Proof of Income',
  type: 'PDF',
  size: '1.5 MB',
  uploadDate: '2023-05-10',
  category: 'Personal Documents'
}, {
  id: 'DOC-2023-0004',
  name: 'Loan Agreement - Business Loan',
  type: 'PDF',
  size: '1.4 MB',
  uploadDate: '2023-04-20',
  category: 'Loan Documents'
}, {
  id: 'DOC-2023-0005',
  name: 'Business Plan',
  type: 'PDF',
  size: '2.8 MB',
  uploadDate: '2023-04-15',
  category: 'Business Documents'
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
// Status indicator styling and icons
const getStatusIndicator = (status: string) => {
  switch (status.toLowerCase()) {
    case 'paid':
    case 'active':
      return {
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-400',
        icon: <CheckCircleIcon className="w-3 h-3 mr-1" />,
        label: status === 'paid' ? 'Paid' : 'Active'
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
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
export const MemberDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DashboardTabType>('my-loans');
  const [selectedLoan, setSelectedLoan] = useState<string>('all');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedLoanDetails, setSelectedLoanDetails] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  // Filter payment history based on selected loan
  const filteredPaymentHistory = selectedLoan === 'all' ? paymentHistory : paymentHistory.filter(payment => payment.loanId === selectedLoan);
  // Handle view loan details
  const handleViewDetails = (loan: any) => {
    setSelectedLoanDetails(loan);
    setActiveModal('loan-details');
  };
  // Handle make payment
  const handleMakePayment = (loan: any) => {
    setSelectedLoanDetails(loan);
    setActiveModal('make-payment');
    setPaymentMethod('');
    setPaymentSuccess(false);
  };
  // Process payment
  const processPayment = () => {
    if (!paymentMethod) return;
    setPaymentProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
    }, 1500);
  };
  // Navigate to pages
  const navigateToPage = (path: string) => {
    navigate(path);
  };
  return <>
      <PageHeader title="Member Dashboard" description="Welcome to your Member Portal" />
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Total Loans
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">2</h3>
              <p className="text-xs text-[rgb(var(--text-secondary))]">
                Active loans
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
                Total Borrowed
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">₱170,000</h3>
              <p className="text-xs text-[rgb(var(--text-secondary))]">
                Across all loans
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <BanknoteIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Next Payment
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">₱4,500</h3>
              <p className="text-xs text-[rgb(var(--text-secondary))]">
                Due on Nov 15, 2023
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <CalendarIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-[rgba(var(--border-color),0.2)] transition-all duration-300 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Remaining Balance
              </p>
              <h3 className="text-2xl font-bold mt-1 mb-1">₱117,000</h3>
              <p className="text-xs text-[rgb(var(--text-secondary))]">
                Total outstanding
              </p>
            </div>
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full">
              <CreditCardIcon className="w-6 h-6 text-neon-red" />
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div onClick={() => navigateToPage('/request-loan')} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-[rgba(var(--border-color),0.2)] p-5 text-center hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full mb-3">
              <FileTextIcon className="w-6 h-6 text-neon-red" />
            </div>
            <h3 className="text-lg font-medium mb-1">Request Loan</h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] mb-3">
              Apply for a new loan
            </p>
            <div className="text-neon-red text-sm hover:underline flex items-center">
              <span>Apply Now</span>
              <ArrowRightIcon className="ml-1 w-4 h-4" />
            </div>
          </div>
        </div>
        <div onClick={() => navigateToPage('/loan-calculator')} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-[rgba(var(--border-color),0.2)] p-5 text-center hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full mb-3">
              <CalculatorIcon className="w-6 h-6 text-neon-red" />
            </div>
            <h3 className="text-lg font-medium mb-1">Loan Calculator</h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] mb-3">
              Calculate potential payments
            </p>
            <div className="text-neon-red text-sm hover:underline flex items-center">
              <span>Calculate</span>
              <ArrowRightIcon className="ml-1 w-4 h-4" />
            </div>
          </div>
        </div>
        <div onClick={() => myLoans.length > 0 ? handleMakePayment(myLoans[0]) : null} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-[rgba(var(--border-color),0.2)] p-5 text-center hover:shadow-md transition-all duration-300 cursor-pointer">
          <div className="flex flex-col items-center">
            <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-3 rounded-full mb-3">
              <CreditCardIcon className="w-6 h-6 text-neon-red" />
            </div>
            <h3 className="text-lg font-medium mb-1">Make Payment</h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] mb-3">
              Pay your loan installment
            </p>
            <div className="text-neon-red text-sm hover:underline flex items-center">
              <span>Pay Now</span>
              <ArrowRightIcon className="ml-1 w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
      {/* Tabs Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="flex border-b border-[rgba(var(--border-color),0.2)]">
          <button className={`px-6 py-3 text-sm font-medium ${activeTab === 'my-loans' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('my-loans')}>
            <div className="flex items-center gap-2">
              <FileTextIcon size={16} />
              <span>My Loans</span>
            </div>
          </button>
          <button className={`px-6 py-3 text-sm font-medium ${activeTab === 'payment-history' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('payment-history')}>
            <div className="flex items-center gap-2">
              <CreditCardIcon size={16} />
              <span>Payment History</span>
            </div>
          </button>
          <button className={`px-6 py-3 text-sm font-medium ${activeTab === 'documents' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('documents')}>
            <div className="flex items-center gap-2">
              <FolderIcon size={16} />
              <span>Documents</span>
            </div>
          </button>
        </div>
        {/* Tab Content */}
        <div className="p-6">
          {/* My Loans Tab */}
          {activeTab === 'my-loans' && <div>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Active Loans</h3>
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  View and manage your current loans
                </p>
              </div>
              <div className="space-y-4">
                {myLoans.map(loan => {
              const statusInfo = getStatusIndicator(loan.status);
              const progressPercent = Math.round((loan.amount - loan.remaining) / loan.amount * 100);
              return <div key={loan.id} className="border border-[rgba(var(--border-color),0.2)] rounded-lg p-5 hover:shadow-sm transition-all duration-300">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-lg font-medium">{loan.type}</h4>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.text}`}>
                              {statusInfo.icon}
                              {statusInfo.label}
                            </span>
                          </div>
                          <p className="text-sm text-[rgb(var(--text-secondary))]">
                            Loan ID: {loan.id}
                          </p>
                        </div>
                        <div className="mt-2 lg:mt-0 text-right">
                          <p className="text-sm font-medium">
                            Total: {formatCurrency(loan.amount)}
                          </p>
                          <p className="text-sm text-[rgb(var(--text-secondary))]">
                            {formatDate(loan.startDate)} -{' '}
                            {formatDate(loan.endDate)}
                          </p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Repayment Progress</span>
                          <span>{progressPercent}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-neon-red h-2.5 rounded-full" style={{
                      width: `${progressPercent}%`
                    }}></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
                          <p className="text-sm text-[rgb(var(--text-secondary))] mb-1">
                            Next Payment
                          </p>
                          <p className="text-lg font-medium">
                            {formatCurrency(loan.nextAmount)}
                          </p>
                          <p className="text-xs text-[rgb(var(--text-secondary))]">
                            Due on {formatDate(loan.nextPayment)}
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
                          <p className="text-sm text-[rgb(var(--text-secondary))] mb-1">
                            Remaining Balance
                          </p>
                          <p className="text-lg font-medium">
                            {formatCurrency(loan.remaining)}
                          </p>
                          <p className="text-xs text-[rgb(var(--text-secondary))]">
                            Outstanding amount
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => handleViewDetails(loan)} className="px-4 py-2 text-sm border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                          View Details
                        </button>
                        <button onClick={() => handleMakePayment(loan)} className="px-4 py-2 text-sm bg-neon-red text-white rounded-lg hover:bg-neon-red/90 transition-colors">
                          Make Payment
                        </button>
                      </div>
                    </div>;
            })}
              </div>
            </div>}
          {/* Payment History Tab */}
          {activeTab === 'payment-history' && <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Payment History</h3>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    View your payment records
                  </p>
                </div>
                <div>
                  <label htmlFor="loanFilter" className="block text-sm font-medium mb-1">
                    Filter by Loan
                  </label>
                  <select id="loanFilter" value={selectedLoan} onChange={e => setSelectedLoan(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30">
                    <option value="all">All Loans</option>
                    {myLoans.map(loan => <option key={loan.id} value={loan.id}>
                        {loan.type} ({loan.id})
                      </option>)}
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
                  <thead className="bg-gray-50 dark:bg-gray-700/30">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        <div className="flex items-center">
                          <CalendarIcon className="w-3 h-3 mr-1" />
                          Date
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Payment ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Loan ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Method
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Receipt
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(var(--border-color),0.1)]">
                    {filteredPaymentHistory.length > 0 ? filteredPaymentHistory.map(payment => {
                  const statusInfo = getStatusIndicator(payment.status);
                  return <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              {formatDate(payment.date)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                              {payment.id}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              {payment.loanId}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                              {formatCurrency(payment.amount)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                              {payment.method}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.text}`}>
                                {statusInfo.icon}
                                {statusInfo.label}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right">
                              <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))] hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <DownloadIcon className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>;
                }) : <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-[rgb(var(--text-secondary))]">
                          No payment records found for the selected loan.
                        </td>
                      </tr>}
                  </tbody>
                </table>
              </div>
            </div>}
          {/* Documents Tab */}
          {activeTab === 'documents' && <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">My Documents</h3>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Access and manage your documents
                  </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90 transition-colors">
                  <UploadIcon size={16} />
                  <span>Upload Document</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map(doc => <div key={doc.id} className="border border-[rgba(var(--border-color),0.2)] rounded-lg p-4 hover:shadow-sm transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <div className="bg-[rgba(var(--neon-red),0.1)] dark:bg-[rgba(var(--neon-red),0.2)] p-2 rounded-lg mr-3">
                          <FileIcon className="w-6 h-6 text-neon-red" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium line-clamp-1">
                            {doc.name}
                          </h4>
                          <p className="text-xs text-[rgb(var(--text-secondary))]">
                            {doc.type} • {doc.size}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[rgb(var(--text-secondary))]">
                        Uploaded on {formatDate(doc.uploadDate)}
                      </span>
                      <div className="flex space-x-1">
                        <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))] hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <DownloadIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>}
        </div>
      </div>
      {/* Loan Details Modal */}
      <Modal isOpen={activeModal === 'loan-details'} onClose={() => setActiveModal(null)} title="Loan Details">
        {selectedLoanDetails && <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  {selectedLoanDetails.type}
                </h3>
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  Loan ID: {selectedLoanDetails.id}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusIndicator(selectedLoanDetails.status).bg} ${getStatusIndicator(selectedLoanDetails.status).text}`}>
                {getStatusIndicator(selectedLoanDetails.status).icon}
                {getStatusIndicator(selectedLoanDetails.status).label}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-3">Loan Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-[rgb(var(--text-secondary))]">
                      Principal Amount
                    </span>
                    <span className="text-sm font-medium">
                      {formatCurrency(selectedLoanDetails.amount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[rgb(var(--text-secondary))]">
                      Interest Rate
                    </span>
                    <span className="text-sm font-medium">
                      {selectedLoanDetails.interestRate}% per annum
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[rgb(var(--text-secondary))]">
                      Term
                    </span>
                    <span className="text-sm font-medium">
                      {formatDate(selectedLoanDetails.startDate)} -{' '}
                      {formatDate(selectedLoanDetails.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[rgb(var(--text-secondary))]">
                      Payment Frequency
                    </span>
                    <span className="text-sm font-medium">
                      {selectedLoanDetails.paymentFrequency}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-3">
                  Payment Information
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-[rgb(var(--text-secondary))]">
                      Total Paid
                    </span>
                    <span className="text-sm font-medium">
                      {formatCurrency(selectedLoanDetails.totalPaid)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[rgb(var(--text-secondary))]">
                      Remaining Balance
                    </span>
                    <span className="text-sm font-medium">
                      {formatCurrency(selectedLoanDetails.remaining)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[rgb(var(--text-secondary))]">
                      Next Payment Amount
                    </span>
                    <span className="text-sm font-medium">
                      {formatCurrency(selectedLoanDetails.nextAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-[rgb(var(--text-secondary))]">
                      Next Payment Date
                    </span>
                    <span className="text-sm font-medium">
                      {formatDate(selectedLoanDetails.nextPayment)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-3">Payment History</h4>
              <div className="border border-[rgba(var(--border-color),0.2)] rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
                  <thead className="bg-gray-50 dark:bg-gray-700/30">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(var(--border-color),0.1)]">
                    {selectedLoanDetails.paymentHistory.map((payment: any, index: number) => <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                          <td className="px-4 py-2 text-sm">
                            {formatDate(payment.date)}
                          </td>
                          <td className="px-4 py-2 text-sm font-medium">
                            {formatCurrency(payment.amount)}
                          </td>
                          <td className="px-4 py-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusIndicator(payment.status).bg} ${getStatusIndicator(payment.status).text}`}>
                              {getStatusIndicator(payment.status).icon}
                              {getStatusIndicator(payment.status).label}
                            </span>
                          </td>
                        </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-[rgba(var(--border-color),0.2)]">
              <div>
                <h4 className="text-sm font-medium">Loan Officer</h4>
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  {selectedLoanDetails.loanOfficer}
                </p>
              </div>
              <button onClick={() => {
            setActiveModal(null);
            handleMakePayment(selectedLoanDetails);
          }} className="px-4 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90 transition-colors">
                Make Payment
              </button>
            </div>
          </div>}
      </Modal>
      {/* Make Payment Modal */}
      <Modal isOpen={activeModal === 'make-payment'} onClose={() => {
      if (!paymentProcessing) setActiveModal(null);
    }} title="Make Payment">
        {selectedLoanDetails && <>
            {paymentSuccess ? <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-500 mb-4">
                  <CheckCircleIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
                <p className="text-[rgb(var(--text-secondary))] mb-6">
                  Your payment of{' '}
                  {formatCurrency(selectedLoanDetails.nextAmount)} has been
                  processed successfully.
                </p>
                <p className="text-sm text-[rgb(var(--text-secondary))] mb-6">
                  Transaction ID: TRX-
                  {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </p>
                <button onClick={() => setActiveModal(null)} className="px-6 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90 transition-colors">
                  Close
                </button>
              </div> : <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-3">Payment Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-[rgb(var(--text-secondary))]">
                        Loan
                      </span>
                      <span className="text-sm font-medium">
                        {selectedLoanDetails.type} ({selectedLoanDetails.id})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[rgb(var(--text-secondary))]">
                        Payment Amount
                      </span>
                      <span className="text-sm font-medium">
                        {formatCurrency(selectedLoanDetails.nextAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-[rgb(var(--text-secondary))]">
                        Due Date
                      </span>
                      <span className="text-sm font-medium">
                        {formatDate(selectedLoanDetails.nextPayment)}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-3">
                    Select Payment Method
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                <div className="pt-4 border-t border-[rgba(var(--border-color),0.2)]">
                  <button onClick={processPayment} disabled={!paymentMethod || paymentProcessing} className={`w-full py-3 rounded-lg font-medium transition-colors ${!paymentMethod || paymentProcessing ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' : 'bg-neon-red text-white hover:bg-neon-red/90'}`}>
                    {paymentProcessing ? <div className="flex items-center justify-center gap-2">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                      </div> : `Pay ${formatCurrency(selectedLoanDetails.nextAmount)}`}
                  </button>
                  <p className="text-xs text-center text-[rgb(var(--text-secondary))] mt-3">
                    By clicking the button above, you agree to our terms and
                    conditions for processing payments.
                  </p>
                </div>
              </div>}
          </>}
      </Modal>
    </>;
};