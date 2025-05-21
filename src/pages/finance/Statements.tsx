import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { FileIcon, FileSpreadsheetIcon, PrinterIcon, ChevronDownIcon, ArrowUpIcon, ArrowDownIcon, InfoIcon } from 'lucide-react';
// Define types for financial statement data
interface FinancialMetrics {
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
}
interface IncomeStatementItem {
  name: string;
  amount: number;
  percentage?: number;
  subItems?: {
    name: string;
    amount: number;
  }[];
}
interface CashFlowStatementItem {
  name: string;
  amount: number;
  subItems?: {
    name: string;
    amount: number;
  }[];
}
interface FinancialData {
  q1: {
    metrics: FinancialMetrics;
    incomeStatement: {
      revenue: IncomeStatementItem[];
      expenses: IncomeStatementItem[];
      netIncome: number;
    };
    cashFlow: {
      operating: CashFlowStatementItem[];
      investing: CashFlowStatementItem[];
      financing: CashFlowStatementItem[];
      netCashFlow: number;
    };
  };
  q2: {
    metrics: FinancialMetrics;
    incomeStatement: {
      revenue: IncomeStatementItem[];
      expenses: IncomeStatementItem[];
      netIncome: number;
    };
    cashFlow: {
      operating: CashFlowStatementItem[];
      investing: CashFlowStatementItem[];
      financing: CashFlowStatementItem[];
      netCashFlow: number;
    };
  };
  q3: {
    metrics: FinancialMetrics;
    incomeStatement: {
      revenue: IncomeStatementItem[];
      expenses: IncomeStatementItem[];
      netIncome: number;
    };
    cashFlow: {
      operating: CashFlowStatementItem[];
      investing: CashFlowStatementItem[];
      financing: CashFlowStatementItem[];
      netCashFlow: number;
    };
  };
  q4: {
    metrics: FinancialMetrics;
    incomeStatement: {
      revenue: IncomeStatementItem[];
      expenses: IncomeStatementItem[];
      netIncome: number;
    };
    cashFlow: {
      operating: CashFlowStatementItem[];
      investing: CashFlowStatementItem[];
      financing: CashFlowStatementItem[];
      netCashFlow: number;
    };
  };
}
// Mock data for financial statements
const mockFinancialData: FinancialData = {
  q1: {
    metrics: {
      totalAssets: 5250000,
      totalLiabilities: 2750000,
      totalEquity: 2500000
    },
    incomeStatement: {
      revenue: [{
        name: 'Interest Income',
        amount: 325000,
        percentage: 65,
        subItems: [{
          name: 'Loan Interest',
          amount: 275000
        }, {
          name: 'Investment Interest',
          amount: 50000
        }]
      }, {
        name: 'Fee Income',
        amount: 125000,
        percentage: 25,
        subItems: [{
          name: 'Processing Fees',
          amount: 75000
        }, {
          name: 'Late Payment Fees',
          amount: 25000
        }, {
          name: 'Service Charges',
          amount: 25000
        }]
      }, {
        name: 'Other Income',
        amount: 50000,
        percentage: 10,
        subItems: [{
          name: 'Penalties',
          amount: 30000
        }, {
          name: 'Miscellaneous',
          amount: 20000
        }]
      }],
      expenses: [{
        name: 'Personnel Expenses',
        amount: 175000,
        percentage: 35,
        subItems: [{
          name: 'Salaries and Wages',
          amount: 150000
        }, {
          name: 'Benefits',
          amount: 25000
        }]
      }, {
        name: 'Administrative Expenses',
        amount: 125000,
        percentage: 25,
        subItems: [{
          name: 'Rent',
          amount: 50000
        }, {
          name: 'Utilities',
          amount: 25000
        }, {
          name: 'Office Supplies',
          amount: 15000
        }, {
          name: 'Insurance',
          amount: 35000
        }]
      }, {
        name: 'Financial Expenses',
        amount: 75000,
        percentage: 15,
        subItems: [{
          name: 'Interest on Deposits',
          amount: 50000
        }, {
          name: 'Bank Charges',
          amount: 25000
        }]
      }, {
        name: 'Other Expenses',
        amount: 25000,
        percentage: 5,
        subItems: [{
          name: 'Marketing',
          amount: 15000
        }, {
          name: 'Miscellaneous',
          amount: 10000
        }]
      }],
      netIncome: 100000
    },
    cashFlow: {
      operating: [{
        name: 'Cash from Operations',
        amount: 150000,
        subItems: [{
          name: 'Receipts from Customers',
          amount: 475000
        }, {
          name: 'Payments to Suppliers',
          amount: -125000
        }, {
          name: 'Payments to Employees',
          amount: -175000
        }, {
          name: 'Interest Paid',
          amount: -25000
        }]
      }],
      investing: [{
        name: 'Cash from Investing',
        amount: -200000,
        subItems: [{
          name: 'Purchase of Equipment',
          amount: -75000
        }, {
          name: 'Purchase of Investments',
          amount: -150000
        }, {
          name: 'Sale of Investments',
          amount: 25000
        }]
      }],
      financing: [{
        name: 'Cash from Financing',
        amount: 100000,
        subItems: [{
          name: 'Member Capital Contributions',
          amount: 150000
        }, {
          name: 'Dividend Payments',
          amount: -50000
        }]
      }],
      netCashFlow: 50000
    }
  },
  q2: {
    metrics: {
      totalAssets: 5500000,
      totalLiabilities: 2850000,
      totalEquity: 2650000
    },
    incomeStatement: {
      revenue: [{
        name: 'Interest Income',
        amount: 350000,
        percentage: 63.6,
        subItems: [{
          name: 'Loan Interest',
          amount: 300000
        }, {
          name: 'Investment Interest',
          amount: 50000
        }]
      }, {
        name: 'Fee Income',
        amount: 150000,
        percentage: 27.3,
        subItems: [{
          name: 'Processing Fees',
          amount: 85000
        }, {
          name: 'Late Payment Fees',
          amount: 35000
        }, {
          name: 'Service Charges',
          amount: 30000
        }]
      }, {
        name: 'Other Income',
        amount: 50000,
        percentage: 9.1,
        subItems: [{
          name: 'Penalties',
          amount: 30000
        }, {
          name: 'Miscellaneous',
          amount: 20000
        }]
      }],
      expenses: [{
        name: 'Personnel Expenses',
        amount: 180000,
        percentage: 36,
        subItems: [{
          name: 'Salaries and Wages',
          amount: 155000
        }, {
          name: 'Benefits',
          amount: 25000
        }]
      }, {
        name: 'Administrative Expenses',
        amount: 130000,
        percentage: 26,
        subItems: [{
          name: 'Rent',
          amount: 50000
        }, {
          name: 'Utilities',
          amount: 28000
        }, {
          name: 'Office Supplies',
          amount: 17000
        }, {
          name: 'Insurance',
          amount: 35000
        }]
      }, {
        name: 'Financial Expenses',
        amount: 80000,
        percentage: 16,
        subItems: [{
          name: 'Interest on Deposits',
          amount: 55000
        }, {
          name: 'Bank Charges',
          amount: 25000
        }]
      }, {
        name: 'Other Expenses',
        amount: 30000,
        percentage: 6,
        subItems: [{
          name: 'Marketing',
          amount: 20000
        }, {
          name: 'Miscellaneous',
          amount: 10000
        }]
      }],
      netIncome: 130000
    },
    cashFlow: {
      operating: [{
        name: 'Cash from Operations',
        amount: 175000,
        subItems: [{
          name: 'Receipts from Customers',
          amount: 525000
        }, {
          name: 'Payments to Suppliers',
          amount: -135000
        }, {
          name: 'Payments to Employees',
          amount: -180000
        }, {
          name: 'Interest Paid',
          amount: -35000
        }]
      }],
      investing: [{
        name: 'Cash from Investing',
        amount: -150000,
        subItems: [{
          name: 'Purchase of Equipment',
          amount: -50000
        }, {
          name: 'Purchase of Investments',
          amount: -125000
        }, {
          name: 'Sale of Investments',
          amount: 25000
        }]
      }],
      financing: [{
        name: 'Cash from Financing',
        amount: 75000,
        subItems: [{
          name: 'Member Capital Contributions',
          amount: 125000
        }, {
          name: 'Dividend Payments',
          amount: -50000
        }]
      }],
      netCashFlow: 100000
    }
  },
  q3: {
    metrics: {
      totalAssets: 5750000,
      totalLiabilities: 2950000,
      totalEquity: 2800000
    },
    incomeStatement: {
      revenue: [{
        name: 'Interest Income',
        amount: 375000,
        percentage: 65.2,
        subItems: [{
          name: 'Loan Interest',
          amount: 325000
        }, {
          name: 'Investment Interest',
          amount: 50000
        }]
      }, {
        name: 'Fee Income',
        amount: 150000,
        percentage: 26.1,
        subItems: [{
          name: 'Processing Fees',
          amount: 90000
        }, {
          name: 'Late Payment Fees',
          amount: 30000
        }, {
          name: 'Service Charges',
          amount: 30000
        }]
      }, {
        name: 'Other Income',
        amount: 50000,
        percentage: 8.7,
        subItems: [{
          name: 'Penalties',
          amount: 30000
        }, {
          name: 'Miscellaneous',
          amount: 20000
        }]
      }],
      expenses: [{
        name: 'Personnel Expenses',
        amount: 185000,
        percentage: 37,
        subItems: [{
          name: 'Salaries and Wages',
          amount: 160000
        }, {
          name: 'Benefits',
          amount: 25000
        }]
      }, {
        name: 'Administrative Expenses',
        amount: 125000,
        percentage: 25,
        subItems: [{
          name: 'Rent',
          amount: 50000
        }, {
          name: 'Utilities',
          amount: 25000
        }, {
          name: 'Office Supplies',
          amount: 15000
        }, {
          name: 'Insurance',
          amount: 35000
        }]
      }, {
        name: 'Financial Expenses',
        amount: 85000,
        percentage: 17,
        subItems: [{
          name: 'Interest on Deposits',
          amount: 60000
        }, {
          name: 'Bank Charges',
          amount: 25000
        }]
      }, {
        name: 'Other Expenses',
        amount: 30000,
        percentage: 6,
        subItems: [{
          name: 'Marketing',
          amount: 20000
        }, {
          name: 'Miscellaneous',
          amount: 10000
        }]
      }],
      netIncome: 150000
    },
    cashFlow: {
      operating: [{
        name: 'Cash from Operations',
        amount: 200000,
        subItems: [{
          name: 'Receipts from Customers',
          amount: 550000
        }, {
          name: 'Payments to Suppliers',
          amount: -130000
        }, {
          name: 'Payments to Employees',
          amount: -185000
        }, {
          name: 'Interest Paid',
          amount: -35000
        }]
      }],
      investing: [{
        name: 'Cash from Investing',
        amount: -175000,
        subItems: [{
          name: 'Purchase of Equipment',
          amount: -75000
        }, {
          name: 'Purchase of Investments',
          amount: -125000
        }, {
          name: 'Sale of Investments',
          amount: 25000
        }]
      }],
      financing: [{
        name: 'Cash from Financing',
        amount: 50000,
        subItems: [{
          name: 'Member Capital Contributions',
          amount: 100000
        }, {
          name: 'Dividend Payments',
          amount: -50000
        }]
      }],
      netCashFlow: 75000
    }
  },
  q4: {
    metrics: {
      totalAssets: 6000000,
      totalLiabilities: 3000000,
      totalEquity: 3000000
    },
    incomeStatement: {
      revenue: [{
        name: 'Interest Income',
        amount: 400000,
        percentage: 66.7,
        subItems: [{
          name: 'Loan Interest',
          amount: 350000
        }, {
          name: 'Investment Interest',
          amount: 50000
        }]
      }, {
        name: 'Fee Income',
        amount: 150000,
        percentage: 25,
        subItems: [{
          name: 'Processing Fees',
          amount: 90000
        }, {
          name: 'Late Payment Fees',
          amount: 30000
        }, {
          name: 'Service Charges',
          amount: 30000
        }]
      }, {
        name: 'Other Income',
        amount: 50000,
        percentage: 8.3,
        subItems: [{
          name: 'Penalties',
          amount: 30000
        }, {
          name: 'Miscellaneous',
          amount: 20000
        }]
      }],
      expenses: [{
        name: 'Personnel Expenses',
        amount: 190000,
        percentage: 38,
        subItems: [{
          name: 'Salaries and Wages',
          amount: 165000
        }, {
          name: 'Benefits',
          amount: 25000
        }]
      }, {
        name: 'Administrative Expenses',
        amount: 125000,
        percentage: 25,
        subItems: [{
          name: 'Rent',
          amount: 50000
        }, {
          name: 'Utilities',
          amount: 25000
        }, {
          name: 'Office Supplies',
          amount: 15000
        }, {
          name: 'Insurance',
          amount: 35000
        }]
      }, {
        name: 'Financial Expenses',
        amount: 85000,
        percentage: 17,
        subItems: [{
          name: 'Interest on Deposits',
          amount: 60000
        }, {
          name: 'Bank Charges',
          amount: 25000
        }]
      }, {
        name: 'Other Expenses',
        amount: 30000,
        percentage: 6,
        subItems: [{
          name: 'Marketing',
          amount: 20000
        }, {
          name: 'Miscellaneous',
          amount: 10000
        }]
      }],
      netIncome: 170000
    },
    cashFlow: {
      operating: [{
        name: 'Cash from Operations',
        amount: 225000,
        subItems: [{
          name: 'Receipts from Customers',
          amount: 575000
        }, {
          name: 'Payments to Suppliers',
          amount: -130000
        }, {
          name: 'Payments to Employees',
          amount: -185000
        }, {
          name: 'Interest Paid',
          amount: -35000
        }]
      }],
      investing: [{
        name: 'Cash from Investing',
        amount: -150000,
        subItems: [{
          name: 'Purchase of Equipment',
          amount: -50000
        }, {
          name: 'Purchase of Investments',
          amount: -125000
        }, {
          name: 'Sale of Investments',
          amount: 25000
        }]
      }],
      financing: [{
        name: 'Cash from Financing',
        amount: 75000,
        subItems: [{
          name: 'Member Capital Contributions',
          amount: 125000
        }, {
          name: 'Dividend Payments',
          amount: -50000
        }]
      }],
      netCashFlow: 150000
    }
  }
};
export const Statements = () => {
  // State for quarter filter
  const [selectedQuarter, setSelectedQuarter] = useState<'q1' | 'q2' | 'q3' | 'q4'>('q4');
  const [isQuarterDropdownOpen, setIsQuarterDropdownOpen] = useState(false);
  // Get data based on selected quarter
  const data = mockFinancialData[selectedQuarter];
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(amount);
  };
  // Format percentage
  const formatPercentage = (percentage: number | undefined) => {
    if (percentage === undefined) return '';
    return `${percentage}%`;
  };
  // Handle export to PDF
  const handleExportPDF = () => {
    console.log('Exporting to PDF');
    // In a real app, you would generate a PDF file
  };
  // Handle export to Excel
  const handleExportExcel = () => {
    console.log('Exporting to Excel');
    // In a real app, you would generate an Excel file
  };
  // Handle print
  const handlePrint = () => {
    console.log('Printing');
    // In a real app, you would open the print dialog
  };
  return <>
      <PageHeader title="Financial Statements" description="View and generate financial statements" />
      <div className="space-y-6">
        {/* Controls Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative">
              <button onClick={() => setIsQuarterDropdownOpen(!isQuarterDropdownOpen)} className="px-4 py-2 rounded-lg border border-[rgba(var(--border-color),0.2)] flex items-center gap-2 bg-[rgba(var(--input-bg),0.8)] hover:bg-[rgba(var(--input-bg),1)]">
                <span>
                  Quarter {selectedQuarter.toUpperCase().replace('Q', '')},{' '}
                  {new Date().getFullYear()}
                </span>
                <ChevronDownIcon size={16} className={`transition-transform ${isQuarterDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isQuarterDropdownOpen && <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-[rgba(var(--border-color),0.2)]">
                  <button onClick={() => {
                setSelectedQuarter('q1');
                setIsQuarterDropdownOpen(false);
              }} className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedQuarter === 'q1' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                    Q1, {new Date().getFullYear()}
                  </button>
                  <button onClick={() => {
                setSelectedQuarter('q2');
                setIsQuarterDropdownOpen(false);
              }} className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedQuarter === 'q2' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                    Q2, {new Date().getFullYear()}
                  </button>
                  <button onClick={() => {
                setSelectedQuarter('q3');
                setIsQuarterDropdownOpen(false);
              }} className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedQuarter === 'q3' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                    Q3, {new Date().getFullYear()}
                  </button>
                  <button onClick={() => {
                setSelectedQuarter('q4');
                setIsQuarterDropdownOpen(false);
              }} className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedQuarter === 'q4' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                    Q4, {new Date().getFullYear()}
                  </button>
                </div>}
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={handleExportPDF} className="px-3 py-2 rounded-lg border border-[rgba(var(--border-color),0.2)] flex items-center gap-2 bg-[rgba(var(--input-bg),0.8)] hover:bg-[rgba(var(--input-bg),1)]" title="Export to PDF">
                <FileIcon size={16} />
                <span className="hidden sm:inline">Export PDF</span>
              </button>
              <button onClick={handleExportExcel} className="px-3 py-2 rounded-lg border border-[rgba(var(--border-color),0.2)] flex items-center gap-2 bg-[rgba(var(--input-bg),0.8)] hover:bg-[rgba(var(--input-bg),1)]" title="Export to Excel">
                <FileSpreadsheetIcon size={16} />
                <span className="hidden sm:inline">Export Excel</span>
              </button>
              <button onClick={handlePrint} className="px-3 py-2 rounded-lg border border-[rgba(var(--border-color),0.2)] flex items-center gap-2 bg-[rgba(var(--input-bg),0.8)] hover:bg-[rgba(var(--input-bg),1)]" title="Print">
                <PrinterIcon size={16} />
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>
        </div>
        {/* Financial Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
            <p className="text-sm text-[rgb(var(--text-secondary))]">
              Total Assets
            </p>
            <h3 className="text-2xl font-bold mt-1">
              {formatCurrency(data.metrics.totalAssets)}
            </h3>
            <div className="mt-2 text-xs text-[rgb(var(--text-secondary))]">
              Resources owned by the organization
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
            <p className="text-sm text-[rgb(var(--text-secondary))]">
              Total Liabilities
            </p>
            <h3 className="text-2xl font-bold mt-1">
              {formatCurrency(data.metrics.totalLiabilities)}
            </h3>
            <div className="mt-2 text-xs text-[rgb(var(--text-secondary))]">
              Debts and obligations owed
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5">
            <p className="text-sm text-[rgb(var(--text-secondary))]">
              Total Equity
            </p>
            <h3 className="text-2xl font-bold mt-1">
              {formatCurrency(data.metrics.totalEquity)}
            </h3>
            <div className="mt-2 text-xs text-[rgb(var(--text-secondary))]">
              Net value after liabilities
            </div>
          </div>
        </div>
        {/* Income Statement */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[rgba(var(--border-color),0.2)]">
            <h2 className="text-lg font-semibold">Income Statement</h2>
            <p className="text-sm text-[rgb(var(--text-secondary))]">
              Quarter {selectedQuarter.toUpperCase().replace('Q', '')},{' '}
              {new Date().getFullYear()}
            </p>
          </div>
          <div className="p-6">
            {/* Revenue Section */}
            <div className="mb-6">
              <h3 className="text-md font-semibold mb-3">Revenue</h3>
              <div className="space-y-3">
                {data.incomeStatement.revenue.map((item, index) => <div key={index}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-xs text-[rgb(var(--text-secondary))] bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                          {formatPercentage(item.percentage)}
                        </span>
                      </div>
                      <span className="font-medium">
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                    {item.subItems && <div className="mt-2 pl-4 space-y-1">
                        {item.subItems.map((subItem, subIndex) => <div key={subIndex} className="flex justify-between items-center text-sm text-[rgb(var(--text-secondary))]">
                            <span>{subItem.name}</span>
                            <span>{formatCurrency(subItem.amount)}</span>
                          </div>)}
                      </div>}
                  </div>)}
                <div className="flex justify-between items-center pt-3 border-t border-[rgba(var(--border-color),0.2)]">
                  <span className="font-medium">Total Revenue</span>
                  <span className="font-medium">
                    {formatCurrency(data.incomeStatement.revenue.reduce((sum, item) => sum + item.amount, 0))}
                  </span>
                </div>
              </div>
            </div>
            {/* Expenses Section */}
            <div className="mb-6">
              <h3 className="text-md font-semibold mb-3">Expenses</h3>
              <div className="space-y-3">
                {data.incomeStatement.expenses.map((item, index) => <div key={index}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-xs text-[rgb(var(--text-secondary))] bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                          {formatPercentage(item.percentage)}
                        </span>
                      </div>
                      <span className="font-medium">
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                    {item.subItems && <div className="mt-2 pl-4 space-y-1">
                        {item.subItems.map((subItem, subIndex) => <div key={subIndex} className="flex justify-between items-center text-sm text-[rgb(var(--text-secondary))]">
                            <span>{subItem.name}</span>
                            <span>{formatCurrency(subItem.amount)}</span>
                          </div>)}
                      </div>}
                  </div>)}
                <div className="flex justify-between items-center pt-3 border-t border-[rgba(var(--border-color),0.2)]">
                  <span className="font-medium">Total Expenses</span>
                  <span className="font-medium">
                    {formatCurrency(data.incomeStatement.expenses.reduce((sum, item) => sum + item.amount, 0))}
                  </span>
                </div>
              </div>
            </div>
            {/* Net Income */}
            <div className="pt-4 border-t-2 border-[rgba(var(--border-color),0.2)]">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Net Income</span>
                <span className="font-bold text-lg">
                  {formatCurrency(data.incomeStatement.netIncome)}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Cash Flow Statement */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[rgba(var(--border-color),0.2)]">
            <h2 className="text-lg font-semibold">Cash Flow Statement</h2>
            <p className="text-sm text-[rgb(var(--text-secondary))]">
              Quarter {selectedQuarter.toUpperCase().replace('Q', '')},{' '}
              {new Date().getFullYear()}
            </p>
          </div>
          <div className="p-6">
            {/* Operating Activities */}
            <div className="mb-6">
              <h3 className="text-md font-semibold mb-3">
                Operating Activities
              </h3>
              <div className="space-y-3">
                {data.cashFlow.operating.map((item, index) => <div key={index}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-medium flex items-center">
                        {item.amount >= 0 ? <ArrowUpIcon size={16} className="mr-1 text-green-500" /> : <ArrowDownIcon size={16} className="mr-1 text-red-500" />}
                        {formatCurrency(Math.abs(item.amount))}
                      </span>
                    </div>
                    {item.subItems && <div className="mt-2 pl-4 space-y-1">
                        {item.subItems.map((subItem, subIndex) => <div key={subIndex} className="flex justify-between items-center text-sm text-[rgb(var(--text-secondary))]">
                            <span>{subItem.name}</span>
                            <span>{formatCurrency(subItem.amount)}</span>
                          </div>)}
                      </div>}
                  </div>)}
              </div>
            </div>
            {/* Investing Activities */}
            <div className="mb-6">
              <h3 className="text-md font-semibold mb-3">
                Investing Activities
              </h3>
              <div className="space-y-3">
                {data.cashFlow.investing.map((item, index) => <div key={index}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-medium flex items-center">
                        {item.amount >= 0 ? <ArrowUpIcon size={16} className="mr-1 text-green-500" /> : <ArrowDownIcon size={16} className="mr-1 text-red-500" />}
                        {formatCurrency(Math.abs(item.amount))}
                      </span>
                    </div>
                    {item.subItems && <div className="mt-2 pl-4 space-y-1">
                        {item.subItems.map((subItem, subIndex) => <div key={subIndex} className="flex justify-between items-center text-sm text-[rgb(var(--text-secondary))]">
                            <span>{subItem.name}</span>
                            <span>{formatCurrency(subItem.amount)}</span>
                          </div>)}
                      </div>}
                  </div>)}
              </div>
            </div>
            {/* Financing Activities */}
            <div className="mb-6">
              <h3 className="text-md font-semibold mb-3">
                Financing Activities
              </h3>
              <div className="space-y-3">
                {data.cashFlow.financing.map((item, index) => <div key={index}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-medium flex items-center">
                        {item.amount >= 0 ? <ArrowUpIcon size={16} className="mr-1 text-green-500" /> : <ArrowDownIcon size={16} className="mr-1 text-red-500" />}
                        {formatCurrency(Math.abs(item.amount))}
                      </span>
                    </div>
                    {item.subItems && <div className="mt-2 pl-4 space-y-1">
                        {item.subItems.map((subItem, subIndex) => <div key={subIndex} className="flex justify-between items-center text-sm text-[rgb(var(--text-secondary))]">
                            <span>{subItem.name}</span>
                            <span>{formatCurrency(subItem.amount)}</span>
                          </div>)}
                      </div>}
                  </div>)}
              </div>
            </div>
            {/* Net Cash Flow */}
            <div className="pt-4 border-t-2 border-[rgba(var(--border-color),0.2)]">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Net Cash Flow</span>
                <span className={`font-bold text-lg flex items-center ${data.cashFlow.netCashFlow >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {data.cashFlow.netCashFlow >= 0 ? <ArrowUpIcon size={20} className="mr-1" /> : <ArrowDownIcon size={20} className="mr-1" />}
                  {formatCurrency(Math.abs(data.cashFlow.netCashFlow))}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Notes Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-start gap-3">
            <InfoIcon className="w-5 h-5 text-[rgb(var(--text-secondary))] mt-0.5" />
            <div>
              <h3 className="text-md font-semibold mb-1">Notes</h3>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                These financial statements are prepared in accordance with
                Philippine Financial Reporting Standards (PFRS). For a complete
                understanding of the organization's financial position, please
                refer to the full annual report.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>;
};