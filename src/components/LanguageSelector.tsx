import React from 'react';
import '../style/LanguageSelector.css';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const languages = [
    { value: 'en', label: '🇺🇸 English' },
    { value: 'es', label: '🇨🇴 Español' },
    { value: 'fr', label: '🇫🇷 Français' },
  ];
  const { i18n } = useTranslation();

  const handleLanguageChanged = ({target: {value}}: any) => {
    i18n.changeLanguage(value);
  }

  return (
    <select className="language-selector" value={i18n.language} onChange={handleLanguageChanged}>
      {languages.map(lang => (
        <option key={lang.value} value={lang.value}>{lang.label}</option>
      ))}
    </select>
  );
}

export default LanguageSelector;