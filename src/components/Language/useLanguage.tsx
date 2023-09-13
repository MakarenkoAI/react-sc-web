import { useContext } from 'react';
import { LanguageContext } from './LanguageProvider';

export const useLanguage = () => {
  const { lang } = useContext(LanguageContext);

  return lang;
};
