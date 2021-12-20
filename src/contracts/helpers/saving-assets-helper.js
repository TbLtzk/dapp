import { fromWei } from 'func/balance'
import { uintPerSecondToPerYearNumber } from 'func/useful'

export function getSavingBalanceDetailsHelper (balanceDetails) {
  const interestRate = balanceDetails?.interestRate ? uintPerSecondToPerYearNumber(balanceDetails.interestRate) : 0
  const currentBalance = balanceDetails?.currentBalance ? fromWei(balanceDetails.currentBalance) : 0
  const estimatedInterest = currentBalance * ((1 + interestRate) / 100)

  return {
    interestRate,
    currentBalance,
    estimatedInterest
  }
}
