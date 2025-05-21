import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { SearchIcon, PlusIcon, TrashIcon, EditIcon, EyeIcon, ChevronDownIcon, CalendarIcon, UsersIcon, XIcon, CheckIcon, BellIcon, GlobeIcon, UserIcon, ClockIcon, SendIcon } from 'lucide-react';
interface Announcement {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: string;
  publishedAt?: string;
  expiresAt?: string;
  status: 'draft' | 'published' | 'scheduled' | 'expired';
  audience: 'all' | 'members' | 'staff' | 'specific_roles';
  targetRoles?: string[];
  priority: 'normal' | 'important' | 'urgent';
  views?: number;
}
// Mock data for announcements
const mockAnnouncements: Announcement[] = [{
  id: 'ANN-2023-0001',
  title: 'System Maintenance Notice',
  content: 'The system will be undergoing scheduled maintenance on November 5, 2023, from 2:00 AM to 4:00 AM. During this time, all services will be unavailable. We apologize for any inconvenience this may cause.',
  createdBy: 'Admin User',
  createdAt: '2023-10-28T10:30:00',
  publishedAt: '2023-10-28T11:00:00',
  expiresAt: '2023-11-06T00:00:00',
  status: 'published',
  audience: 'all',
  priority: 'important',
  views: 245
}, {
  id: 'ANN-2023-0002',
  title: 'New Loan Products Available',
  content: 'We are pleased to announce the launch of our new educational loan products with competitive interest rates. These loans are designed to help members finance educational expenses for themselves or their dependents.',
  createdBy: 'Admin User',
  createdAt: '2023-10-25T14:20:00',
  publishedAt: '2023-10-26T09:00:00',
  status: 'published',
  audience: 'members',
  priority: 'normal',
  views: 189
}, {
  id: 'ANN-2023-0003',
  title: 'Upcoming Board Meeting',
  content: 'The quarterly board meeting will be held on November 15, 2023, at 2:00 PM in the main conference room. All board members are required to attend. Please prepare your quarterly reports.',
  createdBy: 'Director User',
  createdAt: '2023-10-20T16:45:00',
  status: 'draft',
  audience: 'specific_roles',
  targetRoles: ['director', 'admin'],
  priority: 'normal'
}, {
  id: 'ANN-2023-0004',
  title: 'Holiday Schedule',
  content: "Please be informed that our office will be closed on November 1 and 2, 2023, in observance of All Saints' Day and All Souls' Day. Regular operations will resume on November 3, 2023.",
  createdBy: 'HR User',
  createdAt: '2023-10-18T11:30:00',
  publishedAt: '2023-10-18T13:00:00',
  expiresAt: '2023-11-03T00:00:00',
  status: 'published',
  audience: 'all',
  priority: 'normal',
  views: 301
}, {
  id: 'ANN-2023-0005',
  title: 'Emergency System Update',
  content: 'Due to a security vulnerability, an emergency system update will be deployed today at 7:00 PM. The system will be down for approximately 30 minutes. Please save your work and log out before this time.',
  createdBy: 'IT User',
  createdAt: '2023-10-30T15:10:00',
  publishedAt: '2023-10-30T15:15:00',
  status: 'published',
  audience: 'all',
  priority: 'urgent',
  views: 412
}, {
  id: 'ANN-2023-0006',
  title: 'Annual General Meeting',
  content: 'The Annual General Meeting (AGM) for all members will be held on December 10, 2023, at the Grand Convention Center. Registration starts at 9:00 AM. Important cooperative matters will be discussed and voted upon.',
  createdBy: 'Admin User',
  createdAt: '2023-10-15T09:20:00',
  publishedAt: '2023-12-01T00:00:00',
  status: 'scheduled',
  audience: 'members',
  priority: 'important'
}, {
  id: 'ANN-2023-0007',
  title: 'Staff Training Schedule',
  content: 'Mandatory training sessions on the new loan processing system will be conducted on November 10-12, 2023. Please check your email for your assigned schedule and make the necessary arrangements.',
  createdBy: 'HR User',
  createdAt: '2023-10-22T13:40:00',
  status: 'draft',
  audience: 'specific_roles',
  targetRoles: ['accounting', 'treasury', 'admin'],
  priority: 'normal'
}];
export const Announcements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Announcement>>({
    title: '',
    content: '',
    status: 'draft',
    audience: 'all',
    priority: 'normal',
    targetRoles: []
  });
  // Filtering logic
  const filteredAnnouncements = mockAnnouncements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) || announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) || announcement.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || announcement.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || announcement.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });
  // Sort announcements by created date (newest first)
  const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // Handle view announcement
  const handleViewAnnouncement = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsViewModalOpen(true);
  };
  // Handle edit announcement
  const handleEditAnnouncement = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      status: announcement.status,
      audience: announcement.audience,
      priority: announcement.priority,
      targetRoles: announcement.targetRoles || []
    });
    setIsEditModalOpen(true);
  };
  // Handle delete announcement
  const handleDeleteAnnouncement = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDeleteModalOpen(true);
  };
  // Handle create new announcement
  const handleCreateAnnouncement = () => {
    setFormData({
      title: '',
      content: '',
      status: 'draft',
      audience: 'all',
      priority: 'normal',
      targetRoles: []
    });
    setIsCreateModalOpen(true);
  };
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  // Handle role checkbox changes
  const handleRoleCheckboxChange = (role: string) => {
    setFormData(prev => {
      const currentRoles = prev.targetRoles || [];
      if (currentRoles.includes(role)) {
        return {
          ...prev,
          targetRoles: currentRoles.filter(r => r !== role)
        };
      } else {
        return {
          ...prev,
          targetRoles: [...currentRoles, role]
        };
      }
    });
  };
  // Handle save announcement
  const handleSaveAnnouncement = () => {
    // In a real application, this would call an API to save the announcement
    console.log('Saving announcement:', formData);
    setIsEditModalOpen(false);
    setIsCreateModalOpen(false);
  };
  // Handle confirm delete
  const handleConfirmDelete = () => {
    // In a real application, this would call an API to delete the announcement
    console.log('Deleting announcement:', selectedAnnouncement?.id);
    setIsDeleteModalOpen(false);
  };
  // Status badge component
  const StatusBadge = ({
    status
  }: {
    status: string;
  }) => {
    let bgColor, textColor, icon;
    switch (status) {
      case 'published':
        bgColor = 'bg-green-100 dark:bg-green-900/20';
        textColor = 'text-green-800 dark:text-green-400';
        icon = <CheckIcon size={12} className="mr-1" />;
        break;
      case 'scheduled':
        bgColor = 'bg-blue-100 dark:bg-blue-900/20';
        textColor = 'text-blue-800 dark:text-blue-400';
        icon = <ClockIcon size={12} className="mr-1" />;
        break;
      case 'expired':
        bgColor = 'bg-gray-100 dark:bg-gray-700';
        textColor = 'text-gray-800 dark:text-gray-300';
        icon = <XIcon size={12} className="mr-1" />;
        break;
      default:
        // draft
        bgColor = 'bg-yellow-100 dark:bg-yellow-900/20';
        textColor = 'text-yellow-800 dark:text-yellow-400';
        icon = <EditIcon size={12} className="mr-1" />;
    }
    return <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${bgColor} ${textColor} capitalize`}>
        {icon}
        {status}
      </span>;
  };
  // Priority badge component
  const PriorityBadge = ({
    priority
  }: {
    priority: string;
  }) => {
    let bgColor, textColor;
    switch (priority) {
      case 'urgent':
        bgColor = 'bg-red-100 dark:bg-red-900/20';
        textColor = 'text-red-800 dark:text-red-400';
        break;
      case 'important':
        bgColor = 'bg-amber-100 dark:bg-amber-900/20';
        textColor = 'text-amber-800 dark:text-amber-400';
        break;
      default:
        // normal
        bgColor = 'bg-blue-100 dark:bg-blue-900/20';
        textColor = 'text-blue-800 dark:text-blue-400';
    }
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor} capitalize`}>
        {priority}
      </span>;
  };
  // Audience badge component
  const AudienceBadge = ({
    audience,
    targetRoles
  }: {
    audience: string;
    targetRoles?: string[];
  }) => {
    let bgColor, textColor, icon, label;
    switch (audience) {
      case 'members':
        bgColor = 'bg-indigo-100 dark:bg-indigo-900/20';
        textColor = 'text-indigo-800 dark:text-indigo-400';
        icon = <UserIcon size={12} className="mr-1" />;
        label = 'Members';
        break;
      case 'staff':
        bgColor = 'bg-teal-100 dark:bg-teal-900/20';
        textColor = 'text-teal-800 dark:text-teal-400';
        icon = <UsersIcon size={12} className="mr-1" />;
        label = 'Staff';
        break;
      case 'specific_roles':
        bgColor = 'bg-purple-100 dark:bg-purple-900/20';
        textColor = 'text-purple-800 dark:text-purple-400';
        icon = <UsersIcon size={12} className="mr-1" />;
        label = `${targetRoles?.length || 0} Roles`;
        break;
      default:
        // all
        bgColor = 'bg-green-100 dark:bg-green-900/20';
        textColor = 'text-green-800 dark:text-green-400';
        icon = <GlobeIcon size={12} className="mr-1" />;
        label = 'All Users';
    }
    return <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${bgColor} ${textColor}`}>
        {icon}
        {label}
      </span>;
  };
  return <>
      <PageHeader title="Announcements" description="Create and manage system announcements" />
      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between">
            <div className="relative flex-grow max-w-md">
              <input type="text" placeholder="Search announcements..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" size={18} />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="px-4 py-2 rounded-lg border border-[rgba(var(--border-color),0.2)] flex items-center gap-2 bg-[rgba(var(--input-bg),0.8)] hover:bg-[rgba(var(--input-bg),1)]">
                  <ChevronDownIcon size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                  <span>Filter</span>
                </button>
                {isFilterOpen && <div className="absolute z-10 mt-1 right-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-[rgba(var(--border-color),0.2)] p-3">
                    <div className="mb-3">
                      <div className="text-sm font-medium mb-2">Status</div>
                      <div className="space-y-1">
                        {['all', 'draft', 'published', 'scheduled', 'expired'].map(status => <label key={status} className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            <input type="radio" name="status" checked={statusFilter === status} onChange={() => setStatusFilter(status)} className="form-radio text-neon-red" />
                            <span className="capitalize">{status}</span>
                          </label>)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">Priority</div>
                      <div className="space-y-1">
                        {['all', 'normal', 'important', 'urgent'].map(priority => <label key={priority} className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                              <input type="radio" name="priority" checked={priorityFilter === priority} onChange={() => setPriorityFilter(priority)} className="form-radio text-neon-red" />
                              <span className="capitalize">{priority}</span>
                            </label>)}
                      </div>
                    </div>
                  </div>}
              </div>
              <button onClick={handleCreateAnnouncement} className="px-4 py-2 bg-neon-red text-white rounded-lg flex items-center gap-2 hover:bg-neon-red/90 transition-colors">
                <PlusIcon size={18} />
                <span>New Announcement</span>
              </button>
            </div>
          </div>
        </div>
        {/* Announcements List */}
        {sortedAnnouncements.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedAnnouncements.map(announcement => <div key={announcement.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-[rgba(var(--border-color),0.2)] hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-lg">
                      {announcement.title}
                    </h3>
                    <div className="flex gap-1">
                      <button onClick={() => handleViewAnnouncement(announcement)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="View Details">
                        <EyeIcon size={16} />
                      </button>
                      <button onClick={() => handleEditAnnouncement(announcement)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Edit">
                        <EditIcon size={16} />
                      </button>
                      <button onClick={() => handleDeleteAnnouncement(announcement)} className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/20 text-red-700 dark:text-red-400" title="Delete">
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-[rgb(var(--text-secondary))] text-sm mb-3 line-clamp-2">
                    {announcement.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      <StatusBadge status={announcement.status} />
                      <PriorityBadge priority={announcement.priority} />
                      <AudienceBadge audience={announcement.audience} targetRoles={announcement.targetRoles} />
                    </div>
                    {announcement.views !== undefined && <div className="text-xs text-[rgb(var(--text-secondary))]">
                        {announcement.views} views
                      </div>}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-2 text-xs text-[rgb(var(--text-secondary))] flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <CalendarIcon size={12} />
                    <span>
                      {announcement.status === 'published' ? `Published: ${formatDate(announcement.publishedAt || announcement.createdAt)}` : announcement.status === 'scheduled' ? `Scheduled: ${formatDate(announcement.publishedAt || '')}` : `Created: ${formatDate(announcement.createdAt)}`}
                    </span>
                  </div>
                  <div>By: {announcement.createdBy}</div>
                </div>
              </div>)}
          </div> : <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <BellIcon size={48} className="mx-auto mb-4 text-[rgb(var(--text-secondary))]" />
            <h3 className="text-lg font-medium mb-2">No announcements found</h3>
            <p className="text-[rgb(var(--text-secondary))] mb-6">
              {searchTerm || statusFilter !== 'all' || priorityFilter !== 'all' ? 'Try adjusting your search or filter criteria' : 'Create your first announcement to get started'}
            </p>
            {!searchTerm && statusFilter === 'all' && priorityFilter === 'all' && <button onClick={handleCreateAnnouncement} className="px-4 py-2 bg-neon-red text-white rounded-lg flex items-center gap-2 mx-auto hover:bg-neon-red/90 transition-colors">
                  <PlusIcon size={18} />
                  <span>New Announcement</span>
                </button>}
          </div>}
      </div>
      {/* View Modal */}
      {isViewModalOpen && selectedAnnouncement && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Announcement Details</h3>
              <button onClick={() => setIsViewModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <XIcon size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex justify-between">
                  <div className="flex gap-2">
                    <StatusBadge status={selectedAnnouncement.status} />
                    <PriorityBadge priority={selectedAnnouncement.priority} />
                  </div>
                  <div className="text-xs text-[rgb(var(--text-secondary))]">
                    ID: {selectedAnnouncement.id}
                  </div>
                </div>
                <h2 className="text-xl font-medium">
                  {selectedAnnouncement.title}
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <div className="flex items-center gap-1 text-[rgb(var(--text-secondary))]">
                  <CalendarIcon size={14} />
                  <span>
                    Created: {formatDate(selectedAnnouncement.createdAt)}
                  </span>
                </div>
                {selectedAnnouncement.publishedAt && <div className="flex items-center gap-1 text-[rgb(var(--text-secondary))]">
                    <SendIcon size={14} />
                    <span>
                      {selectedAnnouncement.status === 'scheduled' ? `Scheduled: ${formatDate(selectedAnnouncement.publishedAt)}` : `Published: ${formatDate(selectedAnnouncement.publishedAt)}`}
                    </span>
                  </div>}
                {selectedAnnouncement.expiresAt && <div className="flex items-center gap-1 text-[rgb(var(--text-secondary))]">
                    <ClockIcon size={14} />
                    <span>
                      Expires: {formatDate(selectedAnnouncement.expiresAt)}
                    </span>
                  </div>}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-[rgb(var(--text-secondary))]">
                  Audience:
                </div>
                <AudienceBadge audience={selectedAnnouncement.audience} targetRoles={selectedAnnouncement.targetRoles} />
              </div>
              {selectedAnnouncement.audience === 'specific_roles' && selectedAnnouncement.targetRoles && <div className="text-sm">
                    <div className="text-[rgb(var(--text-secondary))]">
                      Target Roles:
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedAnnouncement.targetRoles.map(role => <span key={role} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs capitalize">
                          {role}
                        </span>)}
                    </div>
                  </div>}
              <div className="pt-4 border-t border-[rgba(var(--border-color),0.2)]">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-line">
                    {selectedAnnouncement.content}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-[rgba(var(--border-color),0.2)]">
                <div className="text-sm text-[rgb(var(--text-secondary))]">
                  Created by: {selectedAnnouncement.createdBy}
                </div>
                {selectedAnnouncement.views !== undefined && <div className="text-sm text-[rgb(var(--text-secondary))]">
                    {selectedAnnouncement.views} views
                  </div>}
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => {
              setIsViewModalOpen(false);
              handleEditAnnouncement(selectedAnnouncement);
            }} className="px-4 py-2 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                  <EditIcon size={16} />
                  <span>Edit</span>
                </button>
                <button onClick={() => setIsViewModalOpen(false)} className="px-4 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Edit/Create Modal */}
      {(isEditModalOpen || isCreateModalOpen) && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {isEditModalOpen ? 'Edit Announcement' : 'Create Announcement'}
              </h3>
              <button onClick={() => isEditModalOpen ? setIsEditModalOpen(false) : setIsCreateModalOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <XIcon size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" placeholder="Enter announcement title" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Content
                </label>
                <textarea name="content" value={formData.content} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" rows={6} placeholder="Enter announcement content" required></textarea>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Status
                  </label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30">
                    <option value="draft">Draft</option>
                    <option value="published">Publish Now</option>
                    <option value="scheduled">Schedule</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Priority
                  </label>
                  <select name="priority" value={formData.priority} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30">
                    <option value="normal">Normal</option>
                    <option value="important">Important</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              {formData.status === 'scheduled' && <div>
                  <label className="block text-sm font-medium mb-1">
                    Publish Date
                  </label>
                  <input type="datetime-local" name="publishedAt" value={(formData.publishedAt || '').substring(0, 16)} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" required />
                </div>}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Expiration Date (Optional)
                </label>
                <input type="datetime-local" name="expiresAt" value={(formData.expiresAt || '').substring(0, 16)} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Audience
                </label>
                <select name="audience" value={formData.audience} onChange={handleInputChange} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30">
                  <option value="all">All Users</option>
                  <option value="members">Members Only</option>
                  <option value="staff">Staff Only</option>
                  <option value="specific_roles">Specific Roles</option>
                </select>
              </div>
              {formData.audience === 'specific_roles' && <div>
                  <label className="block text-sm font-medium mb-2">
                    Target Roles
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {['admin', 'member', 'accounting', 'it', 'hr', 'treasury', 'director'].map(role => <label key={role} className="flex items-center gap-2 py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                        <input type="checkbox" checked={formData.targetRoles?.includes(role) || false} onChange={() => handleRoleCheckboxChange(role)} className="form-checkbox text-neon-red" />
                        <span className="capitalize">{role}</span>
                      </label>)}
                  </div>
                </div>}
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => isEditModalOpen ? setIsEditModalOpen(false) : setIsCreateModalOpen(false)} className="px-4 py-2 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  Cancel
                </button>
                <button onClick={handleSaveAnnouncement} className="px-4 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90">
                  {formData.status === 'published' ? 'Publish' : formData.status === 'scheduled' ? 'Schedule' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>}
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedAnnouncement && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 mb-4">
                <TrashIcon size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Delete Announcement
              </h3>
              <p className="text-[rgb(var(--text-secondary))]">
                Are you sure you want to delete the announcement "
                {selectedAnnouncement.title}"? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                Cancel
              </button>
              <button onClick={handleConfirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>}
    </>;
};