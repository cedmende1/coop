import React, { useEffect, useRef } from 'react';
import { UserIcon, SettingsIcon, LogOutIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
interface User {
  name: string;
  email: string;
  avatar: string;
}
interface UserDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onLogout: () => void;
}
export const UserDropdown: React.FC<UserDropdownProps> = ({
  isOpen,
  onClose,
  user,
  onLogout
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
  return <div ref={dropdownRef} className="absolute right-0 mt-2 w-64 bg-[rgb(var(--bg-card))] border border-[rgba(var(--border-color),0.4)] rounded-lg shadow-lg p-3 z-50 transform origin-top-right transition-all duration-200 ease-in-out animate-fadeIn">
      {/* User info section */}
      <div className="flex items-center gap-3 p-2 border-b border-[rgba(var(--border-color),0.4)] pb-3 mb-2">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-[rgb(var(--text-primary))]">
            {user.name}
          </span>
          <span className="text-xs text-[rgb(var(--text-secondary))]">
            {user.email}
          </span>
        </div>
      </div>
      {/* Menu items */}
      <div className="space-y-1">
        <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-md text-[rgb(var(--text-primary))] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150" onClick={onClose}>
          <UserIcon size={16} />
          <span>Profile</span>
        </Link>
        <Link to="/settings" className="flex items-center gap-3 px-3 py-2 rounded-md text-[rgb(var(--text-primary))] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150" onClick={onClose}>
          <SettingsIcon size={16} />
          <span>Settings</span>
        </Link>
        <div className="h-px bg-[rgba(var(--border-color),0.4)] my-2"></div>
        <button onClick={() => {
        onClose();
        onLogout();
      }} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-neon-red hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150">
          <LogOutIcon size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>;
};