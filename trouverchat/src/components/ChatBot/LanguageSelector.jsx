import React from 'react';

const LanguageSelector = ({ onSelectLanguage }) => {
  const languages = [
    { code: 'English', name: 'English' },
    { code: 'French', name: 'Français' },
    { code: 'Swahili', name: 'Kiswahili' },
    { code: 'Zulu', name: 'isiZulu' },
    { code: 'Yoruba', name: 'Yorùbá' },
    { code: 'Shona', name: 'chiShona' }
  ];

  return (
    <div className="language-buttons">
      {languages.map(language => (
        <button
          key={language.code}
          className="language-button"
          onClick={() => onSelectLanguage(language.code)}
        >
          {language.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;