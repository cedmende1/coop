import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Member } from '../../types/member';
import { AlertCircle } from 'lucide-react';
interface MemberSuspendModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
  onConfirm: (member: Member, reason: string) => void;
}
export const MemberSuspendModal: React.FC<MemberSuspendModalProps> = ({
  isOpen,
  onClose,
  member,
  onConfirm
}) => {
  const [reason, setReason] = useState('');
  if (!member) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(member, reason);
    setReason('');
    onClose();
  };
  const isSuspended = member.status === 'suspended';
  const title = isSuspended ? 'Reactivate Account' : 'Suspend Account';
  const action = isSuspended ? 'reactivate' : 'suspend';
  return <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Warning message */}
          <div className={`flex p-4 rounded-md ${isSuspended ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-amber-50 dark:bg-amber-900/20'}`}>
            <div className="flex-shrink-0">
              <AlertCircle className={`w-5 h-5 ${isSuspended ? 'text-blue-600 dark:text-blue-400' : 'text-amber-600 dark:text-amber-400'}`} />
            </div>
            <div className="ml-3">
              <h3 className={`text-sm font-medium ${isSuspended ? 'text-blue-800 dark:text-blue-300' : 'text-amber-800 dark:text-amber-300'}`}>
                {isSuspended ? 'Account Reactivation' : 'Account Suspension'}
              </h3>
              <div className={`mt-2 text-sm ${isSuspended ? 'text-blue-700 dark:text-blue-300' : 'text-amber-700 dark:text-amber-300'}`}>
                <p>
                  {isSuspended ? `Are you sure you want to reactivate ${member.name}'s account? This will restore their access to the system.` : `Are you sure you want to suspend ${member.name}'s account? This will immediately revoke their access to the system.`}
                </p>
              </div>
            </div>
          </div>
          {/* Member info */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
              {member.name.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{member.name}</div>
              <div className="text-sm text-[rgb(var(--text-secondary))]">
                {member.membershipNumber}
              </div>
            </div>
          </div>
          {/* Reason field */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium mb-1">
              Reason for {action}
            </label>
            <textarea id="reason" value={reason} onChange={e => setReason(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-md bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.3)] text-sm focus:outline-none focus:ring-1 focus:ring-neon-red/40 transition-all" placeholder={`Enter reason for ${action}...`} required />
          </div>
          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-[rgba(var(--border-color),0.2)]">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-[rgb(var(--text-secondary))] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Cancel
            </button>
            <button type="submit" className={`px-4 py-2 rounded-md text-white transition-colors ${isSuspended ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600' : 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600'}`}>
              {isSuspended ? 'Reactivate Account' : 'Suspend Account'}
            </button>
          </div>
        </div>
      </form>
    </Modal>;
};