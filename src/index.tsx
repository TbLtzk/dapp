import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { StyleProvider } from '@q-dev/q-ui-kit';
import { BigNumber } from '@q-dev/utils';
import LanguageProvider from 'context/LanguageProvider';
import Web3ContextProvider from 'context/Web3ContextProvider';

import AppInitializer from 'components/AppInitializer';
import Layout from 'components/Layout';
import NotificationManager from 'components/NotificationManager';
import Routes from 'navigation/Routes';

import { store } from './store';

import '@mdi/font/css/materialdesignicons.min.css';

// Prevents BigNumber from using exponential notation
BigNumber.config({ EXPONENTIAL_AT: 1e9 });

ReactDOM.render(
  <StyleProvider>
    <LanguageProvider>
      <Web3ContextProvider>
        <Provider store={store}>
          <AppInitializer>
            <BrowserRouter>
              <Layout>
                <Routes />
              </Layout>
            </BrowserRouter>
          </AppInitializer>
          <NotificationManager />
        </Provider>
      </Web3ContextProvider>
    </LanguageProvider>
  </StyleProvider>,
  document.getElementById('root')
);
