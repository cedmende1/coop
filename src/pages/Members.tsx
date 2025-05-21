import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useMembersList } from '../hooks/useMembersList';
import { MembersFilter } from '../components/members/MembersFilter';
import { MembersTable } from '../components/members/MembersTable';
import { MembersPagination } from '../components/members/MembersPagination';
import { MemberViewModal } from '../components/members/MemberViewModal';
import { MemberSuspendModal } from '../components/members/MemberSuspendModal';
import { MemberDeleteModal } from '../components/members/MemberDeleteModal';
import { Member } from '../types/member';
// Mock data for members
const mockMembers = [{
  id: 'M001',
  name: 'Juan Dela Cruz',
  contact: '+63 912 345 6789',
  membershipNumber: 'MEM-2023-001',
  joinDate: '2023-01-15',
  status: 'active',
  remarks: 'Regular contributor'
}, {
  id: 'M002',
  name: 'Maria Santos',
  contact: '+63 923 456 7890',
  membershipNumber: 'MEM-2023-002',
  joinDate: '2023-02-03',
  status: 'inactive',
  remarks: 'Pending documentation'
}, {
  id: 'M003',
  name: 'Pedro Reyes',
  contact: '+63 934 567 8901',
  membershipNumber: 'MEM-2023-003',
  joinDate: '2023-02-18',
  status: 'suspended',
  remarks: 'Payment issues'
}, {
  id: 'M004',
  name: 'Ana Gonzales',
  contact: '+63 945 678 9012',
  membershipNumber: 'MEM-2023-004',
  joinDate: '2023-03-05',
  status: 'active',
  remarks: 'Premium member'
}, {
  id: 'M005',
  name: 'Luis Torres',
  contact: '+63 956 789 0123',
  membershipNumber: 'MEM-2023-005',
  joinDate: '2023-03-22',
  status: 'active',
  remarks: 'New member'
}, {
  id: 'M006',
  name: 'Carmen Velasquez',
  contact: '+63 967 890 1234',
  membershipNumber: 'MEM-2023-006',
  joinDate: '2023-04-08',
  status: 'inactive',
  remarks: 'On hold'
}, {
  id: 'M007',
  name: 'Roberto Garcia',
  contact: '+63 978 901 2345',
  membershipNumber: 'MEM-2023-007',
  joinDate: '2023-04-25',
  status: 'active',
  remarks: ''
}, {
  id: 'M008',
  name: 'Sofia Lim',
  contact: '+63 989 012 3456',
  membershipNumber: 'MEM-2023-008',
  joinDate: '2023-05-12',
  status: 'active',
  remarks: 'Business loan applicant'
}, {
  id: 'M009',
  name: 'Eduardo Tan',
  contact: '+63 990 123 4567',
  membershipNumber: 'MEM-2023-009',
  joinDate: '2023-05-29',
  status: 'suspended',
  remarks: 'Verification required'
}, {
  id: 'M010',
  name: 'Isabella Reyes',
  contact: '+63 901 234 5678',
  membershipNumber: 'MEM-2023-010',
  joinDate: '2023-06-15',
  status: 'active',
  remarks: 'Regular contributor'
}, {
  id: 'M011',
  name: 'Miguel Santos',
  contact: '+63 912 345 6780',
  membershipNumber: 'MEM-2023-011',
  joinDate: '2023-07-02',
  status: 'active',
  remarks: ''
}, {
  id: 'M012',
  name: 'Camila Ramos',
  contact: '+63 923 456 7801',
  membershipNumber: 'MEM-2023-012',
  joinDate: '2023-07-19',
  status: 'inactive',
  remarks: 'Contact unreachable'
}];
export const Members = () => {
  // State for filter dropdown
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // State for modals
  const [viewMember, setViewMember] = useState<Member | null>(null);
  const [suspendMember, setSuspendMember] = useState<Member | null>(null);
  const [deleteMember, setDeleteMember] = useState<Member | null>(null);
  // Use custom hook for member management
  const {
    members,
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
    suspendMember: handleSuspendMember,
    deleteMember: handleDeleteMember
  } = useMembersList(mockMembers);
  // Modal handlers
  const handleViewMember = (member: Member) => {
    setViewMember(member);
  };
  const handleSuspendModal = (member: Member) => {
    setSuspendMember(member);
  };
  const handleDeleteModal = (member: Member) => {
    setDeleteMember(member);
  };
  const confirmSuspendMember = (member: Member, reason: string) => {
    handleSuspendMember(member.id, reason);
  };
  const confirmDeleteMember = (member: Member) => {
    handleDeleteMember(member.id);
  };
  return <>
      <PageHeader title="Members" description="Manage your organization members" />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {/* Search and Filter */}
        <MembersFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />
        {/* Members Table */}
        <MembersTable members={members} formatDate={formatDate} onViewMember={handleViewMember} onSuspendMember={handleSuspendModal} onDeleteMember={handleDeleteModal} />
        {/* Pagination */}
        {filteredMembers.length > 0 && <MembersPagination currentPage={currentPage} totalPages={totalPages} indexOfFirstMember={indexOfFirstMember} indexOfLastMember={indexOfLastMember} totalMembers={filteredMembers.length} paginate={paginate} goToFirstPage={goToFirstPage} goToLastPage={goToLastPage} goToPrevPage={goToPrevPage} goToNextPage={goToNextPage} />}
      </div>
      {/* Modals */}
      <MemberViewModal isOpen={viewMember !== null} onClose={() => setViewMember(null)} member={viewMember} />
      <MemberSuspendModal isOpen={suspendMember !== null} onClose={() => setSuspendMember(null)} member={suspendMember} onConfirm={confirmSuspendMember} />
      <MemberDeleteModal isOpen={deleteMember !== null} onClose={() => setDeleteMember(null)} member={deleteMember} onConfirm={confirmDeleteMember} />
    </>;
};