import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { CheckCircleIcon, ClockIcon, CircleIcon, HelpCircleIcon, ArrowRightIcon, FileTextIcon, CalendarIcon, BadgeCheckIcon, DollarSignIcon, PercentIcon, InfoIcon, AlertCircleIcon, ChevronRightIcon, XCircleIcon } from 'lucide-react';
// Define types for loan application
interface LoanApplication {
  id: string;
  loanType: string;
  amount: number;
  status: 'submitted' | 'under_review' | 'approved' | 'rejected' | 'pending_info';
  submittedDate: string;
  lastUpdated: string;
  remarks?: string;
}
// Define types for the form
interface LoanFormData {
  loanType: string;
  loanAmount: number;
  loanTerm: number;
  loanPurpose: string;
  additionalInfo: string;
  signature: string;
}
// Mock data for existing applications
const mockApplications: LoanApplication[] = [{
  id: 'LA-2025-0427',
  loanType: 'Educational Loan',
  amount: 25000,
  status: 'under_review',
  submittedDate: '2025-04-25',
  lastUpdated: '2025-04-27',
  remarks: 'Application is currently under review by the loan committee.'
}];
// Loan types data
const loanTypes = [{
  id: 'educational',
  name: 'Educational Loan',
  description: 'For tuition fees, books, and other educational expenses',
  icon: <FileTextIcon className="w-5 h-5" />,
  interestRate: 8,
  maxAmount: 100000,
  maxTerm: 48
}, {
  id: 'personal',
  name: 'Personal Loan',
  description: 'For personal expenses, home improvements, or emergencies',
  icon: <BadgeCheckIcon className="w-5 h-5" />,
  interestRate: 12,
  maxAmount: 50000,
  maxTerm: 24
}, {
  id: 'salary',
  name: 'Salary Loan',
  description: 'Quick cash advance against your salary',
  icon: <DollarSignIcon className="w-5 h-5" />,
  interestRate: 10,
  maxAmount: 30000,
  maxTerm: 12
}, {
  id: 'emergency',
  name: 'Emergency Loan',
  description: 'For urgent medical expenses or unforeseen emergencies',
  icon: <AlertCircleIcon className="w-5 h-5" />,
  interestRate: 9,
  maxAmount: 20000,
  maxTerm: 6
}];
export const RequestLoan = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<'form' | 'status'>('form');
  // State for form data
  const [formData, setFormData] = useState<LoanFormData>({
    loanType: 'educational',
    loanAmount: 0,
    loanTerm: 0,
    loanPurpose: '',
    additionalInfo: '',
    signature: ''
  });
  // State for signature pad
  const [isDrawing, setIsDrawing] = useState(false);
  const [signaturePoints, setSignaturePoints] = useState<{
    x: number;
    y: number;
  }[]>([]);
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  // Get selected loan type
  const selectedLoanType = loanTypes.find(type => type.id === formData.loanType) || loanTypes[0];
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    // Special handling for numeric fields
    if (name === 'loanAmount' || name === 'loanTerm') {
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
  // Handle loan type selection
  const handleLoanTypeSelect = (loanTypeId: string) => {
    setFormData({
      ...formData,
      loanType: loanTypeId
    });
  };
  // Signature pad handlers
  const startDrawing = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsDrawing(true);
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setSignaturePoints([...signaturePoints, {
      x,
      y
    }]);
  };
  const draw = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDrawing) return;
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setSignaturePoints([...signaturePoints, {
      x,
      y
    }]);
  };
  const stopDrawing = () => {
    setIsDrawing(false);
  };
  const clearSignature = () => {
    setSignaturePoints([]);
  };
  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.loanAmount) errors.loanAmount = 'Loan amount is required';
    if (formData.loanAmount > selectedLoanType.maxAmount) errors.loanAmount = `Maximum loan amount is ₱${selectedLoanType.maxAmount.toLocaleString()}`;
    if (!formData.loanTerm) errors.loanTerm = 'Loan term is required';
    if (formData.loanTerm > selectedLoanType.maxTerm) errors.loanTerm = `Maximum term is ${selectedLoanType.maxTerm} months`;
    if (!formData.loanPurpose) errors.loanPurpose = 'Loan purpose is required';
    if (signaturePoints.length === 0) errors.signature = 'Signature is required';
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
      // Reset form after submission
      setTimeout(() => {
        setActiveTab('status');
      }, 1500);
    }, 1000);
  };
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0
    }).format(amount);
  };
  return <>
      <PageHeader title="Apply for a Loan" description="Fill out the application form to apply for a loan." />
      {/* Tab Navigation */}
      <div className="flex mb-6 border-b border-[rgba(var(--border-color),0.2)]">
        <button className={`px-4 py-3 text-sm font-medium relative ${activeTab === 'form' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('form')}>
          Application Form
        </button>
        <button className={`px-4 py-3 text-sm font-medium relative ${activeTab === 'status' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('status')}>
          Check Progress
        </button>
      </div>
      {activeTab === 'form' && <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {submitted ? <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mb-4">
                <CheckCircleIcon size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Application Submitted Successfully!
              </h3>
              <p className="text-[rgb(var(--text-secondary))] mb-6">
                Your loan application has been received. You can check the
                status on the Progress tab.
              </p>
              <button onClick={() => setActiveTab('status')} className="px-4 py-2 bg-neon-red text-white rounded-md hover:bg-neon-red/90 transition-colors">
                Check Application Status
              </button>
            </div> : <form onSubmit={handleSubmit}>
              <div className="p-6 border-b border-[rgba(var(--border-color),0.2)]">
                <h2 className="text-xl font-semibold mb-1">
                  Loan Application Form
                </h2>
                <p className="text-[rgb(var(--text-secondary))]">
                  Select a loan type and fill out the required information.
                </p>
              </div>
              {/* Loan Type Selection */}
              <div className="p-6 border-b border-[rgba(var(--border-color),0.2)]">
                <h3 className="text-lg font-medium mb-4">Select Loan Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {loanTypes.map(loanType => <div key={loanType.id} onClick={() => handleLoanTypeSelect(loanType.id)} className={`border rounded-lg p-4 cursor-pointer transition-all ${formData.loanType === loanType.id ? 'border-neon-red bg-[rgba(var(--neon-red),0.05)]' : 'border-[rgba(var(--border-color),0.2)] hover:border-neon-red/50'}`}>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${formData.loanType === loanType.id ? 'bg-[rgba(var(--neon-red),0.1)]' : 'bg-gray-100 dark:bg-gray-700/30'}`}>
                          {loanType.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{loanType.name}</h4>
                          <p className="text-sm text-[rgb(var(--text-secondary))] mt-1">
                            {loanType.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center text-xs text-[rgb(var(--text-secondary))]">
                              <PercentIcon className="w-3 h-3 mr-1" />
                              {loanType.interestRate}% interest
                            </div>
                            <div className="flex items-center text-xs text-[rgb(var(--text-secondary))]">
                              <CalendarIcon className="w-3 h-3 mr-1" />
                              Up to {loanType.maxTerm} months
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
              {/* Loan Details Section */}
              <div className="p-6 border-b border-[rgba(var(--border-color),0.2)]">
                <h3 className="text-lg font-medium mb-4">Loan Details</h3>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="loanAmount" className="block text-sm font-medium">
                      Loan Amount (₱)
                    </label>
                    <span className="text-sm font-medium">
                      Max: {formatCurrency(selectedLoanType.maxAmount)}
                    </span>
                  </div>
                  <input type="number" id="loanAmount" name="loanAmount" min="1000" max={selectedLoanType.maxAmount} value={formData.loanAmount || ''} onChange={handleInputChange} className={`w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border ${formErrors.loanAmount ? 'border-red-500' : 'border-[rgba(var(--border-color),0.2)]'} text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30`} placeholder="Enter loan amount" />
                  {formErrors.loanAmount && <p className="mt-1 text-xs text-red-500">
                      {formErrors.loanAmount}
                    </p>}
                </div>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="loanTerm" className="block text-sm font-medium">
                      Loan Term (months)
                    </label>
                    <span className="text-sm font-medium">
                      Max: {selectedLoanType.maxTerm} months
                    </span>
                  </div>
                  <input type="number" id="loanTerm" name="loanTerm" min="1" max={selectedLoanType.maxTerm} value={formData.loanTerm || ''} onChange={handleInputChange} className={`w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border ${formErrors.loanTerm ? 'border-red-500' : 'border-[rgba(var(--border-color),0.2)]'} text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30`} placeholder="Enter loan term" />
                  {formErrors.loanTerm && <p className="mt-1 text-xs text-red-500">
                      {formErrors.loanTerm}
                    </p>}
                </div>
                <div className="mb-6">
                  <label htmlFor="loanPurpose" className="block text-sm font-medium mb-2">
                    Loan Purpose
                  </label>
                  <textarea id="loanPurpose" name="loanPurpose" value={formData.loanPurpose} onChange={handleInputChange} rows={4} className={`w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border ${formErrors.loanPurpose ? 'border-red-500' : 'border-[rgba(var(--border-color),0.2)]'} text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30`} placeholder="Please describe the purpose of this loan"></textarea>
                  {formErrors.loanPurpose && <p className="mt-1 text-xs text-red-500">
                      {formErrors.loanPurpose}
                    </p>}
                </div>
                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-medium mb-2">
                    Additional Information (optional)
                  </label>
                  <textarea id="additionalInfo" name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" placeholder="Any additional information that might support your application"></textarea>
                </div>
              </div>
              {/* Loan Summary */}
              {formData.loanAmount > 0 && formData.loanTerm > 0 && <div className="p-6 border-b border-[rgba(var(--border-color),0.2)] bg-gray-50 dark:bg-gray-800/50">
                  <h3 className="text-lg font-medium mb-4">Loan Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-700/30 p-4 rounded-lg">
                      <p className="text-sm text-[rgb(var(--text-secondary))]">
                        Monthly Payment (Estimated)
                      </p>
                      <p className="text-xl font-bold text-neon-red">
                        {formatCurrency(Math.round(formData.loanAmount / formData.loanTerm * (1 + selectedLoanType.interestRate / 100)))}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-700/30 p-4 rounded-lg">
                      <p className="text-sm text-[rgb(var(--text-secondary))]">
                        Total Interest
                      </p>
                      <p className="text-xl font-bold">
                        {formatCurrency(Math.round(formData.loanAmount * (selectedLoanType.interestRate / 100) * (formData.loanTerm / 12)))}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-700/30 p-4 rounded-lg">
                      <p className="text-sm text-[rgb(var(--text-secondary))]">
                        Total Repayment
                      </p>
                      <p className="text-xl font-bold">
                        {formatCurrency(formData.loanAmount + Math.round(formData.loanAmount * (selectedLoanType.interestRate / 100) * (formData.loanTerm / 12)))}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-[rgb(var(--text-secondary))] mt-3">
                    * This is an estimate. Actual values may vary based on final
                    approval and terms.
                  </p>
                </div>}
              {/* Oath and Signature Section */}
              <div className="p-6 border-b border-[rgba(var(--border-color),0.2)]">
                <h3 className="text-lg font-medium mb-4">Oath and Signature</h3>
                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg text-sm">
                  <p>
                    I, the undersigned, do solemnly swear that all information
                    provided in this application is true and correct to the best
                    of my knowledge. I understand and accept the terms and
                    conditions of this loan, and I hereby pledge to repay the
                    full amount of the loan with interest as agreed upon in the
                    loan contract. I am aware that providing false information
                    may result in the rejection of my application and may
                    constitute fraud, which is punishable by law.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Signature
                  </label>
                  <div className={`border ${formErrors.signature ? 'border-red-500' : 'border-[rgba(var(--border-color),0.2)]'} rounded-lg bg-white dark:bg-gray-800 h-40 relative cursor-crosshair`} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}>
                    <svg width="100%" height="100%">
                      {signaturePoints.map((point, i) => {
                  if (i === 0 || i === signaturePoints.length - 1) {
                    return null;
                  }
                  const prevPoint = signaturePoints[i - 1];
                  return <line key={i} x1={prevPoint.x} y1={prevPoint.y} x2={point.x} y2={point.y} stroke="currentColor" strokeWidth="2" />;
                })}
                    </svg>
                    {signaturePoints.length === 0 && <div className="absolute inset-0 flex items-center justify-center text-[rgb(var(--text-secondary))] pointer-events-none">
                        Sign here
                      </div>}
                  </div>
                  {formErrors.signature && <p className="mt-1 text-xs text-red-500">
                      {formErrors.signature}
                    </p>}
                  <div className="mt-2">
                    <button type="button" onClick={clearSignature} className="px-3 py-1 text-sm border border-[rgba(var(--border-color),0.2)] rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                      Clear Signature
                    </button>
                  </div>
                </div>
              </div>
              {/* Help Section */}
              <div className="p-6 border-b border-[rgba(var(--border-color),0.2)] bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-start gap-3">
                  <HelpCircleIcon className="w-5 h-5 text-[rgb(var(--text-secondary))] mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Need Assistance?</h4>
                    <p className="text-sm text-[rgb(var(--text-secondary))]">
                      If you need help with your application, please contact our
                      customer service at support@lendology.com or call
                      1-800-LEND-123.
                    </p>
                  </div>
                </div>
              </div>
              {/* Form Actions */}
              <div className="p-6 flex justify-between">
                <button type="button" onClick={() => window.history.back()} className="px-4 py-2 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  Back to Dashboard
                </button>
                <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2">
                  {isSubmitting ? <>
                      <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                      Submitting...
                    </> : 'Submit Application'}
                </button>
              </div>
            </form>}
        </div>}
      {activeTab === 'status' && <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[rgba(var(--border-color),0.2)]">
            <h2 className="text-xl font-semibold mb-1">Application Status</h2>
            <p className="text-[rgb(var(--text-secondary))]">
              Track the progress of your loan application
            </p>
          </div>
          {mockApplications.length > 0 ? <div className="p-6">
              {mockApplications.map(application => <div key={application.id} className="border border-[rgba(var(--border-color),0.2)] rounded-lg overflow-hidden">
                  {/* Application Header */}
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">
                            {application.loanType}
                          </h3>
                          {application.status === 'under_review' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              UNDER REVIEW
                            </span>}
                          {application.status === 'submitted' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                              <CheckCircleIcon className="w-3 h-3 mr-1" />
                              SUBMITTED
                            </span>}
                          {application.status === 'approved' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                              <CheckCircleIcon className="w-3 h-3 mr-1" />
                              APPROVED
                            </span>}
                          {application.status === 'rejected' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
                              <XCircleIcon className="w-3 h-3 mr-1" />
                              REJECTED
                            </span>}
                          {application.status === 'pending_info' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400">
                              <InfoIcon className="w-3 h-3 mr-1" />
                              INFO NEEDED
                            </span>}
                        </div>
                        <p className="text-sm text-[rgb(var(--text-secondary))]">
                          Application ID: {application.id}
                        </p>
                      </div>
                      <div className="flex flex-col md:items-end">
                        <div className="text-sm font-medium">
                          {formatCurrency(application.amount)}
                        </div>
                        <div className="text-xs text-[rgb(var(--text-secondary))]">
                          Submitted: {application.submittedDate} • Updated:{' '}
                          {application.lastUpdated}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Application Timeline */}
                  <div className="p-6">
                    <h4 className="text-sm font-medium mb-6">
                      Application Progress
                    </h4>
                    <div className="relative">
                      {/* Timeline Line */}
                      <div className="absolute left-6 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                      {/* Timeline Steps */}
                      <div className="space-y-8">
                        <div className="relative flex items-start">
                          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 z-10 mr-4">
                            <CheckCircleIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <h5 className="text-base font-medium">
                              Application Submitted
                            </h5>
                            <p className="text-sm text-[rgb(var(--text-secondary))] mb-2">
                              Your loan application was received on{' '}
                              {application.submittedDate}
                            </p>
                            <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                              <CheckCircleIcon className="w-3 h-3 mr-1" />
                              Completed
                            </div>
                          </div>
                        </div>
                        <div className="relative flex items-start">
                          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 z-10 mr-4">
                            <ClockIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <h5 className="text-base font-medium">
                              Application Review
                            </h5>
                            <p className="text-sm text-[rgb(var(--text-secondary))] mb-2">
                              {application.status === 'under_review' ? 'Your application is currently being reviewed by our loan committee' : 'This step is pending'}
                            </p>
                            <div className="flex items-center text-xs text-yellow-600 dark:text-yellow-400">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              In Progress
                            </div>
                          </div>
                        </div>
                        <div className="relative flex items-start">
                          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 z-10 mr-4">
                            <CircleIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <h5 className="text-base font-medium text-gray-500 dark:text-gray-400">
                              Final Decision
                            </h5>
                            <p className="text-sm text-[rgb(var(--text-secondary))] mb-2">
                              Pending approval or rejection
                            </p>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              Pending
                            </div>
                          </div>
                        </div>
                        <div className="relative flex items-start">
                          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 z-10 mr-4">
                            <CircleIcon className="w-6 h-6" />
                          </div>
                          <div>
                            <h5 className="text-base font-medium text-gray-500 dark:text-gray-400">
                              Loan Disbursement
                            </h5>
                            <p className="text-sm text-[rgb(var(--text-secondary))] mb-2">
                              Funds will be transferred to your account after
                              approval
                            </p>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              Pending
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Remarks Section */}
                  {application.remarks && <div className="p-4 border-t border-[rgba(var(--border-color),0.2)] bg-gray-50 dark:bg-gray-700/30">
                      <div className="flex items-start gap-3">
                        <InfoIcon className="w-5 h-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Remarks</h4>
                          <p className="text-sm">{application.remarks}</p>
                        </div>
                      </div>
                    </div>}
                  {/* Actions */}
                  <div className="p-4 border-t border-[rgba(var(--border-color),0.2)]">
                    <div className="flex justify-end gap-3">
                      <button className="px-4 py-2 text-sm border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        Contact Support
                      </button>
                      {application.status === 'pending_info' && <button className="px-4 py-2 text-sm bg-neon-red text-white rounded-lg hover:bg-neon-red/90 transition-colors">
                          Provide Information
                        </button>}
                    </div>
                  </div>
                </div>)}
            </div> : <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 text-[rgb(var(--text-secondary))] mb-4">
                <ClockIcon size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                No Applications Found
              </h3>
              <p className="text-[rgb(var(--text-secondary))] mb-6">
                You don't have any active loan applications at the moment.
              </p>
              <button onClick={() => setActiveTab('form')} className="px-4 py-2 bg-neon-red text-white rounded-md hover:bg-neon-red/90 transition-colors">
                Apply for a Loan
              </button>
            </div>}
        </div>}
    </>;
};