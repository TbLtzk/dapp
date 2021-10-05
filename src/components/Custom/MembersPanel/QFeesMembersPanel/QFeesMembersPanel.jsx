import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getEPQFIMembers } from 'store/actions/action-creaters/membership'
import { EPQFIMembers, EPQFIMembersError } from 'store/selectors/membership'

import CustomBlock from 'components/Base/CustomBlock/CustomBlock'
import MemberTables from 'components/Custom/MemberTables'
import TABLE_TYPES from 'constants/tableTypes'

function QFeesMembersPanel () {
  const loading = useSelector(EPQFIMembersError)
  const members = useSelector(EPQFIMembers)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEPQFIMembers())
  }, [])

  return (
        <CustomBlock>
            <MemberTables
                tableType={TABLE_TYPES.qFees}
                perPageLength={members.length}
                tableArray={members}
                title="List of Q Fees & Incentives Experts"
                loading={loading}
                emptyTable="Emty list"
            />
        </CustomBlock>
  )
}

export default QFeesMembersPanel
