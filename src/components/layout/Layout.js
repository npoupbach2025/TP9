import React from 'react';
import { useApp } from '../../context/AppContext';
import Sidebar from '../sidebar/Sidebar';
import PasswordList from '../passwordList/PasswordList';
import logo from '../../assets/image 14.png';

const Layout = () => {
  const { isDarkMode, toggleTheme } = useApp();

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-[#171A21]' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`flex items-center justify-between px-6 ${isDarkMode ? 'bg-[#1E222B]' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        {/* Logo et texte */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Hydia" className="h-7" />
          <span className="text-[10px] text-gray-400">
            Manage less, secure more
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Notifications */}
          <button
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          {/* Profile */}
          <button
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="text-sm font-medium">CG</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <PasswordList />
        </main>
      </div>
    </div>
  );
};

export default Layout;
