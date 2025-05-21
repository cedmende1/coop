import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { SearchIcon, CalendarIcon, PlusIcon, FilterIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, TrendingUpIcon } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
// Define types for capital shares data
interface CapitalSharesTransaction {
  id: string;
  memberName: string;
  memberNumber: string;
  date: string;
  type: 'deposit' | 'withdrawal' | 'dividend' | 'initial';
  amount: number;
}
// Mock data for capital shares transactions
const mockTransactions: CapitalSharesTransaction[] = [{
  id: 'CS-2023-0001',
  memberName: 'Juan Dela Cruz',
  memberNumber: 'MEM-2023-001',
  date: '2023-10-05',
  type: 'deposit',
  amount: 10000
}, {
  id: 'CS-2023-0002',
  memberName: 'Maria Santos',
  memberNumber: 'MEM-2023-002',
  date: '2023-10-10',
  type: 'initial',
  amount: 25000
}, {
  id: 'CS-2023-0003',
  memberName: 'Pedro Reyes',
  memberNumber: 'MEM-2023-003',
  date: '2023-10-15',
  type: 'deposit',
  amount: 15000
}, {
  id: 'CS-2023-0004',
  memberName: 'Ana Gonzales',
  memberNumber: 'MEM-2023-004',
  date: '2023-10-20',
  type: 'withdrawal',
  amount: 5000
}, {
  id: 'CS-2023-0005',
  memberName: 'Luis Torres',
  memberNumber: 'MEM-2023-005',
  date: '2023-10-25',
  type: 'deposit',
  amount: 20000
}, {
  id: 'CS-2023-0006',
  memberName: 'Carmen Velasquez',
  memberNumber: 'MEM-2023-006',
  date: '2023-09-05',
  type: 'initial',
  amount: 30000
}, {
  id: 'CS-2023-0007',
  memberName: 'Roberto Garcia',
  memberNumber: 'MEM-2023-007',
  date: '2023-09-10',
  type: 'deposit',
  amount: 12000
}, {
  id: 'CS-2023-0008',
  memberName: 'Sofia Lim',
  memberNumber: 'MEM-2023-008',
  date: '2023-09-15',
  type: 'withdrawal',
  amount: 8000
}, {
  id: 'CS-2023-0009',
  memberName: 'Eduardo Tan',
  memberNumber: 'MEM-2023-009',
  date: '2023-09-20',
  type: 'deposit',
  amount: 15000
}, {
  id: 'CS-2023-0010',
  memberName: 'Isabella Reyes',
  memberNumber: 'MEM-2023-010',
  date: '2023-09-25',
  type: 'initial',
  amount: 20000
}, {
  id: 'CS-2023-0011',
  memberName: 'Juan Dela Cruz',
  memberNumber: 'MEM-2023-001',
  date: '2023-08-05',
  type: 'dividend',
  amount: 2500
}, {
  id: 'CS-2023-0012',
  memberName: 'Maria Santos',
  memberNumber: 'MEM-2023-002',
  date: '2023-08-10',
  type: 'deposit',
  amount: 5000
}, {
  id: 'CS-2023-0013',
  memberName: 'Pedro Reyes',
  memberNumber: 'MEM-2023-003',
  date: '2023-08-15',
  type: 'withdrawal',
  amount: 3000
}, {
  id: 'CS-2023-0014',
  memberName: 'Ana Gonzales',
  memberNumber: 'MEM-2023-004',
  date: '2023-07-20',
  type: 'deposit',
  amount: 8000
}, {
  id: 'CS-2023-0015',
  memberName: 'Luis Torres',
  memberNumber: 'MEM-2023-005',
  date: '2023-07-25',
  type: 'dividend',
  amount: 1500
}];
// Mock data for monthly capital shares totals
const mockMonthlyTotals = [{
  month: 'Jul',
  year: 2023,
  total: 165000
}, {
  month: 'Aug',
  year: 2023,
  total: 180000
}, {
  month: 'Sep',
  year: 2023,
  total: 225000
}, {
  month: 'Oct',
  year: 2023,
  total: 285000
}, {
  month: 'Nov',
  year: 2023,
  total: 310000
}, {
  month: 'Dec',
  year: 2023,
  total: 335000
}, {
  month: 'Jan',
  year: 2024,
  total: 350000
}];
export const CapitalShares = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: '',
    endDate: ''
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  // State for chart data
  const [chartData, setChartData] = useState<any>(null);
  // Calculate growth rate
  const currentTotal = mockMonthlyTotals[mockMonthlyTotals.length - 1].total;
  const previousTotal = mockMonthlyTotals[mockMonthlyTotals.length - 2].total;
  const growthRate = (currentTotal - previousTotal) / previousTotal * 100;
  // Prepare chart data on component mount
  useEffect(() => {
    const labels = mockMonthlyTotals.map(item => `${item.month} ${item.year}`);
    const data = mockMonthlyTotals.map(item => item.total);
    setChartData({
      labels,
      datasets: [{
        label: 'Total Capital Shares',
        data,
        borderColor: 'rgb(220, 20, 60)',
        backgroundColor: 'rgba(220, 20, 60, 0.1)',
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(220, 20, 60)',
        fill: true
      }]
    });
  }, []);
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
          drawBorder: false,
          drawTicks: false
        }
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
          drawBorder: false,
          drawTicks: false
        },
        ticks: {
          callback: (value: number) => {
            if (value >= 1000) {
              return `₱${value / 1000}k`;
            }
            return `₱${value}`;
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-PH', {
                style: 'currency',
                currency: 'PHP'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    }
  };
  // Filter transactions based on search term and date range
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.memberName.toLowerCase().includes(searchTerm.toLowerCase()) || transaction.memberNumber.toLowerCase().includes(searchTerm.toLowerCase()) || transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDateRange = !dateFilter.startDate || !dateFilter.endDate || transaction.date >= dateFilter.startDate && transaction.date <= dateFilter.endDate;
    return matchesSearch && matchesDateRange;
  });
  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
  // Pagination controls
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(amount);
  };
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // Handle record transaction
  const handleRecordTransaction = () => {
    setIsRecordModalOpen(true);
  };
  // Get transaction type badge
  const getTransactionTypeBadge = (type: string) => {
    switch (type) {
      case 'deposit':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 capitalize">
            Deposit
          </span>;
      case 'withdrawal':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 capitalize">
            Withdrawal
          </span>;
      case 'dividend':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 capitalize">
            Dividend
          </span>;
      case 'initial':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 capitalize">
            Initial
          </span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 capitalize">
            {type}
          </span>;
    }
  };
  return <>
      <PageHeader title="Capital Shares" description="Manage and track capital shares" />
      <div className="space-y-6">
        {/* Capital Shares Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h3 className="text-xl font-bold">Total Capital Shares</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-3xl font-bold">
                  {formatCurrency(currentTotal)}
                </span>
                <span className={`text-sm px-2 py-0.5 rounded-full flex items-center gap-1 ${growthRate >= 0 ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'}`}>
                  <TrendingUpIcon size={14} />
                  {growthRate >= 0 ? '+' : ''}
                  {growthRate.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
          <div className="h-64 sm:h-80">
            {chartData && <Line data={chartData} options={chartOptions} />}
          </div>
        </div>
        {/* Transactions Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {/* Search and Filter */}
          <div className="p-4 border-b border-[rgba(var(--border-color),0.2)]">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <div className="relative flex-grow max-w-md">
                <input type="text" placeholder="Search by member name or ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" size={18} />
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="px-3 py-2 rounded-lg border border-[rgba(var(--border-color),0.2)] flex items-center gap-2 bg-[rgba(var(--input-bg),0.8)] hover:bg-[rgba(var(--input-bg),1)]">
                    <CalendarIcon size={16} />
                    <span>Date Filter</span>
                    <ChevronDownIcon size={14} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isFilterOpen && <div className="absolute z-10 mt-1 right-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-[rgba(var(--border-color),0.2)] p-3">
                      <div className="flex flex-col space-y-2">
                        <div>
                          <label className="text-xs text-[rgb(var(--text-secondary))] mb-1 block">
                            Start Date
                          </label>
                          <input type="date" value={dateFilter.startDate} onChange={e => setDateFilter({
                        ...dateFilter,
                        startDate: e.target.value
                      })} className="w-full px-2 py-1 rounded bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-sm" />
                        </div>
                        <div>
                          <label className="text-xs text-[rgb(var(--text-secondary))] mb-1 block">
                            End Date
                          </label>
                          <input type="date" value={dateFilter.endDate} onChange={e => setDateFilter({
                        ...dateFilter,
                        endDate: e.target.value
                      })} className="w-full px-2 py-1 rounded bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-sm" />
                        </div>
                        <div className="flex justify-end mt-2">
                          <button onClick={() => setDateFilter({
                        startDate: '',
                        endDate: ''
                      })} className="text-xs text-[rgb(var(--text-secondary))] hover:text-neon-red">
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>}
                </div>
                <button onClick={handleRecordTransaction} className="px-3 py-2 bg-neon-red text-white rounded-lg flex items-center gap-2 hover:bg-neon-red/90 transition-colors">
                  <PlusIcon size={16} />
                  <span>Record Transaction</span>
                </button>
              </div>
            </div>
          </div>
          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(var(--border-color),0.2)]">
                {currentTransactions.length > 0 ? currentTransactions.map(transaction => <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div>
                          <p className="font-medium">
                            {transaction.memberName}
                          </p>
                          <p className="text-xs text-[rgb(var(--text-secondary))]">
                            {transaction.memberNumber}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {getTransactionTypeBadge(transaction.type)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right font-medium">
                        <span className={transaction.type === 'withdrawal' ? 'text-red-600 dark:text-red-400' : ''}>
                          {transaction.type === 'withdrawal' ? '-' : ''}
                          {formatCurrency(transaction.amount)}
                        </span>
                      </td>
                    </tr>) : <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-[rgb(var(--text-secondary))]">
                      No transactions found
                    </td>
                  </tr>}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {filteredTransactions.length > 0 && <div className="px-4 py-3 flex items-center justify-between border-t border-[rgba(var(--border-color),0.2)]">
              <div className="text-sm text-[rgb(var(--text-secondary))]">
                Showing{' '}
                <span className="font-medium">
                  {indexOfFirstTransaction + 1}
                </span>{' '}
                to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastTransaction, filteredTransactions.length)}
                </span>{' '}
                of{' '}
                <span className="font-medium">
                  {filteredTransactions.length}
                </span>{' '}
                transactions
              </div>
              <div className="flex gap-1">
                <button onClick={goToFirstPage} disabled={currentPage === 1} className={`p-2 rounded ${currentPage === 1 ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  <ChevronsLeftIcon size={16} />
                </button>
                <button onClick={goToPrevPage} disabled={currentPage === 1} className={`p-2 rounded ${currentPage === 1 ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  <ChevronLeftIcon size={16} />
                </button>
                {/* Page numbers */}
                {Array.from({
              length: Math.min(5, totalPages)
            }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              return <button key={i} onClick={() => paginate(pageNumber)} className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === pageNumber ? 'bg-neon-red text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                        {pageNumber}
                      </button>;
            })}
                <button onClick={goToNextPage} disabled={currentPage === totalPages} className={`p-2 rounded ${currentPage === totalPages ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  <ChevronRightIcon size={16} />
                </button>
                <button onClick={goToLastPage} disabled={currentPage === totalPages} className={`p-2 rounded ${currentPage === totalPages ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  <ChevronsRightIcon size={16} />
                </button>
              </div>
            </div>}
        </div>
      </div>
      {/* Record Transaction Modal */}
      {isRecordModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">
              Record Capital Share Transaction
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Member</label>
                <select className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30">
                  <option value="">Select Member</option>
                  <option value="MEM-2023-001">
                    Juan Dela Cruz (MEM-2023-001)
                  </option>
                  <option value="MEM-2023-002">
                    Maria Santos (MEM-2023-002)
                  </option>
                  <option value="MEM-2023-003">
                    Pedro Reyes (MEM-2023-003)
                  </option>
                  <option value="MEM-2023-004">
                    Ana Gonzales (MEM-2023-004)
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Transaction Type
                </label>
                <select className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30">
                  <option value="">Select Type</option>
                  <option value="deposit">Deposit</option>
                  <option value="withdrawal">Withdrawal</option>
                  <option value="dividend">Dividend</option>
                  <option value="initial">Initial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Amount (₱)
                </label>
                <input type="number" min="0" step="0.01" className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" placeholder="Enter amount" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Notes (Optional)
                </label>
                <textarea className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" rows={3} placeholder="Enter additional notes"></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsRecordModalOpen(false)} className="px-4 py-2 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                Cancel
              </button>
              <button onClick={() => setIsRecordModalOpen(false)} className="px-4 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90">
                Record Transaction
              </button>
            </div>
          </div>
        </div>}
    </>;
};