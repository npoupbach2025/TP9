import React from 'react';

const SecurityIcon = ({ level }) => {
  const color = level === 'Fort' ? 'text-green-400' : level === 'Moyen' ? 'text-yellow-400' : 'text-red-400';
  return (
    <div className="flex items-center space-x-2 min-w-[140px]">
      <svg className={`w-5 h-5 ${color} shrink-0`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7V12C3 16.97 7.02 21.5 12 22C16.98 21.5 21 16.97 21 12V7L12 2Z" fill="currentColor"/>
      </svg>
      <span className={`text-sm ${color} whitespace-nowrap`}>
        Mot de passe : {level}
      </span>
    </div>
  );
};

export default SecurityIcon;
