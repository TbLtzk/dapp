import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Table from 'components/Base/Table';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import InfoTooltip from 'components/Custom/InfoTooltip';

import { getColumnsRootNode, getColumnsRootNodeMonitoring } from './columnTypes';

import { getRootMembers } from 'store/root-node/action-creators';
import {
  loadingRootMembersMonitoringSelector,
  loadingRootMembersSelector,
  rootMembersMonitoringSelector,
  rootMembersSelector,
  rootMemebersTotalStakeSelector,
} from 'store/root-node/selectors';

import TABLE_TYPES from 'constants/tableTypes';
import { fN } from 'func/useful';

function RootNodeTable ({ tableType }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const rootNodeTableTypes = {
    [TABLE_TYPES.rootNodesShort]: {
      search: false,
      tableSelector: rootMembersSelector,
      tableLoadingSelector: loadingRootMembersSelector,
      columns: getColumnsRootNode(t),
    },
    [TABLE_TYPES.rootNodesWidened]: {
      search: true,
      tableSelector: rootMembersSelector,
      tableLoadingSelector: loadingRootMembersSelector,
      columns: getColumnsRootNode(t),
    },
    [TABLE_TYPES.rootNodesMonitoring]: {
      search: true,
      tableSelector: rootMembersMonitoringSelector,
      tableLoadingSelector: loadingRootMembersMonitoringSelector,
      columns: getColumnsRootNodeMonitoring(t),
    },
  };

  const { tableSelector, tableLoadingSelector, columns, search } = rootNodeTableTypes[tableType];

  const table = useSelector(tableSelector);
  const tableLoading = useSelector(tableLoadingSelector);
  const rootMemebersTotalStake = useSelector(rootMemebersTotalStakeSelector);

  useEffect(() => {
    dispatch(getRootMembers(tableType));
  }, [dispatch, tableType]);

  const isTotalStakeShown = tableType === TABLE_TYPES.rootNodesWidened && !tableLoading;

  const tableData = useMemo(() => {
    switch (tableType) {
      case TABLE_TYPES.rootNodesMonitoring:
        return table.map((rootNode, idx) => ({
          id: idx,
          address: <ExplorerAddress
            short
            iconed
            semibold
            address={rootNode.address}
          />,
          amount: fN(rootNode.stakeAmount) + ' Q',
          offChain: 'n/a',
          onChain: 'n/a',
        }));
      default:
        return table.map((rootNode, idx) => ({
          id: idx,
          address: (
            <ExplorerAddress
              iconed
              semibold
              short={TABLE_TYPES.rootNodesShort === tableType}
              address={rootNode.address}
            />
          ),
          amount: fN(rootNode.stakeAmount) + ' Q',
          share: rootNode.share + ' %',
        }));
    }
  }, [tableType, table]);

  return (
    <Table
      sorting
      search={search}
      perPageLength={10}
      table={tableData}
      header={
        <>
          <h2 className="text-h2">
            <span>{t('ROOT_NODE_PANEL')}</span>
            <InfoTooltip topic="root-node-panel" />
          </h2>
          {isTotalStakeShown && (
            <p>
              <strong>{t('TOTAL_STAKE')}</strong>
              {rootMemebersTotalStake} Q
            </p>
          )}
        </>
      }
      columns={columns}
      loading={tableLoading}
      emptyTableMessage={t('ROOT_NODES_LIST_EMPTY')}
    />
  );
}

export default RootNodeTable;
