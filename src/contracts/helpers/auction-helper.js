import LiquidationAuction from './liquidation-auction-helper'
import SystemDebtAuction from './system-debt-auction-helper'
import SystemSurplusAuction from './system-surplus-auction-helper'

export const getPastAuctionsIds = (auctionArr) => {
  return auctionArr?.map((evt) => {
    return {
      user: evt.returnValues._user,
      vaultId: evt.returnValues._vaultId
    }
  })
}

export const getStatusTransformation = (statusId) => {
  const status = ['None', 'Active', 'Closed']
  return status[Number(statusId)]
}

export function creationLiquidationContractObj () {
  return new LiquidationAuction()
}

export function creationSystemDebtContractObj () {
  return new SystemDebtAuction()
}

export function creationSystemSurplusContractObj () {
  return new SystemSurplusAuction()
}
