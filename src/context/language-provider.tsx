'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fa';

type LanguageProviderProps = {
  children: React.ReactNode;
};

type LanguageProviderState = {
  language: Language;
  toggleLanguage: () => void;
};

const LanguageProviderContext = createContext<LanguageProviderState | undefined>(undefined);

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language | null;
    const browserLanguage = navigator.language.split('-')[0];
    
    if (storedLanguage) {
      setLanguage(storedLanguage);
    } else if (browserLanguage === 'fa') {
      setLanguage('fa');
    } else {
      setLanguage('en');
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    localStorage.setItem('language', language);
    if(language === 'fa') {
      document.body.classList.add('font-persian');
    } else {
      document.body.classList.remove('font-persian');
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLanguage => (prevLanguage === 'en' ? 'fa' : 'en'));
  };

  const value = { language, toggleLanguage };

  return (
    <LanguageProviderContext.Provider value={value}>
      {children}
    </LanguageProviderContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
