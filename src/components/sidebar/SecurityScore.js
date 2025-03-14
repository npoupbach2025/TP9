import React from 'react';

const SecurityScore = ({ score }) => {
  const circumference = 2 * Math.PI * 38; // r=38
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-24 h-24 mx-auto mb-6">
      {/* Background circle */}
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="48"
          cy="48"
          r="38"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-700"
        />
        {/* Progress circle */}
        <circle
          cx="48"
          cy="48"
          r="38"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-accent"
          strokeLinecap="round"
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 0.5s ease-in-out',
          }}
        />
      </svg>
      {/* Score text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{score}%</span>
        <span className="text-xs text-gray-400">Sécurité</span>
      </div>
    </div>
  );
};

export default SecurityScore;
