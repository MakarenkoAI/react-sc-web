import { ILangContext, ILanguageProviderProps } from "@model/lang";
import { PropsWithChildren, createContext, useContext, useMemo, useState } from "react";

export const LanguageContext = createContext<ILangContext>({} as ILangContext);

export const useLanguageContext = () => useContext(LanguageContext);

export const LanguageProvider = ({
  children,
  defaultLanguage,
}: PropsWithChildren<ILanguageProviderProps>) => {
  const [lang, setLang] = useState(defaultLanguage);

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
