import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const metamask = new InjectedConnector({
  supportedChainIds: [35442, 35441, 35443],
});

const coinbase = new WalletLinkConnector({
  url: 'https://rpc.qtestnet.org',
  appName: 'Your HQ',
});

const walletLink = new WalletConnectConnector({
  rpcUrl: 'https://rpc.qtestnet.org',
  qrcode: true,
});

export const connectors = {
  metamask,
  walletLink,
  coinbase,
};
