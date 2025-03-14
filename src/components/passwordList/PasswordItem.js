import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getServiceIcon } from '../../constants/icons';

const PasswordItem = ({
  id,
  service,
  domain,
  email,
  password,
  lastUpdated,
  isFavorite,
  onEdit,
  onDelete
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { togglePasswordFavorite } = useApp();

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      // Vous pourriez ajouter une notification ici
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "aujourd'hui";
    if (days === 1) return "hier";
    if (days < 7) return `il y a ${days} jours`;
    if (days < 14) return "il y a 1 semaine";
    if (days < 30) return `il y a ${Math.floor(days / 7)} semaines`;
    return `il y a ${Math.floor(days / 30)} mois`;
  };

  const ServiceIcon = getServiceIcon(service);

  return (
    <div className="group flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
      <div className="flex items-center space-x-4">
        {/* Service icon */}
        <div className="w-10 h-10 rounded bg-gray-700 flex items-center justify-center text-white">
          {ServiceIcon}
        </div>

        {/* Service info */}
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-white font-medium">{service}</h3>
            <span className="text-gray-400">{domain}</span>
          </div>
          <p className="text-sm text-gray-400">{email}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {/* Mot de passe masqué/visible */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">
            {showPassword ? password : '••••••••••••'}
          </span>
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-white transition-colors"
            title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {showPassword ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              )}
            </svg>
          </button>
        </div>

        {/* Copier le mot de passe */}
        <button
          onClick={handleCopyPassword}
          className="text-gray-400 hover:text-white transition-colors"
          title="Copier le mot de passe"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
        </button>

        {/* Favori */}
        <button
          onClick={() => togglePasswordFavorite(id)}
          className={`transition-colors ${
            isFavorite ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
          }`}
          title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <svg className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </button>

        {/* Modifier */}
        <button
          onClick={onEdit}
          className="text-gray-400 hover:text-white transition-colors"
          title="Modifier"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>

        {/* Supprimer */}
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 transition-colors"
          title="Supprimer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>

        {/* Date de dernière modification */}
        <span className="text-sm text-gray-500">
          {getTimeAgo(lastUpdated)}
        </span>
      </div>
    </div>
  );
};

export default PasswordItem;
