import React, { Suspense, useEffect } from 'react'

import LoadingSpinner from 'components/Base/LoadingSpinner'
import CustomBlock from 'components/Base/CustomBlock'

import { userAddressMetamask } from 'store/selectors/user-inf'
import { useDispatch, useSelector } from 'react-redux'
import { getRootMembersData, getRootNodeStakes } from 'store/actions/action-creaters/root-contract'
import { rootMembersData } from 'store/selectors/root-contract'
import MemberTables from 'components/Custom/MemberTables'

import { LoadingWrap } from '../styles'

function RootNodePanel (props) {
  const { type } = props

  const userAddress = useSelector(userAddressMetamask)
  const rootMembersArray = useSelector(rootMembersData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRootMembersData())
    dispatch(getRootNodeStakes(userAddress))
  }, [])

  return (
        <CustomBlock>
            <Suspense
                fallback={
                    <LoadingWrap>
                        <LoadingSpinner />
                    </LoadingWrap>
                }
            >
                {rootMembersArray?.length === 0
                  ? (
                    <div>
                        <h1>Root Node Panel</h1>
                        <LoadingWrap>
                            <LoadingSpinner />
                        </LoadingWrap>
                    </div>
                    )
                  : (
                    <>
                        <h1>Root Node Panel</h1>
                        {type !== 'with-total' ? null : <p>Total Stake: {rootMembersArray.totalStakes + ' Q'}</p>}
                        <MemberTables
                            tableType="rootNode"
                            perPageLength={10}
                            tableArray={rootMembersArray.rootNodeData}
                            title={null}
                        />
                    </>
                    )}
            </Suspense>
        </CustomBlock>
  )
}

export default RootNodePanel
