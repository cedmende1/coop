import { useState, useEffect } from 'react';
import { LoanApplication, LoanType } from '../types/loan';
interface ApprovalFilters {
  status: 'all' | 'pending' | 'approved' | 'rejected' | 'additional_info';
  loanType: LoanType | 'all';
  dateRange: 'all' | 'today' | 'thisWeek' | 'thisMonth' | 'last30';
}
export const useLoanApprovals = (initialApprovals: LoanApplication[]) => {
  const [approvals, setApprovals] = useState<LoanApplication[]>(initialApprovals);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<ApprovalFilters>({
    status: 'all',
    loanType: 'all',
    dateRange: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof LoanApplication;
    direction: 'ascending' | 'descending';
  }>({
    key: 'applicationDate',
    direction: 'descending'
  });
  const itemsPerPage = 5;
  // Filter approvals based on search term and filters
  const filteredApprovals = approvals.filter(approval => {
    // Search term filter
    const matchesSearch = approval.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) || approval.id.toLowerCase().includes(searchTerm.toLowerCase());
    // Status filter
    const matchesStatus = filters.status === 'all' || approval.status === filters.status;
    // Loan type filter
    const matchesType = filters.loanType === 'all' || approval.loanType === filters.loanType;
    // Date range filter
    let matchesDateRange = true;
    const applicationDate = new Date(approval.applicationDate);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (filters.dateRange === 'today') {
      matchesDateRange = applicationDate.toDateString() === today.toDateString();
    } else if (filters.dateRange === 'thisWeek') {
      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - today.getDay());
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
      matchesDateRange = applicationDate >= firstDayOfWeek && applicationDate <= lastDayOfWeek;
    } else if (filters.dateRange === 'thisMonth') {
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      matchesDateRange = applicationDate >= firstDayOfMonth && applicationDate <= lastDayOfMonth;
    } else if (filters.dateRange === 'last30') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(now.getDate() - 30);
      matchesDateRange = applicationDate >= thirtyDaysAgo;
    }
    return matchesSearch && matchesStatus && matchesType && matchesDateRange;
  });
  // Sort approvals
  const sortedApprovals = [...filteredApprovals].sort((a, b) => {
    // Handle numeric sorting
    if (sortConfig.key === 'requestedAmount' || sortConfig.key === 'term' || sortConfig.key === 'monthlyIncome' || sortConfig.key === 'existingLoans' || sortConfig.key === 'creditScore') {
      const valueA = a[sortConfig.key] || 0;
      const valueB = b[sortConfig.key] || 0;
      return sortConfig.direction === 'ascending' ? valueA - valueB : valueB - valueA;
    }
    // Handle date sorting
    if (sortConfig.key === 'applicationDate' || sortConfig.key === 'reviewDate') {
      const dateA = a[sortConfig.key] ? new Date(a[sortConfig.key]).getTime() : 0;
      const dateB = b[sortConfig.key] ? new Date(b[sortConfig.key]).getTime() : 0;
      return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA;
    }
    // Default string comparison
    const valueA = String(a[sortConfig.key] || '').toLowerCase();
    const valueB = String(b[sortConfig.key] || '').toLowerCase();
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
  const currentItems = sortedApprovals.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedApprovals.length / itemsPerPage);
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
  const requestSort = (key: keyof LoanApplication) => {
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
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '—';
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
  // Loan application actions
  const approveLoanApplication = (id: string, reviewedBy: string, notes?: string) => {
    setApprovals(approvals.map(approval => approval.id === id ? {
      ...approval,
      status: 'approved',
      reviewedBy,
      reviewDate: new Date().toISOString(),
      notes: notes ? `${approval.notes || ''}\n${notes}` : approval.notes
    } : approval));
  };
  const rejectLoanApplication = (id: string, reviewedBy: string, notes: string) => {
    setApprovals(approvals.map(approval => approval.id === id ? {
      ...approval,
      status: 'rejected',
      reviewedBy,
      reviewDate: new Date().toISOString(),
      notes
    } : approval));
  };
  const requestAdditionalInfo = (id: string, reviewedBy: string, notes: string) => {
    setApprovals(approvals.map(approval => approval.id === id ? {
      ...approval,
      status: 'additional_info',
      reviewedBy,
      reviewDate: new Date().toISOString(),
      notes
    } : approval));
  };
  return {
    approvals: currentItems,
    filteredApprovals: sortedApprovals,
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
    approveLoanApplication,
    rejectLoanApplication,
    requestAdditionalInfo
  };
};