
import { providers } from 'ethers';

import { currentProvider } from 'contracts/contract-instance';

interface TokenParams {
  address: string;
  symbol: string;
  decimals: number | string;
  image?: string;
}

export async function requestAddErc20 (
  { address, symbol, decimals, image }: TokenParams
) {
  if (currentProvider instanceof providers.Web3Provider) {
    return currentProvider.send('wallet_watchAsset', {
      /* @ts-ignore: Ethers type error */
      type: 'ERC20',
      options: {
        address,
        symbol,
        decimals,
        image: image!,
      },
    });
  }
}
