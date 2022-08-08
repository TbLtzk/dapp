import { SavingBalanceDetails } from '@q-dev/q-js-sdk';

import { getStableCoinInstance } from 'contracts/contract-instance';

import { fromWei } from 'utils/balance';
import { captureError } from 'utils/errors';
import { uintPerSecondToPerYearNumber } from 'utils/useful';

export function getSavingBalanceDetailsHelper (balanceDetails: SavingBalanceDetails) {
  const interestRate = balanceDetails?.interestRate
    ? uintPerSecondToPerYearNumber(balanceDetails.interestRate)
    : 0;
  const currentBalance = balanceDetails?.currentBalance
    ? fromWei(balanceDetails.currentBalance)
    : 0;

  return {
    interestRate,
    currentBalance,
    estimatedInterest: Number(currentBalance) * Number(interestRate) / 100
  };
}

export async function addQUSDTokenToWallet () {
  try {
    const contract = await getStableCoinInstance();
    const [decimals, symbol] = await Promise.all([
      contract.instance.methods.decimals().call(),
      contract.instance.methods.symbol().call(),
    ]);

    if ('ethereum' in window && window?.ethereum) {
      return window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: contract.address,
            symbol,
            decimals,
          },
        },
      });
    }
  } catch (error) {
    captureError(error);
    return null;
  }
}
