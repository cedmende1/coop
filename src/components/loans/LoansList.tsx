import React from 'react';
import { Loan } from '../../types/loan';
import { Eye, FileEdit, Check, Clock, X, RotateCcw } from 'lucide-react';
interface LoansListProps {
  loans: Loan[];
  formatDate: (date: string) => string;
  formatCurrency: (amount: number) => string;
  onViewLoan: (loan: Loan) => void;
  onUpdateStatus: (loan: Loan) => void;
}
export const LoansList: React.FC<LoansListProps> = ({
  loans,
  formatDate,
  formatCurrency,
  onViewLoan,
  onUpdateStatus
}) => {
  // Get loan type badge
  const getLoanTypeBadge = (type: string) => {
    switch (type) {
      case 'personal':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            Personal
          </span>;
      case 'business':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Business
          </span>;
      case 'education':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
            Education
          </span>;
      case 'mortgage':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            Mortgage
          </span>;
      case 'emergency':
        return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            Emergency
          </span>;
      default:
        return null;
    }
  };
  // Get status badge based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <Check className="w-3 h-3 mr-1" />
            Active
          </span>;
      case 'paid':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <Check className="w-3 h-3 mr-1" />
            Paid
          </span>;
      case 'defaulted':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <X className="w-3 h-3 mr-1" />
            Defaulted
          </span>;
      case 'restructured':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            <RotateCcw className="w-3 h-3 mr-1" />
            Restructured
          </span>;
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </span>;
      default:
        return null;
    }
  };
  // Calculate payment installments based on term
  const getPaymentInstallments = (loan: Loan) => {
    // Assuming term is in months and represents the number of installments
    const totalInstallments = loan.term;
    const paidInstallments = Math.round(loan.totalPaid / (loan.amount / totalInstallments));
    return `${paidInstallments}/${totalInstallments}`;
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
                <span>Amount</span>
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              <div className="flex items-center">
                <span>Type</span>
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              <div className="flex items-center">
                <span>Progress</span>
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              <div className="flex items-center">
                <span>Start Date</span>
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              <div className="flex items-center">
                <span>End Date</span>
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
          {loans.length > 0 ? loans.map(loan => <tr key={loan.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium overflow-hidden">
                      {loan.borrowerAvatar ? <img src={loan.borrowerAvatar} alt={loan.borrowerName} className="h-8 w-8 object-cover" /> : loan.borrowerName.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">
                        {loan.borrowerName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {loan.id}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  {formatCurrency(loan.amount)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {getLoanTypeBadge(loan.loanType)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col w-full max-w-[120px]">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{formatCurrency(loan.totalPaid)}</span>
                      <span>{formatCurrency(loan.amount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div className="bg-neon-red h-1.5 rounded-full" style={{
                  width: `${loan.totalPaid / loan.amount * 100}%`
                }}></div>
                    </div>
                    <div className="text-xs text-right mt-1 font-medium">
                      {getPaymentInstallments(loan)}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {formatDate(loan.startDate)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {formatDate(loan.endDate)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {getStatusBadge(loan.status)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => onViewLoan(loan)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))] hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="View Loan Details">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button onClick={() => onUpdateStatus(loan)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))] hover:text-amber-600 dark:hover:text-amber-400 transition-colors" title="Update Status">
                      <FileEdit className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>) : <tr>
              <td colSpan={9} className="px-4 py-8 text-center text-[rgb(var(--text-secondary))]">
                No loans found matching your criteria.
              </td>
            </tr>}
        </tbody>
      </table>
    </div>;
};