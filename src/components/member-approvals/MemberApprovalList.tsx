import React from 'react';
import { MemberApproval } from '../../types/memberApproval';
import { MemberApprovalCard } from './MemberApprovalCard';
interface MemberApprovalListProps {
  approvals: MemberApproval[];
  formatDate: (date: string) => string;
  onViewDetails: (approval: MemberApproval) => void;
}
export const MemberApprovalList: React.FC<MemberApprovalListProps> = ({
  approvals,
  formatDate,
  onViewDetails
}) => {
  if (approvals.length === 0) {
    return <div className="p-8 text-center text-[rgb(var(--text-secondary))]">
        <p>No member applications found matching your criteria.</p>
      </div>;
  }
  return <div className="space-y-4 p-4">
      {approvals.map(approval => <MemberApprovalCard key={approval.id} approval={approval} formatDate={formatDate} onViewDetails={onViewDetails} />)}
    </div>;
};