import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { SearchIcon, CalendarIcon, FilterIcon, PlusIcon, FileSpreadsheetIcon, FileIcon, PrinterIcon, EyeIcon, TrashIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
// Define types for our data
interface LedgerEntry {
  id: string;
  description: string;
  account: string;
  accountType: 'Income' | 'Expense' | 'Asset' | 'Capital';
  date: string;
  debit: number;
  credit: number;
  balance: number;
  referenceNo?: string;
}
// Mock data for ledger entries
const mockLedgerEntries: LedgerEntry[] = [{
  id: 'GL-2023-0001',
  description: 'Loan Interest Income',
  account: 'Interest Income',
  accountType: 'Income',
  date: '2023-10-30',
  debit: 0,
  credit: 25000,
  balance: 25000,
  referenceNo: 'LN-2023-0001'
}, {
  id: 'GL-2023-0002',
  description: 'Processing Fee Income',
  account: 'Fee Income',
  accountType: 'Income',
  date: '2023-10-30',
  debit: 0,
  credit: 2500,
  balance: 27500,
  referenceNo: 'LN-2023-0001'
}, {
  id: 'GL-2023-0003',
  description: 'Loan Disbursement',
  account: 'Loans Receivable',
  accountType: 'Asset',
  date: '2023-10-30',
  debit: 50000,
  credit: 0,
  balance: 50000,
  referenceNo: 'LN-2023-0001'
}, {
  id: 'GL-2023-0004',
  description: 'Cash Disbursement',
  account: 'Cash',
  accountType: 'Asset',
  date: '2023-10-30',
  debit: 0,
  credit: 50000,
  balance: -50000,
  referenceNo: 'LN-2023-0001'
}, {
  id: 'GL-2023-0005',
  description: 'Rent Expense',
  account: 'Rent Expense',
  accountType: 'Expense',
  date: '2023-10-15',
  debit: 15000,
  credit: 0,
  balance: 15000,
  referenceNo: 'EXP-2023-0001'
}, {
  id: 'GL-2023-0006',
  description: 'Utilities Expense',
  account: 'Utilities Expense',
  accountType: 'Expense',
  date: '2023-10-15',
  debit: 8500,
  credit: 0,
  balance: 8500,
  referenceNo: 'EXP-2023-0002'
}, {
  id: 'GL-2023-0007',
  description: 'Salary Expense',
  account: 'Salary Expense',
  accountType: 'Expense',
  date: '2023-10-31',
  debit: 85000,
  credit: 0,
  balance: 85000,
  referenceNo: 'EXP-2023-0003'
}, {
  id: 'GL-2023-0008',
  description: 'Initial Capital Contribution',
  account: 'Member Capital',
  accountType: 'Capital',
  date: '2023-10-01',
  debit: 0,
  credit: 200000,
  balance: 200000,
  referenceNo: 'CAP-2023-0001'
}, {
  id: 'GL-2023-0009',
  description: 'Additional Capital Contribution',
  account: 'Member Capital',
  accountType: 'Capital',
  date: '2023-10-20',
  debit: 0,
  credit: 50000,
  balance: 250000,
  referenceNo: 'CAP-2023-0002'
}, {
  id: 'GL-2023-0010',
  description: 'Equipment Purchase',
  account: 'Equipment',
  accountType: 'Asset',
  date: '2023-10-10',
  debit: 35000,
  credit: 0,
  balance: 35000,
  referenceNo: 'AST-2023-0001'
}, {
  id: 'GL-2023-0011',
  description: 'Cash Payment for Equipment',
  account: 'Cash',
  accountType: 'Asset',
  date: '2023-10-10',
  debit: 0,
  credit: 35000,
  balance: -35000,
  referenceNo: 'AST-2023-0001'
}, {
  id: 'GL-2023-0012',
  description: 'Loan Repayment - Principal',
  account: 'Loans Receivable',
  accountType: 'Asset',
  date: '2023-10-25',
  debit: 0,
  credit: 5000,
  balance: 45000,
  referenceNo: 'REP-2023-0001'
}, {
  id: 'GL-2023-0013',
  description: 'Loan Repayment - Interest',
  account: 'Interest Income',
  accountType: 'Income',
  date: '2023-10-25',
  debit: 0,
  credit: 500,
  balance: 25500,
  referenceNo: 'REP-2023-0001'
}, {
  id: 'GL-2023-0014',
  description: 'Cash Receipt from Repayment',
  account: 'Cash',
  accountType: 'Asset',
  date: '2023-10-25',
  debit: 5500,
  credit: 0,
  balance: -79500,
  referenceNo: 'REP-2023-0001'
}];
export const GeneralLedger = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: '',
    endDate: ''
  });
  const [accountTypeFilter, setAccountTypeFilter] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<LedgerEntry | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  // Filter entries based on search term, date range, and account type
  const filteredEntries = mockLedgerEntries.filter(entry => {
    const matchesSearch = entry.description.toLowerCase().includes(searchTerm.toLowerCase()) || entry.account.toLowerCase().includes(searchTerm.toLowerCase()) || entry.id.toLowerCase().includes(searchTerm.toLowerCase()) || entry.referenceNo && entry.referenceNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDateRange = !dateFilter.startDate || !dateFilter.endDate || entry.date >= dateFilter.startDate && entry.date <= dateFilter.endDate;
    const matchesAccountType = accountTypeFilter === 'all' || entry.accountType.toLowerCase() === accountTypeFilter.toLowerCase();
    return matchesSearch && matchesDateRange && matchesAccountType;
  });
  // Pagination logic
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);
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
  // Handle view entry
  const handleViewEntry = (entry: LedgerEntry) => {
    setSelectedEntry(entry);
    setIsViewModalOpen(true);
  };
  // Handle delete entry
  const handleDeleteEntry = (entry: LedgerEntry) => {
    setSelectedEntry(entry);
    setIsDeleteModalOpen(true);
  };
  // Handle confirm delete
  const handleConfirmDelete = () => {
    // In a real app, you would call an API to delete the entry
    console.log('Deleting entry:', selectedEntry?.id);
    setIsDeleteModalOpen(false);
  };
  // Handle add manual entry
  const handleAddManualEntry = () => {
    console.log('Adding manual entry');
    // In a real app, you would open a form to add a new entry
  };
  // Handle export to Excel
  const handleExportExcel = () => {
    console.log('Exporting to Excel');
    // In a real app, you would generate an Excel file
  };
  // Handle export to PDF
  const handleExportPDF = () => {
    console.log('Exporting to PDF');
    // In a real app, you would generate a PDF file
  };
  // Handle print
  const handlePrint = () => {
    console.log('Printing');
    // In a real app, you would open the print dialog
  };
  return <>
      <PageHeader title="General Ledger" description="View and manage financial records" />
      <div className="space-y-6">
        {/* Search and Actions Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-grow max-w-md">
              <input type="text" placeholder="Search by description, account, or reference..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" size={18} />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="px-3 py-2 rounded-lg border border-[rgba(var(--border-color),0.2)] flex items-center gap-2 bg-[rgba(var(--input-bg),0.8)] hover:bg-[rgba(var(--input-bg),1)]">
                  <FilterIcon size={16} />
                  <span>Filter</span>
                  <ChevronDownIcon size={14} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                </button>
                {isFilterOpen && <div className="absolute z-10 mt-1 right-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-[rgba(var(--border-color),0.2)] p-3">
                    <div className="mb-3">
                      <div className="text-sm font-medium mb-2">Date Range</div>
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
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">
                        Account Type
                      </div>
                      <div className="space-y-1">
                        {['all', 'Income', 'Expense', 'Asset', 'Capital'].map(type => <label key={type} className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                              <input type="radio" name="accountType" checked={accountTypeFilter === type} onChange={() => setAccountTypeFilter(type)} className="form-radio text-neon-red" />
                              <span className="capitalize">
                                {type === 'all' ? 'All Types' : `${type} Accounts`}
                              </span>
                            </label>)}
                      </div>
                    </div>
                  </div>}
              </div>
              <button onClick={handleAddManualEntry} className="px-3 py-2 rounded-lg border border-[rgba(var(--border-color),0.2)] flex items-center gap-2 bg-[rgba(var(--input-bg),0.8)] hover:bg-[rgba(var(--input-bg),1)]" title="Add Manual Entry">
                <PlusIcon size={16} />
                <span className="hidden sm:inline">Add Entry</span>
              </button>
              <button onClick={handleExportExcel} className="px-3 py-2 rounded-lg border border-[rgba(var(--border-color),0.2)] flex items-center gap-2 bg-[rgba(var(--input-bg),0.8)] hover:bg-[rgba(var(--input-bg),1)]" title="Export to Excel">
                <FileSpreadsheetIcon size={16} />
                <span className="hidden sm:inline">Excel</span>
              </button>
              <button onClick={handleExportPDF} className="px-3 py-2 rounded-lg border border-[rgba(var(--border-color),0.2)] flex items-center gap-2 bg-[rgba(var(--input-bg),0.8)] hover:bg-[rgba(var(--input-bg),1)]" title="Export to PDF">
                <FileIcon size={16} />
                <span className="hidden sm:inline">PDF</span>
              </button>
              <button onClick={handlePrint} className="px-3 py-2 rounded-lg border border-[rgba(var(--border-color),0.2)] flex items-center gap-2 bg-[rgba(var(--input-bg),0.8)] hover:bg-[rgba(var(--input-bg),1)]" title="Print">
                <PrinterIcon size={16} />
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>
        </div>
        {/* Ledger Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Account
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Debit
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Credit
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Balance
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(var(--border-color),0.2)]">
                {currentEntries.length > 0 ? currentEntries.map(entry => <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div>
                          <p className="font-medium">{entry.description}</p>
                          <p className="text-xs text-[rgb(var(--text-secondary))]">
                            {entry.id}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div>
                          <p>{entry.account}</p>
                          <p className="text-xs text-[rgb(var(--text-secondary))]">
                            {entry.accountType}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {formatDate(entry.date)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        {entry.debit > 0 ? formatCurrency(entry.debit) : '-'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        {entry.credit > 0 ? formatCurrency(entry.credit) : '-'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right font-medium">
                        <span className={entry.balance < 0 ? 'text-red-600 dark:text-red-400' : ''}>
                          {formatCurrency(entry.balance)}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleViewEntry(entry)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="View Details">
                            <EyeIcon size={16} />
                          </button>
                          <button onClick={() => handleDeleteEntry(entry)} className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-700 dark:text-red-400" title="Delete Entry">
                            <TrashIcon size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>) : <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-[rgb(var(--text-secondary))]">
                      No ledger entries found
                    </td>
                  </tr>}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {filteredEntries.length > 0 && <div className="px-4 py-3 flex items-center justify-between border-t border-[rgba(var(--border-color),0.2)]">
              <div className="text-sm text-[rgb(var(--text-secondary))]">
                Showing{' '}
                <span className="font-medium">{indexOfFirstEntry + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(indexOfLastEntry, filteredEntries.length)}
                </span>{' '}
                of <span className="font-medium">{filteredEntries.length}</span>{' '}
                entries
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
      {/* View Entry Modal */}
      {isViewModalOpen && selectedEntry && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Ledger Entry Details</h3>
              <button onClick={() => setIsViewModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  Entry ID
                </p>
                <p className="font-medium">{selectedEntry.id}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Description
                  </p>
                  <p className="font-medium">{selectedEntry.description}</p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Date
                  </p>
                  <p className="font-medium">
                    {formatDate(selectedEntry.date)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Account
                  </p>
                  <p className="font-medium">{selectedEntry.account}</p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Account Type
                  </p>
                  <p className="font-medium">{selectedEntry.accountType}</p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Debit
                  </p>
                  <p className="font-medium">
                    {selectedEntry.debit > 0 ? formatCurrency(selectedEntry.debit) : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Credit
                  </p>
                  <p className="font-medium">
                    {selectedEntry.credit > 0 ? formatCurrency(selectedEntry.credit) : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Balance
                  </p>
                  <p className={`font-medium ${selectedEntry.balance < 0 ? 'text-red-600 dark:text-red-400' : ''}`}>
                    {formatCurrency(selectedEntry.balance)}
                  </p>
                </div>
                {selectedEntry.referenceNo && <div>
                    <p className="text-sm text-[rgb(var(--text-secondary))]">
                      Reference No
                    </p>
                    <p className="font-medium">{selectedEntry.referenceNo}</p>
                  </div>}
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setIsViewModalOpen(false)} className="px-4 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedEntry && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 mb-4">
                <TrashIcon size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Delete Ledger Entry
              </h3>
              <p className="text-[rgb(var(--text-secondary))]">
                Are you sure you want to delete this ledger entry? This action
                cannot be undone.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                Cancel
              </button>
              <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>}
    </>;
};