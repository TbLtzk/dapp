import { AliasPurpose, StakeDelegationInfo, ValidatorInfo, ValidatorMetric } from '@q-dev/q-js-sdk';
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

export interface ValidatorMetricStats extends DelegationEfficiency {
  address: string;
  delegationSaturation: string;
}

export interface ValidatorStatsInfo extends ValidatorInfo {
  reservedForClaims: number;
  delegatorsShare: number;
  validatorShare: number;
  validatorPoolBalance: string;
  distributableDelegatorsRewards: number;
  poolinterestRate: number;
}

export interface ValidatorStats {
  poolInfo: ValidatorStatsInfo;
  metric?: ValidatorMetricStats;
  address: string;
  alias: string;
  rank: number;
  payoutPerDelegatedQ: string;
}

export interface ValidatorPoolInfo {
  totalStake: string;
  selfStake: string;
  delegatedStake: string;
  validatorShare: number;
  validatorPoolBalance: string;
  distributableDelegatorsRewards: number;
  poolinterestRate: number;
  delegatorsShare: number;
  lastUpdateOfCompoundRate: string;
  reservedForClaims: number;
}

export interface Validator {
  metric?: ValidatorMetricStats;
  poolInfo: ValidatorPoolInfo;
  monitoring: ValidatorMonitoring;
  address: string;
  alias: string;
  rank: number;
  isActiveValidator: boolean;
  payoutPerDelegatedQ: string;
}

export type ValidatorStatus = 'active' | 'standby' | 'backup' | 'not-ranking' | 'inactive';

export interface ValidatorLegend {
  title: string;
  status: ValidatorStatus;
};
