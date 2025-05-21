import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CoinsIcon, InfoIcon, CalendarIcon, UploadIcon, CheckCircleIcon, HelpCircleIcon } from 'lucide-react';
// Define types for share data
interface ShareHolding {
  totalShares: number;
  valuePerShare: number;
  totalValue: number;
  lastDeposit: {
    amount: number;
    date: string;
  };
}
// Define types for deposit form
interface DepositFormData {
  amount: number;
  paymentMethod: string;
  accountName: string;
  referenceNumber: string;
  transactionDate: string;
  proofOfPayment?: File;
}
// Mock data for share holdings
const mockShareHolding: ShareHolding = {
  totalShares: 15,
  valuePerShare: 1000,
  totalValue: 15000,
  lastDeposit: {
    amount: 2000,
    date: '2023-10-15'
  }
};
export const DepositShares = () => {
  // State for form data
  const [formData, setFormData] = useState<DepositFormData>({
    amount: 0,
    paymentMethod: 'bank_transfer',
    accountName: '',
    referenceNumber: '',
    transactionDate: new Date().toISOString().split('T')[0],
    proofOfPayment: undefined
  });
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  // State for file upload
  const [filePreview, setFilePreview] = useState<string | null>(null);
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    if (name === 'amount') {
      setFormData({
        ...formData,
        [name]: value === '' ? '' : Number(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        proofOfPayment: file
      });
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);
    }
  };
  // Clear file upload
  const clearFileUpload = () => {
    setFormData({
      ...formData,
      proofOfPayment: undefined
    });
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
  };
  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.amount) {
      errors.amount = 'Deposit amount is required';
    } else if (formData.amount < 500) {
      errors.amount = 'Minimum deposit amount is ₱500';
    }
    if (!formData.accountName) {
      errors.accountName = 'Account name is required';
    }
    if (!formData.referenceNumber) {
      errors.referenceNumber = 'Reference number is required';
    }
    if (!formData.proofOfPayment) {
      errors.proofOfPayment = 'Proof of payment is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0
    }).format(amount);
  };
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return <>
      <PageHeader title="Deposit Shares" description="Manage your share contributions" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Share Information */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[rgba(var(--border-color),0.2)] bg-gray-50 dark:bg-gray-700/30">
              <h2 className="text-lg font-medium flex items-center gap-2">
                <CoinsIcon className="w-5 h-5 text-neon-red" />
                Share Holdings
              </h2>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-center mb-6">
                <div className="w-32 h-32 rounded-full bg-neon-red/10 flex flex-col items-center justify-center">
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Total Value
                  </p>
                  <p className="text-2xl font-bold text-neon-red">
                    {formatCurrency(mockShareHolding.totalValue)}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-[rgba(var(--border-color),0.1)]">
                  <span className="text-[rgb(var(--text-secondary))]">
                    Total Shares
                  </span>
                  <span className="font-medium">
                    {mockShareHolding.totalShares}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[rgba(var(--border-color),0.1)]">
                  <span className="text-[rgb(var(--text-secondary))]">
                    Value Per Share
                  </span>
                  <span className="font-medium">
                    {formatCurrency(mockShareHolding.valuePerShare)}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-[rgba(var(--border-color),0.1)]">
                  <span className="text-[rgb(var(--text-secondary))]">
                    Last Deposit
                  </span>
                  <span className="font-medium">
                    {formatCurrency(mockShareHolding.lastDeposit.amount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[rgb(var(--text-secondary))]">
                    Deposit Date
                  </span>
                  <span className="font-medium">
                    {formatDate(mockShareHolding.lastDeposit.date)}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-[rgba(var(--border-color),0.2)] bg-gray-50 dark:bg-gray-700/30 flex items-start gap-2">
              <InfoIcon className="w-5 h-5 text-[rgb(var(--text-secondary))] flex-shrink-0 mt-0.5" />
              <div className="text-sm text-[rgb(var(--text-secondary))]">
                Each share is valued at ₱1,000. The minimum deposit amount is
                ₱500.
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mt-6">
            <div className="p-4 border-b border-[rgba(var(--border-color),0.2)] bg-gray-50 dark:bg-gray-700/30">
              <h2 className="text-lg font-medium flex items-center gap-2">
                <HelpCircleIcon className="w-5 h-5 text-neon-red" />
                Need Help?
              </h2>
            </div>
            <div className="p-5">
              <p className="text-sm text-[rgb(var(--text-secondary))] mb-4">
                If you have any questions about your shares or need assistance
                with deposits, our support team is here to help.
              </p>
              <button className="w-full py-2 bg-neon-red text-white rounded-md hover:bg-neon-red/90 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
        {/* Deposit Form */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-[rgba(var(--border-color),0.2)] bg-gray-50 dark:bg-gray-700/30">
              <h2 className="text-lg font-medium">Deposit Form</h2>
            </div>
            {submitted ? <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mb-4">
                  <CheckCircleIcon size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Deposit Submitted Successfully!
                </h3>
                <p className="text-[rgb(var(--text-secondary))] mb-6">
                  Your deposit request has been received and will be processed
                  shortly.
                </p>
                <button onClick={() => setSubmitted(false)} className="px-4 py-2 bg-neon-red text-white rounded-md hover:bg-neon-red/90 transition-colors">
                  Make Another Deposit
                </button>
              </div> : <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium mb-1">
                      Deposit Amount (₱)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">₱</span>
                      </div>
                      <input type="number" id="amount" name="amount" min="500" step="500" value={formData.amount} onChange={handleInputChange} className={`pl-7 w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border ${formErrors.amount ? 'border-red-500' : 'border-[rgba(var(--border-color),0.2)]'} text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30`} placeholder="Enter amount" />
                    </div>
                    {formErrors.amount ? <p className="mt-1 text-xs text-red-500">
                        {formErrors.amount}
                      </p> : <p className="mt-1 text-xs text-[rgb(var(--text-secondary))]">
                        Minimum deposit: ₱500
                      </p>}
                    {formData.amount >= 500 && <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700/30 rounded text-sm">
                        <p>
                          <span className="text-[rgb(var(--text-secondary))]">
                            Shares to be added:{' '}
                          </span>
                          <span className="font-medium">
                            {Math.floor(formData.amount / 1000)}
                          </span>
                        </p>
                        <p>
                          <span className="text-[rgb(var(--text-secondary))]">
                            Remaining balance:{' '}
                          </span>
                          <span className="font-medium">
                            {formatCurrency(formData.amount % 1000)}
                          </span>
                        </p>
                      </div>}
                  </div>
                  <div>
                    <label htmlFor="paymentMethod" className="block text-sm font-medium mb-1">
                      Payment Method
                    </label>
                    <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30">
                      <option value="bank_transfer">Bank Transfer</option>
                      <option value="gcash">GCash</option>
                      <option value="paymaya">PayMaya</option>
                      <option value="cash">Cash</option>
                      <option value="check">Check</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="accountName" className="block text-sm font-medium mb-1">
                      Account Name Used
                    </label>
                    <input type="text" id="accountName" name="accountName" value={formData.accountName} onChange={handleInputChange} className={`w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border ${formErrors.accountName ? 'border-red-500' : 'border-[rgba(var(--border-color),0.2)]'} text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30`} placeholder="Enter account name" />
                    {formErrors.accountName && <p className="mt-1 text-xs text-red-500">
                        {formErrors.accountName}
                      </p>}
                  </div>
                  <div>
                    <label htmlFor="referenceNumber" className="block text-sm font-medium mb-1">
                      Reference Number
                    </label>
                    <input type="text" id="referenceNumber" name="referenceNumber" value={formData.referenceNumber} onChange={handleInputChange} className={`w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border ${formErrors.referenceNumber ? 'border-red-500' : 'border-[rgba(var(--border-color),0.2)]'} text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30`} placeholder="Enter reference number" />
                    {formErrors.referenceNumber && <p className="mt-1 text-xs text-red-500">
                        {formErrors.referenceNumber}
                      </p>}
                  </div>
                  <div>
                    <label htmlFor="transactionDate" className="block text-sm font-medium mb-1">
                      Transaction Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon className="w-5 h-5 text-[rgb(var(--text-secondary))]" />
                      </div>
                      <input type="date" id="transactionDate" name="transactionDate" value={formData.transactionDate} onChange={handleInputChange} max={new Date().toISOString().split('T')[0]} className="pl-10 w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Upload Proof of Payment
                    </label>
                    <div className={`border ${formErrors.proofOfPayment ? 'border-red-500' : 'border-[rgba(var(--border-color),0.2)]'} border-dashed rounded-lg p-4 text-center`}>
                      {filePreview ? <div>
                          <div className="relative mx-auto w-full max-w-xs mb-3">
                            <img src={filePreview} alt="Proof of payment preview" className="mx-auto max-h-48 rounded" />
                            <button type="button" onClick={clearFileUpload} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                          <p className="text-sm text-[rgb(var(--text-secondary))]">
                            {formData.proofOfPayment?.name}
                          </p>
                        </div> : <div className="py-8 relative">
                          <UploadIcon className="mx-auto h-12 w-12 text-[rgb(var(--text-secondary))]" />
                          <p className="mt-2 text-sm text-[rgb(var(--text-secondary))]">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-[rgb(var(--text-secondary))]">
                            PNG, JPG, PDF up to 10MB
                          </p>
                          <input type="file" id="proofOfPayment" name="proofOfPayment" accept="image/png, image/jpeg, application/pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" style={{
                      pointerEvents: 'auto'
                    }} onClick={e => e.stopPropagation()} />
                        </div>}
                    </div>
                    {formErrors.proofOfPayment && <p className="mt-1 text-xs text-red-500">
                        {formErrors.proofOfPayment}
                      </p>}
                  </div>
                </div>
                <div className="mt-8">
                  <button type="submit" disabled={isSubmitting} className="w-full py-2 bg-neon-red text-white rounded-md hover:bg-neon-red/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {isSubmitting ? <>
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                        Processing...
                      </> : 'Submit Deposit'}
                  </button>
                </div>
              </form>}
          </div>
        </div>
      </div>
    </>;
};