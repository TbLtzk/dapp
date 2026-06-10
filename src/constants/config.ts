import { Chain, CHAIN_TYPES } from '@distributedlab/w3p';
import { utils } from 'ethers';
import { Asset, StablecoinAsset } from 'typings/defi';

export type NetworkName = 'mainnet' | 'testnet' | 'devnet';

interface NetworkConfig {
  chainId: number;
  name: string;
  networkName: NetworkName;
  qTicker: string;
  dAppUrl: string;
  rpcUrl: string;
  indexerUrl: string;
  explorerUrl: string;
  gnosisSafeUrl: string;
  gnosisSafeChainPrefix: string;
  qBridgeUrl: string;
  docsUrl: string;
  constitutionUrl: string;
  serverConfigUrl: string;
  daoSubgraph: string;
  collaterals: Asset[];
  stablecoins: StablecoinAsset[];
  gasBuffer: number;
  featureFlags: {
    aliases: boolean;
    rootNodesMetrics: boolean;
    genericContractRegistryVoting: boolean;
  };
}

export const networkConfigsMap: Record<NetworkName, NetworkConfig> = {
  mainnet: {
    chainId: 35441,
    name: 'QGOV Mainnet',
    networkName: 'mainnet',
    qTicker: 'QGOV',
    dAppUrl: 'https://hq.qgov.io',
    rpcUrl: 'https://rpc.qgov.io',
    indexerUrl: 'https://indexer.qgov.io',
    explorerUrl: 'https://explorer.qgov.io',
    gnosisSafeUrl: 'https://multisig-ui.qgov.io',
    gnosisSafeChainPrefix: 'qgov',
    qBridgeUrl: 'https://bridge.qgov.io',
    docsUrl: 'https://docs.qgov.io',
    constitutionUrl: 'https://constitution.qgov.io',
    serverConfigUrl: 'https://hq-config.qgov.io',
    daoSubgraph: 'https://httpgraph.qgov.io/subgraphs/name/dao-connector-graph',
    collaterals: ['QBTC', 'QUSDC', 'QDAI'],
    stablecoins: ['QUSD'],
    gasBuffer: 1.5,
    featureFlags: {
      aliases: true,
      rootNodesMetrics: true,
      genericContractRegistryVoting: false,
    },
  },
  testnet: {
    chainId: 35443,
    name: 'QGOV Testnet',
    networkName: 'testnet',
    qTicker: 'Q',
    dAppUrl: 'https://hq.qgov-test.io',
    rpcUrl: 'https://rpc.qgov-test.io',
    indexerUrl: 'https://indexer.qgov-test.io',
    explorerUrl: 'https://explorer.qgov-test.io',
    gnosisSafeUrl: 'https://multisig-ui.qgov-test.io',
    gnosisSafeChainPrefix: 'qgov-test',
    qBridgeUrl: 'https://bridge.qgov-test.io',
    docsUrl: 'https://docs.qgov-test.io',
    constitutionUrl: 'https://constitution.qgov-test.io',
    serverConfigUrl: 'https://hq-config.qgov.io',
    daoSubgraph: 'https://httpgraph.qgov-test.io/subgraphs/name/dao-connector-graph',
    collaterals: ['QBTC', 'QUSDC', 'QDAI', 'QVNXAU'],
    stablecoins: ['QUSD'],
    gasBuffer: 2,
    featureFlags: {
      aliases: true,
      rootNodesMetrics: true,
      genericContractRegistryVoting: true,
    },
  },
  devnet: {
    chainId: 35442,
    name: 'QGOV Devnet',
    networkName: 'devnet',
    qTicker: 'Q',
    dAppUrl: 'https://hq.qdevnet.org',
    rpcUrl: 'https://rpc.qdevnet.org',
    indexerUrl: 'https://indexer.qdevnet.org',
    explorerUrl: 'https://explorer.qdevnet.org',
    gnosisSafeUrl: 'https://multisig.qdevnet.org',
    gnosisSafeChainPrefix: 'qgov-dev',
    qBridgeUrl: 'https://bridge.qdevnet.org',
    docsUrl: 'https://docs.qgov-test.io',
    constitutionUrl: 'https://constitution.qdevnet.org',
    serverConfigUrl: 'https://hq-config.qgov.io',
    daoSubgraph: 'https://httpgraph.qdevnet.org/subgraphs/name/dao-connector-graph',
    collaterals: ['QBTC', 'QUSDC', 'QDAI', 'QVNXAU'],
    stablecoins: ['QUSD', 'QEUR'],
    gasBuffer: 1.5,
    featureFlags: {
      aliases: true,
      rootNodesMetrics: true,
      genericContractRegistryVoting: true,
    },
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
      name: config.qTicker,
      // HACK: MetaMask requires the symbol to have at least 2 characters
      symbol: config.qTicker.length > 1
        ? config.qTicker
        : `${config.qTicker} `,
      decimals: 18,
    },
    type: CHAIN_TYPES.EVM,
    icon: ''
  };
  return acc;
}, {});

const originToNetworkMap: { [key: string]: NetworkName } = {
  'https://hq.q.org': 'mainnet',
  'https://hq.qgov.io': 'mainnet',
  'https://hq.qtestnet.org': 'testnet',
  'https://hq.qgov-test.io': 'testnet',
  'http://localhost:3000': 'testnet',
};

export const ORIGIN_NETWORK_NAME: NetworkName = originToNetworkMap[window.location.origin] || 'testnet';
