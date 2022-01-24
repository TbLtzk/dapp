import React, { useEffect } from 'react'

import CustomBlock from 'components/Base/CustomBlock'

import { useDispatch, useSelector } from 'react-redux'
import { getRootMembers } from 'store/root-node/action-creators'
import {
  loadingRootMembersMonitoringSelector,
  loadingRootMembersSelector,
  rootMembersMonitoringSelector,
  rootMembersSelector,
  rootMemebersTotalStakeSelector
} from 'store/root-node/selectors'
import MemberTables from 'components/Custom/MemberTables'
import { columnsRootNode, columnsRootNodeMonitoring } from 'constants/columns'
import { tableRootNode, tableRootNodeMonitoring } from 'constants/tables'
import TABLE_TYPES from 'constants/tableTypes'

function RootNodePanel ({ tableType }) {
  const { table, tableLoading, columns } = getRootNodesData()

  const dispatch = useDispatch()
  const rootMemebersTotalStake = useSelector(rootMemebersTotalStakeSelector)

  function getRootNodesData () {
    switch (tableType) {
      case TABLE_TYPES.rootNodesShort:
      case TABLE_TYPES.rootNodesWidened:
        return {
          table: tableRootNode(useSelector(rootMembersSelector)),
          tableLoading: useSelector(loadingRootMembersSelector),
          columns: columnsRootNode
        }
      case TABLE_TYPES.rootNodesMonitoring:
        return {
          table: tableRootNodeMonitoring(useSelector(rootMembersMonitoringSelector)),
          tableLoading: useSelector(loadingRootMembersMonitoringSelector),
          columns: columnsRootNodeMonitoring
        }
    }
  }

  useEffect(() => {
    dispatch(getRootMembers(tableType))
  }, [])

  return (
        <CustomBlock>
            <h1>Root Node Panel</h1>
            {tableType === TABLE_TYPES.rootNodesWidened && !tableLoading
              ? (
                <p>Total Stake: {rootMemebersTotalStake + ' Q'}</p>
                )
              : null}
            <MemberTables
                perPageLength={10}
                table={table}
                title={null}
                sorting
                columns={columns}
                loading={tableLoading}
                emptyTableMessage="No Root Nodes"
            />
        </CustomBlock>
  )
}

export default RootNodePanel
