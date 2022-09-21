import { AddressWithBalance, AliasPurpose, StakeDelegationInfo, ValidatorMetric } from '@q-dev/q-js-sdk';
import { DelegationEfficiency } from '@q-dev/q-js-sdk/lib/utils/validator-metrics';

export interface Delegation extends StakeDelegationInfo {
  validator: string;
  actualStake: string;
  idealStake: string;
  normalizedStake: string;
  claimableReward: string;
  delegatorsShare: string;
}

export interface AliasEvent {
  event: string;
  address: string;
  alias: string;
  role: AliasPurpose;
}

export interface ValidatorMonitoring {
  address: string;
  lastBlock: number;
  timestamp: number;
  metric20?: ValidatorMetric;
  metric1000?: ValidatorMetric;
  availability20Cycles: number;
  availability1000Cycles: number;
}

export interface Validator extends DelegationEfficiency, AddressWithBalance, ValidatorMonitoring {
  totalStake: string;
  rank: number;
  alias: string;
  address: string;
  selfStake: string;
  timestamp: number;
  average: string;
  monthDayYear: string;
  amount: string | number;
  lastBlockValidated: string;
  isActiveValidator: boolean;
  lastBlock: string | number;
  delegationSaturation: string;
  delegatedStake: string;
  delegatorsShare: number | string;
  validatorShare: number;
  validatorPoolBalance: string;
  poolinterestRate: number;
  payoutToDelegators: string;
  payoutPerDelegatedQ: string;
  distributableDelegatorsRewards: number;
  reservedForClaims: number;
  lastUpdateOfCompoundRate: string;
}
