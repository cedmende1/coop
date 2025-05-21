import { useState, useEffect } from 'react';
export interface AmortizationRow {
  month: number;
  principal: number;
  interest: number;
  payment: number;
  balance: number;
}
export interface LoanSummary {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}
export const useLoanCalculator = (initialAmount: number, initialTerm: number, initialRate: number) => {
  const [loanAmount, setLoanAmount] = useState(initialAmount);
  const [loanTerm, setLoanTerm] = useState(initialTerm);
  const [interestRate, setInterestRate] = useState(initialRate);
  const [summary, setSummary] = useState<LoanSummary>({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0
  });
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);
  useEffect(() => {
    calculateLoan();
  }, [loanAmount, loanTerm, interestRate]);
  const calculateLoan = () => {
    const monthlyRate = interestRate / 100;
    let balance = loanAmount;
    let totalInterest = 0;
    const schedule: AmortizationRow[] = [];
    const principalPayment = loanAmount / loanTerm;
    for (let month = 1; month <= loanTerm; month++) {
      const interestPayment = balance * monthlyRate;
      const monthlyPayment = principalPayment + interestPayment;
      schedule.push({
        month,
        principal: principalPayment,
        interest: interestPayment,
        payment: monthlyPayment,
        balance: balance - principalPayment
      });
      totalInterest += interestPayment;
      balance -= principalPayment;
    }
    const avgMonthlyPayment = schedule.reduce((sum, row) => sum + row.payment, 0) / loanTerm;
    setSummary({
      monthlyPayment: avgMonthlyPayment,
      totalPayment: loanAmount + totalInterest,
      totalInterest
    });
    setAmortizationSchedule(schedule);
  };
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  return {
    loanAmount,
    setLoanAmount,
    loanTerm,
    setLoanTerm,
    interestRate,
    setInterestRate,
    summary,
    amortizationSchedule,
    formatCurrency
  };
};