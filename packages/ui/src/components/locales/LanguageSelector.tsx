import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSelector = () => {
  const languages = [
    { value: 'en', label: '🇺🇸 English' },
    { value: 'es', label: '🇨🇴 Español' },
  ];
  const { i18n } = useTranslation();

  const handleLanguageChanged = ({ target: { value } }: any) => {
    i18n.changeLanguage(value);
  };

  return (
    <select className="language-selector" value={i18n.language} onChange={handleLanguageChanged}>
      {languages.map(lang => (
        <option key={lang.value} value={lang.value}>{lang.label}</option>
      ))}
    </select>
  );
};
