import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/App';
import { Provider } from 'react-redux';
import { store } from '@store/index';
import {
  LanguageProvider,
  ClientProvider,
  ScUtilsProvider,
  TLanguage,
  ToastProvider,
} from 'ostis-ui-lib';

import './assets/styles/index.scss';
import { client } from './api';
import { BrowserRouter } from 'react-router-dom';
import { BASE_PATH } from '@constants';

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
        <BrowserRouter basename={BASE_PATH}>
          <ClientProvider client={client}>
            <ScUtilsProvider>
              <ToastProvider>
                <App />
              </ToastProvider>
            </ScUtilsProvider>
          </ClientProvider>
        </BrowserRouter>
      </Provider>
    </LanguageProvider>
  </StrictMode>,
);
