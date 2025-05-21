import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useAuth } from '../context/AuthContext';
import { UserIcon, MailIcon, PhoneIcon, BriefcaseIcon, CalendarIcon, MapPinIcon, ClockIcon, ShieldIcon, PencilIcon } from 'lucide-react';
export const Profile = () => {
  const {
    user
  } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  // Mock user profile data
  const [profileData, setProfileData] = useState({
    name: user?.name || 'User Name',
    email: user?.email || 'user@example.com',
    phone: '+1 (555) 123-4567',
    role: user?.role || 'member',
    joinDate: 'January 15, 2023',
    address: '123 Main Street, Anytown, ST 12345',
    timezone: 'UTC-5 (Eastern Time)',
    twoFactorEnabled: true,
    lastLogin: 'Today at 9:30 AM',
    bio: 'Finance professional with over 10 years of experience in the lending industry.'
  });
  // Mock activity log
  const activityLog = [{
    id: 1,
    action: 'Logged in',
    timestamp: 'Today at 9:30 AM'
  }, {
    id: 2,
    action: 'Updated contact information',
    timestamp: 'Yesterday at 2:15 PM'
  }, {
    id: 3,
    action: 'Changed password',
    timestamp: 'March 15, 2023 at 11:20 AM'
  }, {
    id: 4,
    action: 'Reviewed loan application #LN-2023-0542',
    timestamp: 'March 10, 2023 at 3:45 PM'
  }];
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the updated profile data to your API
    setIsEditing(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  return <>
      <PageHeader title="Profile" description="View and manage your profile information" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Profile Info */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-[rgba(var(--border-color),0.2)]">
              <h2 className="text-lg font-semibold">Profile Information</h2>
              <button onClick={handleEditToggle} className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <PencilIcon size={14} />
                <span>{isEditing ? 'Cancel' : 'Edit'}</span>
              </button>
            </div>
            {isEditing ? <form onSubmit={handleSaveProfile} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1.5" htmlFor="name">
                      Full Name
                    </label>
                    <input type="text" id="name" name="name" value={profileData.name} onChange={handleInputChange} className="w-full px-3 py-2 rounded-md bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.3)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" htmlFor="email">
                      Email Address
                    </label>
                    <input type="email" id="email" name="email" value={profileData.email} onChange={handleInputChange} className="w-full px-3 py-2 rounded-md bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.3)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" htmlFor="phone">
                      Phone Number
                    </label>
                    <input type="tel" id="phone" name="phone" value={profileData.phone} onChange={handleInputChange} className="w-full px-3 py-2 rounded-md bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.3)]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5" htmlFor="address">
                      Address
                    </label>
                    <input type="text" id="address" name="address" value={profileData.address} onChange={handleInputChange} className="w-full px-3 py-2 rounded-md bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.3)]" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1.5" htmlFor="bio">
                      Bio
                    </label>
                    <textarea id="bio" name="bio" value={profileData.bio} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 rounded-md bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.3)]" />
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button type="submit" className="px-4 py-2 bg-neon-red text-white rounded-md hover:bg-neon-red/90 transition-colors">
                    Save Changes
                  </button>
                </div>
              </form> : <div className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                  <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                    {user?.avatar ? <img src={user.avatar} alt={profileData.name} className="h-full w-full object-cover" /> : <div className="h-full w-full flex items-center justify-center text-gray-400">
                        <UserIcon size={32} />
                      </div>}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {profileData.name}
                    </h3>
                    <p className="text-[rgb(var(--text-secondary))]">
                      {profileData.bio}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div className="flex items-center gap-3">
                    <MailIcon size={18} className="text-[rgb(var(--text-secondary))]" />
                    <div>
                      <p className="text-sm text-[rgb(var(--text-secondary))]">
                        Email
                      </p>
                      <p>{profileData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneIcon size={18} className="text-[rgb(var(--text-secondary))]" />
                    <div>
                      <p className="text-sm text-[rgb(var(--text-secondary))]">
                        Phone
                      </p>
                      <p>{profileData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <BriefcaseIcon size={18} className="text-[rgb(var(--text-secondary))]" />
                    <div>
                      <p className="text-sm text-[rgb(var(--text-secondary))]">
                        Role
                      </p>
                      <p className="capitalize">{profileData.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarIcon size={18} className="text-[rgb(var(--text-secondary))]" />
                    <div>
                      <p className="text-sm text-[rgb(var(--text-secondary))]">
                        Member Since
                      </p>
                      <p>{profileData.joinDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPinIcon size={18} className="text-[rgb(var(--text-secondary))]" />
                    <div>
                      <p className="text-sm text-[rgb(var(--text-secondary))]">
                        Address
                      </p>
                      <p>{profileData.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ClockIcon size={18} className="text-[rgb(var(--text-secondary))]" />
                    <div>
                      <p className="text-sm text-[rgb(var(--text-secondary))]">
                        Timezone
                      </p>
                      <p>{profileData.timezone}</p>
                    </div>
                  </div>
                </div>
              </div>}
          </div>
          {/* Security Section */}
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[rgba(var(--border-color),0.2)]">
              <h2 className="text-lg font-semibold">Security</h2>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="mt-1">
                  <ShieldIcon size={18} className="text-[rgb(var(--text-secondary))]" />
                </div>
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-[rgb(var(--text-secondary))] mb-2">
                    {profileData.twoFactorEnabled ? 'Your account is protected with two-factor authentication.' : 'Enable two-factor authentication for additional security.'}
                  </p>
                  <button className="text-sm text-neon-red hover:underline">
                    {profileData.twoFactorEnabled ? 'Manage 2FA' : 'Enable 2FA'}
                  </button>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <ClockIcon size={18} className="text-[rgb(var(--text-secondary))]" />
                </div>
                <div>
                  <h3 className="font-medium">Last Login</h3>
                  <p className="text-sm text-[rgb(var(--text-secondary))]">
                    {profileData.lastLogin}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right column - Activity Log */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[rgba(var(--border-color),0.2)]">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
            </div>
            <div className="p-4">
              <ul className="divide-y divide-[rgba(var(--border-color),0.2)]">
                {activityLog.map(activity => <li key={activity.id} className="py-3 px-2">
                    <div className="flex justify-between">
                      <span>{activity.action}</span>
                    </div>
                    <span className="text-sm text-[rgb(var(--text-secondary))]">
                      {activity.timestamp}
                    </span>
                  </li>)}
              </ul>
              <div className="mt-4 text-center">
                <button className="text-sm text-neon-red hover:underline">
                  View All Activity
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>;
};