export const testnetDocsUrl = 'https://docs.qtestnet.org'
export const mainnetDocsUrl = 'https://docs.q.org'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const networks = {
  35443: 'testnet',
  35442: 'devnet',
  35441: 'mainnet'
}

export const indexersUrls = {
  devnet: 'http://35.161.73.158:4000',
  mainnet: 'https://indexer.q.org',
  testnet: 'https://indexer.qtestnet.org'
}

export const URLS = {
  'http://localhost:3000': {
    id: 'testnet',
    name: 'Testnet',
    chainId: 35443,
    webSocket: 'ws://18.158.7.68:8546',
    rpc: 'https://rpc.qtestnet.org',
    indexer: indexersUrls.testnet
  },
  'not possible because of http (not https)': {
    id: 'devnet',
    name: 'Devnet',
    chainId: 35442,
    webSocket: 'ws://35.161.73.158:8546',
    rpc: 'http://35.161.73.158:8545',
    indexer: indexersUrls.devnet
  },
  'http://35.161.73.158:8000': {
    id: 'testnet',
    name: 'Testnet',
    chainId: 35443,
    webSocket: 'ws://18.158.7.68:8546',
    rpc: 'https://rpc.qtestnet.org',
    indexer: indexersUrls.testnet
  },
  'https://hq.qtestnet.org': {
    id: 'testnet',
    name: 'Testnet',
    chainId: 35443,
    webSocket: 'ws://18.158.7.68:8546',
    rpc: 'https://rpc.qtestnet.org',
    indexer: indexersUrls.testnet
  },
  'https://hq.q.org': {
    id: 'mainnet',
    name: 'Mainnet',
    chainId: 35441,
    webSocket: 'wss://rpc-ws.q.org',
    rpc: 'https://rpc.q.org',
    indexer: indexersUrls.mainnet
  }
}

export const networkParameters = {
  devnet: {
    chainId: '0x8a72',
    chainName: 'Q Devnet',
    rpcUrls: ['http://35.161.73.158:8545'],
    blockExplorerUrls: ['http://52.35.57.176:8080/'],
    nativeCurrency: {
      name: 'Q ',
      symbol: 'Q ',
      decimals: 18
    }
  },
  testnet: {
    chainId: '0x8a73',
    chainName: 'Q Testnet',
    rpcUrls: ['https://rpc.qtestnet.org'],
    blockExplorerUrls: ['https://explorer.qtestnet.org/'],
    nativeCurrency: {
      name: 'Q ',
      symbol: 'Q ',
      decimals: 18
    }
  },
  mainnet: {
    chainId: '0x8a71',
    chainName: 'Q Mainnet',
    rpcUrls: ['https://rpc.q.org'],
    blockExplorerUrls: ['https://explorer.q.org'],
    nativeCurrency: {
      name: 'Q ',
      symbol: 'Q ',
      decimals: 18
    }
  }
}
