import React, { lazy, Suspense, useEffect } from 'react'

import LoadingSpinner from 'components/Base/LoadingSpinner'
import CustomBlock from 'components/Base/CustomBlock'

import { userAddressMetamask } from 'store/selectors/user-inf'
import { useDispatch, useSelector } from 'react-redux'
import { getRootMembersData, getRootNodeStakes } from 'store/actions/action-creaters/root-contract'
import { rootMembersData } from 'store/selectors/root-contract'

import { LoadingWrap } from '../styles'

import { tableHeader } from './constants'

const MemberTable = lazy(() => import('components/Custom/MembersPanel/MemberTable'))

function RootNodePanel (props) {
  const { type } = props

  const userAddress = useSelector(userAddressMetamask)
  const rootMembersArray = useSelector(rootMembersData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRootMembersData())
    dispatch(getRootNodeStakes(userAddress))
  }, [dispatch])

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
                        <MemberTable
                            type="root-node"
                            arrayData={rootMembersArray.rootNodeData}
                            tableHeader={tableHeader}
                        />
                    </>
                    )}
            </Suspense>
        </CustomBlock>
  )
}

export default RootNodePanel
