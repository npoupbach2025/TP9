import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/image 14.png';

const Header = () => {
  const navigate = useNavigate();
  const { isDarkMode, setIsDarkMode, searchQuery, setSearchQuery } = useApp();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className={`${isDarkMode ? 'bg-[#1E222B]' : 'bg-white'} py-3 px-8 shadow-md transition-colors duration-200`}>
      <div className="flex items-center justify-between">
        {/* Logo et recherche */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
            <span className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>HYDIA</span>
          </div>

          {/* Barre de recherche */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un mot de passe..."
              className={`w-96 ${isDarkMode ? 'bg-[#262A35] text-gray-300' : 'bg-gray-100 text-gray-900'} pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2DD4BF] placeholder-gray-500 transition-colors duration-200`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Actions de droite */}
        <div className="flex items-center space-x-6">
          {/* Bouton mode sombre/clair */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-[#262A35] text-gray-400 hover:text-[#2DD4BF]' 
                : 'hover:bg-gray-100 text-gray-600 hover:text-[#2DD4BF]'
            }`}
          >
            {isDarkMode ? (
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* Menu profil */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-[#262A35] text-gray-400 hover:text-[#2DD4BF]' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-[#2DD4BF]'
              }`}
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Menu déroulant profil */}
            {showProfileMenu && (
              <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                isDarkMode ? 'bg-[#262A35] text-gray-300' : 'bg-white text-gray-900'
              } ring-1 ring-black ring-opacity-5 focus:outline-none z-50`}>
                <button
                  onClick={handleLogout}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    isDarkMode 
                      ? 'hover:bg-[#1E222B] text-gray-300' 
                      : 'hover:bg-gray-100 text-gray-900'
                  }`}
                >
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
