import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { MenuIcon, SearchIcon, BellIcon, LogOutIcon, UserIcon, SettingsIcon, ChevronDownIcon, SunIcon, MoonIcon } from 'lucide-react';
import { Logo } from '../Logo';
import { UserDropdown } from './UserDropdown';
import { NotificationsDropdown } from './NotificationsDropdown';
import { LanguageDropdown } from './LanguageDropdown';
// Mock notification data
const mockNotifications = [{
  id: '1',
  title: 'New Loan Application',
  message: 'John Smith has submitted a new loan application.',
  time: '5 minutes ago',
  read: false,
  type: 'loan'
}, {
  id: '2',
  title: 'Payment Received',
  message: 'Payment of $1,250 received from Sarah Johnson.',
  time: '1 hour ago',
  read: false,
  type: 'payment'
}, {
  id: '3',
  title: 'System Update',
  message: 'System maintenance scheduled for tonight at 2 AM.',
  time: '1 day ago',
  read: true,
  type: 'system'
}];
interface TopNavigationProps {
  isMobile: boolean;
  toggleMobileMenu: () => void;
  toggleSidebar: () => void;
}
export const TopNavigation: React.FC<TopNavigationProps> = ({
  isMobile,
  toggleMobileMenu,
  toggleSidebar
}) => {
  const navigate = useNavigate();
  const {
    user,
    logout
  } = useAuth();
  const {
    theme,
    toggleTheme
  } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [language, setLanguage] = useState<'english' | 'filipino'>('english');
  const currentLanguage = {
    english: {
      code: 'english' as const,
      name: 'English',
      flag: '🇺🇸'
    },
    filipino: {
      code: 'filipino' as const,
      name: 'Filipino',
      flag: '🇵🇭',
      localName: 'Wikang Filipino'
    }
  }[language];
  return <header className="h-16 bg-[rgb(var(--bg-card))] sticky top-0 z-30 flex items-center justify-between px-2 sm:px-4 border-b border-[rgba(var(--border-color),0.2)]">
      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={() => {
        if (isMobile) {
          toggleMobileMenu();
        } else {
          toggleSidebar();
        }
      }} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[rgb(var(--text-secondary))]" aria-label={isMobile ? 'Toggle mobile menu' : 'Toggle sidebar'}>
          <MenuIcon size={20} />
        </button>
        <Logo />
      </div>
      <div className="flex-1 max-w-xl mx-2 sm:mx-4 hidden md:block">
        <div className="relative">
          <SearchIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))]" />
          <input type="text" placeholder="Search..." className="w-full pl-9 pr-8 py-1.5 rounded-full bg-[rgba(var(--input-bg),0.8)] border border-[rgba(var(--border-color),0.3)] text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all duration-300 ease-in-out" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(var(--text-secondary))] flex items-center gap-1">
            <span className="text-xs">⌘</span>
            <span className="text-xs">K</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-3">
        {/* Search icon for mobile - Opens search modal */}
        <button className="md:hidden flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[rgb(var(--text-secondary))]">
          <SearchIcon size={18} />
        </button>
        {/* Language Selector */}
        <div className="relative">
          <button onClick={() => {
          setLanguageDropdownOpen(!languageDropdownOpen);
          if (dropdownOpen) setDropdownOpen(false);
          if (notificationsOpen) setNotificationsOpen(false);
        }} className="flex items-center gap-1.5 h-8 px-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300" aria-label="Select language">
            <span className="text-sm font-medium">{currentLanguage.name}</span>
            <ChevronDownIcon size={16} className={`transition-transform duration-200 ${languageDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          <LanguageDropdown isOpen={languageDropdownOpen} onClose={() => setLanguageDropdownOpen(false)} currentLanguage={currentLanguage} onSelectLanguage={code => setLanguage(code)} />
        </div>
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-[rgb(var(--text-secondary))] transition-all duration-300" aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
          {theme === 'light' ? <SunIcon size={18} className="text-yellow-500 hover:rotate-45 transition-transform duration-300" /> : <MoonIcon size={18} className="text-blue-300 hover:rotate-12 transition-transform duration-300" />}
        </button>
        {/* Notification Bell */}
        <div className="relative">
          <button onClick={() => {
          setNotificationsOpen(!notificationsOpen);
          if (dropdownOpen) setDropdownOpen(false);
        }} className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative">
            <BellIcon size={18} className="text-[rgb(var(--text-secondary))]" />
            {/* Notification indicator */}
            <span className="absolute top-0 right-0 h-2 w-2 bg-neon-red rounded-full"></span>
          </button>
          {/* Notifications dropdown */}
          <NotificationsDropdown isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} notifications={mockNotifications} />
        </div>
        {/* User Profile Section */}
        <div className="relative">
          <button onClick={() => {
          setDropdownOpen(!dropdownOpen);
          if (notificationsOpen) setNotificationsOpen(false);
        }} className="flex items-center gap-2 rounded-lg py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium overflow-hidden">
              <img src={user?.avatar} alt={user?.name} className="h-full w-full object-cover" />
            </div>
            <span className="hidden sm:block font-medium text-sm">
              {user?.name}
            </span>
            <ChevronDownIcon size={16} className={`hidden sm:block transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {/* User dropdown menu */}
          <UserDropdown isOpen={dropdownOpen} onClose={() => setDropdownOpen(false)} user={user!} onLogout={() => {
          logout();
          navigate('/');
        }} />
        </div>
      </div>
    </header>;
};