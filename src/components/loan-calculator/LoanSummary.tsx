import React from 'react';
import { FileTextIcon, DollarSignIcon, CalendarIcon, PercentIcon, CreditCardIcon, TrendingDownIcon } from 'lucide-react';
interface LoanSummaryProps {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  formatCurrency: (amount: number) => string;
}
export const LoanSummary: React.FC<LoanSummaryProps> = ({
  loanAmount,
  loanTerm,
  interestRate,
  monthlyPayment,
  totalInterest,
  totalPayment,
  formatCurrency
}) => {
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-[rgba(var(--border-color),0.2)] bg-gray-50 dark:bg-gray-700/30">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <FileTextIcon className="w-5 h-5 text-neon-red" />
          Loan Summary
        </h2>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1 text-[rgb(var(--text-secondary))]">
              <DollarSignIcon className="w-4 h-4" />
              <span>Loan Amount</span>
            </div>
            <p className="text-xl font-bold">{formatCurrency(loanAmount)}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1 text-[rgb(var(--text-secondary))]">
              <CalendarIcon className="w-4 h-4" />
              <span>Loan Term</span>
            </div>
            <p className="text-xl font-bold">
              {loanTerm} {loanTerm === 1 ? 'month' : 'months'}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1 text-[rgb(var(--text-secondary))]">
              <PercentIcon className="w-4 h-4" />
              <span>Interest Rate</span>
            </div>
            <p className="text-xl font-bold">{interestRate}% monthly</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1 text-[rgb(var(--text-secondary))]">
              <CreditCardIcon className="w-4 h-4" />
              <span>Monthly Payment</span>
            </div>
            <p className="text-xl font-bold text-neon-red">
              {formatCurrency(monthlyPayment)}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1 text-[rgb(var(--text-secondary))]">
              <TrendingDownIcon className="w-4 h-4" />
              <span>Total Interest</span>
            </div>
            <p className="text-xl font-bold text-orange-500">
              {formatCurrency(totalInterest)}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1 text-[rgb(var(--text-secondary))]">
              <DollarSignIcon className="w-4 h-4" />
              <span>Total Payment</span>
            </div>
            <p className="text-xl font-bold">{formatCurrency(totalPayment)}</p>
          </div>
        </div>
      </div>
    </div>;
};