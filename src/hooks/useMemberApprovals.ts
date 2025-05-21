import { useState, useEffect } from 'react';
import { MemberApproval } from '../types/memberApproval';
export const useMemberApprovals = (initialApprovals: MemberApproval[]) => {
  const [approvals, setApprovals] = useState<MemberApproval[]>(initialApprovals);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  // Filter approvals based on search term and status filter
  const filteredApprovals = approvals.filter(approval => {
    const matchesSearch = approval.name.toLowerCase().includes(searchTerm.toLowerCase()) || approval.email.toLowerCase().includes(searchTerm.toLowerCase()) || approval.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || approval.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  // Approval actions
  const approveMember = (id: string) => {
    setApprovals(approvals.map(approval => approval.id === id ? {
      ...approval,
      status: 'approved'
    } : approval));
  };
  const rejectMember = (id: string, reason: string) => {
    setApprovals(approvals.map(approval => approval.id === id ? {
      ...approval,
      status: 'rejected',
      rejectionReason: reason
    } : approval));
  };
  return {
    approvals: filteredApprovals,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    formatDate,
    approveMember,
    rejectMember
  };
};