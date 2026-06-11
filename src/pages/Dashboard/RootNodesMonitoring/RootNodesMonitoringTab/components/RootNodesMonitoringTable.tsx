
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Table, { TableColumn } from 'components/Table';
import AliasTooltip from 'components/Tooltips/AliasTooltip';
import { useL0GovernanceEligibility } from 'pages/L0Governance/hooks/useL0GovernanceEligibility';

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
import RootNodeMetricsExport from './RootNodeMetricsExport';
import RootNodeMetricTooltip from './RootNodeMetricTooltip';
import VotingParticipationStatsColumn from './VotingParticipationStatsColumn';

import { useRootNodes } from 'store/root-nodes/hooks';

import { formatDateRelative } from 'utils/date';

const CONNECTED_ROW_CLASS = 'root-nodes-monitoring-table--connected-row';

const StyledTable = styled(Table)`
  .table tr td {
    padding: 10px;

    &:first-child {
      padding-left: 24px;
    }
  }

  .table .${CONNECTED_ROW_CLASS} {
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.successMain};
    background: ${({ theme }) => theme.colors.tertiaryMain};
  }
`;

const DateColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const AddressColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ConnectedRowBadge = styled.span`
  flex-shrink: 0;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.buttonTextPrimary};
  background: ${({ theme }) => theme.colors.successMain};
`;

function isEligibleGovernanceVisitor (
  status: ReturnType<typeof useL0GovernanceEligibility>['status'],
): boolean {
  return status === 'eligible-root' || status === 'eligible-alias';
}

function isConnectedRootRow (
  row: { address: string; alias?: string },
  rootAccount: string | null | undefined,
  aliasAccount: string | null | undefined,
): boolean {
  if (!rootAccount && !aliasAccount) {
    return false;
  }

  const rowAddress = row.address?.toLowerCase();
  const rowAlias = row.alias?.toLowerCase();

  if (rootAccount && rowAddress === rootAccount.toLowerCase()) {
    return true;
  }

  if (aliasAccount && rowAlias === aliasAccount.toLowerCase()) {
    return true;
  }

  return false;
}

function RootNodesMonitoringTable () {
  const { t, i18n } = useTranslation();
  const { rootMembers } = useRootNodes();
  const l0GovernanceEligibility = useL0GovernanceEligibility();
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
    blockHeight,
  } = useRootNodesMonitoringContext();

  const connectedRootAccount = useMemo(() => (
    isEligibleGovernanceVisitor(l0GovernanceEligibility.status)
      ? l0GovernanceEligibility.rootAccount
      : undefined
  ), [l0GovernanceEligibility]);

  const connectedAliasAccount = useMemo(() => (
    isEligibleGovernanceVisitor(l0GovernanceEligibility.status)
      ? l0GovernanceEligibility.aliasAccount
      : undefined
  ), [l0GovernanceEligibility]);

  const rootMembersMonitoring = rootMembers.map((rootNode) => {
    const l0MembershipStatus = getL0MembershipStatus({
      address: rootNode.address,
      rootNodesL0Active,
      rootNodesL0Proposed,
    });
    const { l0RootApprovalStatus, l0ExclusionApprovalStatus, listsSigned } = getL0ApprovalStatus({
      address: rootNode.address,
      isL0Active: l0MembershipStatus === 'active',
      rootNodesL0Active,
      rootNodesL0Proposed,
      rootNodesExclusionActive,
      rootNodesExclusionProposed,
    });
    const cosignatureStatus = getCosignatureStatus(
      rootNode.address,
      latestCosignatureMetrics,
      blockHeight,
    );
    const cosignatureStats20 = getCosignatureStats(rootNode.address, cosignatureMetrics20);
    const cosignatureStats1000 = getCosignatureStats(rootNode.address, cosignatureMetrics1000);
    const votingParticipationStats = getVotingParticipationStats({
      address: rootNode.address,
      qTHVotingsStats,
      votingsStats,
      proposalsStats,
    });

    const isConnectedRow = isConnectedRootRow(
      rootNode,
      connectedRootAccount,
      connectedAliasAccount,
    );

    return {
      address: rootNode.address,
      alias: rootNode.alias,
      isConnectedRow,
      date: rootNode.metric?.attributes.startTime,
      metric: rootNode.metric,
      cosignatureStatus,
      l0RootApprovalStatus,
      l0ExclusionApprovalStatus,
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
        <AddressColumnWrapper>
          <ExplorerAddress
            short
            iconed
            semibold
            address={cell}
          />
          <AliasTooltip isRootNode alias={row.alias} />
          {row.isConnectedRow && (
            <ConnectedRowBadge>{t('RN_CONNECTED_ROW_BADGE')}</ConnectedRowBadge>
          )}
        </AddressColumnWrapper>
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
      headerStyle: () => ({ minWidth: '150px', whiteSpace: 'pre-line', }),
      dataField: 'l0MembershipStatus',
      text: t('L0_MEMBERSHIP_STATUS'),
      sort: true,
      sortFunc: l0MembershipStatusSortFunc,
      formatter: (cell) => (
        <L0MembershipStatusColumn status={cell} />
      ),
    },
    {
      headerStyle: () => ({ minWidth: '160px', whiteSpace: 'pre-line', }),
      dataField: 'l0RootApprovalStatus',
      text: t('L0_ROOT_APPROVAL_STATUS'),
      sort: true,
      sortFunc: l0ApprovalStatusSortFunc,
      formatter: (cell, row) => (
        <L0ApprovalStatusColumn
          status={cell}
          tooltipHeader={t('L0_ROOT_APPROVAL_STATUS')}
          unsignedListsItems={[
            ...(!row.listsSigned.isRootActiveSigned ? [t('ACTIVE_ROOT_LIST')] : []),
            ...(!row.listsSigned.isRootProposedSigned ? [t('PROPOSED_ROOT_LIST')] : []),
          ]}
        />
      ),
    },
    {
      headerStyle: () => ({ minWidth: '160px', whiteSpace: 'pre-line', }),
      dataField: 'l0ExclusionApprovalStatus',
      text: t('L0_EXCLUSION_APPROVAL_STATUS'),
      sort: true,
      sortFunc: l0ApprovalStatusSortFunc,
      formatter: (cell, row) => (
        <L0ApprovalStatusColumn
          status={cell}
          tooltipHeader={t('L0_EXCLUSION_APPROVAL_STATUS')}
          unsignedListsItems={[
            ...(!row.listsSigned.isExclusionActiveSigned ? [t('ACTIVE_EXCLUSION_LIST')] : []),
            ...(!row.listsSigned.isExclusionProposedSigned ? [t('PROPOSED_EXCLUSION_LIST')] : []),
          ]}
        />
      ),
    },
    {
      headerStyle: () => ({ minWidth: i18n.language === 'en-GB' ? '120px' : '180px', whiteSpace: 'pre-line', }),
      dataField: 'cosignatureStatus',
      text: t('CO_SIGNATURE_STATUS'),
      sort: true,
      sortFunc: cosignatureStatusSortFunc,
      formatter: (cell) => (
        <CosignatureStatusColumn status={cell} />
      ),
    },
    {
      headerStyle: () => ({ minWidth: '160px', whiteSpace: 'pre-line', }),
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
      rowClasses={(row) => (row.isConnectedRow ? CONNECTED_ROW_CLASS : '')}
      searchFormatted={false}
      table={rootMembersMonitoring}
      buttons={<RootNodeMetricsExport />}
    />
  );
}

export default RootNodesMonitoringTable;
