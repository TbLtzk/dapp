
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import PageLayout from 'components/PageLayout';
import Table from 'components/Table';
import AliasTooltip from 'components/Tooltips/AliasTooltip';

import useNetworkConfig from 'hooks/useNetworkConfig';

import DashboardLink from '../components/DashboardLink';

import MetricTooltip from './components/MetricTooltip';

import { useValidators } from 'store/validators/hooks';

import { formatDate, formatDateRelative } from 'utils/date';
import { formatAsset, formatNumber, formatPercent } from 'utils/numbers';

const StyledWrapper = styled.div`
  .table-header {
    display: none;
  }

  .validator-address {
    display: flex;
  }

  .metric-cell {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

function ValidatorsMonitoring () {
  const { t, i18n } = useTranslation();
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

  return (
    <StyledWrapper>
      <DashboardLink />
      <PageLayout title={t('VALIDATORS_MONITORING')}>
        <Table
          emptyTableMessage={t('NO_VALIDATORS')}
          keyField="address"
          perPage={20}
          searchFormatted={false}
          loading={validatorsMonitoringLoading}
          table={validatorsMonitoring}
          columns={[
            {
              headerStyle: () => ({ minWidth: '110px', cursor: 'pointer' }),
              dataField: 'rank',
              text: t('RANK'),
              sort: true,
            },
            {
              headerStyle: () => ({ minWidth: '200px' }),
              dataField: 'address',
              text: t('VALIDATOR_ADDRESS'),
              formatter: (cell, row) => (
                <div className="validator-address">
                  <ExplorerAddress
                    short
                    iconed
                    semibold
                    address={cell}
                  />
                  <AliasTooltip alias={row.alias} />
                </div>
              )
            },
            {
              headerStyle: () => ({ minWidth: '212px', cursor: 'pointer' }),
              dataField: 'balance',
              text: t('TOTAL_ACCOUNTABLE_STAKE'),
              sort: true,
              formatter: (cell) => formatAsset(cell, 'Q'),
            },
            {
              headerStyle: () => ({ minWidth: '200px', cursor: 'pointer' }),
              dataField: 'lastBlock',
              text: t('LAST_BLOCK_VALIDATED'),
              sort: true,
              formatter: (cell, row) => (
                <>
                  <p className="font-semibold">{cell ? formatNumber(cell) : 'n/a'}</p>
                  {' '}
                  <p className="color-secondary text-sm" title={formatDate(row.timestamp, i18n.language)}>
                    ({formatDateRelative(row.timestamp, i18n.language)})
                  </p>
                </>
              )
            },
            {
              headerStyle: () => ({ minWidth: '180px', cursor: 'pointer' }),
              dataField: 'availability1000Cycles',
              text: t('AVG_AVAILABILITY_CYCLES', { cycles: 1000 }),
              formatter: (cell, row) => (
                <div className="metric-cell">
                  <span>{formatPercent(cell)}</span>
                  <MetricTooltip metric={row.metric1000} />
                </div>
              ),
              sort: true,
            },
            {
              headerStyle: () => ({ minWidth: '180px', cursor: 'pointer' }),
              dataField: 'availability20Cycles',
              text: t('AVG_AVAILABILITY_CYCLES', { cycles: 20 }),
              formatter: (cell, row) => (
                <div className="metric-cell">
                  <span>{formatPercent(cell)}</span>
                  <MetricTooltip metric={row.metric20} />
                </div>
              ),
              sort: true,
            },
          ]}
        />
      </PageLayout>
    </StyledWrapper>
  );
}

export default ValidatorsMonitoring;
