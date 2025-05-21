import React from 'react';
interface SecuritySettingsProps {
  sessionTimeout: string;
  onSessionTimeoutChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  sessionTimeout,
  onSessionTimeoutChange
}) => {
  return <div className="space-y-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium">Change Password</h3>
            <p className="text-sm text-[rgb(var(--text-secondary))]">
              Update your account password
            </p>
          </div>
          <button className="px-3 py-1.5 text-sm rounded-md border border-[rgba(var(--border-color),0.3)] hover:bg-gray-100 dark:hover:bg-gray-700">
            Change
          </button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium">Two-Factor Authentication</h3>
            <p className="text-sm text-[rgb(var(--text-secondary))]">
              Add an extra layer of security
            </p>
          </div>
          <button className="px-3 py-1.5 text-sm rounded-md bg-neon-red text-white hover:bg-neon-red/90">
            Setup
          </button>
        </div>
      </div>
      <div>
        <label htmlFor="sessionTimeout" className="block font-medium mb-2">
          Session Timeout
        </label>
        <select id="sessionTimeout" value={sessionTimeout} onChange={onSessionTimeoutChange} className="w-full px-3 py-2 rounded-md bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.3)]">
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="60">1 hour</option>
          <option value="120">2 hours</option>
        </select>
        <p className="text-sm text-[rgb(var(--text-secondary))] mt-2">
          You will be automatically logged out after this period of inactivity
        </p>
      </div>
      <div className="mt-6">
        <h3 className="font-medium mb-2">Active Sessions</h3>
        <div className="border border-[rgba(var(--border-color),0.3)] rounded-md overflow-hidden">
          <div className="p-4 flex justify-between items-center border-b border-[rgba(var(--border-color),0.2)]">
            <div>
              <p className="font-medium">Current Session</p>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                Chrome on Windows • IP: 192.168.1.1
              </p>
            </div>
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-md">
              Active
            </span>
          </div>
          <div className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">Mobile App</p>
              <p className="text-sm text-[rgb(var(--text-secondary))]">
                iPhone • Last active: Yesterday
              </p>
            </div>
            <button className="text-sm text-neon-red hover:underline">
              Revoke
            </button>
          </div>
        </div>
      </div>
    </div>;
};