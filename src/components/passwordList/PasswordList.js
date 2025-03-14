import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import SecurityIcon from './SecurityIcon';
import ConfirmDialog from '../common/ConfirmDialog';

const PasswordList = () => {
  const { isDarkMode, passwords, selectedCategory, deletePassword, toggleFavorite } = useApp();
  const [passwordToDelete, setPasswordToDelete] = useState(null);

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'all':
        return 'Tous vos mots de passe';
      case 'favorites':
        return 'Favoris';
      case 'recent':
        return 'Mots de passe récents';
      default:
        return selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Titre de la catégorie */}
      <h1 className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {getCategoryTitle()}
      </h1>

      {/* En-têtes */}
      <div className={`grid grid-cols-[minmax(200px,1.2fr)_minmax(200px,1.2fr)_minmax(280px,1.5fr)_minmax(150px,1fr)_80px] gap-4 px-6 py-3 text-${isDarkMode ? '[#2DD4BF]' : 'gray-600'} text-sm font-medium`}>
        <div>Site</div>
        <div>Identifiant</div>
        <div>Mot de passe</div>
        <div>Catégorie</div>
        <div></div>
      </div>

      {/* Liste des mots de passe */}
      <div className="space-y-2">
        {passwords.map((password) => (
          <div
            key={password.id}
            className={`grid grid-cols-[minmax(200px,1.2fr)_minmax(200px,1.2fr)_minmax(280px,1.5fr)_minmax(150px,1fr)_80px] gap-4 items-center px-6 py-4 rounded-lg ${
              isDarkMode ? 'bg-[#1E222B] hover:bg-[#262A35]' : 'bg-white hover:bg-gray-50'
            } transition-colors duration-200`}
          >
            {/* Site */}
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg ${password.bgColor} flex items-center justify-center text-white font-medium`}>
                {password.logo}
              </div>
              <div>
                <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {password.site}
                </div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {password.lastUsed}
                </div>
              </div>
            </div>

            {/* Identifiant */}
            <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {password.email}
            </div>

            {/* Mot de passe */}
            <div className="flex items-center space-x-2">
              <div className={`font-mono ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                ••••••••••••
              </div>
              <SecurityIcon level={password.securityLevel} />
            </div>

            {/* Catégorie */}
            <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {password.category}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={() => toggleFavorite(password.id)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isDarkMode ? 'hover:bg-[#2A2F3A] text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <svg className="w-5 h-5" fill={password.isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
                </svg>
              </button>
              <button
                onClick={() => setPasswordToDelete(password)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isDarkMode ? 'hover:bg-[#2A2F3A] text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog de confirmation */}
      <ConfirmDialog
        isOpen={passwordToDelete !== null}
        onClose={() => setPasswordToDelete(null)}
        onConfirm={() => {
          deletePassword(passwordToDelete.id);
          setPasswordToDelete(null);
        }}
        title="Supprimer le mot de passe"
        message={`Êtes-vous sûr de vouloir supprimer le mot de passe pour ${passwordToDelete?.site} ?`}
      />
    </div>
  );
};

export default PasswordList;
