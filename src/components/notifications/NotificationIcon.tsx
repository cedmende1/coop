import React from 'react';
export type NotificationType = 'loan' | 'payment' | 'member' | 'system' | 'other';
interface NotificationIconProps {
  type: NotificationType;
}
export const NotificationIcon: React.FC<NotificationIconProps> = ({
  type
}) => {
  const iconMap = {
    loan: {
      bg: 'bg-blue-100 dark:bg-blue-900',
      text: 'text-blue-500 dark:text-blue-300',
      emoji: '💰'
    },
    payment: {
      bg: 'bg-green-100 dark:bg-green-900',
      text: 'text-green-500 dark:text-green-300',
      emoji: '💸'
    },
    member: {
      bg: 'bg-purple-100 dark:bg-purple-900',
      text: 'text-purple-500 dark:text-purple-300',
      emoji: '👤'
    },
    system: {
      bg: 'bg-gray-100 dark:bg-gray-700',
      text: 'text-gray-500 dark:text-gray-300',
      emoji: '⚙️'
    },
    other: {
      bg: 'bg-gray-100 dark:bg-gray-700',
      text: 'text-gray-500 dark:text-gray-300',
      emoji: '📌'
    }
  };
  const icon = iconMap[type] || iconMap.other;
  return <div className={`h-10 w-10 rounded-full ${icon.bg} flex items-center justify-center ${icon.text}`}>
      {icon.emoji}
    </div>;
};