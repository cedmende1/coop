import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Member } from '../../types/member';
import { AlertTriangle } from 'lucide-react';
interface MemberDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
  onConfirm: (member: Member) => void;
}
export const MemberDeleteModal: React.FC<MemberDeleteModalProps> = ({
  isOpen,
  onClose,
  member,
  onConfirm
}) => {
  const [confirmText, setConfirmText] = useState('');
  if (!member) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(member);
    setConfirmText('');
    onClose();
  };
  // Check if confirmation text matches
  const isConfirmed = confirmText.toLowerCase() === 'delete';
  return <Modal isOpen={isOpen} onClose={onClose} title="Delete Account" size="md">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Warning message */}
          <div className="flex p-4 rounded-md bg-red-50 dark:bg-red-900/20">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-300">
                Permanent Action
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p>
                  This action <strong>cannot be undone</strong>. This will
                  permanently delete the account of{' '}
                  <strong>{member.name}</strong> and remove all associated data
                  from the system.
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
          {/* Confirmation field */}
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium mb-1">
              Please type{' '}
              <span className="font-mono text-red-600 dark:text-red-400">
                delete
              </span>{' '}
              to confirm
            </label>
            <input id="confirm" type="text" value={confirmText} onChange={e => setConfirmText(e.target.value)} className="w-full px-3 py-2 rounded-md bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.3)] text-sm focus:outline-none focus:ring-1 focus:ring-neon-red/40 transition-all" placeholder="delete" required />
          </div>
          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-[rgba(var(--border-color),0.2)]">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-[rgb(var(--text-secondary))] hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={!isConfirmed} className={`px-4 py-2 rounded-md text-white transition-colors ${isConfirmed ? 'bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600' : 'bg-red-300 dark:bg-red-800 cursor-not-allowed'}`}>
              Delete Account
            </button>
          </div>
        </div>
      </form>
    </Modal>;
};