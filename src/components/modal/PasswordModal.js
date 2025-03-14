import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import PasswordGenerator from '../generator/PasswordGenerator';

const PasswordModal = ({ isOpen, onClose, editingPassword = null }) => {
  const { addNewPassword, updateExistingPassword } = useApp();
  const [formData, setFormData] = useState(editingPassword || {
    service: '',
    domain: '.com',
    email: '',
    password: '',
    category: 'Logiciels'
  });

  const [showGenerator, setShowGenerator] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPassword) {
        await updateExistingPassword(editingPassword.id, formData);
      } else {
        await addNewPassword(formData);
      }
      onClose();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-semibold text-white mb-6">
          {editingPassword ? 'Modifier le mot de passe' : 'Ajouter un mot de passe'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Service
              </label>
              <input
                type="text"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Domaine
              </label>
              <input
                type="text"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Mot de passe
            </label>
            <div className="flex space-x-2">
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowGenerator(!showGenerator)}
                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
              >
                Générer
              </button>
            </div>
            {showGenerator && (
              <div className="absolute right-0 mt-2 w-96 z-10">
                <PasswordGenerator
                  onPasswordGenerated={(password) => {
                    setFormData({ ...formData, password });
                    setShowGenerator(false);
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Catégorie
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="Logiciels">Logiciels</option>
              <option value="Travail">Travail</option>
              <option value="Divers">Divers</option>
              <option value="Montages">Montages</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
            >
              {editingPassword ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;
