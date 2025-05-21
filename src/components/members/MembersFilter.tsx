import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, Filter, ChevronDown } from 'lucide-react';
interface MembersFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
}
export const MembersFilter: React.FC<MembersFilterProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  isFilterOpen,
  setIsFilterOpen
}) => {
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const [filterPosition, setFilterPosition] = useState({
    top: 0,
    left: 0,
    width: 0
  });
  // Update filter position when the button is clicked or window is resized
  useEffect(() => {
    const updatePosition = () => {
      if (filterButtonRef.current) {
        const rect = filterButtonRef.current.getBoundingClientRect();
        setFilterPosition({
          top: rect.bottom + window.scrollY,
          left: rect.right - 192 + window.scrollX,
          width: 192
        });
      }
    };
    if (isFilterOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
    }
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isFilterOpen]);
  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterButtonRef.current && !filterButtonRef.current.contains(event.target as Node) && !(event.target as Element).closest('.filter-dropdown')) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);
  return <div className="p-4 border-b border-[rgba(var(--border-color),0.2)] flex flex-col sm:flex-row justify-between gap-3">
      {/* Search */}
      <div className="relative flex-grow max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--text-secondary))] w-4 h-4" />
        <input type="text" placeholder="Search by name or member number..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-3 py-2 rounded-md border border-[rgba(var(--border-color),0.3)] 
                     bg-[rgba(var(--input-bg),0.8)] text-sm focus:outline-none focus:ring-1 
                     focus:ring-neon-red/40 transition-all duration-200" />
      </div>
      {/* Filters */}
      <div className="relative">
        <button ref={filterButtonRef} onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-[rgba(var(--border-color),0.3)] 
                     bg-[rgba(var(--input-bg),0.8)] text-sm hover:bg-gray-100 dark:hover:bg-gray-700 
                     transition-colors duration-200">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
        </button>
        {/* Filter dropdown using portal to avoid overflow issues */}
        {isFilterOpen && createPortal(<div className="filter-dropdown bg-white dark:bg-gray-800 rounded-md shadow-lg 
                      border border-[rgba(var(--border-color),0.3)] z-10 py-2 absolute" style={{
        top: `${filterPosition.top}px`,
        left: `${filterPosition.left}px`,
        width: `${filterPosition.width}px`,
        maxWidth: 'calc(100vw - 16px)'
      }}>
              <div className="p-2">
                <h4 className="text-sm font-medium mb-3 px-2 text-[rgb(var(--text-primary))]">
                  Status
                </h4>
                <div className="space-y-1">
                  <StatusOption label="All" value="all" currentValue={statusFilter} onChange={setStatusFilter} />
                  <StatusOption label="Active" value="active" currentValue={statusFilter} onChange={setStatusFilter} />
                  <StatusOption label="Inactive" value="inactive" currentValue={statusFilter} onChange={setStatusFilter} />
                  <StatusOption label="Suspended" value="suspended" currentValue={statusFilter} onChange={setStatusFilter} />
                </div>
              </div>
            </div>, document.body)}
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