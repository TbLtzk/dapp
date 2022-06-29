import ProgressBar from 'components/Base/ProgressBar';
import Tooltip from 'components/Base/Tooltip';
import AliasTooltip from 'components/Custom/AliasTooltip';
import ExplorerAddress from 'components/Custom/ExplorerAddress';

import { fromWei } from 'func/balance';
import { fN } from 'func/useful';

export const tableValidatorsShort = (tableArray) =>
  tableArray.map((validator, idx) => ({
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
    amount: fN(validator.amount) + ' Q',
  }));

export const tableValidatorsMonitoring = (tableArray) =>
  tableArray.map((validator, idx) => ({
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
    amount: fN(validator.amount) + ' Q',
    lastBlock: validator.lastBlock,
    timestamp: <Tooltip additionalInfo={validator.timestamp}>{validator.monthDayYear}</Tooltip>,
    average: validator.average,
  }));

export const tableValidatorsWidened = (tableArray) =>
  tableArray.map((validator, idx) => ({
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
    validator2: validator.validator,
    amount: fN(fromWei(validator.amount)) + ' Q',
    selfStake: fN(validator.selfStake) + ' Q',
    delegatedStake: fN(validator.delegatedStake) + ' Q',
    delegationSaturation: <ProgressBar value={fN(validator.delegationSaturation)} />,
  }));
