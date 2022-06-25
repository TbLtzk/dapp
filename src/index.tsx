import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { Web3ReactProvider } from '@web3-react/core';
import LanguageProvider from 'i18n';
import Web3 from 'web3';

import Web3ContextProvider from 'components/Custom/Web3ContextProvider';
import Routes from 'navigation/Routes';

import { store } from './store';

import 'assets/fonts/fonts.css';
import 'bootstrap/dist/css/bootstrap.min.css';

Sentry.init({
  dsn: 'https://55eac6f20f434cc2b23b93499ac31111@o1170264.ingest.sentry.io/6263659',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  enabled: import.meta.env.NODE_ENV !== 'development',
});

function getWeb3Library(provider: any): Web3 {
  const library = new Web3(provider);
  return library;
}

ReactDOM.render(
  <Provider store={store}>
    <Web3ReactProvider getLibrary={getWeb3Library}>
      <Web3ContextProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </LanguageProvider>
      </Web3ContextProvider>
    </Web3ReactProvider>
  </Provider>,
  document.getElementById('root')
);
