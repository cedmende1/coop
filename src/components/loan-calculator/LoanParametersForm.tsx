import React from 'react';
import { CalculatorIcon, InfoIcon } from 'lucide-react';
interface LoanParametersFormProps {
  loanAmount: number;
  loanTerm: number;
  interestRate: number;
  onLoanAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLoanTermChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInterestRateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formatCurrency: (amount: number) => string;
}
export const LoanParametersForm: React.FC<LoanParametersFormProps> = ({
  loanAmount,
  loanTerm,
  interestRate,
  onLoanAmountChange,
  onLoanTermChange,
  onInterestRateChange,
  formatCurrency
}) => {
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-[rgba(var(--border-color),0.2)] bg-gray-50 dark:bg-gray-700/30">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <CalculatorIcon className="w-5 h-5 text-neon-red" />
          Loan Calculator
        </h2>
        <p className="text-sm text-[rgb(var(--text-secondary))]">
          Calculate loan payments using the Diminishing Balance Method
        </p>
      </div>
      <div className="p-5">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label htmlFor="loanAmount" className="block text-sm font-medium">
              Loan Amount
            </label>
            <span className="text-sm font-semibold text-neon-red">
              {formatCurrency(loanAmount)}
            </span>
          </div>
          <div className="relative mb-4">
            <input type="text" id="loanAmountInput" name="loanAmount" value={loanAmount} onChange={onLoanAmountChange} className="w-full px-3 py-2 pl-8 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--text-secondary))]">
              ₱
            </span>
          </div>
          <input type="range" id="loanAmount" min="10000" max="1000000" step="10000" value={loanAmount} onChange={onLoanAmountChange} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-red" />
          <div className="flex justify-between mt-1 text-xs text-[rgb(var(--text-secondary))]">
            <span>₱10,000</span>
            <span>₱1,000,000</span>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label htmlFor="loanTerm" className="block text-sm font-medium">
              Loan Term
            </label>
            <span className="text-sm font-semibold text-neon-red">
              {loanTerm} {loanTerm === 1 ? 'month' : 'months'}
            </span>
          </div>
          <div className="relative mb-4">
            <input type="text" id="loanTermInput" name="loanTerm" value={loanTerm} onChange={onLoanTermChange} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
          </div>
          <input type="range" id="loanTerm" min="1" max="60" step="1" value={loanTerm} onChange={onLoanTermChange} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-red" />
          <div className="flex justify-between mt-1 text-xs text-[rgb(var(--text-secondary))]">
            <span>1 month</span>
            <span>60 months</span>
          </div>
        </div>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label htmlFor="interestRate" className="block text-sm font-medium">
              Interest Rate (Monthly)
            </label>
            <span className="text-sm font-semibold text-neon-red">
              {interestRate.toFixed(2)}%
            </span>
          </div>
          <div className="relative mb-4">
            <input type="text" id="interestRateInput" name="interestRate" value={interestRate} onChange={onInterestRateChange} className="w-full px-3 py-2 pr-8 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--text-secondary))]">
              %
            </span>
          </div>
          <input type="range" id="interestRate" min="0.1" max="5" step="0.1" value={interestRate} onChange={onInterestRateChange} className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon-red" />
          <div className="flex justify-between mt-1 text-xs text-[rgb(var(--text-secondary))]">
            <span>0.1%</span>
            <span>5%</span>
          </div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
          <div className="flex items-start gap-2">
            <InfoIcon className="w-4 h-4 text-[rgb(var(--text-secondary))] mt-0.5" />
            <p className="text-xs text-[rgb(var(--text-secondary))]">
              This calculator uses the Diminishing Balance Method, where
              interest is calculated on the remaining balance each month.
            </p>
          </div>
        </div>
      </div>
    </div>;
};