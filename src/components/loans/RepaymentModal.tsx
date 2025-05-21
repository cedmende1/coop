import React, { useEffect, useState } from 'react';
import { X, CheckCircle, Clock, AlertCircle, FileText, Calendar, CreditCard, User, DollarSign } from 'lucide-react';
import { Repayment } from '../../types/loan';
interface RepaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  repayment: Repayment | null;
  onRecordPayment: (repaymentId: string, amount: number, date: string, method: string, reference: string) => void;
  formatCurrency: (amount: number) => string;
}
export const RepaymentModal: React.FC<RepaymentModalProps> = ({
  isOpen,
  onClose,
  repayment,
  onRecordPayment,
  formatCurrency
}) => {
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [reference, setReference] = useState('');
  const [mode, setMode] = useState<'view' | 'record'>('view');
  if (!isOpen || !repayment) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRecordPayment(repayment.id, parseFloat(amount), paymentDate, paymentMethod, reference);
    onClose();
  };
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and a single decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };
  // Initialize the form when a new repayment is selected
  useEffect(() => {
    if (repayment) {
      setAmount(repayment.amount.toString());
      setPaymentDate(new Date().toISOString().split('T')[0]);
      setPaymentMethod('cash');
      setReference('');
      setMode('view'); // Default to view mode
    }
  }, [repayment]);
  // Format date for display
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  // Get status badge
  const getStatusBadge = (status: string, dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const isOverdue = status === 'pending' && due < now;
    if (status === 'paid') {
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle className="w-3 h-3 mr-1.5" />
          Paid
        </span>;
    } else if (status === 'overdue' || isOverdue) {
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
          <AlertCircle className="w-3 h-3 mr-1.5" />
          Overdue
        </span>;
    } else {
      return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
          <Clock className="w-3 h-3 mr-1.5" />
          Not Paid
        </span>;
    }
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[rgba(var(--border-color),0.2)]">
          <h2 className="text-lg font-semibold">
            {mode === 'view' ? 'Repayment Details' : 'Record Payment'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* Content */}
        {mode === 'view' ? <div className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">
                  {formatCurrency(repayment.amount)}
                </h3>
                <div className="mt-1">
                  {getStatusBadge(repayment.status, repayment.dueDate)}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  Repayment ID
                </p>
                <p className="font-medium">{repayment.id}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
                <div className="flex items-center">
                  <User className="w-4 h-4 text-[rgb(var(--text-secondary))] mr-2" />
                  <span className="text-sm text-[rgb(var(--text-secondary))]">
                    Borrower
                  </span>
                </div>
                <p className="font-medium mt-1">{repayment.borrowerName}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 text-[rgb(var(--text-secondary))] mr-2" />
                  <span className="text-sm text-[rgb(var(--text-secondary))]">
                    Loan Details
                  </span>
                </div>
                <p className="font-medium mt-1">Loan ID: {repayment.loanId}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-[rgb(var(--text-secondary))] mr-2" />
                    <span className="text-sm text-[rgb(var(--text-secondary))]">
                      Due Date
                    </span>
                  </div>
                  <p className="font-medium mt-1">
                    {formatDate(repayment.dueDate)}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-[rgb(var(--text-secondary))] mr-2" />
                    <span className="text-sm text-[rgb(var(--text-secondary))]">
                      Amount Due
                    </span>
                  </div>
                  <p className="font-medium mt-1">
                    {formatCurrency(repayment.amount)}
                  </p>
                </div>
              </div>
              {repayment.paidDate && <div className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm text-[rgb(var(--text-secondary))]">
                        Payment Date
                      </span>
                    </div>
                    <p className="font-medium mt-1">
                      {formatDate(repayment.paidDate)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 text-[rgb(var(--text-secondary))] mr-2" />
                        <span className="text-sm text-[rgb(var(--text-secondary))]">
                          Method
                        </span>
                      </div>
                      <p className="font-medium mt-1 capitalize">
                        {repayment.method?.replace('_', ' ') || '—'}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 text-[rgb(var(--text-secondary))] mr-2" />
                        <span className="text-sm text-[rgb(var(--text-secondary))]">
                          Reference
                        </span>
                      </div>
                      <p className="font-medium mt-1">
                        {repayment.reference || '—'}
                      </p>
                    </div>
                  </div>
                </div>}
              {repayment.notes && <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-3">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 text-[rgb(var(--text-secondary))] mr-2" />
                    <span className="text-sm text-[rgb(var(--text-secondary))]">
                      Notes
                    </span>
                  </div>
                  <p className="mt-1 text-sm">{repayment.notes}</p>
                </div>}
            </div>
            {/* Footer for View Mode */}
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={onClose} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-sm font-medium transition-colors">
                Close
              </button>
              {/* Show Record Payment button only if payment is not yet made */}
              {!repayment.paidDate && <button onClick={() => setMode('record')} className="px-4 py-2 bg-neon-red text-white rounded-md hover:bg-neon-red/90 text-sm font-medium transition-colors">
                  Record Payment
                </button>}
            </div>
          </div> : <form onSubmit={handleSubmit}>
            <div className="p-4">
              <div className="mb-4">
                <p className="text-sm mb-1">
                  <span className="font-medium">Loan ID:</span>{' '}
                  {repayment.loanId}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-medium">Borrower:</span>{' '}
                  {repayment.borrowerName}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-medium">Amount Due:</span>{' '}
                  {formatCurrency(repayment.amount)}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Due Date:</span>{' '}
                  {formatDate(repayment.dueDate)}
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium mb-2">
                    Payment Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">₱</span>
                    </div>
                    <input type="text" id="amount" className="pl-7 w-full px-3 py-2 border border-[rgba(var(--border-color),0.3)] rounded-md bg-[rgba(var(--input-bg),0.8)] text-sm focus:outline-none focus:ring-1 focus:ring-neon-red/40" placeholder="0.00" value={amount} onChange={handleAmountChange} required />
                  </div>
                </div>
                <div>
                  <label htmlFor="paymentDate" className="block text-sm font-medium mb-2">
                    Payment Date
                  </label>
                  <input type="date" id="paymentDate" className="w-full px-3 py-2 border border-[rgba(var(--border-color),0.3)] rounded-md bg-[rgba(var(--input-bg),0.8)] text-sm focus:outline-none focus:ring-1 focus:ring-neon-red/40" value={paymentDate} onChange={e => setPaymentDate(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium mb-2">
                    Payment Method
                  </label>
                  <select id="paymentMethod" className="w-full px-3 py-2 border border-[rgba(var(--border-color),0.3)] rounded-md bg-[rgba(var(--input-bg),0.8)] text-sm focus:outline-none focus:ring-1 focus:ring-neon-red/40" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} required>
                    <option value="cash">Cash</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="check">Check</option>
                    <option value="online">Online Payment</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="reference" className="block text-sm font-medium mb-2">
                    Reference Number
                  </label>
                  <input type="text" id="reference" className="w-full px-3 py-2 border border-[rgba(var(--border-color),0.3)] rounded-md bg-[rgba(var(--input-bg),0.8)] text-sm focus:outline-none focus:ring-1 focus:ring-neon-red/40" placeholder="Receipt or transaction reference" value={reference} onChange={e => setReference(e.target.value)} />
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="p-4 border-t border-[rgba(var(--border-color),0.2)] flex justify-end gap-2">
              <button type="button" onClick={() => setMode('view')} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-sm font-medium transition-colors">
                Back
              </button>
              <button type="submit" className="px-4 py-2 bg-neon-red text-white rounded-md hover:bg-neon-red/90 text-sm font-medium transition-colors">
                Record Payment
              </button>
            </div>
          </form>}
      </div>
    </div>;
};