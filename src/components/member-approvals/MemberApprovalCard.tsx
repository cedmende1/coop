import React from 'react';
import { MemberApproval } from '../../types/memberApproval';
import { Calendar, Mail, Phone, ExternalLink } from 'lucide-react';
interface MemberApprovalCardProps {
  approval: MemberApproval;
  formatDate: (date: string) => string;
  onViewDetails: (approval: MemberApproval) => void;
}
export const MemberApprovalCard: React.FC<MemberApprovalCardProps> = ({
  approval,
  formatDate,
  onViewDetails
}) => {
  return <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-[rgba(var(--border-color),0.2)] 
                    hover:border-[rgba(var(--border-color),0.4)] transition-all duration-200 
                    hover:shadow-md">
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl font-medium overflow-hidden flex-shrink-0">
          {approval.avatar ? <img src={approval.avatar} alt={approval.name} className="h-full w-full object-cover" /> : approval.name.charAt(0)}
        </div>
        {/* Main info */}
        <div className="flex-grow min-w-0">
          <h3 className="text-lg font-medium truncate">{approval.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 mt-1">
            <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
              <Mail className="w-3.5 h-3.5 mr-1.5" />
              <span className="truncate">{approval.email}</span>
            </div>
            <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
              <Phone className="w-3.5 h-3.5 mr-1.5" />
              <span>{approval.phone}</span>
            </div>
            <div className="flex items-center text-sm text-[rgb(var(--text-secondary))]">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              <span>Registered {formatDate(approval.registrationDate)}</span>
            </div>
          </div>
        </div>
        {/* Status badge */}
        <div className="hidden sm:block">
          {approval.status === 'pending' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
              Pending
            </span>}
          {approval.status === 'approved' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              Approved
            </span>}
          {approval.status === 'rejected' && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
              Rejected
            </span>}
        </div>
        {/* Action button */}
        <button onClick={() => onViewDetails(approval)} className="ml-2 flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-sm font-medium transition-colors">
          <ExternalLink className="w-4 h-4" />
          <span className="hidden sm:inline">View Details</span>
        </button>
      </div>
    </div>;
};