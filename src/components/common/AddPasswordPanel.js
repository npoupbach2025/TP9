import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { generatePassword, evaluatePassword } from '../../utils/passwordGenerator';

const AddPasswordPanel = ({ isOpen, onClose }) => {
  const { isDarkMode, addPassword } = useApp();
  const [formData, setFormData] = useState({
    site: '',
    email: '',
    category: 'Logiciels'
  });
  const [passwordSettings, setPasswordSettings] = useState({
    numbers: true,
    uppercase: true,
    specialChars: true
  });
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(24);
  const [passwordScore, setPasswordScore] = useState(0);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);

  // Générer un nouveau mot de passe quand les paramètres changent
  useEffect(() => {
    generateNewPassword();
  }, [passwordSettings, passwordLength]);

  // Générer un nouveau mot de passe
  const generateNewPassword = () => {
    const newPassword = generatePassword(passwordLength, passwordSettings);
    setPassword(newPassword);
    setPasswordScore(evaluatePassword(newPassword));
  };

  // Gérer le slider
  const handleSliderMouseDown = (e) => {
    isDragging.current = true;
    updateSliderPosition(e);
    document.addEventListener('mousemove', handleSliderMouseMove);
    document.addEventListener('mouseup', handleSliderMouseUp);
  };

  const handleSliderMouseMove = (e) => {
    if (!isDragging.current) return;
    updateSliderPosition(e);
  };

  const handleSliderMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleSliderMouseMove);
    document.removeEventListener('mouseup', handleSliderMouseUp);
  };

  const updateSliderPosition = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const newLength = Math.round(percentage * 32) + 8; // Entre 8 et 40 caractères
    setPasswordLength(newLength);
  };

  // Copier le mot de passe
  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      // Ajouter une notification de succès si nécessaire
    } catch (err) {
      console.error('Erreur lors de la copie du mot de passe:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getSecurityLevel = (score) => {
    if (score >= 90) return 'Fort';
    if (score >= 70) return 'Moyen';
    return 'Faible';
  };

  const handleSubmit = () => {
    if (!formData.site || !formData.email) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const newPassword = {
      site: formData.site,
      email: formData.email,
      password: password,
      category: formData.category,
      securityLevel: getSecurityLevel(passwordScore)
    };

    addPassword(newPassword);
    onClose();

    // Réinitialiser le formulaire
    setFormData({
      site: '',
      email: '',
      category: 'Logiciels'
    });
    generateNewPassword();
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed right-0 top-0 h-full w-[500px] ${
      isDarkMode ? 'bg-[#1E222B] text-white' : 'bg-white text-gray-900'
    } shadow-xl transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Ajouter un élément</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Identifiant */}
          <div>
            <label className="block mb-2 text-sm">Identifiant</label>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                <img src="/path/to/site/icon" alt="" className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="site"
                value={formData.site}
                onChange={handleInputChange}
                placeholder="notion.com"
                className={`flex-1 p-2 rounded-lg ${
                  isDarkMode ? 'bg-[#262A35] text-white' : 'bg-gray-100 text-gray-900'
                }`}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="email@example.com"
              className={`w-full p-2 rounded-lg ${
                isDarkMode ? 'bg-[#262A35] text-white' : 'bg-gray-100 text-gray-900'
              }`}
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block mb-2 text-sm">Catégorie</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full p-2 rounded-lg ${
                isDarkMode ? 'bg-[#262A35] text-white' : 'bg-gray-100 text-gray-900'
              }`}
            >
              <option value="Logiciels">Logiciels</option>
              <option value="Travail">Travail</option>
              <option value="Projets">Projets</option>
              <option value="Divers">Divers</option>
            </select>
          </div>

          {/* Mot de passe */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#2DD4BF] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="text-lg font-medium">
                  {password}
                </div>
              </div>
              <button 
                onClick={generateNewPassword}
                className="text-gray-400 hover:text-gray-300 p-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {/* Slider */}
            <div 
              ref={sliderRef}
              className="relative w-full h-1 bg-gray-700 rounded-full mb-8 cursor-pointer"
              onMouseDown={handleSliderMouseDown}
            >
              <div 
                className="absolute left-0 right-0 h-full bg-[#2DD4BF] rounded-full" 
                style={{ width: `${passwordScore}%` }} 
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#2DD4BF] rounded-full cursor-pointer"
                style={{ left: `${(passwordLength - 8) / 32 * 100}%` }}
              />
            </div>

            {/* Options de sécurité avec état réel */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Chiffres (0-9)</span>
                <button
                  onClick={() => setPasswordSettings(prev => ({ ...prev, numbers: !prev.numbers }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    passwordSettings.numbers ? 'bg-[#2DD4BF]' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transform transition-transform ${
                    passwordSettings.numbers ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Majuscules (A-Z)</span>
                <button
                  onClick={() => setPasswordSettings(prev => ({ ...prev, uppercase: !prev.uppercase }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    passwordSettings.uppercase ? 'bg-[#2DD4BF]' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transform transition-transform ${
                    passwordSettings.uppercase ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Caractères spéciaux (@&!)</span>
                <button
                  onClick={() => setPasswordSettings(prev => ({ ...prev, specialChars: !prev.specialChars }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    passwordSettings.specialChars ? 'bg-[#2DD4BF]' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transform transition-transform ${
                    passwordSettings.specialChars ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>

            {/* Bouton de confirmation */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-[#2DD4BF] text-white rounded-lg hover:bg-[#26C0AE] transition-colors mt-8"
            >
              Confirmer le mot de passe
            </button>
          </div>

          {/* Conseil de sécurité */}
          <div className="mt-6 text-center">
            <div className="text-[#2DD4BF] mb-2">Conseil de sécurité</div>
            <ul className="text-sm space-y-1 text-gray-400">
              <li>Changer le mot de passe pour chaque identifiant.</li>
              <li>Créer des mots de passe complexes et aléatoires.</li>
              <li>Associer régulièrement vos mots de passe</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPasswordPanel;
