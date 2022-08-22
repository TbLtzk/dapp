import { fromWei } from 'web3-utils';

import * as actionTypes from './action-types';

const DEFAULT_POOL_INFO = {
  aggregatedNormalizedStake: '0',
  compoundRate: '0',
  delegatedStake: '0',
  delegatorsShare: '0',
  lastUpdateOfCompoundRate: '0',
  poolBalance: '0',
  reservedForClaims: '0',
};

const initialState = {
  poolInfo: DEFAULT_POOL_INFO,
  poolBalance: 0,
  delegatorsShare: 0,
  validatorShare: 0,
  lastUpdateOfCompoundRate: 0,
};

export default function index (state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_VRP_POOL_INFO_SUCCESS:
      return {
        ...state,
        poolInfo: { ...action.poolInfo, poolBalance: fromWei(action.poolInfo.poolBalance) },
      };
    case actionTypes.GET_VRP_DELEGATORS_SHARE_SUCCESS:
      return {
        ...state,
        delegatorsShare: action.delegatorsShare,
        validatorShare: action.delegatorsShare ? 100 - action.delegatorsShare : 100,
      };

    case actionTypes.GET_VRP_BALANCE_SUCCESS:
      return {
        ...state,
        poolBalance: action.poolBalance,
      };
    case actionTypes.GET_VRP_LAST_UPDATE_OF_COMPOUND_RATE_SUCCESS:
      return {
        ...state,
        lastUpdateOfCompoundRate: action.lastUpdateOfCompoundRate,
      };
    default:
      return state;
  }
}
