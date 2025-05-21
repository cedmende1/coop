import React from 'react';
import { Modal } from '../ui/Modal';
import { Member } from '../../types/member';
import { Check, Clock, X } from 'lucide-react';
interface MemberViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
}
export const MemberViewModal: React.FC<MemberViewModalProps> = ({
  isOpen,
  onClose,
  member
}) => {
  if (!member) return null;
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <div className="flex items-center text-green-600 dark:text-green-400">
            <Check className="w-4 h-4 mr-2" />
            <span>Active</span>
          </div>;
      case 'inactive':
        return <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            <span>Inactive</span>
          </div>;
      case 'suspended':
        return <div className="flex items-center text-red-600 dark:text-red-400">
            <X className="w-4 h-4 mr-2" />
            <span>Suspended</span>
          </div>;
      default:
        return null;
    }
  };
  return <Modal isOpen={isOpen} onClose={onClose} title="Member Details" size="md">
      <div className="space-y-6">
        {/* Member header */}
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl font-medium">
            {member.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <div className="mt-1">{getStatusBadge(member.status)}</div>
          </div>
        </div>
        {/* Member details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-[rgb(var(--text-secondary))]">
              MEMBERSHIP DETAILS
            </h4>
            <div className="mt-2 space-y-2">
              <div>
                <div className="text-sm text-[rgb(var(--text-secondary))]">
                  Membership Number
                </div>
                <div className="font-medium">{member.membershipNumber}</div>
              </div>
              <div>
                <div className="text-sm text-[rgb(var(--text-secondary))]">
                  Join Date
                </div>
                <div className="font-medium">{formatDate(member.joinDate)}</div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-[rgb(var(--text-secondary))]">
              CONTACT INFORMATION
            </h4>
            <div className="mt-2 space-y-2">
              <div>
                <div className="text-sm text-[rgb(var(--text-secondary))]">
                  Phone Number
                </div>
                <div className="font-medium">{member.contact}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Remarks */}
        <div>
          <h4 className="text-sm font-medium text-[rgb(var(--text-secondary))]">
            REMARKS
          </h4>
          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md">
            {member.remarks || <span className="text-[rgb(var(--text-secondary))] italic">
                No remarks
              </span>}
          </div>
        </div>
        {/* Actions */}
        <div className="flex justify-end pt-4 border-t border-[rgba(var(--border-color),0.2)]">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-[rgb(var(--text-secondary))] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            Close
          </button>
        </div>
      </div>
    </Modal>;
};