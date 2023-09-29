import { useSelector } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import aliases from './aliases/reducer';
import auctions from './auctions/reducer';
import borrowing from './borrowing/reducer';
import constitution from './constitution/reducer';
import experts from './experts/reducer';
import parameters from './parameters/reducer';
import proposals from './proposals/reducer';
import qVault from './q-vault/reducer';
import rootNodes from './root-nodes/reducer';
import saving from './saving/reducer';
import serverConfig from './server-config/reducer';
import systemBalance from './system-balance/reducer';
import tokenomics from './tokenomics/reducer';
import transaction from './transaction/reducer';
import validationRewards from './validation-rewards/reducer';
import validators from './validators/reducer';

export const store = configureStore({
  reducer: {
    rootNodes,
    qVault,
    borrowing,
    saving,
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
    constitution,
    serverConfig
  },
});

export type AppState = ReturnType<typeof store.getState>;

export function useAppSelector<T> (selector: (state: AppState) => T) {
  return useSelector(selector);
}

export function getState () {
  return store.getState();
}
