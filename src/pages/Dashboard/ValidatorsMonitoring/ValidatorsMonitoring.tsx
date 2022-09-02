
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import PageLayout from 'components/PageLayout';
import AliasTooltip from 'components/Tooltips/AliasTooltip';
import Table, { TableColumn } from 'ui/Table';
import Tooltip from 'ui/Tooltip';

import useNetworkConfig from 'hooks/useNetworkConfig';

import DashboardLink from '../components/DashboardLink';

import { useValidators } from 'store/validators/hooks';

import { formatAsset } from 'utils/numbers';

const StyledWrapper = styled.div`
  .table-header {
    display: none;
  }

  .validator-address {
    display: flex;
  }
`;

function ValidatorsMonitoring () {
  const { t } = useTranslation();
  const { indexerUrl } = useNetworkConfig();
  const {
    validatorsMonitoring,
    validatorsMonitoringLoading,
    loadMonitoringValidators
  } = useValidators();

  useEffect(() => {
    loadMonitoringValidators(indexerUrl);
    const monitoringInterval = setInterval(() => {
      loadMonitoringValidators(indexerUrl);
    }, 60_000);

    return () => clearInterval(monitoringInterval);
  }, []);

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
    },
    {
      headerStyle: () => ({ minWidth: '200px', cursor: 'pointer' }),
      dataField: 'lastBlock',
      text: t('LAST_BLOCK_VALIDATED'),
      sort: true,
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
    },
  ];

  return (
    <StyledWrapper>
      <DashboardLink />
      <PageLayout title={t('VALIDATORS_MONITORING')}>
        <Table
          emptyTableMessage={t('NO_VALIDATORS')}
          perPage={20}
          loading={validatorsMonitoringLoading}
          columns={columns}
          table={validatorsMonitoring.map((validator) => ({
            id: validator.address,
            rank: validator.rank,
            validator: (
              <div className="validator-address">
                <ExplorerAddress
                  short
                  iconed
                  semibold
                  address={validator.address}
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
