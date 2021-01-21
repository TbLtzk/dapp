import { BigNumber } from 'bignumber.js';
import LiquidationAuction from '../src/auction/LiquidationAuction';
import SystemDebtAuction from '../src/auction/SystemDebtAuction';
import SystemSurplusAuction from '../src/auction/SystemSurplusAuction';

export const maxApproveAmount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

export const getPastAuctionsIds = (auctionArr) => {
  return auctionArr?.map(evt => {
    // return {}
    return {
      user: evt.returnValues._user,
      vaultId: evt.returnValues._vaultId
    };
  });
};

export const getStatusTransformation = (statusId) => {
  const status = ['None', 'Active', 'Closed'];
  return status[Number(statusId)];
};

export const bn = (number) => {
  return new BigNumber(number);
};

export function creationLiquidationContractObj() {
  return new LiquidationAuction('LiquidationAuction');
}

export function creationSystemDebtContractObj() {
  return new SystemDebtAuction('SystemDebtAuction');
}

export function creationSystemSurplusContractObj() {
  return new SystemSurplusAuction('SystemSurplusAuction');
}
