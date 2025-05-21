import React from 'react';
import { X, Calendar, CreditCard, Clock, User, FileText, BanknoteIcon, PercentIcon, CalendarDaysIcon, CalendarClockIcon, AlertCircleIcon, CheckCircleIcon } from 'lucide-react';
import { Loan } from '../../types/loan';
interface LoanViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  loan: Loan | null;
  formatDate: (date: string) => string;
  formatCurrency: (amount: number) => string;
}
export const LoanViewModal: React.FC<LoanViewModalProps> = ({
  isOpen,
  onClose,
  loan,
  formatDate,
  formatCurrency
}) => {
  if (!isOpen || !loan) return null;
  // Get loan type display text
  const getLoanTypeDisplay = (type: string) => {
    switch (type) {
      case 'personal':
        return 'Personal Loan';
      case 'business':
        return 'Business Loan';
      case 'education':
        return 'Education Loan';
      case 'mortgage':
        return 'Mortgage Loan';
      case 'emergency':
        return 'Emergency Loan';
      default:
        return type;
    }
  };
  // Get status display text and color
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'active':
        return {
          text: 'Active',
          color: 'text-green-600 dark:text-green-400'
        };
      case 'paid':
        return {
          text: 'Paid',
          color: 'text-blue-600 dark:text-blue-400'
        };
      case 'defaulted':
        return {
          text: 'Defaulted',
          color: 'text-red-600 dark:text-red-400'
        };
      case 'restructured':
        return {
          text: 'Restructured',
          color: 'text-amber-600 dark:text-amber-400'
        };
      case 'pending':
        return {
          text: 'Pending',
          color: 'text-gray-600 dark:text-gray-400'
        };
      default:
        return {
          text: status,
          color: 'text-gray-600 dark:text-gray-400'
        };
    }
  };
  // Calculate payment progress
  const calculateProgress = () => {
    const progressPercentage = loan.totalPaid / loan.amount * 100;
    return Math.min(Math.round(progressPercentage), 100);
  };
  // Calculate installments paid
  const installmentsPaid = Math.round(loan.totalPaid / (loan.amount / loan.term));
  const status = getStatusDisplay(loan.status);
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[rgba(var(--border-color),0.2)]">
          <div>
            <h2 className="text-xl font-bold">Loan Details</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-[rgb(var(--text-secondary))]">
                ID: {loan.id}
              </span>
              <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${status.color} bg-opacity-10 dark:bg-opacity-20`}>
                {status.text}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* Content */}
        <div className="p-5 overflow-y-auto max-h-[calc(90vh-8rem)] space-y-6">
          {/* Loan Summary Card */}
          <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-5">
            <div className="flex flex-col md:flex-row gap-6 divide-y md:divide-y-0 md:divide-x divide-[rgba(var(--border-color),0.2)]">
              <div className="flex-1 space-y-1">
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  Loan Amount
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(loan.amount)}
                </p>
                <div className="mt-2 pt-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div className="bg-neon-red h-2 rounded-full" style={{
                    width: `${calculateProgress()}%`
                  }}></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span>{formatCurrency(loan.totalPaid)} paid</span>
                    <span>
                      {installmentsPaid}/{loan.term} installments
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-1 pt-4 md:pt-0 md:pl-6">
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  Remaining Balance
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(loan.remainingBalance)}
                </p>
                <div className="flex items-center mt-2 text-sm">
                  <Clock className="w-4 h-4 mr-1.5 text-[rgb(var(--text-secondary))]" />
                  <span className="text-[rgb(var(--text-secondary))]">
                    {loan.status !== 'paid' ? `Next payment of ${formatCurrency(loan.nextPaymentAmount)} due on ${formatDate(loan.nextPaymentDate)}` : 'Fully paid'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Borrower Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-[rgba(var(--border-color),0.2)] overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-700/30 px-4 py-3 border-b border-[rgba(var(--border-color),0.2)]">
                <h3 className="font-medium flex items-center">
                  <User className="w-4 h-4 mr-2 text-neon-red" />
                  Borrower Information
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium overflow-hidden mr-3">
                      {loan.borrowerAvatar ? <img src={loan.borrowerAvatar} alt={loan.borrowerName} className="h-10 w-10 object-cover" /> : loan.borrowerName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{loan.borrowerName}</p>
                      <p className="text-xs text-[rgb(var(--text-secondary))]">
                        ID: {loan.borrowerId}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Loan Officer
                  </p>
                  <p className="font-medium">{loan.loanOfficer}</p>
                </div>
              </div>
            </div>
            {/* Loan Terms */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-[rgba(var(--border-color),0.2)] overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-700/30 px-4 py-3 border-b border-[rgba(var(--border-color),0.2)]">
                <h3 className="font-medium flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-neon-red" />
                  Loan Terms
                </h3>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-[rgb(var(--text-secondary))]">
                    Loan Type
                  </p>
                  <p className="font-medium">
                    {getLoanTypeDisplay(loan.loanType)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[rgb(var(--text-secondary))]">
                    Interest Rate
                  </p>
                  <p className="font-medium flex items-center">
                    <PercentIcon className="w-3 h-3 mr-1 text-[rgb(var(--text-secondary))]" />
                    {loan.interestRate}% per annum
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[rgb(var(--text-secondary))]">
                    Term
                  </p>
                  <p className="font-medium">{loan.term} months</p>
                </div>
                <div>
                  <p className="text-xs text-[rgb(var(--text-secondary))]">
                    Payment Frequency
                  </p>
                  <p className="font-medium capitalize">
                    {loan.paymentFrequency}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[rgb(var(--text-secondary))]">
                    Start Date
                  </p>
                  <p className="font-medium flex items-center">
                    <CalendarDaysIcon className="w-3 h-3 mr-1 text-[rgb(var(--text-secondary))]" />
                    {formatDate(loan.startDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[rgb(var(--text-secondary))]">
                    End Date
                  </p>
                  <p className="font-medium flex items-center">
                    <CalendarClockIcon className="w-3 h-3 mr-1 text-[rgb(var(--text-secondary))]" />
                    {formatDate(loan.endDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Payment History & Application Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Payment History */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-[rgba(var(--border-color),0.2)] overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-700/30 px-4 py-3 border-b border-[rgba(var(--border-color),0.2)]">
                <h3 className="font-medium flex items-center">
                  <BanknoteIcon className="w-4 h-4 mr-2 text-neon-red" />
                  Payment Information
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[rgb(var(--text-secondary))]">
                      Total Paid
                    </p>
                    <p className="font-medium">
                      {formatCurrency(loan.totalPaid)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[rgb(var(--text-secondary))]">
                      Late Payments
                    </p>
                    <p className="font-medium flex items-center justify-end">
                      {loan.latePayments > 0 ? <>
                          <AlertCircleIcon className="w-3 h-3 mr-1 text-red-500" />
                          {loan.latePayments}
                        </> : <>
                          <CheckCircleIcon className="w-3 h-3 mr-1 text-green-500" />
                          None
                        </>}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Application Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-[rgba(var(--border-color),0.2)] overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-700/30 px-4 py-3 border-b border-[rgba(var(--border-color),0.2)]">
                <h3 className="font-medium flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-neon-red" />
                  Application Details
                </h3>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-[rgb(var(--text-secondary))]">
                    Application Date
                  </p>
                  <p className="font-medium">
                    {formatDate(loan.applicationDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[rgb(var(--text-secondary))]">
                    Approval Date
                  </p>
                  <p className="font-medium">
                    {loan.approvalDate ? formatDate(loan.approvalDate) : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Notes */}
          {loan.notes && <div className="bg-white dark:bg-gray-800 rounded-lg border border-[rgba(var(--border-color),0.2)] overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-700/30 px-4 py-3 border-b border-[rgba(var(--border-color),0.2)]">
                <h3 className="font-medium flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-neon-red" />
                  Notes
                </h3>
              </div>
              <div className="p-4">
                <p className="text-sm whitespace-pre-line">{loan.notes}</p>
              </div>
            </div>}
        </div>
        {/* Footer */}
        <div className="p-4 border-t border-[rgba(var(--border-color),0.2)] flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-sm font-medium transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>;
};