export interface Document {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadDate: string;
  fileUrl: string;
}
export interface MemberApproval {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  avatar?: string;
  // Personal information
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  nationality: string;
  idNumber: string;
  // Employment details
  employer: string;
  position: string;
  employmentStatus: 'full-time' | 'part-time' | 'self-employed' | 'unemployed' | 'retired';
  monthlyIncome: number;
  employmentDuration: string;
  // Documents
  documents: Document[];
  // Additional information
  referredBy?: string;
  notes?: string;
  rejectionReason?: string;
}