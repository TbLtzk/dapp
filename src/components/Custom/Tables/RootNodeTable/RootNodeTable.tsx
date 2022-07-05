import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { TableType } from 'typings/tables';

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

interface Props {
  tableType: TableType
}

function RootNodeTable ({ tableType }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const rootNodeTableTypes = {
    [TABLE_TYPES.rootNodesShort]: {
      tiny: true,
      tableSelector: rootMembersSelector,
      tableLoadingSelector: loadingRootMembersSelector,
      columns: getColumnsRootNode(t),
    },
    [TABLE_TYPES.rootNodesWidened]: {
      tiny: false,
      tableSelector: rootMembersSelector,
      tableLoadingSelector: loadingRootMembersSelector,
      columns: getColumnsRootNode(t),
    },
    [TABLE_TYPES.rootNodesMonitoring]: {
      tiny: false,
      tableSelector: rootMembersMonitoringSelector,
      tableLoadingSelector: loadingRootMembersMonitoringSelector,
      columns: getColumnsRootNodeMonitoring(t),
    },
  };

  const { tableSelector, tableLoadingSelector, columns, tiny } = rootNodeTableTypes[tableType];

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
        return table.map((rootNode:any, idx:number) => ({
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
        return table.map((rootNode:any, idx:number) => ({
          id: idx,
          address: (
            <ExplorerAddress
              iconed
              semibold
              short={tableType === 'rootNodesShort'}
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
      tiny={tiny}
      header={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <h2 className="text-h2">
            <span>{t('ROOT_NODE_PANEL')}</span>
            <InfoTooltip topic="root-node-panel" />
          </h2>
          {isTotalStakeShown && (
            <p style={{ margin: 0 }}>
              <strong>{t('TOTAL_STAKE')}</strong> {rootMemebersTotalStake} Q
            </p>
          )}
        </div>
      }
      perPage={10}
      table={tableData}
      columns={columns}
      loading={tableLoading}
      emptyTableMessage={t('ROOT_NODES_LIST_EMPTY')}
    />
  );
}

export default RootNodeTable;
