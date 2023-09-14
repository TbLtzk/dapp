
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Table, { TableColumn } from 'components/Table';
import AliasTooltip from 'components/Tooltips/AliasTooltip';

import { useRootNodesMonitoringContext } from '../../RootNodesMonitoringContext';
import {
  getCosignatureStats,
  getCosignatureStatus,
  getL0ApprovalStatus,
  getL0MembershipStatus,
  getVotingParticipationStats,
} from '../helpers/table-collect-data';
import {
  cosignatureStatsSortFunc,
  cosignatureStatusSortFunc,
  l0ApprovalStatusSortFunc,
  l0MembershipStatusSortFunc,
  votingParticipationStatsSortFunc,
} from '../helpers/table-sorting';

import CosignatureStatsColumn from './CosignatureStatsColumn';
import CosignatureStatusColumn from './CosignatureStatusColumn';
import L0ApprovalStatusColumn from './L0ApprovalStatusColumn';
import L0MembershipStatusColumn from './L0MembershipStatusColumn';
import RootNodeMetricTooltip from './RootNodeMetricTooltip';
import VotingParticipationStatsColumn from './VotingParticipationStatsColumn';

import { useRootNodes } from 'store/root-nodes/hooks';

import { formatDateRelative } from 'utils/date';

const StyledTable = styled(Table)`
  .table tr td {
    padding: 10px;

    &:first-child {
      padding-left: 24px;
    }
  }
`;

const DateColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

function RootNodesMonitoringTable () {
  const { t, i18n } = useTranslation();
  const { rootMembers } = useRootNodes();
  const {
    rootNodesL0Active,
    rootNodesL0Proposed,
    rootNodesExclusionActive,
    rootNodesExclusionProposed,
    latestCosignatureMetrics,
    cosignatureMetrics20,
    cosignatureMetrics1000,
    qTHVotingsStats,
    votingsStats,
    proposalsStats,
  } = useRootNodesMonitoringContext();

  const rootMembersMonitoring = rootMembers.map((rootNode) => {
    const l0MembershipStatus = getL0MembershipStatus({
      address: rootNode.address,
      rootNodesL0Active,
      rootNodesL0Proposed,
    });
    const { l0ApprovalStatus, listsSigned } = getL0ApprovalStatus({
      address: rootNode.address,
      isL0Active: l0MembershipStatus === 'active',
      rootNodesL0Active,
      rootNodesL0Proposed,
      rootNodesExclusionActive,
      rootNodesExclusionProposed,
    });
    const cosignatureStatus = getCosignatureStatus(rootNode.address, latestCosignatureMetrics);
    const cosignatureStats20 = getCosignatureStats(rootNode.address, cosignatureMetrics20);
    const cosignatureStats1000 = getCosignatureStats(rootNode.address, cosignatureMetrics1000);
    const votingParticipationStats = getVotingParticipationStats({
      address: rootNode.address,
      qTHVotingsStats,
      votingsStats,
      proposalsStats,
    });

    return {
      address: rootNode.address,
      alias: rootNode.alias,
      date: rootNode.metric?.attributes.startTime,
      metric: rootNode.metric,
      cosignatureStatus,
      l0ApprovalStatus,
      listsSigned,
      l0MembershipStatus,
      cosignatureStats20,
      cosignatureStats1000,
      votingParticipationStats,
    };
  });

  const columns: TableColumn[] = [
    {
      headerStyle: () => ({ minWidth: '190px' }),
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
      headerStyle: () => ({ minWidth: '150px', cursor: 'pointer' }),
      dataField: 'date',
      text: t('JOIN_TIME'),
      sort: true,
      formatter: (cell, row) => (
        <DateColumnWrapper>
          <span>{formatDateRelative(cell * 1000, i18n.language)}</span>
          {row.metric && <RootNodeMetricTooltip metric={row.metric} />}
        </DateColumnWrapper>
      ),
    },
    {
      headerStyle: () => ({ minWidth: '140px', whiteSpace: 'pre-line', }),
      dataField: 'cosignatureStats1000',
      text: t('AVG_AVAILABILITY_CYCLES', { cycles: 1000 }),
      sort: true,
      sortFunc: cosignatureStatsSortFunc,
      formatter: (cell) => (<CosignatureStatsColumn cosignatureStats={cell} />),
    },
    {
      headerStyle: () => ({ minWidth: '140px', whiteSpace: 'pre-line', }),
      dataField: 'cosignatureStats20',
      text: t('AVG_AVAILABILITY_CYCLES', { cycles: 20 }),
      sort: true,
      sortFunc: cosignatureStatsSortFunc,
      formatter: (cell) => (<CosignatureStatsColumn cosignatureStats={cell} />),
    },
    {
      headerStyle: () => ({ minWidth: '140px', whiteSpace: 'pre-line', }),
      dataField: 'l0MembershipStatus',
      text: t('L0_MEMBERSHIP_STATUS'),
      sort: true,
      sortFunc: l0MembershipStatusSortFunc,
      formatter: (cell) => (
        <L0MembershipStatusColumn status={cell} />
      ),
    },
    {
      headerStyle: () => ({ minWidth: '120px', whiteSpace: 'pre-line', }),
      dataField: 'l0ApprovalStatus',
      text: t('L0_APPROVAL_STATUS'),
      sort: true,
      sortFunc: l0ApprovalStatusSortFunc,
      formatter: (cell, row) => (
        <L0ApprovalStatusColumn status={cell} listsSigned={row.listsSigned} />
      ),
    },
    {
      headerStyle: () => ({ minWidth: '120px', whiteSpace: 'pre-line', }),
      dataField: 'cosignatureStatus',
      text: t('CO_SIGNATURE_STATUS'),
      sort: true,
      sortFunc: cosignatureStatusSortFunc,
      formatter: (cell) => (
        <CosignatureStatusColumn status={cell} />
      ),
    },
    {
      headerStyle: () => ({ minWidth: '135px', whiteSpace: 'pre-line', }),
      dataField: 'votingParticipationStats',
      text: t('VOTING_PARTICIPATION'),
      sort: true,
      sortFunc: votingParticipationStatsSortFunc,
      formatter: (cell) => (
        <VotingParticipationStatsColumn stats={cell} />
      ),
    },
  ];

  return (
    <StyledTable
      perPage={20}
      columns={columns}
      header={<h2 className="text-h2">
        {t('ROOT_NODE_LIST')}
      </h2>}
      emptyTableMessage={t('ROOT_NODES_LIST_EMPTY')}
      keyField="address"
      searchFormatted={false}
      table={rootMembersMonitoring}
    />
  );
}

export default RootNodesMonitoringTable;
