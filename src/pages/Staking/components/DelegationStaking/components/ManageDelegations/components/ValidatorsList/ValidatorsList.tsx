import { useTranslation } from 'react-i18next';

import ProgressBar from 'components/Base/ProgressBar';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Table from 'components/Table';
import AliasTooltip from 'components/Tooltips/AliasTooltip';

import DelegateModal from '../../../DelegateModal';

import { useValidators } from 'store/validators/hooks';

import { formatAsset, formatPercent } from 'utils/numbers';

function ValidatorsList () {
  const { t } = useTranslation();
  const { validatorStats, validatorStatsLoading } = useValidators();

  return (
    <Table
      emptyTableMessage={t('NO_VALIDATORS')}
      perPage={1000}
      loading={validatorStatsLoading}
      columns={[
        {
          headerStyle: () => ({ minWidth: '190px' }),
          dataField: 'validator',
          text: t('ADDRESS'),
          filterValue: (cell) => cell.props.children[0].props.address,
        },
        {
          headerStyle: () => ({ cursor: 'pointer', minWidth: '200px' }),
          dataField: 'totalDelegatedStake',
          text: t('TOTAL_DELEGATED_STAKE'),
          sort: true,
        },
        {
          headerStyle: () => ({ cursor: 'pointer', minWidth: '170px' }),
          dataField: 'delegatorsShare',
          text: t('DELEGATOR_SHARE'),
          sort: true,
        },
        {
          dataField: 'delegationSaturation',
          text: t('DELEGATION_SATURATION'),
        },
        {
          dataField: 'chooseValidator',
          text: '',
        },
      ]}
      table={validatorStats.map((validator) => ({
        id: validator.address,
        rank: validator.rank,
        validator: (
          <div style={{ display: 'flex' }}>
            <ExplorerAddress
              short
              iconed
              semibold
              address={validator.address}
            />
            <AliasTooltip alias={validator.alias} />
          </div>
        ),
        totalDelegatedStake: formatAsset(validator.delegatedStake, 'Q'),
        delegatorsShare: formatPercent(validator.delegatorsShare),
        delegationSaturation: <ProgressBar value={validator.delegationSaturation} />,
        chooseValidator: <DelegateModal type="validator-select" delegation={validator}/>,
      }))}
    />
  );
}

export default ValidatorsList;
