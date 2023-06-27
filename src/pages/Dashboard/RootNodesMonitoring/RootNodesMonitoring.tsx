
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { formatAsset } from '@q-dev/utils';
import styled from 'styled-components';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import PageLayout from 'components/PageLayout';
import Table, { TableColumn } from 'components/Table';
import AliasTooltip from 'components/Tooltips/AliasTooltip';

import useNetworkConfig from 'hooks/useNetworkConfig';

import DashboardLink from '../components/DashboardLink';

import RootNodeMetricTooltip from './components/RootNodeMetricTooltip';

import { useRootNodes } from 'store/root-nodes/hooks';

import { formatDateRelative } from 'utils/date';

const StyledWrapper = styled.div`
  .table-header {
    display: none;
  }

  .root-nodes-monitoring__metric {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

function RootNodesMonitoring () {
  const { t, i18n } = useTranslation();
  const { rootMembers, rootMembersLoading, getRootMembers } = useRootNodes();
  const { featureFlags } = useNetworkConfig();

  useEffect(() => {
    getRootMembers();
  }, []);

  const columns: TableColumn[] = [
    {
      headerStyle: () => ({ minWidth: '180px' }),
      dataField: 'address',
      text: t('ROOT_NODE_ADDRESS'),
      formatter: (cell, row) => (
        <div style={{ display: 'flex' }}>
          <ExplorerAddress
            short
            iconed
            semibold
            address={cell}
          />
          <AliasTooltip isRootNode alias={row.alias} />
        </div>
      ),
    },
    {
      headerStyle: () => ({ minWidth: '160px', cursor: 'pointer' }),
      dataField: 'amount',
      text: t('STAKED_AMOUNT'),
      sort: true,
      formatter: (cell) => formatAsset(cell, 'Q'),
    },
    {
      headerStyle: () => ({ minWidth: '160px', cursor: 'pointer' }),
      dataField: 'date',
      hidden: !featureFlags.rootNodesMetrics,
      text: t('JOIN_TIME'),
      sort: true,
      formatter: (cell, row) => (
        <div className="root-nodes-monitoring__metric">
          <span>{formatDateRelative(cell * 1000, i18n.language)}</span>
          {row.metric && <RootNodeMetricTooltip metric={row.metric} />}
        </div>
      ),
    },
    {
      headerStyle: () => ({ minWidth: '190px' }),
      dataField: 'offChain',
      text: t('LAST_OFF-CHAIN_ACTIVITY'),
    },
    {
      headerStyle: () => ({ minWidth: '190px' }),
      dataField: 'onChain',
      text: t('LAST_ON-CHAIN_ACTIVITY'),
    },
  ];

  return (
    <StyledWrapper>
      <DashboardLink />
      <PageLayout title={t('ROOT_NODES_MONITORING')}>
        <Table
          perPage={20}
          columns={columns}
          loading={rootMembersLoading}
          emptyTableMessage={t('ROOT_NODES_LIST_EMPTY')}
          keyField="address"
          searchFormatted={false}
          table={rootMembers.map((rootNode) => ({
            address: rootNode.address,
            amount: rootNode.stakeAmount,
            offChain: 'n/a',
            onChain: 'n/a',
            alias: rootNode.alias,
            date: rootNode.metric?.attributes.startTime,
            metric: rootNode.metric,
          }))}
        />
      </PageLayout>
    </StyledWrapper>
  );
}

export default RootNodesMonitoring;
