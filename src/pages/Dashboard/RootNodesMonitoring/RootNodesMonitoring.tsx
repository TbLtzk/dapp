
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import PageLayout from 'components/PageLayout';
import Table, { TableColumn } from 'ui/Table';

import DashboardLink from '../components/DashboardLink';

import { getRootMembers } from 'store/root-node/action-creators';
import {
  loadingRootMembersMonitoringSelector,
  rootMembersMonitoringSelector,
} from 'store/root-node/selectors';

import { TABLE_TYPES } from 'constants/tableTypes';
import { formatAsset, parseNumber } from 'utils/numbers';

const StyledWrapper = styled.div`
  .table-header {
    display: none;
  }
`;

function RootNodesMonitoring () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const table = useSelector(rootMembersMonitoringSelector);
  const tableLoading = useSelector(loadingRootMembersMonitoringSelector);

  useEffect(() => {
    dispatch(getRootMembers(TABLE_TYPES.rootNodesMonitoring));
  }, [dispatch]);

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
      sortFunc: (a, b, order) => order === 'desc'
        ? parseNumber(b) - parseNumber(a)
        : parseNumber(a) - parseNumber(b),
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
          loading={tableLoading}
          emptyTableMessage={t('ROOT_NODES_LIST_EMPTY')}
          table={table.map((rootNode: any, i: number) => ({
            id: i,
            address: <ExplorerAddress
              short
              iconed
              semibold
              address={rootNode.address}
            />,
            amount: formatAsset(rootNode.stakeAmount, 'Q'),
            offChain: 'n/a',
            onChain: 'n/a',
          }))}
        />
      </PageLayout>
    </StyledWrapper>
  );
}

export default RootNodesMonitoring;
