import { WalletType } from 'connectors';

import {
  chainIds,
  dAppUrls,
  explorerUrls,
  featureFlags,
  gnosisSafeUrls,
  indexersUrls,
  networks,
  PARAMS,
  qBridgeUrls,
} from 'constants/config';

export const getProvider = (ethereum, selectedWallet = WalletType.INJECTED) => {
  if (!ethereum.providers?.length) {
    return ethereum;
  }
  let provider;
  switch (selectedWallet) {
    case WalletType.COINBASE:
      provider = ethereum.providers.find(
        ({ isCoinbaseWallet, isCoinbaseBrowser }) => isCoinbaseWallet || isCoinbaseBrowser
      );
      break;
    case WalletType.INJECTED:
      provider = ethereum.providers.find(({ isMetaMask }) => isMetaMask);
      break;
    default: {
      provider = ethereum.providers[0];
    }
  }

  if (provider) {
    ethereum.setSelectedProvider(provider);
  }
  return provider;
};

export const getChainId = async (provider) => {
  const chainId = await new Promise((resolve) => {
    /* Fix issue with first Metamask launch. */
    const timeout = setTimeout(() => {
      window.location.reload();
    }, 5000);
    provider.request({ method: 'net_version' }).then((netId) => {
      clearTimeout(timeout);
      resolve(netId);
    });
  });
  return chainId;
};

export const getParametersDependsOnUrl = () => {
  const parameters = PARAMS[window.location.origin];
  return parameters || PARAMS['https://hq.qtestnet.org'];
};

export const isDevnetdApp = () => {
  const url = window.location.origin;
  if (dAppUrls[chainIds.mainnet] !== url && dAppUrls[chainIds.testnet] !== url) {
    return true;
  }
  return false;
};

export const getIndexerUrlDependsOnChainId = (chainId) => {
  const network = networks[chainId];
  return network ? indexersUrls[network] : getParametersDependsOnUrl().indexer;
};

export const getExplorerUrlByChainId = (chainId) => {
  const network = networks[chainId];
  return network ? explorerUrls[network] : getParametersDependsOnUrl().explorer;
};

export const getGnosisSafeUrlByChainId = (chainId) => {
  const network = networks[chainId];
  return network ? gnosisSafeUrls[network] : getParametersDependsOnUrl().gnosisSafe;
};

export const getQBridgeUrlByChainId = (chainId) => {
  const network = networks[chainId];
  return network ? qBridgeUrls[network] : getParametersDependsOnUrl().qBridge;
};

export const isFeatureEnabled = (feature, chainId) => {
  const networkParams = featureFlags[networks[chainId]];
  return networkParams?.[feature] ?? false;
};
