import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { CheckIcon } from 'lucide-react';
import { TabButton } from '../components/notifications/TabButton';
import { NotificationItem, Notification } from '../components/notifications/NotificationItem';
import { NotificationType } from '../components/notifications/NotificationIcon';
// Mock notification data
const mockNotifications = [{
  id: '1',
  title: 'New Loan Application',
  message: 'John Smith has submitted a new loan application. Review required within 24 hours as per compliance guidelines.',
  time: '5 minutes ago',
  read: false,
  type: 'loan' as NotificationType,
  date: new Date(Date.now() - 5 * 60 * 1000)
}, {
  id: '2',
  title: 'Payment Received',
  message: 'Payment of $1,250 received from Sarah Johnson for loan #LN-2023-0542. The payment has been processed and the account has been updated.',
  time: '1 hour ago',
  read: false,
  type: 'payment' as NotificationType,
  date: new Date(Date.now() - 60 * 60 * 1000)
}, {
  id: '3',
  title: 'Member Registration',
  message: 'New member registration requires approval. Robert Williams has completed the registration process and submitted all required documentation.',
  time: '3 hours ago',
  read: true,
  type: 'member' as NotificationType,
  date: new Date(Date.now() - 3 * 60 * 60 * 1000)
}, {
  id: '4',
  title: 'System Update',
  message: 'System maintenance scheduled for tonight at 2 AM. Expected downtime is approximately 30 minutes. All users will be logged out automatically.',
  time: '1 day ago',
  read: true,
  type: 'system' as NotificationType,
  date: new Date(Date.now() - 24 * 60 * 60 * 1000)
}, {
  id: '5',
  title: 'Loan Approval',
  message: 'Loan #LN-2023-0539 has been approved by the loan committee. Disbursement process can now be initiated as per standard procedures.',
  time: '2 days ago',
  read: true,
  type: 'loan' as NotificationType,
  date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
}, {
  id: '6',
  title: 'Compliance Alert',
  message: 'Monthly compliance report due in 3 days. Please ensure all required documentation is up to date and properly filed in the system.',
  time: '3 days ago',
  read: true,
  type: 'system' as NotificationType,
  date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
}, {
  id: '7',
  title: 'Member Update',
  message: 'Emily Parker has updated her contact information. The changes have been recorded in the system and are available for review.',
  time: '4 days ago',
  read: true,
  type: 'member' as NotificationType,
  date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
}];
type FilterTab = 'all' | 'unread' | NotificationType;
export const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const unreadCount = notifications.filter(n => !n.read).length;
  // Actions
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? {
      ...n,
      read: true
    } : n));
  };
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({
      ...n,
      read: true
    })));
  };
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  // Filter notifications based on active tab
  const filteredNotifications = activeTab === 'all' ? notifications : activeTab === 'unread' ? notifications.filter(n => !n.read) : notifications.filter(n => n.type === activeTab);
  // Tab configuration
  const tabs = [{
    id: 'all',
    label: 'All'
  }, {
    id: 'unread',
    label: 'Unread',
    count: unreadCount
  }, {
    id: 'loan',
    label: 'Loans'
  }, {
    id: 'payment',
    label: 'Payments'
  }, {
    id: 'member',
    label: 'Members'
  }, {
    id: 'system',
    label: 'System'
  }];
  return <>
      <PageHeader title="Notifications" description="View and manage your notifications" />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {/* Header with tabs */}
        <div className="border-b border-[rgba(var(--border-color),0.2)]">
          {/* Tab navigation */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex whitespace-nowrap min-w-full">
              {tabs.map(tab => <TabButton key={tab.id} id={tab.id} label={tab.label} count={tab.count} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id as FilterTab)} />)}
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex justify-end p-2 border-t border-[rgba(var(--border-color),0.1)]">
            {unreadCount > 0 && <button onClick={markAllAsRead} className="flex items-center gap-1 text-xs sm:text-sm py-1 px-2 sm:py-1.5 sm:px-3 bg-neon-red text-white rounded-md hover:bg-neon-red/90 transition-colors">
                <CheckIcon size={14} />
                <span>Mark all as read</span>
              </button>}
          </div>
        </div>
        {/* Notifications list */}
        {filteredNotifications.length === 0 ? <div className="py-16 text-center text-[rgb(var(--text-secondary))]">
            <p>No notifications found</p>
          </div> : <div className="divide-y divide-[rgba(var(--border-color),0.2)]">
            {filteredNotifications.map(notification => <NotificationItem key={notification.id} notification={notification} onMarkAsRead={markAsRead} onDelete={deleteNotification} />)}
          </div>}
      </div>
    </>;
};