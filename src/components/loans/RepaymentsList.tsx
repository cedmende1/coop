import React from 'react';
import { Repayment } from '../../types/loan';
import { Check, Clock, X, AlertCircle, FileText, Send, Eye } from 'lucide-react';
interface RepaymentsListProps {
  repayments: Repayment[];
  formatDate: (date: string | undefined) => string;
  formatCurrency: (amount: number) => string;
  onRecordPayment: (repayment: Repayment) => void;
  onViewDetails: (repayment: Repayment) => void;
}
export const RepaymentsList: React.FC<RepaymentsListProps> = ({
  repayments,
  formatDate,
  formatCurrency,
  onRecordPayment,
  onViewDetails
}) => {
  // Get status badge based on status
  const getStatusBadge = (status: string, dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const isOverdue = status === 'pending' && due < now;
    if (status === 'paid') {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          <Check className="w-3 h-3 mr-1" />
          Paid
        </span>;
    } else if (status === 'overdue' || isOverdue) {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
          <X className="w-3 h-3 mr-1" />
          Overdue
        </span>;
    } else {
      return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
          <Clock className="w-3 h-3 mr-1" />
          Not Paid
        </span>;
    }
  };
  // Generate avatar for borrower
  const getBorrowerAvatar = (name: string) => {
    return <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium overflow-hidden">
        {name.charAt(0)}
      </div>;
  };
  // Calculate payment progress as a fraction with varied values
  const getPaymentProgress = (repayment: Repayment) => {
    // Extract a more meaningful installment number from the ID
    const repaymentIdParts = repayment.id.split('-');
    const idNumber = parseInt(repaymentIdParts[repaymentIdParts.length - 1]);
    // Generate a varied total based on loan ID to simulate different loan terms
    // This is just for demonstration - in a real app, this would come from the loan data
    const loanIdParts = repayment.loanId.split('-');
    const loanNumber = parseInt(loanIdParts[loanIdParts.length - 1]);
    // Create varied terms based on loan number
    let totalInstallments = 12; // default
    if (loanNumber % 4 === 0) totalInstallments = 24;
    if (loanNumber % 5 === 0) totalInstallments = 36;
    if (loanNumber % 7 === 0) totalInstallments = 48;
    // Calculate current installment number (modulo to keep it within range)
    const currentInstallment = idNumber % totalInstallments + 1;
    // For paid repayments, show the current installment, otherwise show one less
    return {
      current: repayment.status === 'paid' ? currentInstallment : currentInstallment - 1,
      total: totalInstallments
    };
  };
  // Get due date indicator
  const getDueDateIndicator = (dueDate: string, status: string) => {
    if (status === 'paid') return null;
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      return <span className="text-xs text-red-600 dark:text-red-400 flex items-center mt-1">
          <AlertCircle className="w-3 h-3 mr-1" />
          {Math.abs(diffDays)} day{Math.abs(diffDays) !== 1 ? 's' : ''} overdue
        </span>;
    }
    if (diffDays <= 3) {
      return <span className="text-xs text-amber-600 dark:text-amber-400 flex items-center mt-1">
          <Clock className="w-3 h-3 mr-1" />
          Due{' '}
          {diffDays === 0 ? 'today' : `in ${diffDays} day${diffDays !== 1 ? 's' : ''}`}
        </span>;
    }
    return null;
  };
  // Check if a payment is overdue
  const isOverdue = (repayment: Repayment) => {
    if (repayment.status === 'paid') return false;
    const now = new Date();
    const due = new Date(repayment.dueDate);
    return due < now;
  };
  return <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
        <thead className="bg-gray-50 dark:bg-gray-700/50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              <div className="flex items-center">
                <span>Borrower</span>
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              <div className="flex items-center">
                <span>Loan ID</span>
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              <div className="flex items-center">
                <span>Payment Details</span>
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              <div className="flex items-center">
                <span>Progress</span>
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              <div className="flex items-center">
                <span>Due Date</span>
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              <div className="flex items-center">
                <span>Payment Info</span>
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              <div className="flex items-center">
                <span>Status</span>
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgba(var(--border-color),0.1)]">
          {repayments.length > 0 ? repayments.map(repayment => {
          const overdue = isOverdue(repayment);
          const progress = getPaymentProgress(repayment);
          const progressPercentage = progress.current / progress.total * 100;
          return <tr key={repayment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      {getBorrowerAvatar(repayment.borrowerName)}
                      <div className="ml-3">
                        <div className="text-sm font-medium">
                          {repayment.borrowerName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    {repayment.loanId}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium">
                      {formatCurrency(repayment.amount)}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex flex-col w-full max-w-[120px]">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div className="bg-neon-red h-1.5 rounded-full" style={{
                    width: `${progressPercentage}%`
                  }}></div>
                      </div>
                      <div className="text-xs text-right mt-1 font-medium">
                        {progress.current}/{progress.total}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">
                      {formatDate(repayment.dueDate)}
                    </div>
                    {getDueDateIndicator(repayment.dueDate, repayment.status)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {repayment.paidDate ? <div>
                        <div className="text-sm">
                          {formatDate(repayment.paidDate)}
                        </div>
                        {repayment.method && <span className="text-xs text-[rgb(var(--text-secondary))] capitalize">
                            {repayment.method.replace('_', ' ')}
                            {repayment.reference && ` (Ref: ${repayment.reference})`}
                          </span>}
                      </div> : <span className="text-xs text-[rgb(var(--text-secondary))] italic">
                        Not paid yet
                      </span>}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {getStatusBadge(repayment.status, repayment.dueDate)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* View Details - available for all statuses */}
                      <button onClick={() => onViewDetails(repayment)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))] hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
                      {/* Send Payment Reminder - only for overdue payments */}
                      {overdue && !repayment.paidDate && <button onClick={() => alert('Payment reminder sent to borrower')} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))] hover:text-amber-600 dark:hover:text-amber-400 transition-colors" title="Send Payment Reminder">
                          <Send className="h-4 w-4" />
                        </button>}
                    </div>
                  </td>
                </tr>;
        }) : <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-[rgb(var(--text-secondary))]">
                No repayments found matching your criteria.
              </td>
            </tr>}
        </tbody>
      </table>
    </div>;
};