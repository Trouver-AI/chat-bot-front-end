import React from 'react';

const ThemeSelector = ({ onSelectColor, isSmall = false }) => {
  const colors = [
    { value: '#0fffc1', name: 'Neon Green' },
    { value: '#00a6ff', name: 'Neon Blue' },
    { value: '#bd00ff', name: 'Neon Purple' }
  ];

  return (
    <div className={`theme-selector ${isSmall ? 'small' : ''}`}>
      {!isSmall && <p>Choose your theme color:</p>}
      <div className="color-options">
        {colors.map(color => (
          <button 
            key={color.value}
            className="color-option"
            style={{ backgroundColor: color.value }}
            onClick={() => onSelectColor(color.value)}
            title={color.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;