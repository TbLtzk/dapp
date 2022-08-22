import { AddressWithBalance } from '@q-dev/q-js-sdk';
import { DelegationEfficiency } from '@q-dev/q-js-sdk/lib/utils/validator-metrics';

interface Validator extends DelegationEfficiency, AddressWithBalance {
  totalStake: string;
  rank: number;
  alias: string;
  address: string;
  selfStake: string;
  timestamp: string,
  average: string,
  monthDayYear: string,
  amount: string | number;
  lastBlockValidated: string,
  isActiveValidator: boolean;
  lastBlock: string | number,
  delegationSaturation: string;
  delegatedStake: string;
  delegatorShare: number | string;
  validatorShare: number;
  validatorPoolBalance: string;
  poolinterestRate: number;
  payoutToDelegators: string;
  payoutPerDelegatedQ: string;
}
