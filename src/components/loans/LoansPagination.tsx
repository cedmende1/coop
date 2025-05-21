import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
interface LoansPaginationProps {
  currentPage: number;
  totalPages: number;
  indexOfFirstItem: number;
  indexOfLastItem: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  goToPrevPage: () => void;
  goToNextPage: () => void;
  itemName?: string;
}
export const LoansPagination: React.FC<LoansPaginationProps> = ({
  currentPage,
  totalPages,
  indexOfFirstItem,
  indexOfLastItem,
  totalItems,
  paginate,
  goToFirstPage,
  goToLastPage,
  goToPrevPage,
  goToNextPage,
  itemName = 'items'
}) => {
  return <div className="px-4 py-3 border-t border-[rgba(var(--border-color),0.2)] flex items-center justify-between">
      <div className="flex-1 text-sm text-[rgb(var(--text-secondary))]">
        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
        <span className="font-medium">
          {Math.min(indexOfLastItem, totalItems)}
        </span>{' '}
        of <span className="font-medium">{totalItems}</span> {itemName}
      </div>
      <div className="flex items-center gap-1">
        <button onClick={goToFirstPage} disabled={currentPage === 1} className={`p-1.5 rounded-md ${currentPage === 1 ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'text-[rgb(var(--text-secondary))] hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button onClick={goToPrevPage} disabled={currentPage === 1} className={`p-1.5 rounded-md ${currentPage === 1 ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'text-[rgb(var(--text-secondary))] hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
          <ChevronLeft className="h-4 w-4" />
        </button>
        {/* Page numbers */}
        <div className="flex items-center">
          {Array.from({
          length: Math.min(5, totalPages)
        }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            // If we have 5 or fewer pages, show all
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            // If we're near the start
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            // If we're near the end
            pageNum = totalPages - 4 + i;
          } else {
            // We're in the middle
            pageNum = currentPage - 2 + i;
          }
          return <button key={pageNum} onClick={() => paginate(pageNum)} className={`px-3 py-1.5 rounded-md text-sm ${currentPage === pageNum ? 'bg-neon-red text-white' : 'text-[rgb(var(--text-secondary))] hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  {pageNum}
                </button>;
        })}
        </div>
        <button onClick={goToNextPage} disabled={currentPage === totalPages} className={`p-1.5 rounded-md ${currentPage === totalPages ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'text-[rgb(var(--text-secondary))] hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
          <ChevronRight className="h-4 w-4" />
        </button>
        <button onClick={goToLastPage} disabled={currentPage === totalPages} className={`p-1.5 rounded-md ${currentPage === totalPages ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'text-[rgb(var(--text-secondary))] hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>;
};