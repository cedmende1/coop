import React from 'react';
import { NotificationIcon, NotificationType } from './NotificationIcon';
import { CheckCircle, Trash2 } from 'lucide-react';
export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: NotificationType;
  date: Date;
}
interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}
export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete
}) => {
  return <div className={`p-4 ${!notification.read ? 'bg-gray-50 dark:bg-gray-700/20' : ''}`}>
      <div className="flex gap-3">
        <NotificationIcon type={notification.type} />
        <div className="flex-grow">
          <div className="flex justify-between">
            <h4 className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>
              {notification.title}
            </h4>
            <span className="text-xs text-[rgb(var(--text-secondary))]">
              {notification.time}
            </span>
          </div>
          <p className="text-sm mt-1 text-[rgb(var(--text-secondary))]">
            {notification.message}
          </p>
          <div className="flex justify-end mt-2 gap-2">
            {!notification.read && <button onClick={() => onMarkAsRead(notification.id)} className="text-xs flex items-center gap-1 text-[rgb(var(--text-secondary))] hover:text-neon-red">
                <CheckCircle size={14} />
                <span>Mark as read</span>
              </button>}
            <button onClick={() => onDelete(notification.id)} className="text-xs flex items-center gap-1 text-[rgb(var(--text-secondary))] hover:text-red-500">
              <Trash2 size={14} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>;
};