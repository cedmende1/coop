import { useState, useEffect } from 'react';
import { Loan, LoanStatus, LoanType } from '../types/loan';
interface LoanFilters {
  status: LoanStatus | 'all';
  type: LoanType | 'all';
  dateRange: 'all' | 'last30' | 'last90' | 'thisYear';
}
export const useLoans = (initialLoans: Loan[]) => {
  const [loans, setLoans] = useState<Loan[]>(initialLoans);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<LoanFilters>({
    status: 'all',
    type: 'all',
    dateRange: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Loan;
    direction: 'ascending' | 'descending';
  }>({
    key: 'startDate',
    direction: 'descending'
  });
  const itemsPerPage = 5;
  // Filter loans based on search term and filters
  const filteredLoans = loans.filter(loan => {
    // Search term filter
    const matchesSearch = loan.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) || loan.id.toLowerCase().includes(searchTerm.toLowerCase());
    // Status filter
    const matchesStatus = filters.status === 'all' || loan.status === filters.status;
    // Type filter
    const matchesType = filters.type === 'all' || loan.loanType === filters.type;
    // Date range filter
    let matchesDateRange = true;
    const loanDate = new Date(loan.startDate);
    const now = new Date();
    if (filters.dateRange === 'last30') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(now.getDate() - 30);
      matchesDateRange = loanDate >= thirtyDaysAgo;
    } else if (filters.dateRange === 'last90') {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(now.getDate() - 90);
      matchesDateRange = loanDate >= ninetyDaysAgo;
    } else if (filters.dateRange === 'thisYear') {
      const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
      matchesDateRange = loanDate >= firstDayOfYear;
    }
    return matchesSearch && matchesStatus && matchesType && matchesDateRange;
  });
  // Sort loans
  const sortedLoans = [...filteredLoans].sort((a, b) => {
    // Handle sorting for different data types
    if (sortConfig.key === 'amount' || sortConfig.key === 'interestRate' || sortConfig.key === 'term' || sortConfig.key === 'totalPaid' || sortConfig.key === 'remainingBalance') {
      return sortConfig.direction === 'ascending' ? a[sortConfig.key] - b[sortConfig.key] : b[sortConfig.key] - a[sortConfig.key];
    }
    // Handle date sorting
    if (sortConfig.key === 'startDate' || sortConfig.key === 'endDate' || sortConfig.key === 'nextPaymentDate' || sortConfig.key === 'applicationDate') {
      const dateA = new Date(a[sortConfig.key]).getTime();
      const dateB = new Date(b[sortConfig.key]).getTime();
      return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA;
    }
    // Default string comparison
    const valueA = String(a[sortConfig.key]).toLowerCase();
    const valueB = String(b[sortConfig.key]).toLowerCase();
    if (valueA < valueB) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedLoans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedLoans.length / itemsPerPage);
  // Reset to first page when filters or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);
  // Handle pagination
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  // Handle sorting
  const requestSort = (key: keyof Loan) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({
      key,
      direction
    });
  };
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  // Update loan status
  const updateLoanStatus = (loanId: string, newStatus: LoanStatus, note?: string) => {
    setLoans(loans.map(loan => loan.id === loanId ? {
      ...loan,
      status: newStatus,
      notes: note ? `${loan.notes || ''}\n${note}` : loan.notes
    } : loan));
  };
  return {
    loans: currentItems,
    filteredLoans: sortedLoans,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    currentPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    paginate,
    goToFirstPage,
    goToLastPage,
    goToPrevPage,
    goToNextPage,
    formatDate,
    formatCurrency,
    requestSort,
    sortConfig,
    updateLoanStatus
  };
};