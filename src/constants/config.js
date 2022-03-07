export const networks = {
  35443: 'Testnet',
  35442: 'Devnet',
  35441: 'Mainnet'
}

export const URLS = {
  'http://35.161.73.158:8000': {
    name: 'TestNet',
    chainId: 35443,
    webSocket: 'ws://18.158.7.68:8546',
    rpc: 'https://rpc.qtestnet.org'
  },
  'not possible because http (not https)': {
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
  'http://localhost:3000': {
    name: 'TestNet',
    chainId: 35443,
    webSocket: 'ws://18.158.7.68:8546',
    rpc: 'https://rpc.qtestnet.org'
  },
  mainnet: {
    name: 'MainNet',
    chainId: '',
    webSocket: 'ws://18.156.146.204:8546',
    rpc: ''
  }
}

export const networkParameters = {
  DevNet: {
    chainId: '0x8a72',
    chainName: 'Q DevNet',
    rpcUrls: ['http://35.161.73.158:8545'],
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
    nativeCurrency: {
      name: 'Q ',
      symbol: 'Q ',
      decimals: 18
    }
  },
  MainNet: {
    chainId: '',
    chainName: 'Q MainNet',
    rpcUrls: [''],
    nativeCurrency: {
      name: 'Q ',
      symbol: 'Q ',
      decimals: 18
    }
  }
}
