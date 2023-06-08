import { SavingBalanceDetails } from '@q-dev/q-js-sdk';
import { calculateInterestRate } from '@q-dev/utils';
import { ErrorHandler, requestAddErc20 } from 'helpers';

import { getStableCoinInstance } from 'contracts/contract-instance';

import { fromWei } from 'utils/web3';

export function getSavingBalanceDetailsHelper (balanceDetails: SavingBalanceDetails) {
  const interestRate = calculateInterestRate(Number(balanceDetails.interestRate));
  const currentBalance = fromWei(balanceDetails.currentBalance);

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
      contract.decimals(),
      contract.symbol(),
    ]);

    await requestAddErc20({
      address: contract.address,
      symbol,
      decimals,
    });
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
    return null;
  }
}
