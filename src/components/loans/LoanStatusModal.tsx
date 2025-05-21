import React, { useState } from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { Loan, LoanStatus } from '../../types/loan';
interface LoanStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  loan: Loan | null;
  onUpdateStatus: (loanId: string, newStatus: LoanStatus, note: string) => void;
}
export const LoanStatusModal: React.FC<LoanStatusModalProps> = ({
  isOpen,
  onClose,
  loan,
  onUpdateStatus
}) => {
  const [selectedStatus, setSelectedStatus] = useState<LoanStatus>('active');
  const [note, setNote] = useState('');
  if (!isOpen || !loan) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStatus(loan.id, selectedStatus, note);
    onClose();
  };
  const statusOptions: {
    value: LoanStatus;
    label: string;
    description: string;
    icon: React.ReactNode;
    color: string;
  }[] = [{
    value: 'active',
    label: 'Active',
    description: 'Loan is active and in good standing',
    icon: <CheckCircle className="w-5 h-5" />,
    color: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
  }, {
    value: 'paid',
    label: 'Paid',
    description: 'Loan has been fully paid off',
    icon: <CheckCircle className="w-5 h-5" />,
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400'
  }, {
    value: 'defaulted',
    label: 'Defaulted',
    description: 'Borrower has defaulted on loan payments',
    icon: <XCircle className="w-5 h-5" />,
    color: 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
  }, {
    value: 'restructured',
    label: 'Restructured',
    description: 'Loan terms have been modified',
    icon: <RefreshCw className="w-5 h-5" />,
    color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400'
  }];
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[rgba(var(--border-color),0.2)]">
          <h2 className="text-lg font-semibold">Update Loan Status</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-4">
            <div className="mb-4">
              <p className="text-sm mb-2">
                <span className="font-medium">Current Status:</span>{' '}
                <span className="capitalize">{loan.status}</span>
              </p>
              <p className="text-sm mb-2">
                <span className="font-medium">Loan ID:</span> {loan.id}
              </p>
              <p className="text-sm">
                <span className="font-medium">Borrower:</span>{' '}
                {loan.borrowerName}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                New Status
              </label>
              <div className="grid grid-cols-1 gap-3">
                {statusOptions.map(option => <div key={option.value} className={`
                      border rounded-lg p-3 cursor-pointer transition-all
                      ${selectedStatus === option.value ? `border-2 ${option.color.split(' ')[0]} ${option.color.split(' ')[1]}` : 'border-[rgba(var(--border-color),0.3)] hover:border-[rgba(var(--border-color),0.5)]'}
                    `} onClick={() => setSelectedStatus(option.value)}>
                    <div className="flex items-center">
                      <div className={`
                        flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                        ${selectedStatus === option.value ? option.color : 'text-[rgb(var(--text-secondary))] bg-gray-100 dark:bg-gray-700'}
                      `}>
                        {option.icon}
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium">{option.label}</h3>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                          {option.description}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${selectedStatus === option.value ? `${option.color.split(' ')[0]} border-current` : 'border-gray-300 dark:border-gray-600'}`}>
                          {selectedStatus === option.value && <div className={`w-2.5 h-2.5 rounded-full ${option.color.split(' ')[0]}`}></div>}
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
            <div>
              <label htmlFor="note" className="block text-sm font-medium mb-2">
                Note
              </label>
              <textarea id="note" rows={3} className="w-full px-3 py-2 border border-[rgba(var(--border-color),0.3)] rounded-md bg-[rgba(var(--input-bg),0.8)] text-sm focus:outline-none focus:ring-1 focus:ring-neon-red/40" placeholder="Add a note about this status change..." value={note} onChange={e => setNote(e.target.value)} />
            </div>
          </div>
          {/* Footer */}
          <div className="p-4 border-t border-[rgba(var(--border-color),0.2)] flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-sm font-medium transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-neon-red text-white rounded-md hover:bg-neon-red/90 text-sm font-medium transition-colors">
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>;
};
interface StatusOptionProps {
  id: string;
  value: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}
const StatusOption: React.FC<StatusOptionProps> = ({
  id,
  value,
  label,
  description,
  checked,
  onChange
}) => {
  return <div className="flex items-start">
      <div className="flex items-center h-5">
        <input id={id} type="radio" name="status" value={value} checked={checked} onChange={onChange} className="h-4 w-4 text-neon-red border-gray-300 focus:ring-neon-red/40" />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor={id} className="font-medium">
          {label}
        </label>
        <p className="text-[rgb(var(--text-secondary))]">{description}</p>
      </div>
    </div>;
};