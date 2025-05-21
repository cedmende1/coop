import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { SearchIcon, FilterIcon, CheckIcon, XIcon, EyeIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, FileTextIcon, CalendarIcon } from 'lucide-react';
interface DepositRequest {
  id: string;
  memberName: string;
  memberNumber: string;
  amount: number;
  depositDate: string;
  status: 'pending' | 'verified' | 'rejected';
  depositMethod: 'cash' | 'check' | 'bank_transfer' | 'online';
  reference?: string;
  proofOfDeposit?: string;
  notes?: string;
  verifiedBy?: string;
  verifiedDate?: string;
  rejectedBy?: string;
  rejectionReason?: string;
}
// Mock data for deposit requests
const mockDepositRequests: DepositRequest[] = [{
  id: 'DEP-2023-0001',
  memberName: 'Juan Dela Cruz',
  memberNumber: 'MEM-2023-001',
  amount: 10000,
  depositDate: '2023-10-28',
  status: 'pending',
  depositMethod: 'bank_transfer',
  reference: 'BNKT-12345',
  proofOfDeposit: 'https://example.com/proof1.jpg',
  notes: 'Monthly share capital contribution'
}, {
  id: 'DEP-2023-0002',
  memberName: 'Maria Santos',
  memberNumber: 'MEM-2023-002',
  amount: 5000,
  depositDate: '2023-10-27',
  status: 'verified',
  depositMethod: 'cash',
  verifiedBy: 'Admin User',
  verifiedDate: '2023-10-28'
}, {
  id: 'DEP-2023-0003',
  memberName: 'Pedro Reyes',
  memberNumber: 'MEM-2023-003',
  amount: 15000,
  depositDate: '2023-10-26',
  status: 'rejected',
  depositMethod: 'check',
  reference: 'CHK-67890',
  rejectedBy: 'Admin User',
  rejectionReason: 'Check bounced'
}, {
  id: 'DEP-2023-0004',
  memberName: 'Ana Gonzales',
  memberNumber: 'MEM-2023-004',
  amount: 7500,
  depositDate: '2023-10-25',
  status: 'pending',
  depositMethod: 'online',
  reference: 'ONL-54321',
  proofOfDeposit: 'https://example.com/proof2.jpg'
}, {
  id: 'DEP-2023-0005',
  memberName: 'Luis Torres',
  memberNumber: 'MEM-2023-005',
  amount: 20000,
  depositDate: '2023-10-24',
  status: 'verified',
  depositMethod: 'bank_transfer',
  reference: 'BNKT-98765',
  proofOfDeposit: 'https://example.com/proof3.jpg',
  verifiedBy: 'Admin User',
  verifiedDate: '2023-10-25'
}, {
  id: 'DEP-2023-0006',
  memberName: 'Carmen Velasquez',
  memberNumber: 'MEM-2023-006',
  amount: 12000,
  depositDate: '2023-10-23',
  status: 'pending',
  depositMethod: 'check',
  reference: 'CHK-13579'
}, {
  id: 'DEP-2023-0007',
  memberName: 'Roberto Garcia',
  memberNumber: 'MEM-2023-007',
  amount: 30000,
  depositDate: '2023-10-22',
  status: 'verified',
  depositMethod: 'cash',
  verifiedBy: 'Admin User',
  verifiedDate: '2023-10-23',
  notes: 'Initial share capital'
}];
export const DepositRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<DepositRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [actionType, setActionType] = useState<'view' | 'verify' | 'reject'>('view');
  const [rejectionReason, setRejectionReason] = useState('');
  // Filtering logic
  const filteredRequests = mockDepositRequests.filter(request => {
    const matchesSearch = request.memberName.toLowerCase().includes(searchTerm.toLowerCase()) || request.id.toLowerCase().includes(searchTerm.toLowerCase()) || request.memberNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || request.depositMethod === methodFilter;
    return matchesSearch && matchesStatus && matchesMethod;
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
  // Format deposit method for display
  const formatDepositMethod = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return 'Bank Transfer';
      case 'online':
        return 'Online Payment';
      default:
        return method.charAt(0).toUpperCase() + method.slice(1);
    }
  };
  // Handle view request details
  const handleViewRequest = (request: DepositRequest) => {
    setSelectedRequest(request);
    setActionType('view');
    setIsModalOpen(true);
  };
  // Handle verify request
  const handleVerifyRequest = (request: DepositRequest) => {
    setSelectedRequest(request);
    setActionType('verify');
    setIsModalOpen(true);
  };
  // Handle reject request
  const handleRejectRequest = (request: DepositRequest) => {
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
      case 'verified':
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
  // Method badge component
  const MethodBadge = ({
    method
  }: {
    method: string;
  }) => {
    let bgColor, textColor, icon;
    switch (method) {
      case 'cash':
        bgColor = 'bg-blue-100 dark:bg-blue-900/20';
        textColor = 'text-blue-800 dark:text-blue-400';
        icon = <DollarIcon size={12} className="mr-1" />;
        break;
      case 'check':
        bgColor = 'bg-purple-100 dark:bg-purple-900/20';
        textColor = 'text-purple-800 dark:text-purple-400';
        icon = <FileTextIcon size={12} className="mr-1" />;
        break;
      case 'bank_transfer':
        bgColor = 'bg-indigo-100 dark:bg-indigo-900/20';
        textColor = 'text-indigo-800 dark:text-indigo-400';
        icon = <BuildingIcon size={12} className="mr-1" />;
        break;
      case 'online':
        bgColor = 'bg-teal-100 dark:bg-teal-900/20';
        textColor = 'text-teal-800 dark:text-teal-400';
        icon = <GlobeIcon size={12} className="mr-1" />;
        break;
      default:
        bgColor = 'bg-gray-100 dark:bg-gray-700';
        textColor = 'text-gray-800 dark:text-gray-300';
        icon = null;
    }
    return <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${bgColor} ${textColor}`}>
        {icon}
        {formatDepositMethod(method)}
      </span>;
  };
  // Custom icons for method badges
  const DollarIcon = ({
    size,
    className
  }: {
    size: number;
    className?: string;
  }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>;
  const BuildingIcon = ({
    size,
    className
  }: {
    size: number;
    className?: string;
  }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
      <line x1="12" y1="18" x2="12" y2="18"></line>
      <line x1="8" y1="6" x2="16" y2="6"></line>
      <line x1="8" y1="10" x2="16" y2="10"></line>
      <line x1="8" y1="14" x2="16" y2="14"></line>
    </svg>;
  const GlobeIcon = ({
    size,
    className
  }: {
    size: number;
    className?: string;
  }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>;
  return <>
      <PageHeader title="Deposit Requests" description="Manage and process deposit requests" />
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
                      {['all', 'pending', 'verified', 'rejected'].map(status => <label key={status} className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            <input type="radio" name="status" checked={statusFilter === status} onChange={() => setStatusFilter(status)} className="form-radio text-neon-red" />
                            <span className="capitalize">{status}</span>
                          </label>)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-2">Method</div>
                    <div className="space-y-1">
                      {['all', 'cash', 'check', 'bank_transfer', 'online'].map(method => <label key={method} className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            <input type="radio" name="method" checked={methodFilter === method} onChange={() => setMethodFilter(method)} className="form-radio text-neon-red" />
                            <span className="capitalize">
                              {method === 'all' ? 'All' : formatDepositMethod(method)}
                            </span>
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
                  Method
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
                      <MethodBadge method={request.depositMethod} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {formatDate(request.depositDate)}
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
                            <button onClick={() => handleVerifyRequest(request)} className="p-1 rounded hover:bg-green-100 dark:hover:bg-green-900/20 text-green-700 dark:text-green-400" title="Verify">
                              <CheckIcon size={16} />
                            </button>
                            <button onClick={() => handleRejectRequest(request)} className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-700 dark:text-red-400" title="Reject">
                              <XIcon size={16} />
                            </button>
                          </>}
                      </div>
                    </td>
                  </tr>) : <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-[rgb(var(--text-secondary))]">
                    No deposit requests found
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
                {actionType === 'view' && 'Deposit Request Details'}
                {actionType === 'verify' && 'Verify Deposit Request'}
                {actionType === 'reject' && 'Reject Deposit Request'}
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
                    Deposit Date
                  </p>
                  <p className="font-medium">
                    {formatDate(selectedRequest.depositDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Method
                  </p>
                  <p className="font-medium">
                    {formatDepositMethod(selectedRequest.depositMethod)}
                  </p>
                </div>
                {selectedRequest.reference && <div>
                    <p className="text-sm text-[rgb(var(--text-secondary))]">
                      Reference
                    </p>
                    <p className="font-medium">{selectedRequest.reference}</p>
                  </div>}
              </div>
              {/* Proof of Deposit */}
              {selectedRequest.proofOfDeposit && <div className="mt-4">
                  <p className="text-sm text-[rgb(var(--text-secondary))] mb-2">
                    Proof of Deposit
                  </p>
                  <div className="border border-[rgba(var(--border-color),0.2)] rounded-lg p-2">
                    <div className="flex items-center justify-center h-40 bg-gray-100 dark:bg-gray-700 rounded">
                      <div className="text-center p-4">
                        <CalendarIcon size={24} className="mx-auto mb-2 text-[rgb(var(--text-secondary))]" />
                        <p className="text-sm">Image preview not available</p>
                        <button className="mt-2 px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                          View Document
                        </button>
                      </div>
                    </div>
                  </div>
                </div>}
              {/* Notes */}
              {selectedRequest.notes && <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Notes
                  </p>
                  <p className="font-medium">{selectedRequest.notes}</p>
                </div>}
              {/* Verification Details */}
              {selectedRequest.status === 'verified' && <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                  <p className="text-sm font-medium text-green-800 dark:text-green-400">
                    Verified
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-500">
                    By: {selectedRequest.verifiedBy} on{' '}
                    {formatDate(selectedRequest.verifiedDate || '')}
                  </p>
                </div>}
              {/* Rejection Details */}
              {selectedRequest.status === 'rejected' && <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
                  <p className="text-sm font-medium text-red-800 dark:text-red-400">
                    Rejected
                  </p>
                  <p className="text-xs text-red-700 dark:text-red-500">
                    By: {selectedRequest.rejectedBy}
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
                {actionType === 'verify' && <button onClick={handleConfirmAction} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Confirm Verification
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