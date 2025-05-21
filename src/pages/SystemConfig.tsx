import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { SaveIcon, RefreshCwIcon, CheckIcon, AlertTriangleIcon, LockIcon, PercentIcon, DollarSignIcon, CalendarIcon, BellIcon, UsersIcon, LayoutIcon, DatabaseIcon, SettingsIcon } from 'lucide-react';
// Define configuration sections and settings
interface ConfigSetting {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'toggle' | 'date' | 'time' | 'color';
  value: string | number | boolean;
  options?: {
    value: string;
    label: string;
  }[];
  description?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  category: string;
}
const mockConfigSettings: ConfigSetting[] = [
// General Settings
{
  id: 'org_name',
  label: 'Organization Name',
  type: 'text',
  value: 'Lendology Cooperative',
  category: 'general'
}, {
  id: 'org_address',
  label: 'Organization Address',
  type: 'text',
  value: '123 Main Street, Manila, Philippines',
  category: 'general'
}, {
  id: 'org_contact',
  label: 'Contact Number',
  type: 'text',
  value: '+63 2 8123 4567',
  category: 'general'
}, {
  id: 'org_email',
  label: 'Contact Email',
  type: 'text',
  value: 'info@lendology.com',
  category: 'general'
}, {
  id: 'fiscal_year_start',
  label: 'Fiscal Year Start',
  type: 'date',
  value: '2023-01-01',
  category: 'general'
}, {
  id: 'currency',
  label: 'Default Currency',
  type: 'select',
  value: 'PHP',
  options: [{
    value: 'PHP',
    label: 'Philippine Peso (PHP)'
  }, {
    value: 'USD',
    label: 'US Dollar (USD)'
  }, {
    value: 'EUR',
    label: 'Euro (EUR)'
  }],
  category: 'general'
}, {
  id: 'date_format',
  label: 'Date Format',
  type: 'select',
  value: 'MM/DD/YYYY',
  options: [{
    value: 'MM/DD/YYYY',
    label: 'MM/DD/YYYY'
  }, {
    value: 'DD/MM/YYYY',
    label: 'DD/MM/YYYY'
  }, {
    value: 'YYYY-MM-DD',
    label: 'YYYY-MM-DD'
  }],
  category: 'general'
}, {
  id: 'timezone',
  label: 'Timezone',
  type: 'select',
  value: 'Asia/Manila',
  options: [{
    value: 'Asia/Manila',
    label: 'Manila (GMT+8)'
  }, {
    value: 'Asia/Singapore',
    label: 'Singapore (GMT+8)'
  }, {
    value: 'America/New_York',
    label: 'New York (GMT-5)'
  }, {
    value: 'Europe/London',
    label: 'London (GMT+0)'
  }],
  category: 'general'
},
// Security Settings
{
  id: 'password_expiry',
  label: 'Password Expiry (days)',
  type: 'number',
  value: 90,
  min: 30,
  max: 365,
  category: 'security'
}, {
  id: 'session_timeout',
  label: 'Session Timeout (minutes)',
  type: 'number',
  value: 30,
  min: 5,
  max: 120,
  category: 'security'
}, {
  id: 'login_attempts',
  label: 'Max Login Attempts',
  type: 'number',
  value: 5,
  min: 3,
  max: 10,
  category: 'security'
}, {
  id: 'require_2fa',
  label: 'Require 2FA for Staff',
  type: 'toggle',
  value: true,
  category: 'security'
}, {
  id: 'password_complexity',
  label: 'Password Complexity',
  type: 'select',
  value: 'high',
  options: [{
    value: 'low',
    label: 'Low - Minimum 6 characters'
  }, {
    value: 'medium',
    label: 'Medium - Minimum 8 characters with numbers'
  }, {
    value: 'high',
    label: 'High - Minimum 10 characters with numbers, symbols, and mixed case'
  }],
  category: 'security'
},
// Loan Settings
{
  id: 'default_interest_rate',
  label: 'Default Interest Rate (%)',
  type: 'number',
  value: 12,
  min: 0,
  max: 30,
  step: 0.1,
  unit: '%',
  category: 'loan'
}, {
  id: 'min_loan_amount',
  label: 'Minimum Loan Amount',
  type: 'number',
  value: 5000,
  min: 1000,
  category: 'loan'
}, {
  id: 'max_loan_amount',
  label: 'Maximum Loan Amount',
  type: 'number',
  value: 500000,
  min: 10000,
  category: 'loan'
}, {
  id: 'loan_term_min',
  label: 'Minimum Loan Term (months)',
  type: 'number',
  value: 3,
  min: 1,
  max: 12,
  category: 'loan'
}, {
  id: 'loan_term_max',
  label: 'Maximum Loan Term (months)',
  type: 'number',
  value: 60,
  min: 12,
  max: 120,
  category: 'loan'
}, {
  id: 'late_payment_fee',
  label: 'Late Payment Fee (%)',
  type: 'number',
  value: 2,
  min: 0,
  max: 10,
  step: 0.1,
  unit: '%',
  category: 'loan'
}, {
  id: 'processing_fee',
  label: 'Loan Processing Fee (%)',
  type: 'number',
  value: 1.5,
  min: 0,
  max: 5,
  step: 0.1,
  unit: '%',
  category: 'loan'
},
// Member Settings
{
  id: 'min_share_capital',
  label: 'Minimum Share Capital',
  type: 'number',
  value: 5000,
  min: 1000,
  category: 'member'
}, {
  id: 'membership_fee',
  label: 'Membership Fee',
  type: 'number',
  value: 500,
  min: 0,
  category: 'member'
}, {
  id: 'auto_approve_members',
  label: 'Auto-approve Members',
  type: 'toggle',
  value: false,
  category: 'member'
}, {
  id: 'require_id_verification',
  label: 'Require ID Verification',
  type: 'toggle',
  value: true,
  category: 'member'
},
// Notification Settings
{
  id: 'email_notifications',
  label: 'Email Notifications',
  type: 'toggle',
  value: true,
  category: 'notification'
}, {
  id: 'sms_notifications',
  label: 'SMS Notifications',
  type: 'toggle',
  value: false,
  category: 'notification'
}, {
  id: 'payment_reminder_days',
  label: 'Payment Reminder Days Before Due',
  type: 'number',
  value: 3,
  min: 1,
  max: 14,
  category: 'notification'
}, {
  id: 'overdue_notification_interval',
  label: 'Overdue Notification Interval (days)',
  type: 'number',
  value: 7,
  min: 1,
  max: 30,
  category: 'notification'
}];
export const SystemConfig = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<ConfigSetting[]>(mockConfigSettings);
  const [originalSettings] = useState<ConfigSetting[]>(JSON.parse(JSON.stringify(mockConfigSettings)));
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  // Filter settings based on active tab and search term
  const filteredSettings = settings.filter(setting => {
    const matchesTab = setting.category === activeTab;
    const matchesSearch = searchTerm === '' || setting.label.toLowerCase().includes(searchTerm.toLowerCase()) || setting.description && setting.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });
  // Handle input change
  const handleInputChange = (id: string, value: string | number | boolean) => {
    setSettings(prev => prev.map(setting => setting.id === id ? {
      ...setting,
      value
    } : setting));
  };
  // Handle save settings
  const handleSaveSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1000);
  };
  // Handle reset settings
  const handleResetSettings = () => {
    setSettings(JSON.parse(JSON.stringify(originalSettings)));
  };
  // Check if settings have been modified
  const isModified = JSON.stringify(settings) !== JSON.stringify(originalSettings);
  // Render input field based on setting type
  const renderInputField = (setting: ConfigSetting) => {
    switch (setting.type) {
      case 'text':
        return <input type="text" id={setting.id} value={setting.value as string} onChange={e => handleInputChange(setting.id, e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" placeholder={setting.placeholder || ''} />;
      case 'number':
        return <div className="flex items-center">
            <input type="number" id={setting.id} value={setting.value as number} onChange={e => handleInputChange(setting.id, parseFloat(e.target.value) || 0)} min={setting.min} max={setting.max} step={setting.step || 1} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />
            {setting.unit && <span className="ml-2 text-[rgb(var(--text-secondary))]">
                {setting.unit}
              </span>}
          </div>;
      case 'select':
        return <select id={setting.id} value={setting.value as string} onChange={e => handleInputChange(setting.id, e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30">
            {setting.options?.map(option => <option key={option.value} value={option.value}>
                {option.label}
              </option>)}
          </select>;
      case 'toggle':
        return <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={setting.value as boolean} onChange={e => handleInputChange(setting.id, e.target.checked)} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-neon-red/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-neon-red"></div>
          </label>;
      case 'date':
        return <input type="date" id={setting.id} value={setting.value as string} onChange={e => handleInputChange(setting.id, e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />;
      case 'time':
        return <input type="time" id={setting.id} value={setting.value as string} onChange={e => handleInputChange(setting.id, e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30" />;
      case 'color':
        return <input type="color" id={setting.id} value={setting.value as string} onChange={e => handleInputChange(setting.id, e.target.value)} className="w-10 h-10 rounded cursor-pointer" />;
      default:
        return null;
    }
  };
  // Tab configuration
  const tabs = [{
    id: 'general',
    label: 'General',
    icon: <SettingsIcon size={16} />
  }, {
    id: 'security',
    label: 'Security',
    icon: <LockIcon size={16} />
  }, {
    id: 'loan',
    label: 'Loan',
    icon: <DollarSignIcon size={16} />
  }, {
    id: 'member',
    label: 'Member',
    icon: <UsersIcon size={16} />
  }, {
    id: 'notification',
    label: 'Notifications',
    icon: <BellIcon size={16} />
  }];
  // Category icons
  const categoryIcons = {
    general: <SettingsIcon size={20} />,
    security: <LockIcon size={20} />,
    loan: <DollarSignIcon size={20} />,
    member: <UsersIcon size={20} />,
    notification: <BellIcon size={20} />
  };
  return <>
      <PageHeader title="System Configuration" description="Configure system settings and parameters" />
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
        {/* Settings Content */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-3">
              {categoryIcons[activeTab as keyof typeof categoryIcons]}
              <h2 className="text-lg font-medium">
                {tabs.find(tab => tab.id === activeTab)?.label} Settings
              </h2>
            </div>
            <div className="relative w-full sm:w-64">
              <input type="text" placeholder="Search settings..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-3 pr-3 py-2 rounded-lg bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.2)] text-[rgb(var(--text-primary))] focus:outline-none focus:ring-2 focus:ring-neon-red/30 text-sm" />
            </div>
          </div>
          {/* Success Message */}
          {showSuccess && <div className="mb-6 p-3 rounded-lg bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-400 flex items-center gap-2">
              <CheckIcon size={16} />
              <span>Settings saved successfully!</span>
            </div>}
          {/* Settings Form */}
          <div className="space-y-6">
            {filteredSettings.length > 0 ? filteredSettings.map(setting => <div key={setting.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center pb-4 border-b border-[rgba(var(--border-color),0.1)] last:border-b-0 last:pb-0">
                  <div>
                    <label htmlFor={setting.id} className="block font-medium">
                      {setting.label}
                    </label>
                    {setting.description && <p className="text-sm text-[rgb(var(--text-secondary))]">
                        {setting.description}
                      </p>}
                  </div>
                  <div className="md:col-span-2">
                    {renderInputField(setting)}
                  </div>
                </div>) : <div className="text-center py-8">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-700 text-[rgb(var(--text-secondary))] mb-4">
                  <DatabaseIcon size={20} />
                </div>
                <h3 className="text-lg font-medium mb-2">No settings found</h3>
                <p className="text-[rgb(var(--text-secondary))]">
                  {searchTerm ? `No settings match "${searchTerm}". Try a different search term.` : `No settings available for this category.`}
                </p>
              </div>}
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-[rgba(var(--border-color),0.2)]">
            <button onClick={handleResetSettings} disabled={!isModified || isLoading} className={`px-4 py-2 rounded-lg flex items-center gap-2 
                ${!isModified || isLoading ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
              <RefreshCwIcon size={16} />
              <span>Reset</span>
            </button>
            <button onClick={handleSaveSettings} disabled={!isModified || isLoading} className={`px-4 py-2 rounded-lg flex items-center gap-2 
                ${!isModified || isLoading ? 'bg-neon-red/50 text-white cursor-not-allowed' : 'bg-neon-red text-white hover:bg-neon-red/90'}`}>
              {isLoading ? <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Saving...</span>
                </> : <>
                  <SaveIcon size={16} />
                  <span>Save Changes</span>
                </>}
            </button>
          </div>
        </div>
      </div>
      {/* Advanced Settings Warning */}
      <div className="mt-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-400 flex gap-3">
        <div className="flex-shrink-0">
          <AlertTriangleIcon size={20} />
        </div>
        <div>
          <h3 className="font-medium mb-1">Caution: Advanced Settings</h3>
          <p className="text-sm">
            Changing these system settings may affect the behavior of the entire
            application. Please ensure you understand the implications before
            making changes. For technical assistance, contact the IT department.
          </p>
        </div>
      </div>
    </>;
};