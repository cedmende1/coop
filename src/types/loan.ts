export type LoanStatus = 'active' | 'paid' | 'defaulted' | 'restructured' | 'pending';
export type LoanType = 'personal' | 'business' | 'education' | 'mortgage' | 'emergency';
export type PaymentFrequency = 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';
export interface Loan {
  id: string;
  borrowerId: string;
  borrowerName: string;
  borrowerAvatar?: string;
  amount: number;
  interestRate: number;
  term: number; // in months
  startDate: string;
  endDate: string;
  loanType: LoanType;
  status: LoanStatus;
  paymentFrequency: PaymentFrequency;
  totalPaid: number;
  nextPaymentDate: string;
  nextPaymentAmount: number;
  remainingBalance: number;
  latePayments: number;
  loanOfficer: string;
  applicationDate: string;
  approvalDate?: string;
  notes?: string;
}
export interface Repayment {
  id: string;
  loanId: string;
  borrowerName: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  method?: 'cash' | 'bank_transfer' | 'check' | 'online';
  reference?: string;
  notes?: string;
  paidAmount?: number;
}
export interface LoanApplication {
  id: string;
  applicantId: string;
  applicantName: string;
  applicantAvatar?: string;
  requestedAmount: number;
  purpose: string;
  loanType: LoanType;
  term: number; // in months
  applicationDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'additional_info';
  creditScore?: number;
  monthlyIncome: number;
  existingLoans: number;
  collateral?: string;
  guarantor?: string;
  reviewedBy?: string;
  reviewDate?: string;
  notes?: string;
}