import { getStableCoinInstance } from 'contracts/contract-instance';

import { fromWei } from 'func/balance';
import ErrorHandler from 'func/ErrorHandler';
import { uintPerSecondToPerYearNumber } from 'func/useful';

export function getSavingBalanceDetailsHelper (balanceDetails) {
  const interestRate = balanceDetails?.interestRate ? uintPerSecondToPerYearNumber(balanceDetails.interestRate) : 0;
  const currentBalance = balanceDetails?.currentBalance ? fromWei(balanceDetails.currentBalance) : 0;
  const estimatedInterest = currentBalance * ((interestRate) / 100);

  return {
    interestRate,
    currentBalance,
    estimatedInterest
  };
}

export async function addQUSDTokenToWallet () {
  try {
    const contract = await getStableCoinInstance();
    const [decimals, symbol] = await Promise.all([
      contract.instance.methods.decimals().call(),
      contract.instance.methods.symbol().call(),
    ]);
    const type = 'ERC20';
    if ('ethereum' in window && window?.ethereum) {
      const response = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type,
          options: {
            address: contract.address,
            symbol,
            decimals,
          },
        },
      });
      return response;
    }
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    return null;
  }
}
