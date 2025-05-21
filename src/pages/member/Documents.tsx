import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { FileTextIcon, FileIcon, ReceiptIcon, DownloadIcon, SearchIcon, CalendarIcon, EyeIcon, ChevronDownIcon } from 'lucide-react';
// Define types for documents
interface Document {
  id: string;
  title: string;
  category: 'loan' | 'statement' | 'receipt';
  date: string;
  fileSize: string;
  fileType: string;
  url: string;
}
// Mock data for documents
const mockDocuments: Document[] = [{
  id: 'DOC-2023-0001',
  title: 'Loan Agreement - Personal Loan',
  category: 'loan',
  date: '2023-05-15',
  fileSize: '245 KB',
  fileType: 'PDF',
  url: 'https://example.com/documents/loan-agreement.pdf'
}, {
  id: 'DOC-2023-0002',
  title: 'Loan Disbursement Voucher',
  category: 'loan',
  date: '2023-05-16',
  fileSize: '180 KB',
  fileType: 'PDF',
  url: 'https://example.com/documents/disbursement-voucher.pdf'
}, {
  id: 'DOC-2023-0003',
  title: 'Loan Amortization Schedule',
  category: 'loan',
  date: '2023-05-16',
  fileSize: '156 KB',
  fileType: 'PDF',
  url: 'https://example.com/documents/amortization-schedule.pdf'
}, {
  id: 'DOC-2023-0004',
  title: 'Quarterly Statement - Q2 2023',
  category: 'statement',
  date: '2023-06-30',
  fileSize: '320 KB',
  fileType: 'PDF',
  url: 'https://example.com/documents/q2-statement.pdf'
}, {
  id: 'DOC-2023-0005',
  title: 'Quarterly Statement - Q1 2023',
  category: 'statement',
  date: '2023-03-31',
  fileSize: '305 KB',
  fileType: 'PDF',
  url: 'https://example.com/documents/q1-statement.pdf'
}, {
  id: 'DOC-2023-0006',
  title: 'Annual Statement - 2022',
  category: 'statement',
  date: '2022-12-31',
  fileSize: '450 KB',
  fileType: 'PDF',
  url: 'https://example.com/documents/annual-statement-2022.pdf'
}, {
  id: 'DOC-2023-0007',
  title: 'Payment Receipt - June 2023',
  category: 'receipt',
  date: '2023-06-15',
  fileSize: '125 KB',
  fileType: 'PDF',
  url: 'https://example.com/documents/payment-receipt-june.pdf'
}, {
  id: 'DOC-2023-0008',
  title: 'Payment Receipt - May 2023',
  category: 'receipt',
  date: '2023-05-15',
  fileSize: '128 KB',
  fileType: 'PDF',
  url: 'https://example.com/documents/payment-receipt-may.pdf'
}, {
  id: 'DOC-2023-0009',
  title: 'Payment Receipt - April 2023',
  category: 'receipt',
  date: '2023-04-15',
  fileSize: '130 KB',
  fileType: 'PDF',
  url: 'https://example.com/documents/payment-receipt-april.pdf'
}, {
  id: 'DOC-2023-0010',
  title: 'Share Certificate',
  category: 'loan',
  date: '2023-01-10',
  fileSize: '215 KB',
  fileType: 'PDF',
  url: 'https://example.com/documents/share-certificate.pdf'
}];
type DocumentCategory = 'loan' | 'statement' | 'receipt';
export const Documents = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<DocumentCategory>('loan');
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  // State for sort order
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'name'>('newest');
  const [showSortOptions, setShowSortOptions] = useState(false);
  // State for document preview
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);
  // Filter documents based on active tab and search term
  const filteredDocuments = mockDocuments.filter(doc => doc.category === activeTab).filter(doc => doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || doc.id.toLowerCase().includes(searchTerm.toLowerCase()));
  // Sort documents based on sort order
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOrder === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return a.title.localeCompare(b.title);
    }
  });
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // Handle document download
  const handleDownload = (document: Document) => {
    console.log(`Downloading ${document.title}`);
    // In a real app, this would trigger a download
    window.open(document.url, '_blank');
  };
  // Handle document preview
  const handlePreview = (document: Document) => {
    setPreviewDocument(document);
  };
  return <>
      <PageHeader title="Documents" description="Access and manage your documents" />
      {/* Tabs */}
      <div className="flex mb-6 border-b border-[rgba(var(--border-color),0.2)]">
        <button className={`px-4 py-3 flex items-center gap-2 text-sm font-medium relative ${activeTab === 'loan' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('loan')}>
          <FileTextIcon className="w-4 h-4" />
          Loan Documents
        </button>
        <button className={`px-4 py-3 flex items-center gap-2 text-sm font-medium relative ${activeTab === 'statement' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('statement')}>
          <FileIcon className="w-4 h-4" />
          Statements
        </button>
        <button className={`px-4 py-3 flex items-center gap-2 text-sm font-medium relative ${activeTab === 'receipt' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('receipt')}>
          <ReceiptIcon className="w-4 h-4" />
          Receipts
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {/* Search and Sort */}
        <div className="p-4 border-b border-[rgba(var(--border-color),0.2)]">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="relative flex-grow">
              <input type="text" placeholder="Search documents..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" size={18} />
            </div>
            <div className="relative">
              <button onClick={() => setShowSortOptions(!showSortOptions)} className="px-4 py-2 rounded-lg border border-[rgba(var(--border-color),0.2)] flex items-center gap-2 bg-[rgba(var(--input-bg),0.8)] hover:bg-[rgba(var(--input-bg),1)]">
                <span>
                  {sortOrder === 'newest' ? 'Newest First' : sortOrder === 'oldest' ? 'Oldest First' : 'Name'}
                </span>
                <ChevronDownIcon size={16} className={`transition-transform ${showSortOptions ? 'rotate-180' : ''}`} />
              </button>
              {showSortOptions && <div className="absolute z-10 mt-1 right-0 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-[rgba(var(--border-color),0.2)]">
                  <button onClick={() => {
                setSortOrder('newest');
                setShowSortOptions(false);
              }} className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${sortOrder === 'newest' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                    Newest First
                  </button>
                  <button onClick={() => {
                setSortOrder('oldest');
                setShowSortOptions(false);
              }} className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${sortOrder === 'oldest' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                    Oldest First
                  </button>
                  <button onClick={() => {
                setSortOrder('name');
                setShowSortOptions(false);
              }} className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${sortOrder === 'name' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}>
                    Name
                  </button>
                </div>}
            </div>
          </div>
        </div>
        {/* Document List */}
        {sortedDocuments.length > 0 ? <div className="divide-y divide-[rgba(var(--border-color),0.2)]">
            {sortedDocuments.map(document => <div key={document.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    {document.category === 'loan' && <FileTextIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />}
                    {document.category === 'statement' && <FileIcon className="w-6 h-6 text-green-500 dark:text-green-400" />}
                    {document.category === 'receipt' && <ReceiptIcon className="w-6 h-6 text-purple-500 dark:text-purple-400" />}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{document.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-[rgb(var(--text-secondary))]">
                      <div className="flex items-center gap-1">
                        <CalendarIcon size={12} />
                        <span>{formatDate(document.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileIcon size={12} />
                        <span>
                          {document.fileType} • {document.fileSize}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handlePreview(document)} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Preview">
                    <EyeIcon size={18} />
                  </button>
                  <button onClick={() => handleDownload(document)} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Download">
                    <DownloadIcon size={18} />
                  </button>
                </div>
              </div>)}
          </div> : <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-700 text-[rgb(var(--text-secondary))] mb-4">
              <FileIcon size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-2">No Documents Found</h3>
            <p className="text-[rgb(var(--text-secondary))]">
              {searchTerm ? 'No documents match your search criteria.' : `You don't have any ${activeTab} documents yet.`}
            </p>
          </div>}
      </div>
      {/* Document Preview Modal */}
      {previewDocument && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-3xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{previewDocument.title}</h3>
              <button onClick={() => setPreviewDocument(null)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-[rgb(var(--text-secondary))]">
                <div className="flex items-center gap-2">
                  <CalendarIcon size={16} />
                  <span>Date: {formatDate(previewDocument.date)}</span>
                </div>
                <div>
                  <span>
                    {previewDocument.fileType} • {previewDocument.fileSize}
                  </span>
                </div>
              </div>
              <div className="border border-[rgba(var(--border-color),0.2)] rounded-lg p-4 h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-700/30">
                <div className="text-center">
                  <div className="mx-auto w-16 h-16 mb-4 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full">
                    {previewDocument.category === 'loan' && <FileTextIcon className="w-8 h-8 text-blue-500 dark:text-blue-400" />}
                    {previewDocument.category === 'statement' && <FileIcon className="w-8 h-8 text-green-500 dark:text-green-400" />}
                    {previewDocument.category === 'receipt' && <ReceiptIcon className="w-8 h-8 text-purple-500 dark:text-purple-400" />}
                  </div>
                  <p className="mb-4">Preview not available in this view</p>
                  <button onClick={() => handleDownload(previewDocument)} className="px-4 py-2 bg-neon-red text-white rounded-md hover:bg-neon-red/90 transition-colors flex items-center gap-2 mx-auto">
                    <DownloadIcon size={16} />
                    Download Document
                  </button>
                </div>
              </div>
              {previewDocument.category === 'loan' && <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-400">
                    This document contains important information about your loan
                    agreement. Please download and keep a copy for your records.
                  </p>
                </div>}
              {previewDocument.category === 'statement' && <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-400">
                    This statement provides a summary of your account activity
                    for the specified period. Please review it carefully.
                  </p>
                </div>}
              {previewDocument.category === 'receipt' && <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
                  <p className="text-sm text-purple-800 dark:text-purple-400">
                    This receipt serves as proof of payment. Please keep it for
                    your tax and personal records.
                  </p>
                </div>}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setPreviewDocument(null)} className="px-4 py-2 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                Close
              </button>
              <button onClick={() => handleDownload(previewDocument)} className="px-4 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90">
                Download
              </button>
            </div>
          </div>
        </div>}
    </>;
};