import React from 'react';
import { useApp } from '../../context/AppContext';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  const { isDarkMode } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      {/* Dialog */}
      <div className={`relative p-6 rounded-lg shadow-xl w-96 ${
        isDarkMode ? 'bg-[#1E222B] text-white' : 'bg-white text-gray-900'
      }`}>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{message}</p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-[#2A2F3A] hover:bg-[#353B48] text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Annuler
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
