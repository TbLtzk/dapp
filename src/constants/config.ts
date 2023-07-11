import { Chain, CHAIN_TYPES } from '@distributedlab/w3p';
import { utils } from 'ethers';
import { Asset, StablecoinAsset } from 'typings/defi';

export type NetworkName = 'mainnet' | 'testnet' | 'devnet';

interface NetworkConfig {
  chainId: number;
  name: string;
  networkName: NetworkName;
  dAppUrl: string;
  rpcUrl: string;
  indexerUrl: string;
  explorerUrl: string;
  gnosisSafeUrl: string;
  qBridgeUrl: string;
  docsUrl: string;
  constitutionUrl: string;
  collaterals: Asset[];
  stablecoins: StablecoinAsset[];
  gasBuffer: number;
  featureFlags: {
    aliases: boolean;
    rootNodesMetrics: boolean;
  };
}

export const networkConfigsMap: Record<NetworkName, NetworkConfig> = {
  mainnet: {
    chainId: 35441,
    name: 'Q Mainnet',
    networkName: 'mainnet',
    dAppUrl: 'https://hq.q.org',
    rpcUrl: 'https://rpc.q.org',
    indexerUrl: 'https://indexer.q.org',
    explorerUrl: 'https://explorer.q.org',
    gnosisSafeUrl: 'https://multisig-ui.q.org',
    qBridgeUrl: 'https://bridge.q.org',
    docsUrl: 'https://docs.q.org',
    constitutionUrl: 'https://constitution.q.org',
    collaterals: ['QBTC'],
    stablecoins: ['QUSD'],
    gasBuffer: 1.5,
    featureFlags: { aliases: true, rootNodesMetrics: false },
  },
  testnet: {
    chainId: 35443,
    name: 'Q Testnet',
    networkName: 'testnet',
    dAppUrl: 'https://hq.qtestnet.org',
    rpcUrl: 'https://rpc.qtestnet.org',
    indexerUrl: 'https://indexer.qtestnet.org',
    explorerUrl: 'https://explorer.qtestnet.org',
    gnosisSafeUrl: 'https://multisig.qtestnet.org',
    qBridgeUrl: 'https://bridge.qtestnet.org',
    docsUrl: 'https://docs.qtestnet.org',
    constitutionUrl: 'https://constitution.qtestnet.org',
    collaterals: ['QBTC', 'QUSDC', 'QDAI', 'QVNXAU'],
    stablecoins: ['QUSD'],
    gasBuffer: 2,
    featureFlags: { aliases: true, rootNodesMetrics: false },
  },
  devnet: {
    chainId: 35442,
    name: 'Q Devnet',
    networkName: 'devnet',
    dAppUrl: 'https://hq.qdevnet.org',
    rpcUrl: 'https://rpc.qdevnet.org',
    indexerUrl: 'https://indexer.qdevnet.org',
    explorerUrl: 'https://explorer.qdevnet.org',
    gnosisSafeUrl: 'https://multisig.qdevnet.org',
    qBridgeUrl: 'https://bridge.qdevnet.org',
    docsUrl: 'https://docs.qtestnet.org',
    constitutionUrl: 'https://constitution.qdevnet.org',
    collaterals: ['QBTC', 'QUSDC', 'QDAI', 'QVNXAU'],
    stablecoins: ['QUSD', 'QEUR'],
    gasBuffer: 1.5,
    featureFlags: { aliases: true, rootNodesMetrics: true },
  },
};

export const chainIdToNetworkMap: { [key: string]: NetworkName } = {
  35441: 'mainnet',
  35442: 'devnet',
  35443: 'testnet',
};

export const connectorParametersMap = Object.values(networkConfigsMap)
  .reduce<{ [key: number]: Chain }>((acc, config) => {
  acc[config.chainId] = {
    id: utils.hexlify(config.chainId),
    name: config.name,
    rpcUrl: config.rpcUrl,
    explorerUrl: config.explorerUrl,
    token: {
      name: 'Q',
      // HACK: MetaMask requires the symbol to have at least 2 characters
      symbol: 'Q ',
      decimals: 18,
    },
    type: CHAIN_TYPES.EVM,
    icon: ''
  };
  return acc;
}, {});

const originToNetworkMap: { [key: string]: NetworkName } = {
  'https://hq.q.org': 'mainnet',
  'https://hq.qtestnet.org': 'testnet',
  'https://hq.qdevnet.org': 'devnet',
  'http://localhost:3000': 'devnet',
};

export const ORIGIN_NETWORK_NAME: NetworkName = originToNetworkMap[window.location.origin] || 'devnet';
