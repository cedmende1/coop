import React from 'react';
interface NotificationSettingsProps {
  settings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    loanUpdates: boolean;
    systemAnnouncements: boolean;
    marketingEmails: boolean;
    securityAlerts: boolean;
  };
  onToggle: (category: string, setting: string) => void;
}
export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  settings,
  onToggle
}) => {
  const Toggle = ({
    setting,
    label,
    description
  }: {
    setting: keyof typeof settings;
    label: string;
    description: string;
  }) => <div className="flex items-center justify-between">
      <div>
        <p>{label}</p>
        <p className="text-sm text-[rgb(var(--text-secondary))]">
          {description}
        </p>
      </div>
      <button onClick={() => onToggle('notifications', setting)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings[setting] ? 'bg-neon-red' : 'bg-gray-300 dark:bg-gray-600'}`}>
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings[setting] ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>;
  return <div className="space-y-6">
      <div className="space-y-4">
        <Toggle setting="emailNotifications" label="Email Notifications" description="Receive notifications via email" />
        <Toggle setting="pushNotifications" label="Push Notifications" description="Receive push notifications in browser" />
      </div>
      <div className="pt-4 border-t border-[rgba(var(--border-color),0.2)]">
        <h3 className="font-medium mb-3">Notification Types</h3>
        <div className="space-y-3">
          <Toggle setting="loanUpdates" label="Loan Updates" description="Changes to loan applications and status" />
          <Toggle setting="systemAnnouncements" label="System Announcements" description="Important system updates and maintenance" />
          <Toggle setting="marketingEmails" label="Marketing Emails" description="Promotional content and newsletters" />
          <Toggle setting="securityAlerts" label="Security Alerts" description="Account security and suspicious activity" />
        </div>
      </div>
    </div>;
};