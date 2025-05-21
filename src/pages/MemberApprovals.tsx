import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useMemberApprovals } from '../hooks/useMemberApprovals';
import { MemberApprovalFilter } from '../components/member-approvals/MemberApprovalFilter';
import { MemberApprovalList } from '../components/member-approvals/MemberApprovalList';
import { MemberApprovalModal } from '../components/member-approvals/MemberApprovalModal';
import { MemberApproval } from '../types/memberApproval';
// Mock data for member approvals
const mockApprovals: MemberApproval[] = [{
  id: 'APP001',
  name: 'Maria Garcia',
  email: 'maria.garcia@example.com',
  phone: '+63 917 123 4567',
  registrationDate: '2023-10-15',
  status: 'pending',
  dateOfBirth: '1988-05-12',
  gender: 'female',
  address: {
    street: '123 Maharlika Street',
    city: 'Makati City',
    state: 'Metro Manila',
    zipCode: '1200',
    country: 'Philippines'
  },
  nationality: 'Filipino',
  idNumber: 'ID-12345678',
  employer: 'ABC Company',
  position: 'Marketing Manager',
  employmentStatus: 'full-time',
  monthlyIncome: 45000,
  employmentDuration: '3 years',
  documents: [{
    id: 'DOC001',
    name: 'Government ID',
    type: 'PDF',
    status: 'verified',
    uploadDate: '2023-10-15',
    fileUrl: '#'
  }, {
    id: 'DOC002',
    name: 'Proof of Income',
    type: 'PDF',
    status: 'pending',
    uploadDate: '2023-10-15',
    fileUrl: '#'
  }, {
    id: 'DOC003',
    name: 'Proof of Address',
    type: 'JPEG',
    status: 'pending',
    uploadDate: '2023-10-15',
    fileUrl: '#'
  }],
  referredBy: 'Juan Santos'
}, {
  id: 'APP002',
  name: 'Antonio Reyes',
  email: 'antonio.reyes@example.com',
  phone: '+63 918 234 5678',
  registrationDate: '2023-10-17',
  status: 'pending',
  dateOfBirth: '1992-08-23',
  gender: 'male',
  address: {
    street: '456 Bonifacio Avenue',
    city: 'Quezon City',
    state: 'Metro Manila',
    zipCode: '1100',
    country: 'Philippines'
  },
  nationality: 'Filipino',
  idNumber: 'ID-87654321',
  employer: 'XYZ Corporation',
  position: 'Software Engineer',
  employmentStatus: 'full-time',
  monthlyIncome: 60000,
  employmentDuration: '2 years',
  documents: [{
    id: 'DOC004',
    name: 'Government ID',
    type: 'PDF',
    status: 'verified',
    uploadDate: '2023-10-17',
    fileUrl: '#'
  }, {
    id: 'DOC005',
    name: 'Proof of Income',
    type: 'PDF',
    status: 'verified',
    uploadDate: '2023-10-17',
    fileUrl: '#'
  }, {
    id: 'DOC006',
    name: 'Proof of Address',
    type: 'PDF',
    status: 'pending',
    uploadDate: '2023-10-17',
    fileUrl: '#'
  }]
}, {
  id: 'APP003',
  name: 'Isabella Santos',
  email: 'isabella.santos@example.com',
  phone: '+63 919 345 6789',
  registrationDate: '2023-10-18',
  status: 'approved',
  dateOfBirth: '1985-12-03',
  gender: 'female',
  address: {
    street: '789 Rizal Street',
    city: 'Mandaluyong City',
    state: 'Metro Manila',
    zipCode: '1550',
    country: 'Philippines'
  },
  nationality: 'Filipino',
  idNumber: 'ID-23456789',
  employer: 'LMN Enterprises',
  position: 'Finance Officer',
  employmentStatus: 'full-time',
  monthlyIncome: 52000,
  employmentDuration: '5 years',
  documents: [{
    id: 'DOC007',
    name: 'Government ID',
    type: 'PDF',
    status: 'verified',
    uploadDate: '2023-10-18',
    fileUrl: '#'
  }, {
    id: 'DOC008',
    name: 'Proof of Income',
    type: 'PDF',
    status: 'verified',
    uploadDate: '2023-10-18',
    fileUrl: '#'
  }, {
    id: 'DOC009',
    name: 'Proof of Address',
    type: 'JPEG',
    status: 'verified',
    uploadDate: '2023-10-18',
    fileUrl: '#'
  }],
  notes: 'All documents verified. Approved for membership.'
}, {
  id: 'APP004',
  name: 'Miguel Cruz',
  email: 'miguel.cruz@example.com',
  phone: '+63 920 456 7890',
  registrationDate: '2023-10-20',
  status: 'rejected',
  dateOfBirth: '1990-07-15',
  gender: 'male',
  address: {
    street: '101 Aguinaldo Street',
    city: 'Pasig City',
    state: 'Metro Manila',
    zipCode: '1600',
    country: 'Philippines'
  },
  nationality: 'Filipino',
  idNumber: 'ID-34567890',
  employer: 'PQR Company',
  position: 'Sales Representative',
  employmentStatus: 'part-time',
  monthlyIncome: 25000,
  employmentDuration: '1 year',
  documents: [{
    id: 'DOC010',
    name: 'Government ID',
    type: 'PDF',
    status: 'verified',
    uploadDate: '2023-10-20',
    fileUrl: '#'
  }, {
    id: 'DOC011',
    name: 'Proof of Income',
    type: 'PDF',
    status: 'rejected',
    uploadDate: '2023-10-20',
    fileUrl: '#'
  }, {
    id: 'DOC012',
    name: 'Proof of Address',
    type: 'PDF',
    status: 'verified',
    uploadDate: '2023-10-20',
    fileUrl: '#'
  }],
  rejectionReason: 'Income documentation insufficient. Monthly income below minimum requirement.'
}, {
  id: 'APP005',
  name: 'Sofia Lim',
  email: 'sofia.lim@example.com',
  phone: '+63 921 567 8901',
  registrationDate: '2023-10-22',
  status: 'pending',
  dateOfBirth: '1995-03-28',
  gender: 'female',
  address: {
    street: '202 Mabini Street',
    city: 'Taguig City',
    state: 'Metro Manila',
    zipCode: '1630',
    country: 'Philippines'
  },
  nationality: 'Filipino',
  idNumber: 'ID-45678901',
  employer: 'Self-employed',
  position: 'Business Owner',
  employmentStatus: 'self-employed',
  monthlyIncome: 75000,
  employmentDuration: '4 years',
  documents: [{
    id: 'DOC013',
    name: 'Government ID',
    type: 'PDF',
    status: 'verified',
    uploadDate: '2023-10-22',
    fileUrl: '#'
  }, {
    id: 'DOC014',
    name: 'Business Registration',
    type: 'PDF',
    status: 'verified',
    uploadDate: '2023-10-22',
    fileUrl: '#'
  }, {
    id: 'DOC015',
    name: 'Proof of Income',
    type: 'PDF',
    status: 'pending',
    uploadDate: '2023-10-22',
    fileUrl: '#'
  }, {
    id: 'DOC016',
    name: 'Proof of Address',
    type: 'JPEG',
    status: 'pending',
    uploadDate: '2023-10-22',
    fileUrl: '#'
  }],
  notes: 'Business owner, requires additional verification of income.'
}];
export const MemberApprovals = () => {
  // State for filter dropdown
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // State for selected member to view details
  const [selectedMember, setSelectedMember] = useState<MemberApproval | null>(null);
  // Use custom hook for member approvals management
  const {
    approvals,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    formatDate,
    approveMember,
    rejectMember
  } = useMemberApprovals(mockApprovals);
  // Handler for viewing member details
  const handleViewMember = (member: MemberApproval) => {
    setSelectedMember(member);
  };
  return <>
      <PageHeader title="Member Approvals" description="Review and approve new member applications" />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {/* Search and Filter */}
        <MemberApprovalFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} statusFilter={statusFilter} setStatusFilter={setStatusFilter} isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />
        {/* Member Approval List */}
        <MemberApprovalList approvals={approvals} formatDate={formatDate} onViewDetails={handleViewMember} />
      </div>
      {/* Member Approval Modal */}
      <MemberApprovalModal isOpen={selectedMember !== null} onClose={() => setSelectedMember(null)} approval={selectedMember} onApprove={approveMember} onReject={rejectMember} formatDate={formatDate} />
    </>;
};