import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@components/App';
import { Provider } from 'react-redux';
import { store } from '@store/index';

const element = document.getElementById('root')!;
const root = createRoot(element);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
