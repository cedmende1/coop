import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { LoanParametersForm } from '../components/loan-calculator/LoanParametersForm';
import { LoanSummary } from '../components/loan-calculator/LoanSummary';
import { VisualizationTabs } from '../components/loan-calculator/VisualizationTabs';
import { AmortizationTable } from '../components/loan-calculator/AmortizationTable';
import { useLoanCalculator } from '../hooks/useLoanCalculator';
export const LoanCalculator = () => {
  const {
    loanAmount,
    setLoanAmount,
    loanTerm,
    setLoanTerm,
    interestRate,
    setInterestRate,
    summary,
    amortizationSchedule,
    formatCurrency
  } = useLoanCalculator(100000, 12, 1);
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanAmount(Number(e.target.value));
  };
  const handleLoanTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanTerm(Number(e.target.value));
  };
  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(Number(e.target.value));
  };
  return <>
      <PageHeader title="Loan Calculator" description="Calculate loan payments using the Diminishing Balance Method" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <LoanParametersForm loanAmount={loanAmount} loanTerm={loanTerm} interestRate={interestRate} onLoanAmountChange={handleLoanAmountChange} onLoanTermChange={handleLoanTermChange} onInterestRateChange={handleInterestRateChange} formatCurrency={formatCurrency} />
        <div className="lg:col-span-2 space-y-6">
          <LoanSummary loanAmount={loanAmount} loanTerm={loanTerm} interestRate={interestRate} monthlyPayment={summary.monthlyPayment} totalInterest={summary.totalInterest} totalPayment={summary.totalPayment} formatCurrency={formatCurrency} />
          <VisualizationTabs amortizationSchedule={amortizationSchedule} totalInterest={summary.totalInterest} totalPrincipal={loanAmount} formatCurrency={formatCurrency} />
          <AmortizationTable amortizationSchedule={amortizationSchedule} formatCurrency={formatCurrency} />
        </div>
      </div>
    </>;
};