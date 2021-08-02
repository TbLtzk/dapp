import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getEPDRMembers } from 'store/actions/action-creaters/membership'
import {
  EPDRMembers, EPDRMembersError, EPDRMembersLoading
} from 'store/selectors/membership'

import ExpertsPanel from 'components/Custom/MembersPanel/ExpertsPanel'

function DefiMembersPanel () {
  const loading = useSelector(EPDRMembersLoading)
  const errorMessage = useSelector(EPDRMembersError)
  const members = useSelector(EPDRMembers)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEPDRMembers())
  }, [dispatch])

  return (
    <ExpertsPanel
      members={members}
      loading={loading}
      errorMessage={errorMessage}
      title="DeFi Risk"
    />
  )
}

export default DefiMembersPanel
