import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import CustomBlock from 'components/Base/CustomBlock';
import MemberTables from 'components/Custom/MemberTables';

import { getColumnsRootNode, getColumnsRootNodeMonitoring } from './columnTypes';
import { TitleBlock } from './styles';

import { getRootMembers } from 'store/root-node/action-creators';
import {
  loadingRootMembersMonitoringSelector,
  loadingRootMembersSelector,
  rootMembersMonitoringSelector,
  rootMembersSelector,
  rootMemebersTotalStakeSelector,
} from 'store/root-node/selectors';

import { tableRootNode, tableRootNodeMonitoring } from 'constants/tables';
import TABLE_TYPES from 'constants/tableTypes';

function RootNodePanel ({ tableType }) {
  const { t } = useTranslation();

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
          columns: getColumnsRootNode(t),
          tableWrapper: (arr) => tableRootNode(arr, tableType === TABLE_TYPES.rootNodesShort),
        };
      case TABLE_TYPES.rootNodesMonitoring:
        return {
          tableSelector: rootMembersMonitoringSelector,
          tableLoadingSelector: loadingRootMembersMonitoringSelector,
          columns: getColumnsRootNodeMonitoring(t),
          tableWrapper: tableRootNodeMonitoring,
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
        <h1>{t('ROOT_NODE_PANEL')}</h1>
        {isTotalStakeShown && (
          <p>
            <strong>{t('TOTAL_STAKE')}</strong>
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
        emptyTableMessage={t('ROOT_NODES_LIST_EMPTY')}
      />
    </CustomBlock>
  );
}

export default RootNodePanel;
