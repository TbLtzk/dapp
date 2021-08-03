import detectEthereumProvider from '@metamask/detect-provider'

export async function detectMetamask () {
  try {
    const provider = await detectEthereumProvider()
    if (!provider) {
      throw new Error('Please install MetaMask!')
    }
    if (provider) {
      return provider
    }
  } catch (e) {
    console.error('e', e)
    throw new Error('Please install MetaMask!')
  }
}
