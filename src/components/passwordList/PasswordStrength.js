import React from 'react';

const strengthColors = {
  strong: 'bg-accent',
  medium: 'bg-orange-500',
  weak: 'bg-red-500'
};

const strengthLabels = {
  strong: 'Fort',
  medium: 'Moyen',
  weak: 'Faible'
};

const PasswordStrength = ({ strength }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className={`h-2 w-2 rounded-full ${strengthColors[strength]}`} />
      <span className={`text-sm ${strength === 'weak' ? 'text-red-500' : strength === 'medium' ? 'text-orange-500' : 'text-accent'}`}>
        {strengthLabels[strength]}
      </span>
    </div>
  );
};

export default PasswordStrength;
