import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import MemberTables from 'components/Custom/MemberTables';

import { TitleBlock } from './styles';

import { getRootMembers } from 'store/root-node/action-creators';
import {
  loadingRootMembersMonitoringSelector,
  loadingRootMembersSelector,
  rootMembersMonitoringSelector,
  rootMembersSelector,
  rootMemebersTotalStakeSelector
} from 'store/root-node/selectors';

import { columnsRootNode, columnsRootNodeMonitoring } from 'constants/columns';
import { tableRootNode, tableRootNodeMonitoring } from 'constants/tables';
import TABLE_TYPES from 'constants/tableTypes';

function RootNodePanel ({ tableType }) {
  const { tableSelector, tableLoadingSelector, columns, tableWrapper } = getRootNodesData();
  const table = tableWrapper(useSelector(tableSelector));
  const tableLoading = useSelector(tableLoadingSelector);
  const dispatch = useDispatch();
  const rootMemebersTotalStake = useSelector(rootMemebersTotalStakeSelector);

  function getRootNodesData () {
    switch (tableType) {
      case TABLE_TYPES.rootNodesShort:
      case TABLE_TYPES.rootNodesWidened:
        return {
          tableSelector: rootMembersSelector,
          tableLoadingSelector: loadingRootMembersSelector,
          columns: columnsRootNode,
          tableWrapper: tableRootNode
        };
      case TABLE_TYPES.rootNodesMonitoring:
        return {
          tableSelector: rootMembersMonitoringSelector,
          tableLoadingSelector: loadingRootMembersMonitoringSelector,
          columns: columnsRootNodeMonitoring,
          tableWrapper: tableRootNodeMonitoring
        };
    }
  }

  useEffect(() => {
    dispatch(getRootMembers(tableType));
  }, [dispatch]);

  const isTotalStakeShown = tableType === TABLE_TYPES.rootNodesWidened && !tableLoading;

  return (
    <CustomBlock>
      <TitleBlock>
        <h1>Root Node Panel</h1>
        {isTotalStakeShown && (
          <p>
            <strong>Total Stake: </strong>
            {rootMemebersTotalStake} Q
          </p>
        )}
      </TitleBlock>
      <MemberTables
        sorting
        perPageLength={9}
        table={table}
        title={null}
        columns={columns}
        loading={tableLoading}
        emptyTableMessage="No Root Nodes"
      />
    </CustomBlock>
  );
}

export default RootNodePanel;
