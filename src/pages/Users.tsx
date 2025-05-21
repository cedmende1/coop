import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { SearchIcon, UserPlusIcon, RefreshCwIcon, PencilIcon, TrashIcon, UserIcon } from 'lucide-react';
// Define types for user data
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  avatar: string;
}
// Mock user data
const mockUsers: User[] = [{
  id: '1',
  name: 'Admin User',
  email: 'admin@lendology.com',
  role: 'Admin',
  status: 'active',
  lastLogin: '12/1/2023, 9:23:45 AM',
  avatar: "/image.png"
}, {
  id: '2',
  name: 'John Smith',
  email: 'john@example.com',
  role: 'Borrower',
  status: 'active',
  lastLogin: '11/28/2023, 2:05:12 PM',
  avatar: "/image.png"
}, {
  id: '3',
  name: 'Sarah Parker',
  email: 'sarah@lendology.com',
  role: 'Accounting',
  status: 'active',
  lastLogin: '11/30/2023, 11:42:18 AM',
  avatar: "/image.png"
}, {
  id: '4',
  name: 'Michael Wong',
  email: 'michael@lendology.com',
  role: 'HR',
  status: 'inactive',
  lastLogin: '11/29/2023, 4:33:27 PM',
  avatar: "/image.png"
}, {
  id: '5',
  name: 'IT Specialist',
  email: 'it@lendology.com',
  role: 'IT Specialist',
  status: 'active',
  lastLogin: '12/1/2023, 8:15:42 AM',
  avatar: "/image.png"
}];
export const Users = () => {
  // State for search and user data
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  // Filter users based on search term
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user.role.toLowerCase().includes(searchTerm.toLowerCase()));
  // Handle delete user
  const handleDeleteUser = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };
  // Handle refresh
  const handleRefresh = () => {
    // In a real app, this would fetch the latest data from an API
    setUsers([...mockUsers]);
  };
  return <>
      <PageHeader title="User Management" description="Manage system users, roles and permissions" />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {/* Search and Actions Bar */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[rgba(var(--border-color),0.2)]">
          <div className="relative w-full sm:w-auto sm:min-w-[300px]">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(var(--text-secondary))]" size={18} />
            <input type="text" placeholder="Search users by name, email or role..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button onClick={() => setIsAddUserModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90 transition-colors">
              <UserPlusIcon size={18} />
              <span>Add User</span>
            </button>
            <button onClick={handleRefresh} className="p-2 rounded-lg border border-[rgba(var(--border-color),0.2)] hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))]" title="Refresh">
              <RefreshCwIcon size={18} />
            </button>
          </div>
        </div>
        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[rgba(var(--border-color),0.2)]">
            <thead className="bg-gray-50 dark:bg-gray-700/30">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[rgb(var(--text-secondary))] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-[rgba(var(--border-color),0.2)]">
              {filteredUsers.length > 0 ? filteredUsers.map(user => <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-[rgb(var(--text-primary))]">
                            {user.name}
                          </div>
                          <div className="text-sm text-[rgb(var(--text-secondary))]">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-[rgb(var(--text-primary))]">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[rgb(var(--text-primary))]">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))]" title="Edit User">
                          <PencilIcon size={18} />
                        </button>
                        <button onClick={() => handleDeleteUser(user.id)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500" title="Delete User">
                          <TrashIcon size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>) : <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-[rgb(var(--text-secondary))]">
                    <div className="flex flex-col items-center">
                      <UserIcon size={48} className="mb-2 opacity-20" />
                      <p>No users found</p>
                      {searchTerm && <p className="text-sm mt-1">
                          Try adjusting your search or filter to find what
                          you're looking for.
                        </p>}
                    </div>
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
        {/* Pagination / Summary */}
        <div className="px-6 py-3 flex items-center justify-between border-t border-[rgba(var(--border-color),0.2)]">
          <div className="text-sm text-[rgb(var(--text-secondary))]">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>
      </div>
      {/* Add User Modal (placeholder) */}
      {isAddUserModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Add New User</h2>
            <p className="mb-4 text-[rgb(var(--text-secondary))]">
              User creation form would go here.
            </p>
            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setIsAddUserModalOpen(false)} className="px-4 py-2 border border-[rgba(var(--border-color),0.2)] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                Cancel
              </button>
              <button onClick={() => setIsAddUserModalOpen(false)} className="px-4 py-2 bg-neon-red text-white rounded-lg hover:bg-neon-red/90">
                Add User
              </button>
            </div>
          </div>
        </div>}
    </>;
};