import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { fromWei } from 'web3-utils';

import ProgressBar from 'components/Base/ProgressBar';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import AliasTooltip from 'components/Tooltips/AliasTooltip';
import InfoTooltip from 'components/Tooltips/InfoTooltip';
import Table, { TableColumn } from 'ui/Table';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { getValidatorMembers } from 'store/validators/action-creators';
import {
  loadingValidatorsWidenedSelector,
  validatorsWidenedSelector,
} from 'store/validators/selectors';

import { TABLE_TYPES } from 'constants/tableTypes';
import { formatAsset, parseNumber } from 'utils/numbers';

function ValidatorsTable () {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { indexerUrl } = useNetworkConfig();

  const validators = useSelector(validatorsWidenedSelector);
  const tableLoading = useSelector(loadingValidatorsWidenedSelector);

  useEffect(() => {
    dispatch(getValidatorMembers(TABLE_TYPES.validatorsWidened, indexerUrl));
  }, [dispatch]);

  const columns: TableColumn[] = [
    {
      headerStyle: () => ({ minWidth: '110px', cursor: 'pointer' }),
      dataField: 'rank',
      text: t('RANK'),
      sort: true,
    },
    {
      headerStyle: () => ({ minWidth: '200px' }),
      dataField: 'validator',
      text: 'Address',
      filterValue: cell => cell.props.children[0].props.address,
    },
    {
      headerStyle: () => ({ minWidth: '230px', cursor: 'pointer' }),
      dataField: 'amount',
      text: t('TOTAL_ACCOUNTABLE_STAKE'),
      sort: true,
      sortFunc: (a, b, order) => order === 'desc'
        ? parseNumber(b) - parseNumber(a)
        : parseNumber(a) - parseNumber(b),
    },
    {
      headerStyle: () => ({ minWidth: '110px', cursor: 'pointer' }),
      dataField: 'selfStake',
      text: t('SELF_STAKE'),
      sort: true,
      sortFunc: (a, b, order) => order === 'desc'
        ? parseNumber(b) - parseNumber(a)
        : parseNumber(a) - parseNumber(b),
    },
    {
      headerStyle: () => ({ minWidth: '175px', cursor: 'pointer' }),
      dataField: 'delegatedStake',
      text: t('DELEGATED_STAKE'),
      sort: true,
      sortFunc: (a, b, order) => order === 'desc'
        ? parseNumber(b) - parseNumber(a)
        : parseNumber(a) - parseNumber(b),
    },
    {
      headerStyle: () => ({ minWidth: '215px', cursor: 'pointer' }),
      dataField: 'delegationSaturation',
      text: t('DELEGATION_SATURATION'),
      sort: true,
      sortFunc: (a, b, order) => order === 'desc'
        ? parseNumber(b) - parseNumber(a)
        : parseNumber(a) - parseNumber(b),
    },
  ];

  return (
    <Table
      header={(
        <h2 className="text-h2">
          <span>{t('VALIDATOR_RANKING')}</span>
          <InfoTooltip topic="validator-ranking" />
        </h2>
      )}
      perPage={20}
      columns={columns}
      emptyTableMessage={t('NO_VALIDATORS')}
      loading={tableLoading}
      table={validators.map((validator: any, idx: number) => ({
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
      }))}
    />
  );
}

export default ValidatorsTable;
