
import { useEffect, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Icon } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import BackLink from 'components/BackLink';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import PageLayout from 'components/PageLayout';
import Table, { TableColumn } from 'components/Table';

import { useRootNodesMonitoring } from 'store/root-nodes/hooks';

import { RoutePaths } from 'constants/routes';

const StyledWrapper = styled.div`
  .page-layout__title {
    width: 100%;
    justify-content: space-between;
  }
`;

const StatusIcon = styled(Icon)<{$isSuccess: boolean}>`
  color: ${({ theme, $isSuccess }) => $isSuccess ? theme.colors.successMain : theme.colors.errorMain};
`;

function OnchainActiveDifferenceTab () {
  const { t } = useTranslation();
  const {
    rootNodesOnchainDiffList,
    loadRootNodesOnchainDiffList,
    isRootNodesOnchainDiffListLoading
  } = useRootNodesMonitoring();

  const diffCount = useMemo(() => {
    return rootNodesOnchainDiffList
      .filter((i) => !i.isL0Active || !i.isOnchain)
      .length;
  }, [rootNodesOnchainDiffList]);

  useEffect(() => {
    loadRootNodesOnchainDiffList();
  }, []);

  const columns: TableColumn[] = [
    {
      headerStyle: () => ({ minWidth: '180px' }),
      dataField: 'address',
      text: t('ADDRESS'),
      formatter: (cell) => (
        <ExplorerAddress
          iconed
          semibold
          address={cell}
        />
      ),
    },
    {
      headerStyle: () => ({ minWidth: '160px', cursor: 'pointer' }),
      dataField: 'isOnchain',
      text: t('ONCHAIN_LIST'),
      sort: true,
      sortFunc: (a, b, order) => order === 'asc'
        ? Number(a) - Number(b)
        : Number(b) - Number(a),
      formatter: (cell) => (
        <StatusIcon $isSuccess={cell} name={cell ? 'check' : 'cross'} />
      ),
      align: 'center',
      headerAlign: 'center',
    },
    {
      headerStyle: () => ({ minWidth: '160px', cursor: 'pointer' }),
      dataField: 'isL0Active',
      text: t('ACTIVE_LIST'),
      sort: true,
      sortFunc: (a, b, order) => order === 'asc'
        ? Number(a) - Number(b)
        : Number(b) - Number(a),
      formatter: (cell) => (
        <StatusIcon $isSuccess={cell} name={cell ? 'check' : 'cross'} />
      ),
      align: 'center',
      headerAlign: 'center',
    },
  ];

  return (
    <StyledWrapper>
      <BackLink
        to={RoutePaths.dashboardRootNodesMonitoring}
        text={t('ROOT_NODES_MONITORING')}
      />
      <PageLayout
        title={t('ONCHAIN_ACTIVE_LISTS_DIFFERENCE')}
        titleExtra={<Trans
          className="text-lg font-light"
          i18nKey="DIFFERENCES_COUNT"
          parent="p"
          values={{ count: diffCount }}
          components={{
            countWrapper: <span className="font-regular" />
          }}
        />}
      >
        <Table
          hideSearch
          loading={isRootNodesOnchainDiffListLoading}
          perPage={20}
          columns={columns}
          emptyTableMessage={t('ROOT_NODES_LIST_EMPTY')}
          keyField="address"
          table={rootNodesOnchainDiffList}
        />
      </PageLayout>
    </StyledWrapper>
  );
}

export default OnchainActiveDifferenceTab;
