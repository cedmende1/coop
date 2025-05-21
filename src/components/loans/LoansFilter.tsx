import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, Filter, ChevronDown } from 'lucide-react';
import { LoanStatus, LoanType } from '../../types/loan';
interface LoansFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: {
    status: LoanStatus | 'all';
    type: LoanType | 'all';
    dateRange: 'all' | 'last30' | 'last90' | 'thisYear';
  };
  setFilters: (filters: any) => void;
}
export const LoansFilter: React.FC<LoansFilterProps> = ({
  searchTerm,
  setSearchTerm,
  filters,
  setFilters
}) => {
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);
  const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false);
  const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);
  const statusButtonRef = useRef<HTMLButtonElement>(null);
  const typeButtonRef = useRef<HTMLButtonElement>(null);
  const dateButtonRef = useRef<HTMLButtonElement>(null);
  const [statusPosition, setStatusPosition] = useState({
    top: 0,
    left: 0,
    width: 0
  });
  const [typePosition, setTypePosition] = useState({
    top: 0,
    left: 0,
    width: 0
  });
  const [datePosition, setDatePosition] = useState({
    top: 0,
    left: 0,
    width: 0
  });
  // Update filter positions when buttons are clicked or window is resized
  useEffect(() => {
    const updateStatusPosition = () => {
      if (statusButtonRef.current) {
        const rect = statusButtonRef.current.getBoundingClientRect();
        setStatusPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width
        });
      }
    };
    const updateTypePosition = () => {
      if (typeButtonRef.current) {
        const rect = typeButtonRef.current.getBoundingClientRect();
        setTypePosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width
        });
      }
    };
    const updateDatePosition = () => {
      if (dateButtonRef.current) {
        const rect = dateButtonRef.current.getBoundingClientRect();
        setDatePosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width
        });
      }
    };
    if (isStatusFilterOpen) {
      updateStatusPosition();
      window.addEventListener('resize', updateStatusPosition);
      window.addEventListener('scroll', updateStatusPosition);
    }
    if (isTypeFilterOpen) {
      updateTypePosition();
      window.addEventListener('resize', updateTypePosition);
      window.addEventListener('scroll', updateTypePosition);
    }
    if (isDateFilterOpen) {
      updateDatePosition();
      window.addEventListener('resize', updateDatePosition);
      window.addEventListener('scroll', updateDatePosition);
    }
    return () => {
      window.removeEventListener('resize', updateStatusPosition);
      window.removeEventListener('scroll', updateStatusPosition);
      window.removeEventListener('resize', updateTypePosition);
      window.removeEventListener('scroll', updateTypePosition);
      window.removeEventListener('resize', updateDatePosition);
      window.removeEventListener('scroll', updateDatePosition);
    };
  }, [isStatusFilterOpen, isTypeFilterOpen, isDateFilterOpen]);
  // Close filter dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Status filter
      if (statusButtonRef.current && !statusButtonRef.current.contains(event.target as Node) && !(event.target as Element).closest('.status-filter-dropdown')) {
        setIsStatusFilterOpen(false);
      }
      // Type filter
      if (typeButtonRef.current && !typeButtonRef.current.contains(event.target as Node) && !(event.target as Element).closest('.type-filter-dropdown')) {
        setIsTypeFilterOpen(false);
      }
      // Date filter
      if (dateButtonRef.current && !dateButtonRef.current.contains(event.target as Node) && !(event.target as Element).closest('.date-filter-dropdown')) {
        setIsDateFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Get status label
  const getStatusLabel = () => {
    switch (filters.status) {
      case 'active':
        return 'Active';
      case 'paid':
        return 'Paid';
      case 'defaulted':
        return 'Defaulted';
      case 'restructured':
        return 'Restructured';
      case 'pending':
        return 'Pending';
      default:
        return 'All Status';
    }
  };
  // Get type label
  const getTypeLabel = () => {
    switch (filters.type) {
      case 'personal':
        return 'Personal';
      case 'business':
        return 'Business';
      case 'education':
        return 'Education';
      case 'mortgage':
        return 'Mortgage';
      case 'emergency':
        return 'Emergency';
      default:
        return 'All Types';
    }
  };
  // Get date range label
  const getDateRangeLabel = () => {
    switch (filters.dateRange) {
      case 'last30':
        return 'Last 30 Days';
      case 'last90':
        return 'Last 90 Days';
      case 'thisYear':
        return 'This Year';
      default:
        return 'All Time';
    }
  };
  return <div className="p-4 border-b border-[rgba(var(--border-color),0.2)] flex flex-col sm:flex-row justify-between gap-3">
      {/* Search */}
      <div className="relative flex-grow max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--text-secondary))] w-4 h-4" />
        <input type="text" placeholder="Search by borrower name or loan ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 rounded-md border border-[rgba(var(--border-color),0.3)] 
                     bg-[rgba(var(--input-bg),0.8)] text-sm focus:outline-none focus:ring-1 
                     focus:ring-neon-red/40 transition-all duration-200" />
      </div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        {/* Status Filter */}
        <div className="relative">
          <button ref={statusButtonRef} onClick={() => setIsStatusFilterOpen(!isStatusFilterOpen)} className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-[rgba(var(--border-color),0.3)] 
                     bg-[rgba(var(--input-bg),0.8)] text-sm hover:bg-gray-100 dark:hover:bg-gray-700 
                     transition-colors duration-200">
            <Filter className="w-4 h-4" />
            <span>{getStatusLabel()}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isStatusFilterOpen ? 'rotate-180' : ''}`} />
          </button>
          {isStatusFilterOpen && createPortal(<div className="status-filter-dropdown bg-white dark:bg-gray-800 rounded-md shadow-lg 
                        border border-[rgba(var(--border-color),0.3)] z-10 py-2 absolute" style={{
          top: `${statusPosition.top}px`,
          left: `${statusPosition.left}px`,
          width: `${statusPosition.width}px`,
          maxWidth: 'calc(100vw - 16px)'
        }}>
                <div className="p-2">
                  <h4 className="text-sm font-medium mb-3 px-2 text-[rgb(var(--text-primary))]">
                    Status
                  </h4>
                  <div className="space-y-1">
                    <StatusOption label="All Status" value="all" currentValue={filters.status} onChange={value => {
                setFilters({
                  ...filters,
                  status: value
                });
                setIsStatusFilterOpen(false);
              }} />
                    <StatusOption label="Active" value="active" currentValue={filters.status} onChange={value => {
                setFilters({
                  ...filters,
                  status: value
                });
                setIsStatusFilterOpen(false);
              }} />
                    <StatusOption label="Paid" value="paid" currentValue={filters.status} onChange={value => {
                setFilters({
                  ...filters,
                  status: value
                });
                setIsStatusFilterOpen(false);
              }} />
                    <StatusOption label="Defaulted" value="defaulted" currentValue={filters.status} onChange={value => {
                setFilters({
                  ...filters,
                  status: value
                });
                setIsStatusFilterOpen(false);
              }} />
                    <StatusOption label="Restructured" value="restructured" currentValue={filters.status} onChange={value => {
                setFilters({
                  ...filters,
                  status: value
                });
                setIsStatusFilterOpen(false);
              }} />
                    <StatusOption label="Pending" value="pending" currentValue={filters.status} onChange={value => {
                setFilters({
                  ...filters,
                  status: value
                });
                setIsStatusFilterOpen(false);
              }} />
                  </div>
                </div>
              </div>, document.body)}
        </div>
        {/* Loan Type Filter */}
        <div className="relative">
          <button ref={typeButtonRef} onClick={() => setIsTypeFilterOpen(!isTypeFilterOpen)} className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-[rgba(var(--border-color),0.3)] 
                     bg-[rgba(var(--input-bg),0.8)] text-sm hover:bg-gray-100 dark:hover:bg-gray-700 
                     transition-colors duration-200">
            <Filter className="w-4 h-4" />
            <span>{getTypeLabel()}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isTypeFilterOpen ? 'rotate-180' : ''}`} />
          </button>
          {isTypeFilterOpen && createPortal(<div className="type-filter-dropdown bg-white dark:bg-gray-800 rounded-md shadow-lg 
                        border border-[rgba(var(--border-color),0.3)] z-10 py-2 absolute" style={{
          top: `${typePosition.top}px`,
          left: `${typePosition.left}px`,
          width: `${typePosition.width}px`,
          maxWidth: 'calc(100vw - 16px)'
        }}>
                <div className="p-2">
                  <h4 className="text-sm font-medium mb-3 px-2 text-[rgb(var(--text-primary))]">
                    Loan Type
                  </h4>
                  <div className="space-y-1">
                    <StatusOption label="All Types" value="all" currentValue={filters.type} onChange={value => {
                setFilters({
                  ...filters,
                  type: value
                });
                setIsTypeFilterOpen(false);
              }} />
                    <StatusOption label="Personal" value="personal" currentValue={filters.type} onChange={value => {
                setFilters({
                  ...filters,
                  type: value
                });
                setIsTypeFilterOpen(false);
              }} />
                    <StatusOption label="Business" value="business" currentValue={filters.type} onChange={value => {
                setFilters({
                  ...filters,
                  type: value
                });
                setIsTypeFilterOpen(false);
              }} />
                    <StatusOption label="Education" value="education" currentValue={filters.type} onChange={value => {
                setFilters({
                  ...filters,
                  type: value
                });
                setIsTypeFilterOpen(false);
              }} />
                    <StatusOption label="Mortgage" value="mortgage" currentValue={filters.type} onChange={value => {
                setFilters({
                  ...filters,
                  type: value
                });
                setIsTypeFilterOpen(false);
              }} />
                    <StatusOption label="Emergency" value="emergency" currentValue={filters.type} onChange={value => {
                setFilters({
                  ...filters,
                  type: value
                });
                setIsTypeFilterOpen(false);
              }} />
                  </div>
                </div>
              </div>, document.body)}
        </div>
        {/* Date Range Filter */}
        <div className="relative">
          <button ref={dateButtonRef} onClick={() => setIsDateFilterOpen(!isDateFilterOpen)} className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-[rgba(var(--border-color),0.3)] 
                     bg-[rgba(var(--input-bg),0.8)] text-sm hover:bg-gray-100 dark:hover:bg-gray-700 
                     transition-colors duration-200">
            <Filter className="w-4 h-4" />
            <span>{getDateRangeLabel()}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDateFilterOpen ? 'rotate-180' : ''}`} />
          </button>
          {isDateFilterOpen && createPortal(<div className="date-filter-dropdown bg-white dark:bg-gray-800 rounded-md shadow-lg 
                        border border-[rgba(var(--border-color),0.3)] z-10 py-2 absolute" style={{
          top: `${datePosition.top}px`,
          left: `${datePosition.left}px`,
          width: `${datePosition.width}px`,
          maxWidth: 'calc(100vw - 16px)'
        }}>
                <div className="p-2">
                  <h4 className="text-sm font-medium mb-3 px-2 text-[rgb(var(--text-primary))]">
                    Date Range
                  </h4>
                  <div className="space-y-1">
                    <StatusOption label="All Time" value="all" currentValue={filters.dateRange} onChange={value => {
                setFilters({
                  ...filters,
                  dateRange: value
                });
                setIsDateFilterOpen(false);
              }} />
                    <StatusOption label="Last 30 Days" value="last30" currentValue={filters.dateRange} onChange={value => {
                setFilters({
                  ...filters,
                  dateRange: value
                });
                setIsDateFilterOpen(false);
              }} />
                    <StatusOption label="Last 90 Days" value="last90" currentValue={filters.dateRange} onChange={value => {
                setFilters({
                  ...filters,
                  dateRange: value
                });
                setIsDateFilterOpen(false);
              }} />
                    <StatusOption label="This Year" value="thisYear" currentValue={filters.dateRange} onChange={value => {
                setFilters({
                  ...filters,
                  dateRange: value
                });
                setIsDateFilterOpen(false);
              }} />
                  </div>
                </div>
              </div>, document.body)}
        </div>
      </div>
    </div>;
};
// Modern status option component
const StatusOption = ({
  label,
  value,
  currentValue,
  onChange
}) => {
  const isSelected = currentValue === value;
  return <button onClick={() => onChange(value)} className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors duration-200 text-[rgb(var(--text-primary))] ${isSelected ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
      <span>{label}</span>
      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-neon-red' : 'border-gray-300 dark:border-gray-600'}`}>
        {isSelected && <div className="w-2 h-2 rounded-full bg-neon-red"></div>}
      </div>
    </button>;
};