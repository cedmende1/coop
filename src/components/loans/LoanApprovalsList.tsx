import React from 'react';
import { LoanApplication } from '../../types/loan';
import { CheckCircle, XCircle, AlertCircle, FileText, Clock } from 'lucide-react';
interface LoanApprovalsListProps {
  approvals: LoanApplication[];
  formatDate: (date: string | undefined) => string;
  formatCurrency: (amount: number) => string;
  onViewDetails: (application: LoanApplication) => void;
}
export const LoanApprovalsList: React.FC<LoanApprovalsListProps> = ({
  approvals,
  formatDate,
  formatCurrency,
  onViewDetails
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
      case 'approved':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </span>;
      case 'rejected':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </span>;
      case 'additional_info':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            <AlertCircle className="w-3 h-3 mr-1" />
            Info Needed
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
  return <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
        <thead className="bg-gray-50 dark:bg-gray-700/50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              <div className="flex items-center">
                <span>Applicant</span>
              </div>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              <div className="flex items-center">
                <span>Application ID</span>
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
                <span>Applied On</span>
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
          {approvals.length > 0 ? approvals.map(application => <tr key={application.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium overflow-hidden">
                      {application.applicantAvatar ? <img src={application.applicantAvatar} alt={application.applicantName} className="h-8 w-8 object-cover" /> : application.applicantName.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">
                        {application.applicantName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {application.id}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  {formatCurrency(application.requestedAmount)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {getLoanTypeBadge(application.loanType)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {formatDate(application.applicationDate)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {getStatusBadge(application.status)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => onViewDetails(application)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))] hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="View Application Details">
                      <FileText className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>) : <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-[rgb(var(--text-secondary))]">
                No loan applications found matching your criteria.
              </td>
            </tr>}
        </tbody>
      </table>
    </div>;
};