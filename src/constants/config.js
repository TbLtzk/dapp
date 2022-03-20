export const testnetDocsUrl = 'https://docs.qtestnet.org'
export const mainnetDocsUrl = 'https://docs.q.org'

export const networks = {
  35444: 'Localnet',
  35443: 'Testnet',
  35442: 'Devnet',
  35441: 'Mainnet'
}
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const URLS = {
  'http://35.161.73.158:8000': {
    name: 'TestNet',
    chainId: 35443,
    webSocket: 'ws://18.158.7.68:8546',
    rpc: 'https://rpc.qtestnet.org'
  },
  'http://localhost:3000': {
    name: 'TestNet',
    chainId: 35443,
    webSocket: 'ws://18.158.7.68:8546',
    rpc: 'https://rpc.qtestnet.org'
  },
  'not possible because of http (not https)': {
    name: 'DevNet',
    chainId: 35442,
    webSocket: 'ws://35.161.73.158:8546',
    rpc: 'http://35.161.73.158:8545'
  },
  'https://hq.qtestnet.org': {
    name: 'TestNet',
    chainId: 35443,
    webSocket: 'ws://18.158.7.68:8546',
    rpc: 'https://rpc.qtestnet.org'
  },
  'https://hq.q.org': {
    name: 'MainNet',
    chainId: 35441,
    webSocket: 'wss://rpc-ws.q.org',
    rpc: 'https://rpc.q.org'
  }
}

export const networkParameters = {
  DevNet: {
    chainId: '0x8a72',
    chainName: 'Q DevNet',
    rpcUrls: ['http://35.161.73.158:8545'],
    blockExplorerUrls: ['http://52.35.57.176:8080/'],
    nativeCurrency: {
      name: 'Q ',
      symbol: 'Q ',
      decimals: 18
    }
  },
  TestNet: {
    chainId: '0x8a73',
    chainName: 'Q TestNet',
    rpcUrls: ['https://rpc.qtestnet.org'],
    blockExplorerUrls: ['https://explorer.qtestnet.org/'],
    nativeCurrency: {
      name: 'Q ',
      symbol: 'Q ',
      decimals: 18
    }
  },
  MainNet: {
    chainId: '0x8a71',
    chainName: 'Q MainNet',
    rpcUrls: ['https://rpc.q.org'],
    blockExplorerUrls: ['https://explorer.q.org'],
    nativeCurrency: {
      name: 'Q ',
      symbol: 'Q ',
      decimals: 18
    }
  }
}
