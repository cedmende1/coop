import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, XCircle, AlertCircle, User, CalendarDays, DollarSign, Clock, FileText, Building2, Briefcase, ShieldCheck, BadgeCheck, CircleDot } from 'lucide-react';
import { LoanApplication } from '../../types/loan';
interface LoanApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: LoanApplication | null;
  onApprove: (id: string, reviewedBy: string, notes?: string) => void;
  onReject: (id: string, reviewedBy: string, notes: string) => void;
  onRequestInfo: (id: string, reviewedBy: string, notes: string) => void;
  formatDate: (date: string | undefined) => string;
  formatCurrency: (amount: number) => string;
}
// Mock approval chain data - In real app, this would come from the backend
interface Approval {
  role: string;
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  date?: string;
  notes?: string;
  icon: React.ReactNode;
}
const mockApprovalChain: Approval[] = [{
  role: 'HR',
  name: 'Sarah Parker',
  status: 'approved',
  date: '2023-11-01',
  notes: 'Payroll capacity verified. Employee in good standing.',
  icon: <Briefcase className="w-4 h-4" />
}, {
  role: 'Accounting',
  name: 'Michael Chen',
  status: 'approved',
  date: '2023-11-02',
  notes: 'Financial ratios within acceptable range.',
  icon: <Building2 className="w-4 h-4" />
}, {
  role: 'Treasury',
  name: 'Amanda Lee',
  status: 'pending',
  icon: <DollarSign className="w-4 h-4" />
}, {
  role: 'Director',
  name: 'Robert Wilson',
  status: 'pending',
  icon: <ShieldCheck className="w-4 h-4" />
}, {
  role: 'Admin',
  name: 'James Miller',
  status: 'pending',
  icon: <BadgeCheck className="w-4 h-4" />
}];
export const LoanApprovalModal: React.FC<LoanApprovalModalProps> = ({
  isOpen,
  onClose,
  application,
  onApprove,
  onReject,
  onRequestInfo,
  formatDate,
  formatCurrency
}) => {
  const [action, setAction] = useState<'approve' | 'reject' | 'request_info' | null>(null);
  const [notes, setNotes] = useState('');
  const reviewerName = 'John Doe'; // This would come from auth context in a real app
  if (!isOpen || !application) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (action === 'approve') {
      onApprove(application.id, reviewerName, notes);
    } else if (action === 'reject') {
      onReject(application.id, reviewerName, notes);
    } else if (action === 'request_info') {
      onRequestInfo(application.id, reviewerName, notes);
    }
    onClose();
  };
  // Reset action and notes when a new application is selected
  useEffect(() => {
    setAction(null);
    setNotes('');
  }, [application]);
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[rgba(var(--border-color),0.2)]">
          <div>
            <h2 className="text-2xl font-bold">Loan Application Review</h2>
            <p className="text-[rgb(var(--text-secondary))] mt-1">
              Application ID: {application.id}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* Content */}
        <div className="grid grid-cols-12 gap-6 p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          {/* Left column - Application details */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Approval Chain */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-[rgba(var(--border-color),0.2)] overflow-hidden">
              <div className="px-4 py-3 bg-gray-100 dark:bg-gray-700/50 border-b border-[rgba(var(--border-color),0.2)]">
                <h3 className="font-semibold">Approval Chain</h3>
              </div>
              <div className="p-4">
                <div className="relative">
                  {/* Progress line */}
                  <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
                  {/* Approval steps */}
                  <div className="space-y-6">
                    {mockApprovalChain.map((approval, index) => <div key={approval.role} className="relative flex items-start">
                        {/* Status indicator */}
                        <div className={`
                          relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2
                          ${approval.status === 'approved' ? 'bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-400' : approval.status === 'rejected' ? 'bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-400' : 'bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-600'}
                        `}>
                          {approval.icon}
                        </div>
                        {/* Approval details */}
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{approval.role}</p>
                              <p className="text-sm text-[rgb(var(--text-secondary))]">
                                {approval.name}
                              </p>
                            </div>
                            <div className="flex items-center">
                              {approval.status === 'approved' && <span className="flex items-center text-green-600 dark:text-green-400 text-sm">
                                  <CheckCircle2 className="w-4 h-4 mr-1" />
                                  Approved{' '}
                                  {approval.date && `on ${formatDate(approval.date)}`}
                                </span>}
                              {approval.status === 'rejected' && <span className="flex items-center text-red-600 dark:text-red-400 text-sm">
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Rejected
                                </span>}
                              {approval.status === 'pending' && <span className="flex items-center text-[rgb(var(--text-secondary))] text-sm">
                                  <Clock className="w-4 h-4 mr-1" />
                                  Pending Review
                                </span>}
                            </div>
                          </div>
                          {approval.notes && <p className="mt-1 text-sm text-[rgb(var(--text-secondary))] bg-gray-50 dark:bg-gray-700/50 p-2 rounded">
                              {approval.notes}
                            </p>}
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
            {/* Application Summary */}
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <h3 className="text-lg font-semibold mb-3">Loan Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-[rgba(var(--border-color),0.2)]">
                    <p className="text-sm text-[rgb(var(--text-secondary))]">
                      Amount Requested
                    </p>
                    <p className="text-xl font-bold mt-1">
                      {formatCurrency(application.requestedAmount)}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-[rgba(var(--border-color),0.2)]">
                    <p className="text-sm text-[rgb(var(--text-secondary))]">
                      Term Length
                    </p>
                    <p className="text-xl font-bold mt-1">
                      {application.term} months
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-[rgba(var(--border-color),0.2)]">
                    <p className="text-sm text-[rgb(var(--text-secondary))]">
                      Date Applied
                    </p>
                    <p className="text-xl font-bold mt-1">
                      {formatDate(application.applicationDate)}
                    </p>
                  </div>
                </div>
              </div>
              {/* Applicant Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Applicant Details
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-[rgba(var(--border-color),0.2)]">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg font-medium overflow-hidden">
                      {application.applicantAvatar ? <img src={application.applicantAvatar} alt={application.applicantName} className="h-12 w-12 object-cover" /> : application.applicantName.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">
                        {application.applicantName}
                      </p>
                      <p className="text-sm text-[rgb(var(--text-secondary))]">
                        ID: {application.applicantId}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-[rgb(var(--text-secondary))]">
                        Monthly Income
                      </p>
                      <p className="font-medium">
                        {formatCurrency(application.monthlyIncome)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[rgb(var(--text-secondary))]">
                        Existing Loans
                      </p>
                      <p className="font-medium">
                        {formatCurrency(application.existingLoans)}
                      </p>
                    </div>
                    {application.creditScore && <div>
                        <p className="text-sm text-[rgb(var(--text-secondary))]">
                          Credit Score
                        </p>
                        <p className="font-medium">{application.creditScore}</p>
                      </div>}
                  </div>
                </div>
              </div>
              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Additional Details
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-[rgba(var(--border-color),0.2)] space-y-4">
                  <div>
                    <p className="text-sm text-[rgb(var(--text-secondary))]">
                      Loan Purpose
                    </p>
                    <p className="mt-1">{application.purpose}</p>
                  </div>
                  {application.collateral && <div>
                      <p className="text-sm text-[rgb(var(--text-secondary))]">
                        Collateral
                      </p>
                      <p className="mt-1">{application.collateral}</p>
                    </div>}
                  {application.guarantor && <div>
                      <p className="text-sm text-[rgb(var(--text-secondary))]">
                        Guarantor
                      </p>
                      <p className="mt-1">{application.guarantor}</p>
                    </div>}
                </div>
              </div>
            </div>
          </div>
          {/* Right column - Review actions */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-[rgba(var(--border-color),0.2)]">
              <h3 className="text-lg font-semibold mb-4">Review Decision</h3>
              {/* Decision buttons */}
              <div className="space-y-3 mb-6">
                <button type="button" onClick={() => setAction('approve')} className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors
                    ${action === 'approve' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-2 border-green-400' : 'bg-white dark:bg-gray-700 hover:bg-green-50 dark:hover:bg-green-900/10'}`}>
                  <CheckCircle2 className="w-4 h-4 inline-block mr-2" />
                  Approve Application
                </button>
                <button type="button" onClick={() => setAction('reject')} className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors
                    ${action === 'reject' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-2 border-red-400' : 'bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/10'}`}>
                  <XCircle className="w-4 h-4 inline-block mr-2" />
                  Reject Application
                </button>
                <button type="button" onClick={() => setAction('request_info')} className={`w-full py-2.5 px-4 rounded-lg text-sm font-medium transition-colors
                    ${action === 'request_info' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-2 border-amber-400' : 'bg-white dark:bg-gray-700 hover:bg-amber-50 dark:hover:bg-amber-900/10'}`}>
                  <AlertCircle className="w-4 h-4 inline-block mr-2" />
                  Request More Info
                </button>
              </div>
              {/* Notes form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="notes" className="block text-sm font-medium mb-2">
                    Review Notes{' '}
                    {(action === 'reject' || action === 'request_info') && <span className="text-red-500">*</span>}
                  </label>
                  <textarea id="notes" rows={6} className="w-full px-3 py-2 border border-[rgba(var(--border-color),0.3)] rounded-lg bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-neon-red/40" placeholder={action === 'approve' ? 'Add any notes about this approval...' : action === 'reject' ? 'Please provide a reason for rejection...' : action === 'request_info' ? 'Specify what additional information is needed...' : 'Select a decision first...'} value={notes} onChange={e => setNotes(e.target.value)} required={action === 'reject' || action === 'request_info'} />
                </div>
                {/* Submit button */}
                <button type="submit" disabled={!action || (action === 'reject' || action === 'request_info') && !notes.trim()} className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition-colors
                    ${action && !((action === 'reject' || action === 'request_info') && !notes.trim()) ? 'bg-neon-red text-white hover:bg-neon-red/90' : 'bg-gray-200 text-gray-500 dark:bg-gray-600 dark:text-gray-400 cursor-not-allowed'}`}>
                  Submit Decision
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>;
};