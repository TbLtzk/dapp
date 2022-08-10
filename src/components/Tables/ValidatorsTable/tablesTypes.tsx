import { fromWei } from 'web3-utils';

import ProgressBar from 'components/Base/ProgressBar';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import AliasTooltip from 'components/Tooltips/AliasTooltip';
import Tooltip from 'ui/Tooltip';

import { formatAsset } from 'utils/numbers';

export const tableValidatorsShort = (tableArray: any) =>
  tableArray.map((validator: any, idx: number) => ({
    id: idx,
    rank: idx + 1,
    validator: (
      <div style={{ display: 'flex' }}>
        <ExplorerAddress
          short
          iconed
          semibold
          address={validator.validator}
        />
        <AliasTooltip alias={validator.alias} />
      </div>
    ),
    amount: formatAsset(validator.amount, 'Q'),
  }));

export const tableValidatorsMonitoring = (tableArray: any) =>
  tableArray.map((validator: any, idx: number) => ({
    id: idx,
    rank: idx + 1,
    validator: (
      <div style={{ display: 'flex' }}>
        <ExplorerAddress
          short
          iconed
          semibold
          address={validator.validator}
        />
        <AliasTooltip alias={validator.alias} />
      </div>
    ),
    amount: formatAsset(validator.amount, 'Q'),
    lastBlock: validator.lastBlock,
    timestamp: <Tooltip trigger={validator.monthDayYear}>{validator.timestamp}</Tooltip>,
    average: validator.average,
  }));

export const tableValidatorsWidened = (tableArray: any) =>
  tableArray.map((validator: any, idx: number) => ({
    id: idx,
    rank: validator.rank,
    validator: (
      <div style={{ display: 'flex' }}>
        <ExplorerAddress
          short
          iconed
          semibold
          address={validator.validator}
        />
        <AliasTooltip alias={validator.alias} />
      </div>
    ),
    amount: formatAsset(fromWei(validator.amount), 'Q'),
    selfStake: formatAsset(validator.selfStake, 'Q'),
    delegatedStake: formatAsset(validator.delegatedStake, 'Q'),
    delegationSaturation: <ProgressBar value={validator.delegationSaturation} />,
  }));
