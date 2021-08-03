import React, { lazy, Suspense, useEffect } from 'react'
import RootService from 'contracts/src/Root'

import LoadingSpinner from 'components/Base/LoadingSpinner'
import CustomBlock from 'components/Base/CustomBlock'

import { userAddressMetamask } from 'store/selectors/user-inf'
import { useDispatch, useSelector } from 'react-redux'
import { getRootMembersData, getRootNodeStakes } from 'store/actions/action-creaters/root-contract'
import {
  rootMembersData,
  rootMembersAmountStakes,
  loadingRootMembers,
  errorM
} from 'store/selectors/root-contract'

import { LoadingWrap } from '../styles'

import { tableHeader } from './constants'

const MemberTable = lazy(() => import('components/Custom/MembersPanel/MemberTable'))

function RootNodePanel (props) {
  const {
    type
  } = props
  const rootService = new RootService()

  const userAddress = useSelector(userAddressMetamask)
  const rootMembersArray = useSelector(rootMembersData)
  const loading = useSelector(loadingRootMembers)
  const errorMessage = useSelector(errorM)
  const rootAmountStakes = useSelector(rootMembersAmountStakes)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRootMembersData(rootService))
    dispatch(getRootNodeStakes(rootService, userAddress))
  }, [dispatch])

  return (
    <CustomBlock>
      <Suspense fallback={<LoadingWrap><LoadingSpinner/></LoadingWrap>}>
        {loading
          ? <div>
            <h1>Root Node Panel</h1>
            <LoadingWrap><LoadingSpinner/></LoadingWrap>
          </div>
          : errorMessage || rootMembersArray?.length === 0
            ? <p>No roots node</p>
            : <>
              <h1>Root Node Panel</h1>
              {type !== 'with-total'
                ? null
                : <p>Total Stake: {rootAmountStakes + 'Q'}</p>}
              <MemberTable
                type="root-node"
                arrayData={rootMembersArray}
                tableHeader={tableHeader}
              />
            </>
        }
      </Suspense>
    </CustomBlock>
  )
}

export default RootNodePanel
