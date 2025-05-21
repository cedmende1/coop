import { useState, useEffect } from 'react';
import { Member } from '../types/member';
export const useMembersList = (initialMembers: Member[]) => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 5;
  // Filter members based on search term and status filter
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.membershipNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  // Calculate pagination
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);
  // Handle pagination
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  // Member management functions
  const suspendMember = (memberId: string, reason: string) => {
    setMembers(members.map(member => member.id === memberId ? {
      ...member,
      status: member.status === 'suspended' ? 'active' : 'suspended',
      remarks: reason
    } : member));
  };
  const deleteMember = (memberId: string) => {
    setMembers(members.filter(member => member.id !== memberId));
  };
  return {
    members: currentMembers,
    filteredMembers,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    totalPages,
    indexOfFirstMember,
    indexOfLastMember,
    paginate,
    goToFirstPage,
    goToLastPage,
    goToPrevPage,
    goToNextPage,
    formatDate,
    suspendMember,
    deleteMember
  };
};