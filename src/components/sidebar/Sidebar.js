import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import AddPasswordPanel from '../common/AddPasswordPanel';

const SecurityScoreCircle = ({ score }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const gradientId = "securityGradient";

  return (
    <div className="relative w-full aspect-square max-w-[200px] mx-auto">
      <svg className="w-full h-full transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Fond du cercle */}
        <circle
          className="opacity-10"
          strokeWidth="6"
          stroke="#2DD4BF"
          fill="none"
          r={radius}
          cx="50%"
          cy="50%"
        />
        {/* Cercle de progression */}
        <circle
          className="transition-all duration-1000 ease-in-out"
          strokeWidth="6"
          strokeLinecap="round"
          stroke="url(#securityGradient)"
          fill="none"
          r={radius}
          cx="50%"
          cy="50%"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-white mb-1">{score}%</h2>
        <span className="text-[#2DD4BF] text-sm">Excellent</span>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label, isActive, count, onClick }) => {
  const { isDarkMode } = useApp();

  return (
    <motion.button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-2 ${
        isActive ? 'text-[#2DD4BF]' : isDarkMode ? 'text-gray-400' : 'text-gray-600'
      } hover:text-white transition-colors`}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
      {count && (
        <span className={`ml-auto text-sm ${isDarkMode ? 'bg-[#262A35]' : 'bg-gray-100'} px-2 py-0.5 rounded`}>
          {count}
        </span>
      )}
    </motion.button>
  );
};

const Sidebar = () => {
  const { isDarkMode, selectedCategory, setSelectedCategory, allPasswords } = useApp();
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);

  const sidebarItems = [
    { 
      id: 'all',
      icon: '🛡️', 
      label: 'Tous vos mots de passe',
      count: allPasswords.length
    },
    { 
      id: 'favorites',
      icon: '⭐', 
      label: 'Favoris',
      count: allPasswords.filter(p => p.isFavorite).length
    },
    { 
      id: 'recent',
      icon: '🕒', 
      label: 'Récents',
      count: allPasswords.filter(p => {
        const match = p.lastUsed.match(/\d+/);
        if (!match) return false;
        const lastUsed = parseInt(match[0]);
        return !isNaN(lastUsed) && lastUsed <= 7;
      }).length
    }
  ];

  const categories = [
    'Projets',
    'Travail',
    'Divers',
    'Logiciels',
    'Montages'
  ].map(cat => ({
    id: cat.toLowerCase(),
    icon: '📁',
    label: cat,
    count: allPasswords.filter(p => p.category === cat).length
  }));

  return (
    <div className={`w-64 min-h-screen ${
      isDarkMode ? 'bg-[#1E222B]' : 'bg-white'
    } shadow-lg transition-colors duration-200`}>
      <div className="p-6 space-y-8">
        {/* Score de sécurité */}
        <div className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <div className="relative w-32 h-32 mx-auto mb-4">
            <SecurityScoreCircle score={93} />
          </div>
          <h2 className="text-lg font-semibold mb-1">Score de sécurité</h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Bon niveau de sécurité
          </p>
        </div>

        {/* Bouton Ajouter un élément */}
        <button
          onClick={() => setIsAddPanelOpen(true)}
          className="w-full py-2.5 bg-[#2DD4BF] text-white rounded-lg hover:bg-[#26C0AE] transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Ajouter un élément</span>
        </button>

        {/* Menu */}
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <MenuItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              count={item.count}
              isActive={selectedCategory === item.id}
              onClick={() => setSelectedCategory(item.id)}
            />
          ))}
          
          {/* Catégories */}
          <div className={`mt-4 pt-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {categories.map((item) => (
              <MenuItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                count={item.count}
                isActive={selectedCategory === item.id}
                onClick={() => setSelectedCategory(item.id)}
              />
            ))}
          </div>
        </nav>
      </div>
      {/* Panneau d'ajout */}
      <AddPasswordPanel
        isOpen={isAddPanelOpen}
        onClose={() => setIsAddPanelOpen(false)}
      />
    </div>
  );
};

export default Sidebar;
