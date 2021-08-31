import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getDelegationsList } from 'store/actions/action-creaters/q-vault'
import {
  loadingDelegationList,
  errorDelegationList,
  delegationList
} from 'store/selectors/q-vault'

import MemberTable from 'components/Custom/MembersPanel/MemberTable'
import LoadingSpinner from 'components/Base/LoadingSpinner'

import { tableHeader } from './constants'

import { LoadingWrap } from '../styles'

function DelegatedValidatorsPanel () {
  const loading = useSelector(loadingDelegationList)
  const errorMessage = useSelector(errorDelegationList)
  const delegations = useSelector(delegationList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDelegationsList())
  }, [dispatch])

  return (
    <div>
      {loading
        ? <LoadingWrap><LoadingSpinner/></LoadingWrap>
        : errorMessage || delegations?.length === 0
          ? <p>No delegations</p>
          : <>
            <h3>Your current delegations</h3>
            <MemberTable
              type="delegated-validators"
              arrayData={delegations}
              tableHeader={tableHeader}
            />
          </>
      }
    </div>
  )
}

export default DelegatedValidatorsPanel
