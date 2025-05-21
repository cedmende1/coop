import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { MemberApproval, Document } from '../../types/memberApproval';
import { CheckCircle, XCircle, Calendar, Mail, Phone, User, MapPin, Globe, CreditCard, Briefcase, DollarSign, Clock, FileText, Download, AlertCircle } from 'lucide-react';
interface MemberApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  approval: MemberApproval | null;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  formatDate: (date: string) => string;
}
export const MemberApprovalModal: React.FC<MemberApprovalModalProps> = ({
  isOpen,
  onClose,
  approval,
  onApprove,
  onReject,
  formatDate
}) => {
  const [activeSection, setActiveSection] = useState('personal');
  const [rejectMode, setRejectMode] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  if (!approval) return null;
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  const handleApprove = () => {
    onApprove(approval.id);
    onClose();
  };
  const handleReject = () => {
    if (rejectMode) {
      onReject(approval.id, rejectionReason);
      setRejectMode(false);
      setRejectionReason('');
      onClose();
    } else {
      setRejectMode(true);
    }
  };
  const handleCancelReject = () => {
    setRejectMode(false);
    setRejectionReason('');
  };
  // Render document status badge
  const renderDocumentStatus = (status: string) => {
    switch (status) {
      case 'verified':
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Verified
          </span>;
      case 'rejected':
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            Rejected
          </span>;
      default:
        return <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
            Pending
          </span>;
    }
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Member Application Details" size="lg">
      {/* Header with applicant info */}
      <div className="mb-6 flex items-center">
        <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl font-medium overflow-hidden">
          {approval.avatar ? <img src={approval.avatar} alt={approval.name} className="h-full w-full object-cover" /> : approval.name.charAt(0)}
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{approval.name}</h2>
          <div className="flex items-center text-[rgb(var(--text-secondary))]">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-sm">
              Registered {formatDate(approval.registrationDate)}
            </span>
          </div>
        </div>
      </div>
      {/* Section tabs */}
      <div className="flex border-b border-[rgba(var(--border-color),0.2)] mb-4">
        <button className={`px-4 py-2 text-sm font-medium border-b-2 ${activeSection === 'personal' ? 'text-neon-red border-neon-red' : 'border-transparent text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]'}`} onClick={() => setActiveSection('personal')}>
          Personal Information
        </button>
        <button className={`px-4 py-2 text-sm font-medium border-b-2 ${activeSection === 'employment' ? 'text-neon-red border-neon-red' : 'border-transparent text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]'}`} onClick={() => setActiveSection('employment')}>
          Employment Details
        </button>
        <button className={`px-4 py-2 text-sm font-medium border-b-2 ${activeSection === 'documents' ? 'text-neon-red border-neon-red' : 'border-transparent text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]'}`} onClick={() => setActiveSection('documents')}>
          Documents
        </button>
      </div>
      {/* Rejection form */}
      {rejectMode && <div className="mb-6 p-4 border border-red-200 dark:border-red-900/30 rounded-md bg-red-50 dark:bg-red-900/10">
          <h4 className="text-sm font-medium flex items-center text-red-800 dark:text-red-300 mb-3">
            <AlertCircle className="w-4 h-4 mr-2" />
            Provide Rejection Reason
          </h4>
          <textarea value={rejectionReason} onChange={e => setRejectionReason(e.target.value)} placeholder="Please specify the reason for rejecting this application..." className="w-full p-2 border border-red-200 dark:border-red-900/30 rounded-md bg-white dark:bg-gray-800 text-sm" rows={3} required />
        </div>}
      {/* Personal Information Section */}
      {activeSection === 'personal' && <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-[rgb(var(--text-secondary))] mb-3">
                CONTACT INFORMATION
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address
                  </div>
                  <div className="mt-1 font-medium">{approval.email}</div>
                </div>
                <div>
                  <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Number
                  </div>
                  <div className="mt-1 font-medium">{approval.phone}</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[rgb(var(--text-secondary))] mb-3">
                PERSONAL DETAILS
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
                    <Calendar className="w-4 h-4 mr-2" />
                    Date of Birth
                  </div>
                  <div className="mt-1 font-medium">
                    {formatDate(approval.dateOfBirth)}
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
                    <User className="w-4 h-4 mr-2" />
                    Gender
                  </div>
                  <div className="mt-1 font-medium capitalize">
                    {approval.gender}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-[rgb(var(--text-secondary))] mb-3">
              ADDRESS
            </h3>
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 text-[rgb(var(--text-secondary))]" />
                <div>
                  <p>{approval.address.street}</p>
                  <p>
                    {approval.address.city}, {approval.address.state}{' '}
                    {approval.address.zipCode}
                  </p>
                  <p>{approval.address.country}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
                <Globe className="w-4 h-4 mr-2" />
                Nationality
              </div>
              <div className="mt-1 font-medium">{approval.nationality}</div>
            </div>
            <div>
              <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
                <CreditCard className="w-4 h-4 mr-2" />
                ID Number
              </div>
              <div className="mt-1 font-medium">{approval.idNumber}</div>
            </div>
          </div>
        </div>}
      {/* Employment Details Section */}
      {activeSection === 'employment' && <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-[rgb(var(--text-secondary))] mb-3">
                EMPLOYER INFORMATION
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Employer
                  </div>
                  <div className="mt-1 font-medium">{approval.employer}</div>
                </div>
                <div>
                  <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
                    <User className="w-4 h-4 mr-2" />
                    Position
                  </div>
                  <div className="mt-1 font-medium">{approval.position}</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[rgb(var(--text-secondary))] mb-3">
                EMPLOYMENT STATUS
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
                    <Clock className="w-4 h-4 mr-2" />
                    Status
                  </div>
                  <div className="mt-1 font-medium capitalize">
                    {approval.employmentStatus.replace('-', ' ')}
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
                    <Calendar className="w-4 h-4 mr-2" />
                    Duration
                  </div>
                  <div className="mt-1 font-medium">
                    {approval.employmentDuration}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-[rgb(var(--text-secondary))] mb-3">
              FINANCIAL INFORMATION
            </h3>
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md">
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-[rgb(var(--text-secondary))]" />
                <div>
                  <div className="text-sm text-[rgb(var(--text-secondary))]">
                    Monthly Income
                  </div>
                  <div className="font-medium">
                    {formatCurrency(approval.monthlyIncome)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {approval.referredBy && <div>
              <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
                <User className="w-4 h-4 mr-2" />
                Referred By
              </div>
              <div className="mt-1 font-medium">{approval.referredBy}</div>
            </div>}
        </div>}
      {/* Documents Section */}
      {activeSection === 'documents' && <div className="space-y-4">
          <h3 className="text-sm font-medium text-[rgb(var(--text-secondary))]">
            SUBMITTED DOCUMENTS
          </h3>
          {approval.documents.length > 0 ? <div className="divide-y divide-[rgba(var(--border-color),0.2)]">
              {approval.documents.map((document: Document) => <div key={document.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-3 text-[rgb(var(--text-secondary))]" />
                    <div>
                      <div className="font-medium">{document.name}</div>
                      <div className="text-xs text-[rgb(var(--text-secondary))]">
                        Uploaded on {formatDate(document.uploadDate)} •{' '}
                        {document.type}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {renderDocumentStatus(document.status)}
                    <a href={document.fileUrl} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))] transition-colors">
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>)}
            </div> : <div className="p-4 text-center text-[rgb(var(--text-secondary))]">
              No documents have been submitted.
            </div>}
          {approval.notes && <div className="mt-4">
              <h3 className="text-sm font-medium text-[rgb(var(--text-secondary))] mb-2">
                NOTES
              </h3>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md text-sm">
                {approval.notes}
              </div>
            </div>}
        </div>}
      {/* Action buttons */}
      <div className="mt-6 pt-4 border-t border-[rgba(var(--border-color),0.2)] flex justify-end gap-3">
        {!rejectMode ? <>
            <button onClick={onClose} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-[rgb(var(--text-secondary))] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Close
            </button>
            {approval.status === 'pending' && <>
                <button onClick={handleReject} className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center">
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </button>
                <button onClick={handleApprove} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </button>
              </>}
          </> : <>
            <button onClick={handleCancelReject} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-[rgb(var(--text-secondary))] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Cancel
            </button>
            <button onClick={handleReject} disabled={!rejectionReason.trim()} className={`px-4 py-2 rounded-md text-white transition-colors ${rejectionReason.trim() ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 dark:bg-red-800/50 cursor-not-allowed'}`}>
              Confirm Rejection
            </button>
          </>}
      </div>
    </Modal>;
};