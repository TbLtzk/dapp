import { AbstractConnector } from '@web3-react/abstract-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
// import { getNetworkConfig, getSupportedChainIds } from 'src/utils/marketsAndNetworksConfig';

export enum WalletType {
  INJECTED = 'INJECTED',
  WALLET_CONNECT = 'WALLET_CONNECT',
  WALLET_LINK = 'WALLET_LINK',
}

const APP_NAME = 'Your HQ';
const APP_LOGO_URL = '/logo.png';

export const getWallet = (wallet: WalletType, chainId: number | undefined): AbstractConnector => {
  // const supportedChainIds = getSupportedChainIds();
  const rpc = 'https://rpc.qtestnet.org';
  console.log(chainId);
  // const networkConfig = getNetworkConfig(chainId);

  switch (wallet) {
    case WalletType.INJECTED:
      return new InjectedConnector({});
    case WalletType.WALLET_LINK:
      return new WalletLinkConnector({
        appName: APP_NAME,
        appLogoUrl: APP_LOGO_URL,
        url: rpc
      });
    case WalletType.WALLET_CONNECT:
      return new WalletConnectConnector({
        rpc: rpc,
        // bridge: 'https://aave.bridge.walletconnect.org',
        qrcode: true,
      });
    default: {
      throw new Error('unsupported wallet');
    }
  }
};
