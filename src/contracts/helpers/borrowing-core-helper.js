import { getStableCoinInstance } from 'contracts/contract-instance'

export async function addCoinsToMetamask () {
  const getAddressQUSD = await getStableCoinInstance()
  const tokenAddressQUSD = getAddressQUSD.address
  const tokenSymbolQUSD = 'QUSD'
  const tokenAddressQBTC = '0x1115Ab7257e47Ef97Ea0E8254E999a8be8981952' // cannot find in SDK
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
