import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector } from '@web3-react/core';
import { EMPTY, Empty } from '@web3-react/empty';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { Url } from '@web3-react/url';
import { WalletConnect } from '@web3-react/walletconnect';

export const [coinbaseWallet, coinbaseWalletHooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        url: '',
      },
    })
);

export const [empty, emptyHooks] = initializeConnector<Empty>(() => EMPTY);

export const [metaMask, metaMaskHooks] = initializeConnector<MetaMask>((actions) => new MetaMask({ actions }));

export const [network, networkHooks] = initializeConnector<Network>((actions) => new Network({ actions, urlMap: '' }));

export const [url, urlHooks] = initializeConnector<Url>((actions) => new Url({ actions, url: '' }));

export const [walletConnect, walletConnectHooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        rpc: '',
      },
    })
);
