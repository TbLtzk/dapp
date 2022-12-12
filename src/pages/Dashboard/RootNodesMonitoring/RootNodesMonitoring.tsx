
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import PageLayout from 'components/PageLayout';
import AliasTooltip from 'components/Tooltips/AliasTooltip';
import Table, { TableColumn } from 'ui/Table';

import DashboardLink from '../components/DashboardLink';

import { useRootNodes } from 'store/root-nodes/hooks';

import { formatAsset } from 'utils/numbers';

const StyledWrapper = styled.div`
  .table-header {
    display: none;
  }
`;

function RootNodesMonitoring () {
  const { t } = useTranslation();
  const { rootMembers, rootMembersLoading, getRootMembers } = useRootNodes();

  useEffect(() => {
    getRootMembers();
  }, []);

  const columns: TableColumn[] = [
    {
      headerStyle: () => ({ minWidth: '180px' }),
      dataField: 'address',
      text: t('ROOT_NODE_ADDRESS'),
      filterValue: cell => cell.props.address,
    },
    {
      headerStyle: () => ({ minWidth: '160px', cursor: 'pointer' }),
      dataField: 'amount',
      text: t('STAKED_AMOUNT'),
      sort: true,
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
          table={rootMembers.map((rootNode, i) => ({
            id: i,
            address: (
              <div style={{ display: 'flex' }}>
                <ExplorerAddress
                  short
                  iconed
                  semibold
                  address={rootNode.address}
                />
                <AliasTooltip isRootNode alias={rootNode.alias}/>
              </div>
            ),
            amount: formatAsset(rootNode.stakeAmount, 'Q'),
            offChain: 'n/a',
            onChain: 'n/a',
            alias: rootNode.alias
          }))}
        />
      </PageLayout>
    </StyledWrapper>
  );
}

export default RootNodesMonitoring;
