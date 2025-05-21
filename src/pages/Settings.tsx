import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { useTheme } from '../context/ThemeContext';
import { BellIcon, MonitorIcon, GlobeIcon, ShieldIcon, DownloadIcon, XIcon } from 'lucide-react';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { ThemeSettings } from '../components/settings/ThemeSettings';
import { LanguageSelector } from '../components/settings/LanguageSelector';
import { SecuritySettings } from '../components/settings/SecuritySettings';
type TabId = 'notifications' | 'appearance' | 'language' | 'security' | 'data';
interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}
export const Settings = () => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  const [activeTab, setActiveTab] = useState<TabId>('notifications');
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    loanUpdates: true,
    systemAnnouncements: true,
    marketingEmails: false,
    securityAlerts: true
  });
  // Display settings
  const [displaySettings, setDisplaySettings] = useState({
    compactMode: false,
    showWelcomeScreen: true,
    enableAnimations: true
  });
  // Language settings
  const [language, setLanguage] = useState('english');
  // Session settings
  const [sessionTimeout, setSessionTimeout] = useState('30');
  // Toggle function for boolean settings
  const handleToggle = (category: string, setting: string) => {
    if (category === 'notifications') {
      setNotificationSettings({
        ...notificationSettings,
        [setting]: !notificationSettings[setting as keyof typeof notificationSettings]
      });
    } else if (category === 'display') {
      setDisplaySettings({
        ...displaySettings,
        [setting]: !displaySettings[setting as keyof typeof displaySettings]
      });
    }
  };
  // Handle session timeout change
  const handleTimeoutChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSessionTimeout(e.target.value);
  };
  // Handle language change
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };
  const tabs: Tab[] = [{
    id: 'notifications',
    label: 'Notifications',
    icon: <BellIcon size={18} />
  }, {
    id: 'appearance',
    label: 'Appearance',
    icon: <MonitorIcon size={18} />
  }, {
    id: 'language',
    label: 'Language & Region',
    icon: <GlobeIcon size={18} />
  }, {
    id: 'security',
    label: 'Security',
    icon: <ShieldIcon size={18} />
  }, {
    id: 'data',
    label: 'Data & Privacy',
    icon: <DownloadIcon size={18} />
  }];
  const renderTabContent = () => {
    switch (activeTab) {
      case 'notifications':
        return <NotificationSettings settings={notificationSettings} onToggle={handleToggle} />;
      case 'appearance':
        return <ThemeSettings theme={theme} toggleTheme={toggleTheme} displaySettings={displaySettings} onToggle={handleToggle} />;
      case 'language':
        return <LanguageSelector value={language} onChange={handleLanguageChange} />;
      case 'security':
        return <SecuritySettings sessionTimeout={sessionTimeout} onSessionTimeoutChange={handleTimeoutChange} />;
      case 'data':
        return <div className="space-y-6">
            <div className="mb-6">
              <h3 className="font-medium mb-2">Data Export</h3>
              <p className="text-sm text-[rgb(var(--text-secondary))] mb-3">
                Download a copy of your personal data
              </p>
              <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                <DownloadIcon size={16} />
                <span>Request Data Export</span>
              </button>
            </div>
            <div>
              <h3 className="font-medium mb-2">Privacy Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    Allow usage data collection to improve services
                  </p>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-neon-red">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">Share anonymous statistics</p>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-[rgba(var(--border-color),0.2)]">
              <h3 className="font-medium text-red-600 dark:text-red-400">
                Danger Zone
              </h3>
              <p className="text-sm text-[rgb(var(--text-secondary))] mb-3">
                Permanently delete your account and all associated data
              </p>
              <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-red-600 text-red-600 dark:border-red-400 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                <XIcon size={16} />
                <span>Delete Account</span>
              </button>
            </div>
          </div>;
    }
  };
  return <>
      <PageHeader title="Settings" description="Configure your account and application settings" />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {/* Tabs Navigation */}
        <div className="border-b border-[rgba(var(--border-color),0.2)]">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200
                  ${activeTab === tab.id ? 'text-neon-red border-b-2 border-neon-red' : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] border-b-2 border-transparent'}`}>
                {tab.icon}
                {tab.label}
              </button>)}
          </div>
        </div>
        {/* Tab Content */}
        <div className="p-6">{renderTabContent()}</div>
      </div>
    </>;
};