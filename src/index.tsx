import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import LanguageProvider from 'i18n';

import LoadingMetaMask from 'components/Custom/LoadingMetaMask';

import { store } from './store';

import 'assets/fonts/fonts.css';
import 'bootstrap/dist/css/bootstrap.min.css';

Sentry.init({
  dsn: 'https://55eac6f20f434cc2b23b93499ac31111@o1170264.ingest.sentry.io/6263659',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  enabled: process.env.NODE_ENV !== 'development',
});

ReactDOM.render(
  <Provider store={store}>
    <LanguageProvider>
      <BrowserRouter>
        <LoadingMetaMask />
      </BrowserRouter>
    </LanguageProvider>
  </Provider>,

  document.getElementById('root')
);
