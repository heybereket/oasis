import React, { createContext, useContext, useEffect, useState } from 'react';
import { ILanguage } from './BaseLanguage';
import en from './en';
import es from './es';

export const languages: ILanguage[] = [en, es];

export const defaultLanguage = en;

export interface ILanguageContext {
  currentLanguage: ILanguage;
  languages: ILanguage[];
  setLanguage: (lang: ILanguage) => void;
}

const defaultValue: ILanguageContext = {
  currentLanguage: defaultLanguage,
  languages,
  setLanguage: () => {},
};

export const LanguageContext = createContext<ILanguageContext>(defaultValue);

type Props = {
  value?: ILanguageContext;
};

const getNavLang = () => {
  try {
    if (navigator.language) {
      console.log(navigator.language.split('-')[0]);
      return navigator.language.split('-')[0];
    } else {
      return 'en';
    }
  } catch {
    return 'en';
  }
};

export const LanguageProvider: React.FC<Props> = ({ value, children }) => {
  const [language, setLanguage] = useState<ILanguage>(en);

  useEffect(() => {
    const langCode = getNavLang();
    setLanguage(
      languages.find((lang) => lang.langCode === langCode) ?? defaultLanguage
    );
  }, [setLanguage]);

  return (
    <LanguageContext.Provider
      value={
        value ?? { ...defaultValue, currentLanguage: language, setLanguage }
      }
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslations = () => {
  const ctx = useContext(LanguageContext);
  return (translationGetter: (language: ILanguage) => string) => {
    const lang = ctx.currentLanguage;
    return translationGetter(lang);
  };
};

export const useSetLanguage = () => {
  const ctx = useContext(LanguageContext);

  return (language: ILanguage) => {
    ctx.setLanguage(language);
  };
};
