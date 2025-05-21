import React from 'react';
import { Eye, AlertTriangle, Trash2, Check, X, Clock } from 'lucide-react';
import { Member } from '../../types/member';
interface MembersTableProps {
  members: Member[];
  formatDate: (dateString: string) => string;
  onViewMember: (member: Member) => void;
  onSuspendMember: (member: Member) => void;
  onDeleteMember: (member: Member) => void;
}
export const MembersTable: React.FC<MembersTableProps> = ({
  members,
  formatDate,
  onViewMember,
  onSuspendMember,
  onDeleteMember
}) => {
  // Get status badge based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <Check className="w-3 h-3 mr-1" />
            Active
          </span>;
      case 'inactive':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
            <Clock className="w-3 h-3 mr-1" />
            Inactive
          </span>;
      case 'suspended':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <X className="w-3 h-3 mr-1" />
            Suspended
          </span>;
      default:
        return null;
    }
  };
  return <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
        <thead className="bg-gray-50 dark:bg-gray-700/50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              MEMBER
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              CONTACT
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              MEMBERSHIP
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              STATUS
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              REMARKS
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgba(var(--border-color),0.1)]">
          {members.length > 0 ? members.map(member => <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium overflow-hidden">
                      {member.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">{member.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {member.contact}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm">{member.membershipNumber}</div>
                  <div className="text-xs text-[rgb(var(--text-secondary))]">
                    Joined {formatDate(member.joinDate)}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {getStatusBadge(member.status)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {member.remarks || <span className="text-[rgb(var(--text-secondary))] italic">
                      No remarks
                    </span>}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => onViewMember(member)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))] hover:text-blue-600 dark:hover:text-blue-400 transition-colors" title="View Member Details">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button onClick={() => onSuspendMember(member)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))] hover:text-amber-600 dark:hover:text-amber-400 transition-colors" title="Suspend Account">
                      <AlertTriangle className="h-4 w-4" />
                    </button>
                    <button onClick={() => onDeleteMember(member)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))] hover:text-red-600 dark:hover:text-red-400 transition-colors" title="Delete Account">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>) : <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-[rgb(var(--text-secondary))]">
                No members found matching your criteria.
              </td>
            </tr>}
        </tbody>
      </table>
    </div>;
};