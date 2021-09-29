import React, { useEffect } from 'react'

import CustomBlock from 'components/Base/CustomBlock'

import { userAddressMetamask } from 'store/selectors/user-inf'
import { useDispatch, useSelector } from 'react-redux'
import { getRootMembersData, getRootNodeStakes } from 'store/actions/action-creaters/root-contract'
import { rootMembersData } from 'store/selectors/root-contract'
import MemberTables from 'components/Custom/MemberTables'

import TABLE_TYPES from 'constants/tableTypes'

function RootNodePanel (props) {
  const { type } = props

  const userAddress = useSelector(userAddressMetamask)
  const rootMembersArray = useSelector(rootMembersData)
  const loading = !rootMembersArray?.rootNodeData?.length
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRootMembersData())
    dispatch(getRootNodeStakes(userAddress))
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
                emptyTable="No root node panel"
            />
        </CustomBlock>
  )
}

export default RootNodePanel
