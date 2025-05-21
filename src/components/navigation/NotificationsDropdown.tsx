import React, { useEffect, useRef } from 'react';
import { BellIcon, CheckIcon, ExternalLinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
// Types
interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'loan' | 'payment' | 'member' | 'system' | 'other';
}
interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}
// Extracted component for notification icon
const NotificationIcon: React.FC<{
  type: string;
}> = ({
  type
}) => {
  const iconMap: Record<string, {
    bg: string;
    emoji: string;
  }> = {
    loan: {
      bg: 'bg-blue-100 dark:bg-blue-900',
      emoji: '💰'
    },
    payment: {
      bg: 'bg-green-100 dark:bg-green-900',
      emoji: '💸'
    },
    member: {
      bg: 'bg-purple-100 dark:bg-purple-900',
      emoji: '👤'
    },
    system: {
      bg: 'bg-gray-100 dark:bg-gray-700',
      emoji: '⚙️'
    },
    other: {
      bg: 'bg-gray-100 dark:bg-gray-700',
      emoji: '📌'
    }
  };
  const icon = iconMap[type] || iconMap.other;
  return <div className={`h-8 w-8 rounded-full ${icon.bg} flex items-center justify-center`}>
      {icon.emoji}
    </div>;
};
export const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({
  isOpen,
  onClose,
  notifications
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  const unreadCount = notifications.filter(n => !n.read).length;
  return <div ref={dropdownRef} className="absolute right-0 mt-2 w-80 bg-[rgb(var(--bg-card))] border border-[rgba(var(--border-color),0.4)] rounded-lg shadow-lg z-50 transform origin-top-right transition-all duration-200 ease-in-out animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(var(--border-color),0.4)]">
        <div className="flex items-center gap-2">
          <BellIcon size={16} className="text-[rgb(var(--text-secondary))]" />
          <h3 className="font-semibold">Notifications</h3>
        </div>
        {unreadCount > 0 && <span className="bg-neon-red text-white text-xs px-2 py-0.5 rounded-full">
            {unreadCount} new
          </span>}
      </div>
      {/* Notifications list */}
      <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
        {notifications.length === 0 ? <div className="py-6 text-center text-[rgb(var(--text-secondary))]">
            <p>No notifications</p>
          </div> : notifications.map(notification => <div key={notification.id} className={`px-4 py-3 border-b border-[rgba(var(--border-color),0.2)] flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150 ${!notification.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''}`}>
              <NotificationIcon type={notification.type} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  {!notification.read && <div className="h-2 w-2 rounded-full bg-neon-red flex-shrink-0 mt-1"></div>}
                </div>
                <p className="text-xs text-[rgb(var(--text-secondary))] mt-0.5 line-clamp-2">
                  {notification.message}
                </p>
                <span className="text-xs text-[rgb(var(--text-secondary))] mt-1">
                  {notification.time}
                </span>
              </div>
              <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-[rgb(var(--text-secondary))]" title="Mark as read">
                <CheckIcon size={14} />
              </button>
            </div>)}
      </div>
      {/* Footer with link to all notifications */}
      <div className="p-3 border-t border-[rgba(var(--border-color),0.4)]">
        <Link to="/notifications" onClick={onClose} className="flex items-center justify-center gap-2 text-sm text-neon-red hover:text-neon-red/80 transition-colors duration-150 py-1.5">
          <span>View all notifications</span>
          <ExternalLinkIcon size={14} />
        </Link>
      </div>
    </div>;
};