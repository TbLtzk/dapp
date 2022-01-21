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

import TABLE_TYPES from 'constants/tableTypes'

function RootNodePanel ({ tableType }) {
  const { table, tableLoading } = getRootNodesData()

  const dispatch = useDispatch()
  const rootMemebersTotalStake = useSelector(rootMemebersTotalStakeSelector)

  function getRootNodesData () {
    switch (tableType) {
      case TABLE_TYPES.rootNodesShort:
      case TABLE_TYPES.rootNodesWidened:
        return {
          table: useSelector(rootMembersSelector),
          tableLoading: useSelector(loadingRootMembersSelector)
        }
      case TABLE_TYPES.rootNodesMonitoring:
        return {
          table: useSelector(rootMembersMonitoringSelector),
          tableLoading: useSelector(loadingRootMembersMonitoringSelector)
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
                tableType={tableType}
                perPageLength={10}
                tableArray={table}
                title={null}
                loading={tableLoading}
                emptyTable="No Root Nodes"
            />
        </CustomBlock>
  )
}

export default RootNodePanel
