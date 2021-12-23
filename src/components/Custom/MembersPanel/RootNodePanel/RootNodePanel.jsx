import React, { useEffect } from 'react'

import CustomBlock from 'components/Base/CustomBlock'

import { useDispatch, useSelector } from 'react-redux'
import { getRootMembersData } from 'store/root-node/action-creators'
import { loadingRootMembersDataSelector, rootMembersData } from 'store/root-node/selectors'
import MemberTables from 'components/Custom/MemberTables'

import TABLE_TYPES from 'constants/tableTypes'

function RootNodePanel ({ type }) {
  const dispatch = useDispatch()

  const rootMembersArray = useSelector(rootMembersData)
  const loading = useSelector(loadingRootMembersDataSelector)

  useEffect(() => {
    dispatch(getRootMembersData())
  }, [])

  return (
        <CustomBlock>
            <h1>Root Node Panel</h1>
            {type !== 'with-total' || loading ? null : <p>Total Stake: {rootMembersArray.totalStakes + ' Q'}</p>}
            <MemberTables
                tableType={TABLE_TYPES.rootNode}
                perPageLength={10}
                tableArray={rootMembersArray.rootNodeData}
                title={null}
                loading={loading}
                emptyTable="No in root node panel"
            />
        </CustomBlock>
  )
}

export default RootNodePanel
