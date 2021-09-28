export async function addCoins () {
  const tokenAddressQUSD = '0xdC98b08363f3BfC73195dc6b532e39C51EC3c3bC'
  const tokenSymbolQUSD = 'QUSD'
  const tokenAddressQBTC = '0x1115Ab7257e47Ef97Ea0E8254E999a8be8981952'
  const tokenSymbolQBTC = 'QBTC'
  const tokenDecimals = 18

  const QUSD = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddressQUSD,
        symbol: tokenSymbolQUSD,
        decimals: tokenDecimals
      }
    }
  })
  const QBTC = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddressQBTC,
        symbol: tokenSymbolQBTC,
        decimals: tokenDecimals
      }
    }
  })
  return Promise.all([await QUSD, await QBTC])
}
