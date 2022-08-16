
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import PageLayout from 'components/PageLayout';
import AliasTooltip from 'components/Tooltips/AliasTooltip';
import Table, { TableColumn } from 'ui/Table';
import Tooltip from 'ui/Tooltip';

import useNetworkConfig from 'hooks/useNetworkConfig';

import DashboardLink from '../components/DashboardLink';

import { getValidatorMembers } from 'store/validators/action-creators';
import {
  loadingValidatorsMonitoringSelector,
  validatorsMonitoringSelector,
} from 'store/validators/selectors';

import { TABLE_TYPES } from 'constants/tableTypes';
import { formatAsset, parseNumber } from 'utils/numbers';

const StyledWrapper = styled.div`
  .table-header {
    display: none;
  }

  .validator-address {
    display: flex;
  }
`;

function ValidatorsMonitoring () {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { indexerUrl } = useNetworkConfig();

  const validators = useSelector(validatorsMonitoringSelector);
  const loading = useSelector(loadingValidatorsMonitoringSelector);

  useEffect(() => {
    dispatch(getValidatorMembers(TABLE_TYPES.validatorsMonitoring, indexerUrl));

    const monitoringInterval = setInterval(() => {
      dispatch(getValidatorMembers(TABLE_TYPES.validatorsMonitoring, indexerUrl));
    }, 60000);

    return () => clearInterval(monitoringInterval);
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
      text: t('VALIDATOR_ADDRESS'),
      filterValue: cell => cell.props.children[0].props.address,
    },
    {
      headerStyle: () => ({ minWidth: '212px', cursor: 'pointer' }),
      dataField: 'amount',
      text: t('TOTAL_ACCOUNTABLE_STAKE'),
      sort: true,
      sortFunc: (a, b, order) => order === 'desc'
        ? parseNumber(b) - parseNumber(a)
        : parseNumber(a) - parseNumber(b),
    },
    {
      headerStyle: () => ({ minWidth: '200px', cursor: 'pointer' }),
      dataField: 'lastBlock',
      text: t('LAST_BLOCK_VALIDATED'),
      sort: true,
      sortFunc: (a, b, order) => order === 'desc'
        ? parseNumber(b) - parseNumber(a)
        : parseNumber(a) - parseNumber(b),
    },
    {
      headerStyle: () => ({ minWidth: '200px' }),
      dataField: 'timestamp',
      text: t('TIMESTAMP_OF_LAST_BLOCK_VALIDATED'),
    },
    {
      headerStyle: () => ({ minWidth: '210px', cursor: 'pointer' }),
      dataField: 'average',
      text: t('AVERAGE_AVAILABILITY_LAST_1000_BLOCKS_CYCLES'),
      sort: true,
      sortFunc: (a, b, order) => order === 'desc'
        ? parseNumber(b) - parseNumber(a)
        : parseNumber(a) - parseNumber(b),
    },
  ];

  return (
    <StyledWrapper>
      <DashboardLink />
      <PageLayout title={t('VALIDATORS_MONITORING')}>
        <Table
          emptyTableMessage={t('NO_VALIDATORS')}
          perPage={20}
          loading={loading}
          columns={columns}
          table={validators.map((validator: any, i: number) => ({
            id: i,
            rank: i + 1,
            validator: (
              <div className="validator-address">
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
          }))}
        />
      </PageLayout>
    </StyledWrapper>
  );
}

export default ValidatorsMonitoring;
