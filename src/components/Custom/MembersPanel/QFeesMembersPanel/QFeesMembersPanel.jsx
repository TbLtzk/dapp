import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getEPQFIMembers } from 'store/actions/action-creaters/membership'
import {
  EPQFIMembers, EPQFIMembersLoading, EPQFIMembersError
} from 'store/selectors/membership'

import ExpertsPanel from 'components/Custom/MembersPanel/ExpertsPanel'

function QFeesMembersPanel () {
  const loading = useSelector(EPQFIMembersError)
  const errorMessage = useSelector(EPQFIMembersLoading)
  const members = useSelector(EPQFIMembers)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEPQFIMembers())
  }, [dispatch])

  return (
    <ExpertsPanel
      members={members}
      loading={loading}
      errorMessage={errorMessage}
      title="Q Fees & Incentives"
    />

  )
}

export default QFeesMembersPanel
