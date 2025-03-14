import React from 'react';

const SecurityScore = () => {
  const score = 93; // Score de sécurité (à connecter plus tard avec le backend)

  return (
    <div className="text-white">
      <div className="relative w-32 h-32 mx-auto mb-4">
        {/* Cercle de fond */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="#262A35"
            strokeWidth="8"
            fill="none"
          />
        </svg>
        
        {/* Cercle de progression */}
        <svg className="w-full h-full transform -rotate-90 absolute top-0 left-0">
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="#2DD4BF"
            strokeWidth="8"
            fill="none"
            strokeDasharray="377"
            strokeDashoffset={(377 * (100 - score)) / 100}
            className="transition-all duration-1000"
          />
        </svg>
        
        {/* Texte central */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-[#2DD4BF]">{score}%</span>
          <span className="text-[#2DD4BF] text-sm">Excellent</span>
        </div>
      </div>

      {/* Bouton d'ajout */}
      <button className="w-full bg-[#2DD4BF] text-black font-medium py-2 px-4 rounded-lg hover:bg-[#26C0AE] transition-colors">
        Ajouter un élément
      </button>
    </div>
  );
};

export default SecurityScore;
