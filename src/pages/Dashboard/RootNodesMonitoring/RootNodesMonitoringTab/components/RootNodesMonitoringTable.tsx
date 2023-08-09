
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { formatAsset } from '@q-dev/utils';
import styled from 'styled-components';
import { L0ApprovalMap, L0ApprovalStatus, L0MembershipStatus } from 'typings/root-nodes';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Table, { TableColumn } from 'components/Table';
import AliasTooltip from 'components/Tooltips/AliasTooltip';

import { l0ApprovalStatusSortFunc, l0MembershipStatusSortFunc } from '../helpers/table-sorting';

import L0ApprovalStatusColumn from './L0ApprovalStatusColumn';
import L0MembershipStatusColumn from './L0MembershipStatusColumn';
import RootNodeMetricTooltip from './RootNodeMetricTooltip';

import { useRootNodes, useRootNodesMonitoring } from 'store/root-nodes/hooks';

import { formatDateRelative } from 'utils/date';

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
    rootNodesExclusionProposed
  } = useRootNodesMonitoring();

  function getL0ApprovalStatus (address: string, isL0Active: boolean): {
    l0ApprovalStatus: L0ApprovalStatus;
    listsSigned: L0ApprovalMap;
  } {
    const listsSigned = {
      isRootActiveSigned: false,
      isRootProposedSigned: false,
      isExclusionActiveSigned: false,
      isExclusionProposedSigned: false,
    };

    if (!isL0Active) {
      return {
        l0ApprovalStatus: 'not-in-list',
        listsSigned,
      };
    }

    listsSigned.isRootActiveSigned = !rootNodesL0Active?.signers ||
      rootNodesL0Active.signers.some(({ mainAccount }) => mainAccount === address);
    listsSigned.isRootProposedSigned = !rootNodesL0Proposed?.signers ||
      rootNodesL0Proposed.signers.some(({ mainAccount }) => mainAccount === address);
    listsSigned.isExclusionActiveSigned = !rootNodesExclusionActive?.signers ||
      rootNodesExclusionActive.signers.some(({ mainAccount }) => mainAccount === address);
    listsSigned.isExclusionProposedSigned = !rootNodesExclusionProposed?.signers ||
      rootNodesExclusionProposed.signers.some(({ mainAccount }) => mainAccount === address);

    const l0ApprovalStatus = Object.values(listsSigned).every(i => i)
      ? 'all-signed'
      : 'not-signed';
    return {
      l0ApprovalStatus,
      listsSigned,
    };
  }

  function getL0MembershipStatus (address: string): L0MembershipStatus {
    const isL0ActiveStatus = rootNodesL0Active?.roots.some(({ mainAccount }) => mainAccount === address);
    if (isL0ActiveStatus) return 'active';

    const isL0ProposedStatus = rootNodesL0Proposed?.roots.some(
      ({ mainAccount }) => mainAccount === address
    );

    return isL0ProposedStatus
      ? 'proposed'
      : 'not-in-list';
  }

  const rootMembersMonitoring = useMemo(() => {
    return rootMembers.map((rootNode) => {
      const l0MembershipStatus = getL0MembershipStatus(rootNode.address);
      const { l0ApprovalStatus, listsSigned } = getL0ApprovalStatus(rootNode.address, l0MembershipStatus === 'active');

      return {
        address: rootNode.address,
        amount: rootNode.stakeAmount,
        alias: rootNode.alias,
        date: rootNode.metric?.attributes.startTime,
        metric: rootNode.metric,
        l0ApprovalStatus,
        listsSigned,
        l0MembershipStatus,
      };
    });
  }, [rootMembers]);

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
      headerStyle: () => ({ minWidth: '120px' }),
      dataField: 'l0MembershipStatus',
      text: t('L0_MEMBERSHIP_STATUS'),
      sort: true,
      sortFunc: l0MembershipStatusSortFunc,
      formatter: (cell) => (
        <L0MembershipStatusColumn status={cell} />
      ),
    },
    {
      headerStyle: () => ({ minWidth: '120px' }),
      dataField: 'l0ApprovalStatus',
      text: t('L0_APPROVAL_STATUS'),
      sort: true,
      sortFunc: l0ApprovalStatusSortFunc,
      formatter: (cell, row) => (
        <L0ApprovalStatusColumn status={cell} listsSigned={row.listsSigned} />
      ),
    },
  ];

  return (
    <Table
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
