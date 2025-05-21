
import { useState, useEffect } from 'react';
import { Slider } from '../ui/slider';
import { Button } from '../ui/button';
import { Calculator } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface AmortizationRow {
  month: number;
  principal: number;
  interest: number;
  payment: number;
  remainingBalance: number;
}

const LoanCalculatorAmort = () => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [loanTerm, setLoanTerm] = useState(12);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const calculateAmortization = (amount: number, term: number) => {
    const monthlyInterestRate = 0.01;
    const monthlyPrincipal = amount / term;
    let remainingBalance = amount;
    const schedule: AmortizationRow[] = [];
    let totalInterestAccumulated = 0;

    for (let month = 1; month <= term; month++) {
      const monthlyInterest = remainingBalance * monthlyInterestRate;
      const payment = monthlyPrincipal + monthlyInterest;
      
      schedule.push({
        month,
        principal: monthlyPrincipal,
        interest: monthlyInterest,
        payment: payment,
        remainingBalance: remainingBalance - monthlyPrincipal
      });

      remainingBalance -= monthlyPrincipal;
      totalInterestAccumulated += monthlyInterest;
    }

    setAmortizationSchedule(schedule);
    setTotalInterest(totalInterestAccumulated);
    setTotalPayment(amount + totalInterestAccumulated);
    setMonthlyPayment(schedule[0].payment);
  };

  useEffect(() => {
    calculateAmortization(loanAmount, loanTerm);
  }, [loanAmount, loanTerm]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <section id="calculator-amort" className="py-16 md:py-24 bg-gradient-to-br from-red-50 to-teal-50 relative">
      <div className="absolute inset-0 z-0 opacity-5" style={{ 
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23C41E3A' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        backgroundSize: '20rem'
      }}></div>

      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Diminishing Balance Loan Calculator</h2>
          <p className="text-gray-600">
            Calculate your monthly payments and view your complete amortization schedule.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-xl p-6 md:p-8 shadow-lg mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-600">Loan Amount</label>
                    <span className="text-sm font-medium">{formatCurrency(loanAmount)}</span>
                  </div>
                  <Slider
                    defaultValue={[loanAmount]}
                    min={1000}
                    max={2000000}
                    step={1000}
                    onValueChange={(values) => setLoanAmount(values[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₱1,000</span>
                    <span>₱2,000,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-600">Loan Term (months)</label>
                    <span className="text-sm font-medium">{loanTerm} months</span>
                  </div>
                  <Slider
                    defaultValue={[loanTerm]}
                    min={1}
                    max={60}
                    step={1}
                    onValueChange={(values) => setLoanTerm(values[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 month</span>
                    <span>60 months</span>
                  </div>
                </div>

                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-600 mb-2">Fixed Interest Rate</p>
                  <p className="text-2xl font-bold text-red-700">1.00% per month</p>
                </div>
              </div>

              <div className="glass bg-white/90 rounded-xl p-6 flex flex-col justify-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mr-4">
                    <Calculator className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500">Monthly Payment</h4>
                    <p className="text-3xl font-bold text-gradient">{formatCurrency(monthlyPayment)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Total Principal</p>
                    <p className="text-xl font-semibold">{formatCurrency(loanAmount)}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Total Interest</p>
                    <p className="text-xl font-semibold">{formatCurrency(totalInterest)}</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg col-span-2">
                    <p className="text-sm text-red-600 mb-1">Total Amount to Pay</p>
                    <p className="text-2xl font-bold text-red-700">{formatCurrency(totalPayment)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Amortization Schedule Table */}
          <div className="glass rounded-xl p-6 overflow-hidden">
            <h3 className="text-xl font-semibold mb-4">Amortization Schedule</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Month</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead className="text-right">Principal</TableHead>
                    <TableHead className="text-right">Interest</TableHead>
                    <TableHead className="text-right">Payment</TableHead>
                    
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {amortizationSchedule.map((row) => (
                    <TableRow key={row.month}>
                      <TableCell className="font-medium">{row.month}</TableCell>
                      <TableCell className="text-right">{formatCurrency(row.remainingBalance)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(row.principal)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(row.interest)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(row.payment)}</TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoanCalculatorAmort;
