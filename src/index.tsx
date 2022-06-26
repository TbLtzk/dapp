import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import {
  coinbaseWallet,
  coinbaseWalletHooks,
  metaMask,
  metaMaskHooks,
  network,
  networkHooks,
  walletConnect,
  walletConnectHooks,
} from 'connectors';
import LanguageProvider from 'i18n';

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

const connectors: [MetaMask | WalletConnect | CoinbaseWallet | Network, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [coinbaseWallet, coinbaseWalletHooks],
  [network, networkHooks],
];
console.log(connectors);
ReactDOM.render(
  <Provider store={store}>
    <Web3ReactProvider connectors={connectors}>
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
