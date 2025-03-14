import React, { useState } from 'react';

const PasswordGenerator = ({ onPasswordGenerated }) => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    numbers: true,
    uppercase: true,
    special: true
  });

  const generatePassword = () => {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) chars += '0123456789';
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.special) chars += '@#$%^&*()_+-=[]{}|;:,.<>?';

    let generatedPassword = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      generatedPassword += chars[array[i] % chars.length];
    }

    setPassword(generatedPassword);
    if (onPasswordGenerated) {
      onPasswordGenerated(generatedPassword);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Générateur de mot de passe</h3>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-400">Longueur</label>
            <span className="text-sm text-gray-400">{length} caractères</span>
          </div>
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-400">Chiffres (0-9)</label>
            <button
              onClick={() => setOptions({ ...options, numbers: !options.numbers })}
              className={`relative w-10 h-6 transition-colors duration-200 ease-in-out rounded-full ${
                options.numbers ? 'bg-accent' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transition-transform duration-200 ease-in-out transform bg-white rounded-full ${
                  options.numbers ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-400">Majuscules (A-Z)</label>
            <button
              onClick={() => setOptions({ ...options, uppercase: !options.uppercase })}
              className={`relative w-10 h-6 transition-colors duration-200 ease-in-out rounded-full ${
                options.uppercase ? 'bg-accent' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transition-transform duration-200 ease-in-out transform bg-white rounded-full ${
                  options.uppercase ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-400">Caractères spéciaux (@&!#$%^*)</label>
            <button
              onClick={() => setOptions({ ...options, special: !options.special })}
              className={`relative w-10 h-6 transition-colors duration-200 ease-in-out rounded-full ${
                options.special ? 'bg-accent' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block w-4 h-4 transition-transform duration-200 ease-in-out transform bg-white rounded-full ${
                  options.special ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={generatePassword}
          className="w-full bg-accent hover:bg-accent/90 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Générer un mot de passe
        </button>

        {password && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-white font-mono">{password}</span>
              <button
                onClick={() => navigator.clipboard.writeText(password)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;
