import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getEPQFIMembers } from 'store/membership/action-creators'
import { EPQFIMembers, EPQFIMembersLoading } from 'store/membership/selectors'

import CustomBlock from 'components/Base/CustomBlock/CustomBlock'
import MemberTables from 'components/Custom/MemberTables'
import { tableQFees } from 'constants/tables'
import { columnsQFees } from 'constants/columns'

function QFeesMembersPanel () {
  const qFeesMembersTableLoading = useSelector(EPQFIMembersLoading)
  const qFeesMembersTable = tableQFees(useSelector(EPQFIMembers))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEPQFIMembers())
  }, [])

  return (
        <CustomBlock>
            <MemberTables
                table={qFeesMembersTable}
                title="List of Q Fees & Incentives Experts"
                loading={qFeesMembersTableLoading}
                columns={columnsQFees}
                emptyTableMessage="Emty list"
                perPageLength={qFeesMembersTable.length}
            />
        </CustomBlock>
  )
}

export default QFeesMembersPanel
