import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { SearchIcon, FileTextIcon, FileIcon, FileBarChartIcon, FileCheckIcon, ChevronDownIcon, DownloadIcon, EyeIcon, TrashIcon, AlertCircleIcon } from 'lucide-react';
// Define types for reports data
interface Report {
  id: string;
  title: string;
  category: 'Loans' | 'Members' | 'Financials' | 'Approvals';
  generatedDate: string;
  createdBy: string;
  size: string;
  description?: string;
  status?: 'ready' | 'processing' | 'failed';
}
// Mock data for reports
const mockReports: Report[] = [{
  id: 'REP-2023-0001',
  title: 'Loan Portfolio Summary',
  category: 'Loans',
  generatedDate: '2023-10-30',
  createdBy: 'Maria Santos',
  size: '2.4 MB',
  description: 'Monthly summary of all active loans including outstanding balances, interest accrued, and risk classification.'
}, {
  id: 'REP-2023-0002',
  title: 'Member Demographics Report',
  category: 'Members',
  generatedDate: '2023-10-28',
  createdBy: 'Pedro Reyes',
  size: '1.8 MB',
  description: 'Analysis of member demographics including age distribution, membership duration, and activity levels.'
}, {
  id: 'REP-2023-0003',
  title: 'Q3 Financial Statement',
  category: 'Financials',
  generatedDate: '2023-10-15',
  createdBy: 'Ana Gonzales',
  size: '3.5 MB',
  description: 'Comprehensive financial statements for Q3 including income statement, balance sheet, and cash flow statement.'
}, {
  id: 'REP-2023-0004',
  title: 'Loan Approval Rate Analysis',
  category: 'Approvals',
  generatedDate: '2023-10-25',
  createdBy: 'Luis Torres',
  size: '1.2 MB',
  description: 'Analysis of loan approval rates by member type, loan amount, and purpose with historical trends.'
}, {
  id: 'REP-2023-0005',
  title: 'Delinquency Report',
  category: 'Loans',
  generatedDate: '2023-10-27',
  createdBy: 'Maria Santos',
  size: '1.6 MB',
  description: 'Detailed report of all delinquent loans with aging analysis and collection status.'
}, {
  id: 'REP-2023-0006',
  title: 'Member Retention Analysis',
  category: 'Members',
  generatedDate: '2023-10-20',
  createdBy: 'Pedro Reyes',
  size: '2.1 MB',
  description: 'Analysis of member retention rates, churn factors, and engagement metrics.'
}, {
  id: 'REP-2023-0007',
  title: 'Monthly Revenue Report',
  category: 'Financials',
  generatedDate: '2023-11-01',
  createdBy: 'Ana Gonzales',
  size: '1.9 MB',
  description: 'Detailed breakdown of monthly revenue streams including interest income, fees, and other sources.'
}, {
  id: 'REP-2023-0008',
  title: 'New Member Approvals',
  category: 'Approvals',
  generatedDate: '2023-10-31',
  createdBy: 'Luis Torres',
  size: '0.9 MB',
  description: 'Summary of new member applications, approval rates, and processing times.'
}, {
  id: 'REP-2023-0009',
  title: 'Interest Rate Impact Analysis',
  category: 'Loans',
  generatedDate: '2023-10-18',
  createdBy: 'Maria Santos',
  size: '2.2 MB',
  description: 'Analysis of how changes in interest rates affect loan demand, repayment rates, and overall portfolio performance.'
}, {
  id: 'REP-2023-0010',
  title: 'Capital Adequacy Report',
  category: 'Financials',
  generatedDate: '2023-10-22',
  createdBy: 'Ana Gonzales',
  size: '2.8 MB',
  description: 'Assessment of capital adequacy ratios, reserve requirements, and compliance with regulatory standards.'
}, {
  id: 'REP-2023-0011',
  title: 'Member Satisfaction Survey Results',
  category: 'Members',
  generatedDate: '2023-10-12',
  createdBy: 'Pedro Reyes',
  size: '3.2 MB',
  description: 'Analysis of quarterly member satisfaction survey results with trend comparisons.'
}, {
  id: 'REP-2023-0012',
  title: 'Loan Officer Performance',
  category: 'Approvals',
  generatedDate: '2023-10-05',
  createdBy: 'Luis Torres',
  size: '1.5 MB',
  description: 'Performance metrics for loan officers including approval rates, processing times, and portfolio quality.',
  status: 'processing'
}, {
  id: 'REP-2023-0013',
  title: 'Risk Assessment Report',
  category: 'Loans',
  generatedDate: '2023-09-30',
  createdBy: 'Maria Santos',
  size: '2.7 MB',
  description: 'Comprehensive risk assessment of the loan portfolio with stress test scenarios.'
}, {
  id: 'REP-2023-0014',
  title: 'Expense Analysis',
  category: 'Financials',
  generatedDate: '2023-09-28',
  createdBy: 'Ana Gonzales',
  size: '1.7 MB',
  description: 'Detailed breakdown of operational expenses with budget variance analysis.',
  status: 'failed'
}];
export const Reports = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  // Filter reports based on search term and category
  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) || report.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) || report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Loans':
        return <FileTextIcon size={16} className="text-blue-500 dark:text-blue-400" />;
      case 'Members':
        return <FileIcon size={16} className="text-green-500 dark:text-green-400" />;
      case 'Financials':
        return <FileBarChartIcon size={16} className="text-purple-500 dark:text-purple-400" />;
      case 'Approvals':
        return <FileCheckIcon size={16} className="text-orange-500 dark:text-orange-400" />;
      default:
        return <FileIcon size={16} />;
    }
  };
  // Get status badge
  const getStatusBadge = (status?: string) => {
    if (!status || status === 'ready') return null;
    switch (status) {
      case 'processing':
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">
            Processing
          </span>;
      case 'failed':
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400">
            Failed
          </span>;
      default:
        return null;
    }
  };
  // Handle view report
  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setIsViewModalOpen(true);
  };
  // Handle delete report
  const handleDeleteReport = (report: Report) => {
    setSelectedReport(report);
    setIsDeleteModalOpen(true);
  };
  // Handle confirm delete
  const handleConfirmDelete = () => {
    // In a real app, you would call an API to delete the report
    console.log('Deleting report:', selectedReport?.id);
    setIsDeleteModalOpen(false);
  };
  // Handle download report
  const handleDownloadReport = (report: Report) => {
    // In a real app, you would trigger a download
    console.log('Downloading report:', report.id);
  };
  // Handle generate report
  const handleGenerateReport = () => {
    setIsGenerateModalOpen(true);
  };
  return <>
      <PageHeader title="Reports" description="Generate and view financial reports" />
      <div className="space-y-6">
        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-grow max-w-md">
              <input type="text" placeholder="Search reports..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" size={18} />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <button onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)} className="px-3 py-2 rounded-lg border border-[rgba(var(--border-color),0.2)] flex items-center gap-2 bg-[rgba(var(--input-bg),0.8)] hover:bg-[rgba(var(--input-bg),1)]">
                  <span>
                    {categoryFilter === 'all' ? 'All Categories' : categoryFilter}
                  </span>
                  <ChevronDownIcon size={16} className={`transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCategoryDropdownOpen && <div className="absolute z-10 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-[rgba(var(--border-color),0.2)]">
                    <button onClick={() => {
                  setCategoryFilter('all');
                  setIsCategoryDropdownOpen(false);
                }} className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${categoryFilter === 'all' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                      All Categories
                    </button>
                    <button onClick={() => {
                  setCategoryFilter('Loans');
                  setIsCategoryDropdownOpen(false);
                }} className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${categoryFilter === 'Loans' ? 'bg-gray-100 dark:bg-gray-700' : ''} flex items-center gap-2`}>
                      <FileTextIcon size={16} className="text-blue-500 dark:text-blue-400" />
                      Loans
                    </button>
                    <button onClick={() => {
                  setCategoryFilter('Members');
                  setIsCategoryDropdownOpen(false);
                }} className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${categoryFilter === 'Members' ? 'bg-gray-100 dark:bg-gray-700' : ''} flex items-center gap-2`}>
                      <FileIcon size={16} className="text-green-500 dark:text-green-400" />
                      Members
                    </button>
                    <button onClick={() => {
                  setCategoryFilter('Financials');
                  setIsCategoryDropdownOpen(false);
                }} className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${categoryFilter === 'Financials' ? 'bg-gray-100 dark:bg-gray-700' : ''} flex items-center gap-2`}>
                      <FileBarChartIcon size={16} className="text-purple-500 dark:text-purple-400" />
                      Financials
                    </button>
                    <button onClick={() => {
                  setCategoryFilter('Approvals');
                  setIsCategoryDropdownOpen(false);
                }} className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${categoryFilter === 'Approvals' ? 'bg-gray-100 dark:bg-gray-700' : ''} flex items-center gap-2`}>
                      <FileCheckIcon size={16} className="text-orange-500 dark:text-orange-400" />
                      Approvals
                    </button>
                  </div>}
              </div>
              <button onClick={handleGenerateReport} className="px-4 py-2 bg-neon-red text-white rounded-lg flex items-center gap-2 hover:bg-neon-red/90 transition-colors">
                Generate Report
              </button>
            </div>
          </div>
        </div>
        {/* Reports Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Generated
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(var(--border-color),0.2)]">
                {filteredReports.length > 0 ? filteredReports.map(report => <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-start gap-2">
                          <div className="flex-shrink-0 mt-0.5">
                            {getCategoryIcon(report.category)}
                          </div>
                          <div>
                            <div className="font-medium flex items-center gap-2">
                              {report.title}
                              {getStatusBadge(report.status)}
                            </div>
                            <div className="text-xs text-[rgb(var(--text-secondary))]">
                              {report.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1">
                          {report.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {formatDate(report.generatedDate)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {report.createdBy}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {report.size}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleViewReport(report)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="View Details" disabled={report.status === 'processing' || report.status === 'failed'}>
                            <EyeIcon size={16} className={`${report.status === 'processing' || report.status === 'failed' ? 'opacity-50 cursor-not-allowed' : ''}`} />
                          </button>
                          <button onClick={() => handleDownloadReport(report)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Download" disabled={report.status === 'processing' || report.status === 'failed'}>
                            <DownloadIcon size={16} className={`${report.status === 'processing' || report.status === 'failed' ? 'opacity-50 cursor-not-allowed' : ''}`} />
                          </button>
                          <button onClick={() => handleDeleteReport(report)} className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-700 dark:text-red-400" title="Delete">
                            <TrashIcon size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>) : <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-[rgb(var(--text-secondary))]">
                      No reports found
                    </td>
                  </tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* View Report Modal */}
      {isViewModalOpen && selectedReport && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Report Details</h3>
              <button onClick={() => setIsViewModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                  {getCategoryIcon(selectedReport.category)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    {selectedReport.title}
                  </h2>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    {selectedReport.id}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Category
                  </p>
                  <p className="font-medium">{selectedReport.category}</p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Generated Date
                  </p>
                  <p className="font-medium">
                    {formatDate(selectedReport.generatedDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Created By
                  </p>
                  <p className="font-medium">{selectedReport.createdBy}</p>
                </div>
                <div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Size
                  </p>
                  <p className="font-medium">{selectedReport.size}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-[rgb(var(--text-secondary))]">
                  Description
                </p>
                <p className="font-medium">
                  {selectedReport.description || 'No description available'}
                </p>
              </div>
              <div className="p-4 border border-[rgba(var(--border-color),0.2)] rounded-lg bg-gray-50 dark:bg-gray-700/30">
                <div className="text-center">
                  <p className="text-[rgb(var(--text-secondary))]">
                    Report preview would appear here
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => handleDownloadReport(selectedReport)} className="px-4 py-2 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                  <DownloadIcon size={16} />
                  Download
                </button>
                <button onClick={() => setIsViewModalOpen(false)} className="px-4 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedReport && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 mb-4">
                <AlertCircleIcon size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Delete Report</h3>
              <p className="text-[rgb(var(--text-secondary))]">
                Are you sure you want to delete the report "
                {selectedReport.title}"? This action cannot be undone.
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
      {/* Generate Report Modal */}
      {isGenerateModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Generate New Report</h3>
              <button onClick={() => setIsGenerateModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Report Title
                </label>
                <input type="text" className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" placeholder="Enter report title" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30">
                  <option value="">Select Category</option>
                  <option value="Loans">Loans</option>
                  <option value="Members">Members</option>
                  <option value="Financials">Financials</option>
                  <option value="Approvals">Approvals</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Report Type
                </label>
                <select className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30">
                  <option value="">Select Report Type</option>
                  <option value="summary">Summary Report</option>
                  <option value="detailed">Detailed Report</option>
                  <option value="analysis">Analysis Report</option>
                  <option value="audit">Audit Report</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Date Range
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-[rgb(var(--text-secondary))] mb-1 block">
                      Start Date
                    </label>
                    <input type="date" className="w-full px-2 py-1.5 rounded bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-sm" />
                  </div>
                  <div>
                    <label className="text-xs text-[rgb(var(--text-secondary))] mb-1 block">
                      End Date
                    </label>
                    <input type="date" className="w-full px-2 py-1.5 rounded bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-sm" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Format</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 py-1 cursor-pointer">
                    <input type="radio" name="format" value="pdf" className="form-radio text-neon-red" defaultChecked />
                    <span>PDF</span>
                  </label>
                  <label className="flex items-center gap-2 py-1 cursor-pointer">
                    <input type="radio" name="format" value="excel" className="form-radio text-neon-red" />
                    <span>Excel</span>
                  </label>
                  <label className="flex items-center gap-2 py-1 cursor-pointer">
                    <input type="radio" name="format" value="csv" className="form-radio text-neon-red" />
                    <span>CSV</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Additional Options
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 py-1 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-neon-red" />
                    <span>Include charts and graphs</span>
                  </label>
                  <label className="flex items-center gap-2 py-1 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-neon-red" />
                    <span>Include detailed tables</span>
                  </label>
                  <label className="flex items-center gap-2 py-1 cursor-pointer">
                    <input type="checkbox" className="form-checkbox text-neon-red" />
                    <span>Add executive summary</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsGenerateModalOpen(false)} className="px-4 py-2 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                Cancel
              </button>
              <button onClick={() => {
            console.log('Generating report...');
            setIsGenerateModalOpen(false);
          }} className="px-4 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90">
                Generate
              </button>
            </div>
          </div>
        </div>}
    </>;
};