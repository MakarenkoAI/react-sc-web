import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/App';
import { Provider } from 'react-redux';
import { store } from '@store/index';
import { TLanguage } from 'ostis-ui-lib';
import { LanguageProvider } from '@components/Language/LanguageProvider';

const element = document.getElementById('root')!;
const root = createRoot(element);

const getDefaultLanguage = () => {
  const langInLocalStorage = localStorage.getItem('language') as TLanguage;
  const defaultLang = window.navigator.language === 'ru-RU' ? 'ru' : 'en';

  return langInLocalStorage || defaultLang;
};

root.render(
  <StrictMode>
    <LanguageProvider defaultLanguage={getDefaultLanguage()}>
      <Provider store={store}>
        <App />
      </Provider>
    </LanguageProvider>
  </StrictMode>,
);
