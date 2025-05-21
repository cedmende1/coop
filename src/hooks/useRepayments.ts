import { useState, useEffect } from 'react';
import { Repayment } from '../types/loan';
interface RepaymentFilters {
  status: 'all' | 'paid' | 'pending' | 'overdue' | 'partial';
  dateRange: 'all' | 'today' | 'thisWeek' | 'thisMonth' | 'last30';
}
export const useRepayments = (initialRepayments: Repayment[]) => {
  const [repayments, setRepayments] = useState<Repayment[]>(initialRepayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<RepaymentFilters>({
    status: 'all',
    dateRange: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Repayment;
    direction: 'ascending' | 'descending';
  }>({
    key: 'dueDate',
    direction: 'ascending'
  });
  const itemsPerPage = 5;
  // Filter repayments based on search term and filters
  const filteredRepayments = repayments.filter(repayment => {
    // Search term filter
    const matchesSearch = repayment.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) || repayment.loanId.toLowerCase().includes(searchTerm.toLowerCase());
    // Status filter
    const matchesStatus = filters.status === 'all' || repayment.status === filters.status;
    // Date range filter
    let matchesDateRange = true;
    const dueDate = new Date(repayment.dueDate);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (filters.dateRange === 'today') {
      matchesDateRange = dueDate.toDateString() === today.toDateString();
    } else if (filters.dateRange === 'thisWeek') {
      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - today.getDay());
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
      matchesDateRange = dueDate >= firstDayOfWeek && dueDate <= lastDayOfWeek;
    } else if (filters.dateRange === 'thisMonth') {
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      matchesDateRange = dueDate >= firstDayOfMonth && dueDate <= lastDayOfMonth;
    } else if (filters.dateRange === 'last30') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(now.getDate() - 30);
      matchesDateRange = dueDate >= thirtyDaysAgo;
    }
    return matchesSearch && matchesStatus && matchesDateRange;
  });
  // Sort repayments
  const sortedRepayments = [...filteredRepayments].sort((a, b) => {
    if (sortConfig.key === 'amount' || sortConfig.key === 'paidAmount' && a.paidAmount && b.paidAmount) {
      const valueA = sortConfig.key === 'paidAmount' ? a.paidAmount || 0 : a[sortConfig.key];
      const valueB = sortConfig.key === 'paidAmount' ? b.paidAmount || 0 : b[sortConfig.key];
      return sortConfig.direction === 'ascending' ? valueA - valueB : valueB - valueA;
    }
    // Handle date sorting
    if (sortConfig.key === 'dueDate' || sortConfig.key === 'paidDate') {
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
  const currentItems = sortedRepayments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedRepayments.length / itemsPerPage);
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
  const requestSort = (key: keyof Repayment) => {
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
  // Record payment
  const recordPayment = (repaymentId: string, amount: number, date: string, method: string, reference: string) => {
    setRepayments(repayments.map(repayment => {
      if (repayment.id === repaymentId) {
        const paidAmount = amount;
        const isPaid = paidAmount >= repayment.amount;
        const isPartial = paidAmount > 0 && paidAmount < repayment.amount;
        return {
          ...repayment,
          status: isPaid ? 'paid' : isPartial ? 'partial' : repayment.status,
          paidDate: date,
          paidAmount,
          method: method as any,
          reference
        };
      }
      return repayment;
    }));
  };
  return {
    repayments: currentItems,
    filteredRepayments: sortedRepayments,
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
    recordPayment
  };
};