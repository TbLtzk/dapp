import { AddressWithBalance, AliasPurpose, StakeDelegationInfo } from '@q-dev/q-js-sdk';
import { DelegationEfficiency } from '@q-dev/q-js-sdk/lib/utils/validator-metrics';

export interface Validator extends DelegationEfficiency, AddressWithBalance {
  totalStake: string;
  rank: number;
  alias: string;
  address: string;
  selfStake: string;
  timestamp: string;
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
}

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
  rank?: number;
  alias?: string;
  address: string;
  amount: string | number;
  lastBlock: string | number;
  timestamp: string;
  average: string;
  monthDayYear: string;
  lastBlockValidated: string;
}
