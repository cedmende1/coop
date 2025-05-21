import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { LoanTabs, LoanTabType } from '../components/loans/LoanTabs';
import { LoansFilter } from '../components/loans/LoansFilter';
import { LoansList } from '../components/loans/LoansList';
import { LoansPagination } from '../components/loans/LoansPagination';
import { LoanViewModal } from '../components/loans/LoanViewModal';
import { LoanStatusModal } from '../components/loans/LoanStatusModal';
import { RepaymentsList } from '../components/loans/RepaymentsList';
import { RepaymentModal } from '../components/loans/RepaymentModal';
import { LoanApprovalsList } from '../components/loans/LoanApprovalsList';
import { LoanApprovalModal } from '../components/loans/LoanApprovalModal';
import { useLoans } from '../hooks/useLoans';
import { useRepayments } from '../hooks/useRepayments';
import { useLoanApprovals } from '../hooks/useLoanApprovals';
import { Loan, Repayment, LoanApplication } from '../types/loan';
// Mock data for loans
const mockLoans: Loan[] = [{
  id: 'LN-2023-0001',
  borrowerId: 'M001',
  borrowerName: 'Juan Dela Cruz',
  amount: 50000,
  interestRate: 12,
  term: 12,
  startDate: '2023-05-15',
  endDate: '2024-05-15',
  loanType: 'personal',
  status: 'active',
  paymentFrequency: 'monthly',
  totalPaid: 25000,
  nextPaymentDate: '2023-11-15',
  nextPaymentAmount: 4500,
  remainingBalance: 25000,
  latePayments: 0,
  loanOfficer: 'Maria Santos',
  applicationDate: '2023-04-30',
  approvalDate: '2023-05-10'
}, {
  id: 'LN-2023-0002',
  borrowerId: 'M002',
  borrowerName: 'Maria Santos',
  amount: 100000,
  interestRate: 10,
  term: 24,
  startDate: '2023-03-10',
  endDate: '2025-03-10',
  loanType: 'business',
  status: 'active',
  paymentFrequency: 'monthly',
  totalPaid: 30000,
  nextPaymentDate: '2023-11-10',
  nextPaymentAmount: 4600,
  remainingBalance: 70000,
  latePayments: 1,
  loanOfficer: 'Pedro Reyes',
  applicationDate: '2023-02-20',
  approvalDate: '2023-03-05'
}, {
  id: 'LN-2023-0003',
  borrowerId: 'M003',
  borrowerName: 'Pedro Reyes',
  amount: 75000,
  interestRate: 8,
  term: 18,
  startDate: '2023-01-20',
  endDate: '2024-07-20',
  loanType: 'education',
  status: 'defaulted',
  paymentFrequency: 'monthly',
  totalPaid: 15000,
  nextPaymentDate: '2023-11-20',
  nextPaymentAmount: 4400,
  remainingBalance: 60000,
  latePayments: 3,
  loanOfficer: 'Ana Gonzales',
  applicationDate: '2023-01-05',
  approvalDate: '2023-01-15',
  notes: 'Borrower has missed 3 consecutive payments. Contact initiated on 2023-10-15.'
}, {
  id: 'LN-2023-0004',
  borrowerId: 'M004',
  borrowerName: 'Ana Gonzales',
  amount: 200000,
  interestRate: 9.5,
  term: 36,
  startDate: '2022-11-05',
  endDate: '2025-11-05',
  loanType: 'mortgage',
  status: 'active',
  paymentFrequency: 'monthly',
  totalPaid: 60000,
  nextPaymentDate: '2023-11-05',
  nextPaymentAmount: 6300,
  remainingBalance: 140000,
  latePayments: 0,
  loanOfficer: 'Luis Torres',
  applicationDate: '2022-10-15',
  approvalDate: '2022-10-30'
}, {
  id: 'LN-2023-0005',
  borrowerId: 'M005',
  borrowerName: 'Luis Torres',
  amount: 30000,
  interestRate: 15,
  term: 6,
  startDate: '2023-06-01',
  endDate: '2023-12-01',
  loanType: 'emergency',
  status: 'active',
  paymentFrequency: 'monthly',
  totalPaid: 25000,
  nextPaymentDate: '2023-11-01',
  nextPaymentAmount: 5300,
  remainingBalance: 5000,
  latePayments: 0,
  loanOfficer: 'Juan Dela Cruz',
  applicationDate: '2023-05-25',
  approvalDate: '2023-05-28'
}, {
  id: 'LN-2023-0006',
  borrowerId: 'M006',
  borrowerName: 'Carmen Velasquez',
  amount: 80000,
  interestRate: 11,
  term: 24,
  startDate: '2022-09-15',
  endDate: '2024-09-15',
  loanType: 'business',
  status: 'restructured',
  paymentFrequency: 'monthly',
  totalPaid: 40000,
  nextPaymentDate: '2023-11-15',
  nextPaymentAmount: 3200,
  remainingBalance: 40000,
  latePayments: 2,
  loanOfficer: 'Maria Santos',
  applicationDate: '2022-08-30',
  approvalDate: '2022-09-10',
  notes: 'Loan restructured on 2023-07-01 due to financial hardship. Term extended by 6 months.'
}, {
  id: 'LN-2023-0007',
  borrowerId: 'M007',
  borrowerName: 'Roberto Garcia',
  amount: 45000,
  interestRate: 12.5,
  term: 12,
  startDate: '2023-02-10',
  endDate: '2024-02-10',
  loanType: 'personal',
  status: 'paid',
  paymentFrequency: 'monthly',
  totalPaid: 45000,
  nextPaymentDate: '2023-10-10',
  nextPaymentAmount: 0,
  remainingBalance: 0,
  latePayments: 0,
  loanOfficer: 'Pedro Reyes',
  applicationDate: '2023-01-25',
  approvalDate: '2023-02-05'
}, {
  id: 'LN-2023-0008',
  borrowerId: 'M008',
  borrowerName: 'Sofia Lim',
  amount: 120000,
  interestRate: 10.5,
  term: 30,
  startDate: '2023-04-20',
  endDate: '2025-10-20',
  loanType: 'business',
  status: 'active',
  paymentFrequency: 'monthly',
  totalPaid: 28000,
  nextPaymentDate: '2023-11-20',
  nextPaymentAmount: 4200,
  remainingBalance: 92000,
  latePayments: 0,
  loanOfficer: 'Ana Gonzales',
  applicationDate: '2023-04-05',
  approvalDate: '2023-04-15'
}];
// Mock data for repayments
const mockRepayments: Repayment[] = [{
  id: 'RPM-2023-0001',
  loanId: 'LN-2023-0001',
  borrowerName: 'Juan Dela Cruz',
  amount: 4500,
  dueDate: '2023-11-15',
  status: 'pending'
}, {
  id: 'RPM-2023-0002',
  loanId: 'LN-2023-0002',
  borrowerName: 'Maria Santos',
  amount: 4600,
  dueDate: '2023-11-10',
  status: 'pending'
}, {
  id: 'RPM-2023-0003',
  loanId: 'LN-2023-0003',
  borrowerName: 'Pedro Reyes',
  amount: 4400,
  dueDate: '2023-10-20',
  status: 'overdue'
}, {
  id: 'RPM-2023-0004',
  loanId: 'LN-2023-0004',
  borrowerName: 'Ana Gonzales',
  amount: 6300,
  dueDate: '2023-11-05',
  status: 'pending'
}, {
  id: 'RPM-2023-0005',
  loanId: 'LN-2023-0005',
  borrowerName: 'Luis Torres',
  amount: 5300,
  dueDate: '2023-11-01',
  status: 'pending'
}, {
  id: 'RPM-2023-0006',
  loanId: 'LN-2023-0006',
  borrowerName: 'Carmen Velasquez',
  amount: 3200,
  dueDate: '2023-11-15',
  status: 'pending'
}, {
  id: 'RPM-2023-0007',
  loanId: 'LN-2023-0008',
  borrowerName: 'Sofia Lim',
  amount: 4200,
  dueDate: '2023-11-20',
  status: 'pending'
}, {
  id: 'RPM-2023-0008',
  loanId: 'LN-2023-0001',
  borrowerName: 'Juan Dela Cruz',
  amount: 4500,
  dueDate: '2023-10-15',
  paidDate: '2023-10-14',
  status: 'paid',
  method: 'bank_transfer',
  reference: 'BNKT-12345'
}, {
  id: 'RPM-2023-0009',
  loanId: 'LN-2023-0002',
  borrowerName: 'Maria Santos',
  amount: 4600,
  dueDate: '2023-10-10',
  paidDate: '2023-10-09',
  status: 'paid',
  method: 'cash'
}, {
  id: 'RPM-2023-0010',
  loanId: 'LN-2023-0004',
  borrowerName: 'Ana Gonzales',
  amount: 6300,
  dueDate: '2023-10-05',
  paidDate: '2023-10-05',
  status: 'paid',
  method: 'online',
  reference: 'ONL-56789'
}];
// Mock data for loan applications
const mockLoanApplications: LoanApplication[] = [{
  id: 'APP-2023-0001',
  applicantId: 'M009',
  applicantName: 'Eduardo Tan',
  requestedAmount: 60000,
  purpose: 'Home renovation and repairs after recent storm damage.',
  loanType: 'personal',
  term: 12,
  applicationDate: '2023-10-28',
  status: 'pending',
  monthlyIncome: 35000,
  existingLoans: 0
}, {
  id: 'APP-2023-0002',
  applicantId: 'M010',
  applicantName: 'Isabella Reyes',
  requestedAmount: 150000,
  purpose: 'Business expansion for small grocery store, including new refrigeration equipment and inventory.',
  loanType: 'business',
  term: 36,
  applicationDate: '2023-10-25',
  status: 'pending',
  creditScore: 720,
  monthlyIncome: 45000,
  existingLoans: 20000,
  collateral: 'Store property and equipment'
}, {
  id: 'APP-2023-0003',
  applicantId: 'M011',
  applicantName: 'Miguel Santos',
  requestedAmount: 80000,
  purpose: 'Educational expenses for medical school, including tuition and books.',
  loanType: 'education',
  term: 48,
  applicationDate: '2023-10-20',
  status: 'additional_info',
  monthlyIncome: 15000,
  existingLoans: 0,
  notes: 'Need proof of enrollment and detailed tuition breakdown.',
  reviewedBy: 'Ana Gonzales',
  reviewDate: '2023-10-27'
}, {
  id: 'APP-2023-0004',
  applicantId: 'M012',
  applicantName: 'Camila Ramos',
  requestedAmount: 25000,
  purpose: 'Emergency medical expenses for surgery.',
  loanType: 'emergency',
  term: 6,
  applicationDate: '2023-10-29',
  status: 'pending',
  monthlyIncome: 28000,
  existingLoans: 5000
}, {
  id: 'APP-2023-0005',
  applicantId: 'M013',
  applicantName: 'Antonio Lim',
  requestedAmount: 300000,
  purpose: 'Down payment for residential property.',
  loanType: 'mortgage',
  term: 60,
  applicationDate: '2023-10-15',
  status: 'approved',
  creditScore: 750,
  monthlyIncome: 60000,
  existingLoans: 10000,
  collateral: 'Property to be purchased',
  reviewedBy: 'Pedro Reyes',
  reviewDate: '2023-10-25',
  notes: 'Approved with standard terms. Excellent credit history and stable income.'
}, {
  id: 'APP-2023-0006',
  applicantId: 'M014',
  applicantName: 'Elena Castro',
  requestedAmount: 45000,
  purpose: 'Debt consolidation of high-interest credit cards.',
  loanType: 'personal',
  term: 24,
  applicationDate: '2023-10-18',
  status: 'rejected',
  creditScore: 580,
  monthlyIncome: 25000,
  existingLoans: 35000,
  reviewedBy: 'Maria Santos',
  reviewDate: '2023-10-26',
  notes: 'Rejected due to high debt-to-income ratio and low credit score.'
}];
export const Loans = () => {
  const [activeTab, setActiveTab] = useState<LoanTabType>('loans');
  // Modals state
  const [viewLoan, setViewLoan] = useState<Loan | null>(null);
  const [statusLoan, setStatusLoan] = useState<Loan | null>(null);
  const [viewRepayment, setViewRepayment] = useState<Repayment | null>(null);
  const [viewApplication, setViewApplication] = useState<LoanApplication | null>(null);
  // Use custom hooks for loan management
  const {
    loans,
    filteredLoans,
    searchTerm: loanSearchTerm,
    setSearchTerm: setLoanSearchTerm,
    filters: loanFilters,
    setFilters: setLoanFilters,
    currentPage: loanCurrentPage,
    totalPages: loanTotalPages,
    indexOfFirstItem: loanFirstItem,
    indexOfLastItem: loanLastItem,
    paginate: loanPaginate,
    goToFirstPage: loanFirstPage,
    goToLastPage: loanLastPage,
    goToPrevPage: loanPrevPage,
    goToNextPage: loanNextPage,
    formatDate,
    formatCurrency,
    updateLoanStatus
  } = useLoans(mockLoans);
  // Use custom hooks for repayment management
  const {
    repayments,
    filteredRepayments,
    searchTerm: repaymentSearchTerm,
    setSearchTerm: setRepaymentSearchTerm,
    filters: repaymentFilters,
    setFilters: setRepaymentFilters,
    currentPage: repaymentCurrentPage,
    totalPages: repaymentTotalPages,
    indexOfFirstItem: repaymentFirstItem,
    indexOfLastItem: repaymentLastItem,
    paginate: repaymentPaginate,
    goToFirstPage: repaymentFirstPage,
    goToLastPage: repaymentLastPage,
    goToPrevPage: repaymentPrevPage,
    goToNextPage: repaymentNextPage,
    formatDate: formatRepaymentDate,
    formatCurrency: formatRepaymentCurrency,
    recordPayment
  } = useRepayments(mockRepayments);
  // Use custom hooks for loan approvals management
  const {
    approvals,
    filteredApprovals,
    searchTerm: approvalSearchTerm,
    setSearchTerm: setApprovalSearchTerm,
    filters: approvalFilters,
    setFilters: setApprovalFilters,
    currentPage: approvalCurrentPage,
    totalPages: approvalTotalPages,
    indexOfFirstItem: approvalFirstItem,
    indexOfLastItem: approvalLastItem,
    paginate: approvalPaginate,
    goToFirstPage: approvalFirstPage,
    goToLastPage: approvalLastPage,
    goToPrevPage: approvalPrevPage,
    goToNextPage: approvalNextPage,
    formatDate: formatApprovalDate,
    formatCurrency: formatApprovalCurrency,
    approveLoanApplication,
    rejectLoanApplication,
    requestAdditionalInfo
  } = useLoanApprovals(mockLoanApplications);
  // Modal handlers
  const handleViewLoan = (loan: Loan) => {
    setViewLoan(loan);
  };
  const handleUpdateLoanStatus = (loan: Loan) => {
    setStatusLoan(loan);
  };
  const handleViewRepaymentDetails = (repayment: Repayment) => {
    // In a real app, you'd fetch detailed information here
    setViewRepayment(repayment);
  };
  const handleRecordPayment = (repayment: Repayment) => {
    setViewRepayment(repayment);
  };
  const handleViewApplication = (application: LoanApplication) => {
    setViewApplication(application);
  };
  return <div className="relative">
      <PageHeader title="Loans" description="Manage loans, repayments, and applications" />
      {/* Tab navigation */}
      <LoanTabs activeTab={activeTab} setActiveTab={setActiveTab} counts={{
      loans: filteredLoans.length,
      repayments: filteredRepayments.length,
      approvals: filteredApprovals.length
    }} />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {/* Loan List Tab */}
        {activeTab === 'loans' && <>
            <LoansFilter searchTerm={loanSearchTerm} setSearchTerm={setLoanSearchTerm} filters={loanFilters} setFilters={setLoanFilters} />
            <LoansList loans={loans} formatDate={formatDate} formatCurrency={formatCurrency} onViewLoan={handleViewLoan} onUpdateStatus={handleUpdateLoanStatus} />
            {filteredLoans.length > 0 && <LoansPagination currentPage={loanCurrentPage} totalPages={loanTotalPages} indexOfFirstItem={loanFirstItem} indexOfLastItem={loanLastItem} totalItems={filteredLoans.length} paginate={loanPaginate} goToFirstPage={loanFirstPage} goToLastPage={loanLastPage} goToPrevPage={loanPrevPage} goToNextPage={loanNextPage} itemName="loans" />}
          </>}
        {/* Repayment Tracking Tab */}
        {activeTab === 'repayments' && <>
            <LoansFilter searchTerm={repaymentSearchTerm} setSearchTerm={setRepaymentSearchTerm} filters={repaymentFilters} setFilters={setRepaymentFilters} />
            <RepaymentsList repayments={repayments} formatDate={formatRepaymentDate} formatCurrency={formatRepaymentCurrency} onRecordPayment={handleRecordPayment} onViewDetails={handleViewRepaymentDetails} />
            {filteredRepayments.length > 0 && <LoansPagination currentPage={repaymentCurrentPage} totalPages={repaymentTotalPages} indexOfFirstItem={repaymentFirstItem} indexOfLastItem={repaymentLastItem} totalItems={filteredRepayments.length} paginate={repaymentPaginate} goToFirstPage={repaymentFirstPage} goToLastPage={repaymentLastPage} goToPrevPage={repaymentPrevPage} goToNextPage={repaymentNextPage} itemName="repayments" />}
          </>}
        {/* Pending Approvals Tab */}
        {activeTab === 'approvals' && <>
            <LoansFilter searchTerm={approvalSearchTerm} setSearchTerm={setApprovalSearchTerm} filters={approvalFilters} setFilters={setApprovalFilters} />
            <LoanApprovalsList approvals={approvals} formatDate={formatApprovalDate} formatCurrency={formatApprovalCurrency} onViewDetails={handleViewApplication} />
            {filteredApprovals.length > 0 && <LoansPagination currentPage={approvalCurrentPage} totalPages={approvalTotalPages} indexOfFirstItem={approvalFirstItem} indexOfLastItem={approvalLastItem} totalItems={filteredApprovals.length} paginate={approvalPaginate} goToFirstPage={approvalFirstPage} goToLastPage={approvalLastPage} goToPrevPage={approvalPrevPage} goToNextPage={approvalNextPage} itemName="applications" />}
          </>}
      </div>
      {/* Modals */}
      {viewLoan && <LoanViewModal isOpen={viewLoan !== null} onClose={() => setViewLoan(null)} loan={viewLoan} formatDate={formatDate} formatCurrency={formatCurrency} />}
      {statusLoan && <LoanStatusModal isOpen={statusLoan !== null} onClose={() => setStatusLoan(null)} loan={statusLoan} onUpdateStatus={updateLoanStatus} />}
      {viewRepayment && <RepaymentModal isOpen={viewRepayment !== null} onClose={() => setViewRepayment(null)} repayment={viewRepayment} onRecordPayment={recordPayment} formatCurrency={formatRepaymentCurrency} />}
      {viewApplication && <LoanApprovalModal isOpen={viewApplication !== null} onClose={() => setViewApplication(null)} application={viewApplication} onApprove={approveLoanApplication} onReject={rejectLoanApplication} onRequestInfo={requestAdditionalInfo} formatDate={formatApprovalDate} formatCurrency={formatApprovalCurrency} />}
    </div>;
};