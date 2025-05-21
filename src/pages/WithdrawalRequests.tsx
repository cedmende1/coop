import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { SearchIcon, FilterIcon, CheckIcon, XIcon, EyeIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
interface WithdrawalRequest {
  id: string;
  memberName: string;
  memberNumber: string;
  amount: number;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  accountNumber: string;
  bankName?: string;
  bankBranch?: string;
  notes?: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectedBy?: string;
  rejectionReason?: string;
}
// Mock data for withdrawal requests
const mockWithdrawalRequests: WithdrawalRequest[] = [{
  id: 'WD-2023-0001',
  memberName: 'Juan Dela Cruz',
  memberNumber: 'MEM-2023-001',
  amount: 25000,
  requestDate: '2023-10-28',
  status: 'pending',
  accountNumber: '1234-5678-9012-3456',
  bankName: 'BPI',
  bankBranch: 'Makati Branch',
  notes: 'For medical expenses'
}, {
  id: 'WD-2023-0002',
  memberName: 'Maria Santos',
  memberNumber: 'MEM-2023-002',
  amount: 15000,
  requestDate: '2023-10-27',
  status: 'approved',
  accountNumber: '9876-5432-1098-7654',
  bankName: 'BDO',
  bankBranch: 'Ortigas Branch',
  approvedBy: 'Admin User',
  approvedDate: '2023-10-28'
}, {
  id: 'WD-2023-0003',
  memberName: 'Pedro Reyes',
  memberNumber: 'MEM-2023-003',
  amount: 50000,
  requestDate: '2023-10-26',
  status: 'rejected',
  accountNumber: '5678-1234-9012-3456',
  bankName: 'Metrobank',
  bankBranch: 'Quezon City Branch',
  rejectedBy: 'Admin User',
  rejectionReason: 'Insufficient funds in share capital'
}, {
  id: 'WD-2023-0004',
  memberName: 'Ana Gonzales',
  memberNumber: 'MEM-2023-004',
  amount: 10000,
  requestDate: '2023-10-25',
  status: 'pending',
  accountNumber: '1122-3344-5566-7788',
  bankName: 'Landbank',
  bankBranch: 'Manila Branch'
}, {
  id: 'WD-2023-0005',
  memberName: 'Luis Torres',
  memberNumber: 'MEM-2023-005',
  amount: 30000,
  requestDate: '2023-10-24',
  status: 'approved',
  accountNumber: '8877-6655-4433-2211',
  bankName: 'Security Bank',
  bankBranch: 'Pasig Branch',
  approvedBy: 'Admin User',
  approvedDate: '2023-10-25',
  notes: 'For tuition fee payment'
}, {
  id: 'WD-2023-0006',
  memberName: 'Carmen Velasquez',
  memberNumber: 'MEM-2023-006',
  amount: 20000,
  requestDate: '2023-10-23',
  status: 'pending',
  accountNumber: '2468-1357-9080-7060',
  bankName: 'RCBC',
  bankBranch: 'Mandaluyong Branch'
}, {
  id: 'WD-2023-0007',
  memberName: 'Roberto Garcia',
  memberNumber: 'MEM-2023-007',
  amount: 45000,
  requestDate: '2023-10-22',
  status: 'rejected',
  accountNumber: '1357-2468-8642-9731',
  bankName: 'PNB',
  bankBranch: 'Taguig Branch',
  rejectedBy: 'Admin User',
  rejectionReason: 'Request exceeds maximum withdrawal limit'
}];
export const WithdrawalRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<WithdrawalRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [actionType, setActionType] = useState<'view' | 'approve' | 'reject'>('view');
  const [rejectionReason, setRejectionReason] = useState('');
  // Filtering logic
  const filteredRequests = mockWithdrawalRequests.filter(request => {
    const matchesSearch = request.memberName.toLowerCase().includes(searchTerm.toLowerCase()) || request.id.toLowerCase().includes(searchTerm.toLowerCase()) || request.memberNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  // Pagination
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  // Pagination controls
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // Format currency for display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(amount);
  };
  // Handle view request details
  const handleViewRequest = (request: WithdrawalRequest) => {
    setSelectedRequest(request);
    setActionType('view');
    setIsModalOpen(true);
  };
  // Handle approve request
  const handleApproveRequest = (request: WithdrawalRequest) => {
    setSelectedRequest(request);
    setActionType('approve');
    setIsModalOpen(true);
  };
  // Handle reject request
  const handleRejectRequest = (request: WithdrawalRequest) => {
    setSelectedRequest(request);
    setActionType('reject');
    setRejectionReason('');
    setIsModalOpen(true);
  };
  // Handle confirm action
  const handleConfirmAction = () => {
    // In a real application, this would call an API to update the request
    console.log(`${actionType} request ${selectedRequest?.id}`);
    if (actionType === 'reject' && rejectionReason) {
      console.log(`Rejection reason: ${rejectionReason}`);
    }
    setIsModalOpen(false);
  };
  // Status badge component
  const StatusBadge = ({
    status
  }: {
    status: string;
  }) => {
    let bgColor, textColor;
    switch (status) {
      case 'approved':
        bgColor = 'bg-green-100 dark:bg-green-900/20';
        textColor = 'text-green-800 dark:text-green-400';
        break;
      case 'rejected':
        bgColor = 'bg-red-100 dark:bg-red-900/20';
        textColor = 'text-red-800 dark:text-red-400';
        break;
      default:
        bgColor = 'bg-yellow-100 dark:bg-yellow-900/20';
        textColor = 'text-yellow-800 dark:text-yellow-400';
    }
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor} capitalize`}>
        {status}
      </span>;
  };
  return <>
      <PageHeader title="Withdrawal Requests" description="Manage and process withdrawal requests" />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {/* Search and Filter */}
        <div className="p-4 border-b border-[rgba(var(--border-color),0.2)]">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <input type="text" placeholder="Search by member or request ID..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" size={18} />
            </div>
            <div className="relative">
              <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="px-4 py-2 rounded-lg border border-[rgba(var(--border-color),0.2)] flex items-center gap-2 bg-[rgba(var(--input-bg),0.8)] hover:bg-[rgba(var(--input-bg),1)]">
                <FilterIcon size={18} />
                <span>Filter</span>
                <ChevronDownIcon size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
              {isFilterOpen && <div className="absolute z-10 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-[rgba(var(--border-color),0.2)] p-3">
                  <div className="mb-3">
                    <div className="text-sm font-medium mb-2">Status</div>
                    <div className="space-y-1">
                      {['all', 'pending', 'approved', 'rejected'].map(status => <label key={status} className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            <input type="radio" name="status" checked={statusFilter === status} onChange={() => setStatusFilter(status)} className="form-radio text-neon-red" />
                            <span className="capitalize">{status}</span>
                          </label>)}
                    </div>
                  </div>
                </div>}
            </div>
          </div>
        </div>
        {/* Requests Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Request ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Member
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(var(--border-color),0.2)]">
              {currentItems.length > 0 ? currentItems.map(request => <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-[rgb(var(--text-primary))]">
                      {request.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div>
                        <p className="font-medium">{request.memberName}</p>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                          {request.memberNumber}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {formatCurrency(request.amount)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {formatDate(request.requestDate)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleViewRequest(request)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="View Details">
                          <EyeIcon size={16} />
                        </button>
                        {request.status === 'pending' && <>
                            <button onClick={() => handleApproveRequest(request)} className="p-1 rounded hover:bg-green-100 dark:hover:bg-green-900/20 text-green-700 dark:text-green-400" title="Approve">
                              <CheckIcon size={16} />
                            </button>
                            <button onClick={() => handleRejectRequest(request)} className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-700 dark:text-red-400" title="Reject">
                              <XIcon size={16} />
                            </button>
                          </>}
                      </div>
                    </td>
                  </tr>) : <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[rgb(var(--text-secondary))]">
                    No withdrawal requests found
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {filteredRequests.length > 0 && <div className="px-4 py-3 flex items-center justify-between border-t border-[rgba(var(--border-color),0.2)]">
            <div className="text-sm text-[rgb(var(--text-secondary))]">
              Showing{' '}
              <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(indexOfLastItem, filteredRequests.length)}
              </span>{' '}
              of <span className="font-medium">{filteredRequests.length}</span>{' '}
              requests
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
      {/* Modal */}
      {isModalOpen && selectedRequest && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {actionType === 'view' && 'Withdrawal Request Details'}
                {actionType === 'approve' && 'Approve Withdrawal Request'}
                {actionType === 'reject' && 'Reject Withdrawal Request'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <XIcon size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {/* Request Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Request ID
                  </p>
                  <p className="font-medium">{selectedRequest.id}</p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Status
                  </p>
                  <StatusBadge status={selectedRequest.status} />
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Member
                  </p>
                  <p className="font-medium">{selectedRequest.memberName}</p>
                  <p className="text-xs text-[rgb(var(--text-secondary))]">
                    {selectedRequest.memberNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Amount
                  </p>
                  <p className="font-medium">
                    {formatCurrency(selectedRequest.amount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Request Date
                  </p>
                  <p className="font-medium">
                    {formatDate(selectedRequest.requestDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Account Number
                  </p>
                  <p className="font-medium">{selectedRequest.accountNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Bank
                  </p>
                  <p className="font-medium">
                    {selectedRequest.bankName || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Branch
                  </p>
                  <p className="font-medium">
                    {selectedRequest.bankBranch || 'N/A'}
                  </p>
                </div>
              </div>
              {/* Notes */}
              {selectedRequest.notes && <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Notes
                  </p>
                  <p className="font-medium">{selectedRequest.notes}</p>
                </div>}
              {/* Approval Details */}
              {selectedRequest.status === 'approved' && <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                  <p className="text-sm font-medium text-green-800 dark:text-green-400">
                    Approved
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-500">
                    By: {selectedRequest.approvedBy} on{' '}
                    {formatDate(selectedRequest.approvedDate || '')}
                  </p>
                </div>}
              {/* Rejection Details */}
              {selectedRequest.status === 'rejected' && <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
                  <p className="text-sm font-medium text-red-800 dark:text-red-400">
                    Rejected
                  </p>
                  <p className="text-xs text-red-700 dark:text-red-500">
                    By: {selectedRequest.rejectedBy} on{' '}
                    {formatDate(selectedRequest.approvedDate || '')}
                  </p>
                  <p className="text-sm mt-2">
                    Reason: {selectedRequest.rejectionReason}
                  </p>
                </div>}
              {/* Rejection Reason Input */}
              {actionType === 'reject' && <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">
                    Rejection Reason
                  </label>
                  <textarea value={rejectionReason} onChange={e => setRejectionReason(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" rows={3} placeholder="Enter reason for rejection..." />
                </div>}
              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  Cancel
                </button>
                {actionType === 'approve' && <button onClick={handleConfirmAction} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Confirm Approval
                  </button>}
                {actionType === 'reject' && <button onClick={handleConfirmAction} disabled={!rejectionReason.trim()} className={`px-4 py-2 rounded-lg ${rejectionReason.trim() ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}>
                    Confirm Rejection
                  </button>}
              </div>
            </div>
          </div>
        </div>}
    </>;
};