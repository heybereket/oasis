import React from 'react';
import { useTranslation } from 'react-i18next';
import en from '../../locales/en';
import { languages, useSetLanguage } from '../../locales/LocalesProvider';

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLang = useSetLanguage();

  const handleLanguageChanged = ({ target: { value } }: any) => {
    changeLang(languages.find((val) => val.langCode === value) ?? en);
  };

  return (
    <select
      className="language-selector"
      value={i18n.language}
      onChange={handleLanguageChanged}
    >
      {languages.map((lang) => (
        <option key={lang.langCode} value={lang.langCode}>
          {lang.langName}
        </option>
      ))}
    </select>
  );
};
