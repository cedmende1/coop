import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { FileTextIcon, UsersIcon, SettingsIcon, PlusIcon, PencilIcon, TrashIcon, ImageIcon, LayoutIcon, FileIcon, LinkIcon, SearchIcon, FolderIcon, EyeIcon } from 'lucide-react';
// Define types
type TabType = 'pages' | 'userRoles' | 'settings';
interface UserRole {
  id: string;
  username: string;
  role: string;
  createdDate: string;
}
interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  lastUpdated: string;
}
interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'document' | 'video';
  size: string;
  uploadDate: string;
  thumbnail?: string;
}
// Mock data
const mockUserRoles: UserRole[] = [{
  id: '1',
  username: 'admin1',
  role: 'Admin',
  createdDate: '2024-04-01'
}, {
  id: '2',
  username: 'borrower1',
  role: 'Borrower',
  createdDate: '2024-04-10'
}, {
  id: '3',
  username: 'accountant1',
  role: 'Accounting',
  createdDate: '2024-04-15'
}, {
  id: '4',
  username: 'hr1',
  role: 'HR',
  createdDate: '2024-04-20'
}];
const mockPages: Page[] = [{
  id: '1',
  title: 'Home Page',
  slug: '/home',
  status: 'published',
  lastUpdated: '2024-04-02'
}, {
  id: '2',
  title: 'About Us',
  slug: '/about',
  status: 'published',
  lastUpdated: '2024-04-05'
}, {
  id: '3',
  title: 'Services',
  slug: '/services',
  status: 'published',
  lastUpdated: '2024-04-10'
}, {
  id: '4',
  title: 'Contact',
  slug: '/contact',
  status: 'published',
  lastUpdated: '2024-04-12'
}, {
  id: '5',
  title: 'New Promotion',
  slug: '/promo-2024',
  status: 'draft',
  lastUpdated: '2024-04-18'
}];
const mockMediaItems: MediaItem[] = [{
  id: '1',
  name: 'hero-banner.jpg',
  type: 'image',
  size: '1.2 MB',
  uploadDate: '2024-04-05',
  thumbnail: "/image.png"
}, {
  id: '2',
  name: 'annual-report-2023.pdf',
  type: 'document',
  size: '3.5 MB',
  uploadDate: '2024-04-10'
}, {
  id: '3',
  name: 'team-photo.jpg',
  type: 'image',
  size: '2.1 MB',
  uploadDate: '2024-04-12',
  thumbnail: "/image.png"
}, {
  id: '4',
  name: 'welcome-video.mp4',
  type: 'video',
  size: '15.8 MB',
  uploadDate: '2024-04-15'
}, {
  id: '5',
  name: 'terms-conditions.pdf',
  type: 'document',
  size: '0.9 MB',
  uploadDate: '2024-04-18'
}];
export const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState<TabType>('pages');
  const [searchTerm, setSearchTerm] = useState('');
  // State for forms
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('');
  // Filter data based on search term
  const filteredUserRoles = mockUserRoles.filter(role => role.username.toLowerCase().includes(searchTerm.toLowerCase()) || role.role.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredPages = mockPages.filter(page => page.title.toLowerCase().includes(searchTerm.toLowerCase()) || page.slug.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredMediaItems = mockMediaItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.type.toLowerCase().includes(searchTerm.toLowerCase()));
  return <>
      <PageHeader title="Content Management" description="Manage system content and resources" />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {/* Tabs Navigation */}
        <div className="flex border-b border-[rgba(var(--border-color),0.2)]">
          <button className={`px-6 py-3 text-sm font-medium ${activeTab === 'pages' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('pages')}>
            <div className="flex items-center gap-2">
              <FileTextIcon size={16} />
              <span>Pages</span>
            </div>
          </button>
          <button className={`px-6 py-3 text-sm font-medium ${activeTab === 'userRoles' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('userRoles')}>
            <div className="flex items-center gap-2">
              <UsersIcon size={16} />
              <span>User Roles</span>
            </div>
          </button>
          <button className={`px-6 py-3 text-sm font-medium ${activeTab === 'settings' ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`} onClick={() => setActiveTab('settings')}>
            <div className="flex items-center gap-2">
              <SettingsIcon size={16} />
              <span>Settings</span>
            </div>
          </button>
        </div>
        {/* Search Bar */}
        <div className="p-4 border-b border-[rgba(var(--border-color),0.2)]">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--text-secondary))]" size={18} />
            <input type="text" placeholder={activeTab === 'pages' ? 'Search pages...' : activeTab === 'userRoles' ? 'Search user roles...' : 'Search settings...'} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
          </div>
        </div>
        {/* Tab Content */}
        <div className="p-6">
          {/* Pages Tab */}
          {activeTab === 'pages' && <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">Pages Management</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90 transition-colors">
                  <PlusIcon size={16} />
                  <span>Add New Page</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="border border-[rgba(var(--border-color),0.2)] rounded-lg p-4 hover:border-neon-red/30 hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <LayoutIcon size={18} className="text-blue-500" />
                      <h3 className="font-medium">Pages</h3>
                    </div>
                    <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                      {mockPages.length}
                    </span>
                  </div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Manage website pages and content
                  </p>
                </div>
                <div className="border border-[rgba(var(--border-color),0.2)] rounded-lg p-4 hover:border-neon-red/30 hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ImageIcon size={18} className="text-purple-500" />
                      <h3 className="font-medium">Media</h3>
                    </div>
                    <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 text-xs px-2 py-1 rounded-full">
                      {mockMediaItems.length}
                    </span>
                  </div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Manage images, videos and documents
                  </p>
                </div>
                <div className="border border-[rgba(var(--border-color),0.2)] rounded-lg p-4 hover:border-neon-red/30 hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <LinkIcon size={18} className="text-green-500" />
                      <h3 className="font-medium">Navigation</h3>
                    </div>
                    <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                      2
                    </span>
                  </div>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    Manage menus and navigation links
                  </p>
                </div>
              </div>
              <h3 className="font-medium mb-4">Pages List</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
                  <thead className="bg-gray-50 dark:bg-gray-700/30">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        URL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Last Updated
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-[rgba(var(--border-color),0.2)]">
                    {filteredPages.map(page => <tr key={page.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-[rgb(var(--text-primary))]">
                            {page.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-[rgb(var(--text-secondary))]">
                            {page.slug}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${page.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'}`}>
                            {page.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgb(var(--text-primary))]">
                          {page.lastUpdated}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-blue-500" title="View Page">
                              <EyeIcon size={18} />
                            </button>
                            <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))]" title="Edit Page">
                              <PencilIcon size={18} />
                            </button>
                            <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500" title="Delete Page">
                              <TrashIcon size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
              <div className="mt-8">
                <h3 className="font-medium mb-4">Media Library</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredMediaItems.map(item => <div key={item.id} className="border border-[rgba(var(--border-color),0.2)] rounded-lg overflow-hidden hover:border-neon-red/30 hover:shadow-sm transition-all">
                      <div className="h-32 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        {item.type === 'image' && item.thumbnail ? <img src={item.thumbnail} alt={item.name} className="h-full w-full object-cover" /> : item.type === 'document' ? <FileIcon size={36} className="text-blue-500 opacity-70" /> : <div className="flex flex-col items-center">
                            <FolderIcon size={36} className="text-yellow-500 opacity-70" />
                            <span className="text-xs mt-1">{item.type}</span>
                          </div>}
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium truncate">
                          {item.name}
                        </p>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-[rgb(var(--text-secondary))]">
                            {item.size}
                          </span>
                          <span className="text-xs text-[rgb(var(--text-secondary))]">
                            {item.uploadDate}
                          </span>
                        </div>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>}
          {/* User Roles Tab */}
          {activeTab === 'userRoles' && <div>
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-4">
                  User Roles Management
                </h2>
                <p className="text-[rgb(var(--text-secondary))] mb-6">
                  Add, edit, or delete user roles
                </p>
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-4">Add New Role</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium mb-1">
                        Username
                      </label>
                      <input type="text" id="username" value={newUsername} onChange={e => setNewUsername(e.target.value)} placeholder="Enter username" className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Password
                      </label>
                      <input type="password" id="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Enter password" className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
                    </div>
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium mb-1">
                        Role
                      </label>
                      <div className="flex gap-2">
                        <select id="role" value={newRole} onChange={e => setNewRole(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30">
                          <option value="">Select role</option>
                          <option value="Admin">Admin</option>
                          <option value="Borrower">Borrower</option>
                          <option value="Accounting">Accounting</option>
                          <option value="HR">HR</option>
                          <option value="IT Specialist">IT Specialist</option>
                        </select>
                        <button className="flex items-center justify-center px-4 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90 transition-colors">
                          <PlusIcon size={16} className="mr-1" />
                          <span>Add Role</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="font-medium mb-4">User Roles List</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
                  <thead className="bg-gray-50 dark:bg-gray-700/30">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Created Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-[rgba(var(--border-color),0.2)]">
                    {filteredUserRoles.map(userRole => <tr key={userRole.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-[rgb(var(--text-primary))]">
                            {userRole.username}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-[rgb(var(--text-primary))]">
                            {userRole.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgb(var(--text-primary))]">
                          {userRole.createdDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))]" title="Edit Role">
                              <PencilIcon size={18} />
                            </button>
                            <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500" title="Delete Role">
                              <TrashIcon size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>}
          {/* Settings Tab */}
          {activeTab === 'settings' && <div>
              <h2 className="text-lg font-medium mb-4">Content Settings</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">General Content Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="siteName" className="block text-sm font-medium mb-1">
                        Site Name
                      </label>
                      <input type="text" id="siteName" defaultValue="Lendology Cooperative" className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
                    </div>
                    <div>
                      <label htmlFor="siteDescription" className="block text-sm font-medium mb-1">
                        Site Description
                      </label>
                      <textarea id="siteDescription" defaultValue="Empowering communities through accessible financial services" rows={2} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-sm font-medium">
                          Enable Public Registration
                        </label>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                          Allow visitors to register as members
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                        <input type="checkbox" id="toggle" className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer" defaultChecked />
                        <label htmlFor="toggle" className="block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer">
                          <span className="block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out translate-x-6"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Media Settings</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="maxUploadSize" className="block text-sm font-medium mb-1">
                          Maximum Upload Size (MB)
                        </label>
                        <input type="number" id="maxUploadSize" defaultValue={10} min={1} max={50} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
                      </div>
                      <div>
                        <label htmlFor="allowedFileTypes" className="block text-sm font-medium mb-1">
                          Allowed File Types
                        </label>
                        <select id="allowedFileTypes" className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" defaultValue="standard">
                          <option value="standard">
                            Standard (Images, Documents, Videos)
                          </option>
                          <option value="restrictive">
                            Restrictive (Images, Documents only)
                          </option>
                          <option value="images">Images Only</option>
                          <option value="custom">Custom</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-sm font-medium">
                          Auto-optimize Images
                        </label>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                          Automatically optimize images on upload
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                        <input type="checkbox" id="optimizeImages" className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer" defaultChecked />
                        <label htmlFor="optimizeImages" className="block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer">
                          <span className="block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out translate-x-6"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Content Approval</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="approvalWorkflow" className="block text-sm font-medium mb-1">
                        Content Approval Workflow
                      </label>
                      <select id="approvalWorkflow" className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" defaultValue="single">
                        <option value="none">No Approval Required</option>
                        <option value="single">Single Approver</option>
                        <option value="multi">Multiple Approvers</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-sm font-medium">
                          Notify on Content Changes
                        </label>
                        <p className="text-xs text-[rgb(var(--text-secondary))]">
                          Send notifications when content is updated
                        </p>
                      </div>
                      <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                        <input type="checkbox" id="notifyChanges" className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer" defaultChecked />
                        <label htmlFor="notifyChanges" className="block overflow-hidden h-6 rounded-full bg-gray-300 dark:bg-gray-600 cursor-pointer">
                          <span className="block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out translate-x-6"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90 transition-colors">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>}
        </div>
      </div>
    </>;
};