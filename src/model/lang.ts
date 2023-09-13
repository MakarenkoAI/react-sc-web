import { Dispatch, SetStateAction } from 'react';

export type TLanguage = 'ru' | 'en';

export interface ILangContext {
  lang: TLanguage;
  setLang: Dispatch<SetStateAction<TLanguage>>;
}

export interface ILanguageProviderProps {
  defaultLanguage: TLanguage;
}
