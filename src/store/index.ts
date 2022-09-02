import { useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import aliases from './aliases/reducer';
import auctions from './auctions/reducer';
import borrowAssets from './borrow-assets/reducer';
import borrowingCore from './borrowing-core/reducer';
import experts from './experts/reducer';
import parameters from './parameters/reducer';
import proposals from './proposals/reducer';
import qVault from './q-vault/reducer';
import rootNodes from './root-nodes/reducer';
import savingAssets from './saving-assets/reducer';
import systemBalance from './system-balance/reducer';
import tokenomics from './tokenomics/reducer';
import transaction from './transaction/reducer';
import user from './user/reducer';
import validationRewards from './validation-rewards/reducer';
import validators from './validators/reducer';
import vesting from './vesting/reducer';

export const store = configureStore({
  reducer: {
    user,
    rootNodes,
    qVault,
    vesting,
    borrowingCore,
    borrowAssets,
    savingAssets,
    aliases,
    tokenomics,
    proposals,
    auctions,
    transaction,
    experts,
    validators,
    validationRewards,
    systemBalance,
    parameters,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export function useAppSelector<T> (selector: (state: AppState) => T) {
  return useSelector(selector);
}

export function getState () {
  return store.getState();
}

export function getUserAddress () {
  return getState().user.address;
}
