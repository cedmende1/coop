import React, { useState } from 'react';
import { TableIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { AmortizationRow } from '../../hooks/useLoanCalculator';
interface AmortizationTableProps {
  amortizationSchedule: AmortizationRow[];
  formatCurrency: (amount: number) => string;
}
export const AmortizationTable: React.FC<AmortizationTableProps> = ({
  amortizationSchedule,
  formatCurrency
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  // Calculate total pages
  const totalPages = Math.ceil(amortizationSchedule.length / rowsPerPage);
  // Get current rows
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = amortizationSchedule.slice(indexOfFirstRow, indexOfLastRow);
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  return <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-[rgba(var(--border-color),0.2)] bg-gray-50 dark:bg-gray-700/30">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <TableIcon className="w-5 h-5 text-neon-red" />
          Amortization Schedule
        </h2>
        <p className="text-sm text-[rgb(var(--text-secondary))]">
          Monthly payment breakdown over the loan term
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                Month
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                Principal
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                Interest
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                Monthly Payment
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                Remaining Balance
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(var(--border-color),0.1)]">
            {currentRows.map(row => <tr key={row.month} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  {row.month}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400">
                  {formatCurrency(row.principal)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-neon-red">
                  {formatCurrency(row.interest)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                  {formatCurrency(row.payment)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {formatCurrency(row.balance)}
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && <div className="px-4 py-3 flex items-center justify-between border-t border-[rgba(var(--border-color),0.2)]">
          <div className="flex-1 flex justify-between sm:hidden">
            <button onClick={goToPrevPage} disabled={currentPage === 1} className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[rgb(var(--text-primary))] hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}>
              Previous
            </button>
            <button onClick={goToNextPage} disabled={currentPage === totalPages} className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-[rgb(var(--text-primary))] hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}>
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Showing{' '}
                <span className="font-medium">{indexOfFirstRow + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastRow, amortizationSchedule.length)}
                </span>{' '}
                of{' '}
                <span className="font-medium">
                  {amortizationSchedule.length}
                </span>{' '}
                results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button onClick={goToPrevPage} disabled={currentPage === 1} className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-[rgba(var(--border-color),0.2)] text-sm font-medium ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-[rgb(var(--text-primary))] hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}>
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                {/* Page numbers */}
                {Array.from({
              length: totalPages
            }, (_, i) => i + 1).map(page => <button key={page} onClick={() => paginate(page)} className={`relative inline-flex items-center px-4 py-2 border border-[rgba(var(--border-color),0.2)] text-sm font-medium ${currentPage === page ? 'bg-neon-red text-white' : 'text-[rgb(var(--text-primary))] hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}>
                    {page}
                  </button>)}
                <button onClick={goToNextPage} disabled={currentPage === totalPages} className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-[rgba(var(--border-color),0.2)] text-sm font-medium ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-[rgb(var(--text-primary))] hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}>
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>}
    </div>;
};